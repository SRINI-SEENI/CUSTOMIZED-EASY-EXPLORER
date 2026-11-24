// Main Application Controller & Event Orchestrator
// Customized Easy Explorer - Ground-Level Travel & Discovery Portal

import { state } from './state.js';
import { PRESET_LOCATIONS, HOTELS, RENTAL_VEHICLES, RESTAURANTS, TOURIST_GUIDES, HOSPITALS, TOURIST_PLACES, getNearbyResourcesForLocation } from './data.js';
import { MapService, getCorridorEndpoints } from './map.js';

import { renderWelcome } from './views/welcome.js';
import { renderDashboard } from './views/dashboard.js';
import { renderTouristPlaces, getDefaultCorridorStops } from './views/tourist-places.js';
import { renderHotels } from './views/hotels.js';
import { renderRentals, renderOwnerProfileModal } from './views/rentals.js';
import { renderRestaurants } from './views/restaurants.js';
import { renderGuides } from './views/guides.js';
import { renderHospitals } from './views/hospitals.js';
import { renderAuth } from './views/auth.js';
import { renderProfile } from './views/profile.js';
import { renderAdmin } from './views/admin.js';

class AppController {
  constructor() {
    this.appMount = document.getElementById('app-mount');
    this.activeModal = null;
    this.activeMapInstance = null;

    this.init();
  }

  init() {
    // Subscribe to state changes
    state.subscribe((event, payload) => {
      this.handleStateUpdate(event, payload);
    });

    // Expose routing and handlers globally
    this.bindGlobalHandlers();

    // Initial render
    this.updateAuthUI();
    this.renderCurrentView();
  }

  handleStateUpdate(event, payload) {
    if (event === "VIEW_CHANGED" || event === "LOCATION_CONFIRMED" || event === "VIEW_MODE_CHANGED" || event === "ROLE_CHANGED" || event === "ROUTE_UPDATED" || event === "AVAILABILITIES_UPDATED" || event === "ROUTE_SCANNING") {
      this.renderCurrentView();
    }
    if (event === "AUTH_CHANGED" || event === "PROFILE_UPDATED") {
      this.updateAuthUI();
      this.renderCurrentView();
    }
  }

  updateAuthUI() {
    const headerSlot = document.getElementById('header-user-slot');
    const sidebarSlot = document.getElementById('sidebar-user-slot');
    const sidebarLabel = document.getElementById('sidebar-auth-label');

    if (state.user.isLoggedIn) {
      if (headerSlot) {
        headerSlot.innerHTML = `
          <div onclick="window.toggleUserMenu(event)"
            class="flex items-center gap-2.5 p-1 sm:pr-3 rounded-full hover:bg-slate-100 cursor-pointer transition-colors border border-transparent hover:border-slate-200">
            <img src="${state.user.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80'}"
              alt="${state.user.name}" class="w-9 h-9 rounded-full object-cover border-2 border-teal-400 shadow-sm" />
            <div class="hidden lg:block text-left">
              <span class="text-xs font-bold text-slate-900 block leading-tight">${state.user.name}</span>
              <span class="text-[10px] text-teal-700 font-semibold block">${state.user.role === 'admin' ? 'Administrator' : state.user.tier}</span>
            </div>
            <span class="material-symbols-outlined text-sm text-slate-400">expand_more</span>
          </div>

          <div id="user-dropdown-menu" class="hidden absolute right-0 mt-2 w-56 bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-slate-200/80 p-2 z-50">
            <div class="px-3 py-2 border-b border-slate-100 mb-1">
              <p class="text-xs font-bold text-slate-900">${state.user.name}</p>
              <p class="text-[10px] text-slate-500 truncate">${state.user.email}</p>
            </div>
            <a href="javascript:void(0)" onclick="window.appRouter('profile'); window.closeUserMenu()" class="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-100">
              <span class="material-symbols-outlined text-base text-slate-500">person</span>
              <span>My Profile</span>
            </a>
            <a href="javascript:void(0)" onclick="window.appRouter('dashboard'); window.closeUserMenu()" class="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-100">
              <span class="material-symbols-outlined text-base text-slate-500">space_dashboard</span>
              <span>My Bookings & Vouchers</span>
            </a>
            <a href="javascript:void(0)" onclick="window.appRouter('admin'); window.closeUserMenu()" class="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-100">
              <span class="material-symbols-outlined text-base text-purple-600">admin_panel_settings</span>
              <span>Admin Console</span>
            </a>
            <div class="border-t border-slate-100 my-1"></div>
            <a href="javascript:void(0)" onclick="window.handleSignOut(); window.closeUserMenu()" class="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-bold text-red-600 hover:bg-red-50">
              <span class="material-symbols-outlined text-base text-red-500">logout</span>
              <span>Sign Out</span>
            </a>
          </div>
        `;
      }

      if (sidebarSlot) {
        sidebarSlot.innerHTML = `
          <div class="flex items-center gap-3 overflow-hidden">
            <img src="${state.user.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80'}"
              class="w-10 h-10 rounded-xl object-cover border border-teal-400" />
            <div class="overflow-hidden">
              <p class="text-xs font-bold text-slate-900 truncate">${state.user.name}</p>
              <span class="text-[10px] font-semibold text-teal-800 bg-teal-100/60 px-2 py-0.5 rounded-full inline-block mt-0.5">
                ${state.user.role === 'admin' ? 'Fleet Admin' : 'Verified Tier'}
              </span>
            </div>
          </div>
          <button onclick="window.handleSignOut()" title="Sign Out" class="text-slate-400 hover:text-red-500 p-1 rounded-lg transition-colors">
            <span class="material-symbols-outlined text-lg">logout</span>
          </button>
        `;
      }

      if (sidebarLabel) {
        sidebarLabel.textContent = "Switch Account";
      }
    } else {
      // Logged Out State
      if (headerSlot) {
        headerSlot.innerHTML = `
          <div class="flex items-center gap-2">
            <button onclick="window.appRouter('login')" class="px-3.5 py-1.5 rounded-xl text-xs font-bold text-slate-700 bg-white border border-slate-300 hover:bg-slate-50 transition-all flex items-center gap-1.5 shadow-xs">
              <span class="material-symbols-outlined text-sm">login</span>
              <span>Sign In</span>
            </button>
            <button onclick="window.appRouter('signup')" class="px-3.5 py-1.5 rounded-xl text-xs font-bold text-slate-950 bg-teal-400 hover:bg-teal-300 transition-all flex items-center gap-1.5 shadow-sm">
              <span class="material-symbols-outlined text-sm">person_add</span>
              <span>Register</span>
            </button>
          </div>
        `;
      }

      if (sidebarSlot) {
        sidebarSlot.innerHTML = `
          <div class="flex items-center gap-2.5 overflow-hidden">
            <div class="w-10 h-10 rounded-xl bg-slate-200 text-slate-600 flex items-center justify-center font-bold">
              <span class="material-symbols-outlined">person</span>
            </div>
            <div class="overflow-hidden">
              <p class="text-xs font-bold text-slate-800">Guest Explorer</p>
              <button onclick="window.appRouter('login')" class="text-[10px] font-bold text-teal-700 hover:underline">Sign In Now</button>
            </div>
          </div>
        `;
      }

      if (sidebarLabel) {
        sidebarLabel.textContent = "Sign In / Register";
      }
    }
  }

  renderCurrentView() {
    if (!this.appMount) return;

    let viewHtml = "";
    const view = state.currentView;

    switch (view) {
      case "welcome":
        viewHtml = renderWelcome();
        break;
      case "dashboard":
        viewHtml = renderDashboard();
        break;
      case "tourist-places":
        viewHtml = renderTouristPlaces();
        break;
      case "hotels":
        viewHtml = renderHotels();
        break;
      case "rentals":
        viewHtml = renderRentals();
        break;
      case "restaurants":
        viewHtml = renderRestaurants();
        break;
      case "guides":
        viewHtml = renderGuides();
        break;
      case "hospitals":
        viewHtml = renderHospitals();
        break;
      case "auth":
      case "login":
        viewHtml = renderAuth("login");
        break;
      case "signup":
        viewHtml = renderAuth("signup");
        break;
      case "profile":
        viewHtml = renderProfile();
        break;
      case "admin":
        viewHtml = renderAdmin();
        break;
      default:
        viewHtml = renderWelcome();
    }

    this.appMount.innerHTML = viewHtml;
    this.updateNavigationActiveStates();
    this.postRenderViewHooks();
  }

  updateNavigationActiveStates() {
    const current = state.currentView;
    document.querySelectorAll('[data-nav-target]').forEach(el => {
      const target = el.getAttribute('data-nav-target');
      if (target === current) {
        el.classList.add('bg-teal-50', 'text-teal-800', 'border-l-4', 'border-teal-500', 'font-bold');
        el.classList.remove('opacity-70');
      } else {
        el.classList.remove('bg-teal-50', 'text-teal-800', 'border-l-4', 'border-teal-500', 'font-bold');
        el.classList.add('opacity-70');
      }
    });

    // Update Header active location badge
    const locBadge = document.getElementById('header-active-location');
    if (locBadge) {
      locBadge.textContent = `📍 ${state.selectedLocation.name.split(',')[0]}`;
    }
  }

  postRenderViewHooks() {
    const view = state.currentView;

    // Model A: Route Map Mount
    if (view === "tourist-places") {
      const mount = document.getElementById('route-map-mount');
      if (mount) {
        const availabilities = (state.route.discoveredAvailabilities && state.route.discoveredAvailabilities.length > 0)
          ? state.route.discoveredAvailabilities
          : getDefaultCorridorStops(state.route.from, state.route.destination);
        new MapService('route-map-mount', {
          mode: 'route',
          from: state.route.from,
          destination: state.route.destination,
          distanceKm: state.route.distanceKm,
          estimatedTime: state.route.estimatedTime,
          stops: availabilities
        });
      }
    }

    // Model B: Mount Maps when in map view mode
    if (state.activeViewMode === "map") {
      let mapId = null;
      let items = [];

      if (view === "hotels") {
        mapId = "hotels-map-mount";
        items = getNearbyResourcesForLocation("Hotels & Resorts", state.selectedLocation, state.nearbyRadius);
      } else if (view === "rentals") {
        mapId = "rentals-map-mount";
        items = getNearbyResourcesForLocation("Rental Vehicles", state.selectedLocation, state.nearbyRadius);
      } else if (view === "restaurants") {
        mapId = "restaurants-map-mount";
        items = getNearbyResourcesForLocation("Restaurants", state.selectedLocation, state.nearbyRadius);
      } else if (view === "guides") {
        mapId = "guides-map-mount";
        items = getNearbyResourcesForLocation("Tourist Guides", state.selectedLocation, state.nearbyRadius);
      } else if (view === "hospitals") {
        mapId = "hospitals-map-mount";
        items = getNearbyResourcesForLocation("Hospitals", state.selectedLocation, state.nearbyRadius);
      }

      if (mapId && document.getElementById(mapId)) {
        this.activeMapInstance = new MapService(mapId, {
          mode: "radial",
          center: state.selectedLocation,
          radiusKm: state.nearbyRadius,
          items: items
        });
      }
    }
  }

  bindGlobalHandlers() {
    window.appRouter = (viewName) => {
      state.setView(viewName);
    };

    window.appBack = () => {
      state.goBack();
    };

    // Location selection triggers
    window.openLocationSelectorFor = (serviceKey) => {
      state.locationConfirmed = false;
      state.setView(serviceKey);
    };

    window.selectPresetLocation = (loc) => {
      state.setLocation(loc);
      const input = document.getElementById('location-search-input');
      if (input) input.value = loc.name;
      this.showToast(`Selected location updated to 📍 ${loc.name}`);
    };

    window.useCurrentLocationAction = () => {
      const defaultLoc = PRESET_LOCATIONS[0]; // Gandhipuram, Coimbatore
      state.setLocation(defaultLoc);
      const input = document.getElementById('location-search-input');
      if (input) input.value = defaultLoc.name;
      this.showToast("GPS Locked: 📍 Current Location detected: Gandhipuram, Coimbatore, Tamil Nadu");
    };

    window.handleLocationSearch = (query) => {
      if (!query || query.length < 2) return;
      const match = PRESET_LOCATIONS.find(l => l.name.toLowerCase().includes(query.toLowerCase()) || l.city.toLowerCase().includes(query.toLowerCase()));
      if (match) {
        state.setLocation(match);
      }
    };

    window.setRadiusAction = (radiusKm) => {
      state.setNearbyRadius(radiusKm);
      this.showToast(`Radial scan adjusted to ${radiusKm} km radius`);
    };

    window.setHospitalRadiusAction = (radiusKm) => {
      state.setNearbyRadius(radiusKm);
      this.renderCurrentView();
      this.showToast(`Hospital emergency radius: ${radiusKm} km`);
    };

    // Model B Confirmations
    window.confirmHotelsLocation = () => {
      state.confirmLocation(true);
      this.showToast(`Loading stays near 📍 ${state.selectedLocation.name}`);
    };

    window.confirmRentalsLocation = () => {
      state.confirmLocation(true);
      this.showToast(`Loading vehicles near 📍 ${state.selectedLocation.name}`);
    };

    window.confirmRestaurantsLocation = () => {
      state.confirmLocation(true);
      this.showToast(`Loading restaurants near 📍 ${state.selectedLocation.name}`);
    };

    window.confirmGuidesLocation = () => {
      state.confirmLocation(true);
      this.showToast(`Loading local guides near 📍 ${state.selectedLocation.name}`);
    };

    window.confirmHospitalsLocation = () => {
      state.confirmLocation(true);
      this.showToast(`Scanning emergency hospitals near 📍 ${state.selectedLocation.name}`);
    };

    // View mode toggles
    window.setHotelsViewMode = (mode) => state.setViewMode(mode);
    window.setRentalsViewMode = (mode) => state.setViewMode(mode);
    window.setRestaurantsViewMode = (mode) => state.setViewMode(mode);
    window.setGuidesViewMode = (mode) => state.setViewMode(mode);
    window.setHospitalsViewMode = (mode) => state.setViewMode(mode);

    // Interactive map canvas drop-pin toggle
    window.toggleInteractiveMapPicker = () => {
      const panel = document.getElementById('interactive-map-picker-panel');
      if (!panel) return;
      const isHidden = panel.classList.contains('hidden');
      if (isHidden) {
        panel.classList.remove('hidden');
        new MapService('picker-map-canvas-container', {
          mode: 'picker',
          center: state.selectedLocation,
          onLocationSelect: (newLoc) => {
            state.setLocation(newLoc);
            const input = document.getElementById('location-search-input');
            if (input) input.value = newLoc.name;
            this.showToast(`📍 Pinned Location Selected: ${newLoc.name}`);
          }
        });
      } else {
        panel.classList.add('hidden');
      }
    };

    // Model A Route Expedition Switcher
    window.selectExpeditionRoute = (routeKey) => {
      if (routeKey === 'cbe-ooty') {
        state.setRoute("Coimbatore, India", "Ooty, Tamil Nadu", 86, "2h 45m");
      } else {
        state.setRoute("Coimbatore, India", "Paris, France", 7850, "11h 45m");
      }
      this.renderCurrentView();
    };

    // Booking Handlers
    window.bookHotelRoom = (hotelId) => {
      const hotel = HOTELS.find(h => h.id === hotelId) || HOTELS[0];
      const newBooking = state.addBooking({
        serviceType: "Hotels & Resorts",
        itemTitle: `${hotel.name} - Executive Suite`,
        host: "Hotel Front Desk Concierge",
        location: hotel.locationArea,
        date: "Nov 24 - Nov 26, 2026",
        amount: `${hotel.currency}${hotel.pricePerNight * 2}`
      });
      this.showBookingSuccessModal(newBooking);
    };

    window.bookRentalVehicle = (vehId) => {
      const veh = RENTAL_VEHICLES.find(v => v.id === vehId) || RENTAL_VEHICLES[0];
      const newBooking = state.addBooking({
        serviceType: "Rental Vehicles",
        itemTitle: `${veh.name} (${veh.subType})`,
        host: `${veh.owner.name} (Verified Host)`,
        location: veh.pickupLocation,
        date: "Tomorrow, 10:00 AM (2 Days)",
        amount: `${veh.currency}${veh.pricePerDay * 2}`
      });
      this.showBookingSuccessModal(newBooking);
    };

    window.reserveRestaurantTable = (restId) => {
      const rest = RESTAURANTS.find(r => r.id === restId) || RESTAURANTS[0];
      const newBooking = state.addBooking({
        serviceType: "Restaurants",
        itemTitle: `${rest.name} (Table for 2)`,
        host: "Maitre d' Hotel",
        location: rest.area,
        date: "Tonight, 8:00 PM",
        amount: "₹0 (Confirmed Reservation)"
      });
      this.showBookingSuccessModal(newBooking);
    };

    window.bookGuideSession = (guideId) => {
      const guide = TOURIST_GUIDES.find(g => g.id === guideId) || TOURIST_GUIDES[0];
      const newBooking = state.addBooking({
        serviceType: "Tourist Guides",
        itemTitle: `Curated Heritage Tour with ${guide.name}`,
        host: guide.name,
        location: state.selectedLocation.name,
        date: "Tomorrow, 9:00 AM - 1:00 PM",
        amount: `${guide.currency}${guide.pricePerHour * 4}`
      });
      this.showBookingSuccessModal(newBooking);
    };

    window.bookTouristPlacePass = (placeId) => {
      const place = TOURIST_PLACES.find(p => p.id === placeId) || TOURIST_PLACES[0];
      const newBooking = state.addBooking({
        serviceType: "Tourist Places",
        itemTitle: `${place.name} Priority Pass`,
        host: "National Monument Authority",
        location: place.destination,
        date: "Nov 25, 2026",
        amount: `${place.currency}${place.price * 2}`
      });
      this.showBookingSuccessModal(newBooking);
    };

    // Owner Profile Modal
    window.openOwnerProfileModal = (ownerId) => {
      const modalMount = document.getElementById('modal-mount');
      if (modalMount) {
        modalMount.innerHTML = renderOwnerProfileModal('rohanK');
      }
    };

    window.closeOwnerProfileModal = () => {
      const backdrop = document.getElementById('owner-profile-modal-backdrop');
      if (backdrop) backdrop.remove();
    };

    window.contactOwnerAction = (name) => {
      alert(`Connecting terminal to ${name}'s verified comms channel... (Response time: < 5 mins)`);
    };

    // Digital Menu Modal
    window.openMenuModal = (restId) => {
      const rest = RESTAURANTS.find(r => r.id === restId) || RESTAURANTS[0];
      this.showDigitalMenuModal(rest);
    };

    // Place Details Modal
    window.openPlaceDetailsModal = (placeId) => {
      const place = TOURIST_PLACES.find(p => p.id === placeId) || TOURIST_PLACES[0];
      this.showPlaceDetailsModal(place);
    };

    // Hotel Details Modal
    window.openHotelDetailsModal = (hotelId) => {
      const hotel = HOTELS.find(h => h.id === hotelId) || HOTELS[0];
      this.showHotelDetailsModal(hotel);
    };

    // Vehicle Details Modal
    window.openVehicleDetailsModal = (vehId) => {
      const veh = RENTAL_VEHICLES.find(v => v.id === vehId) || RENTAL_VEHICLES[0];
      this.showVehicleDetailsModal(veh);
    };

    // Marker Details Modal on Map Click
    window.showMarkerDetails = (itemId, category) => {
      let item = null;
      if (category === "Hotels & Resorts") item = HOTELS.find(h => h.id === itemId);
      else if (category === "Rental Vehicles") item = RENTAL_VEHICLES.find(v => v.id === itemId);
      else if (category === "Restaurants") item = RESTAURANTS.find(r => r.id === itemId);
      else if (category === "Tourist Guides") item = TOURIST_GUIDES.find(g => g.id === itemId);
      else if (category === "Hospitals") item = HOSPITALS.find(h => h.id === itemId);

      if (item) {
        this.showToast(`Selected: ${item.name} (${item.distanceKm || '0.8'} km away)`);
      }
    };

    // Real-time Map Pin Repositioning (Drag or Click)
    window.handleMapPinReposition = (lat, lng) => {
      state.setSelectedLocation({
        ...state.selectedLocation,
        lat: Number(lat.toFixed(4)),
        lng: Number(lng.toFixed(4)),
        name: `📍 Pin (${lat.toFixed(3)}°N, ${lng.toFixed(3)}°E)`
      });
      this.showToast(`Updated search anchor: ${lat.toFixed(4)}°N, ${lng.toFixed(4)}°E`);
    };

    window.handleLocationPinDropped = (newLoc) => {
      state.setSelectedLocation(newLoc);
      this.showToast(`Selected: ${newLoc.name}`);
    };

    // Hospital Emergency SOS
    window.triggerEmergencySOSModal = () => {
      this.showEmergencySOSModal();
    };

    window.getHospitalDirections = (hospName) => {
      alert(`Initializing GPS navigation route to ${hospName} via Avinashi Road corridor. Est. travel time: 6 mins.`);
    };

    // View Pass Modal
    window.viewPassModal = (bookingId) => {
      const b = state.bookings.find(bk => bk.id === bookingId) || state.bookings[0];
      this.showBookingSuccessModal(b);
    };

    // User Menu & Auth Submissions
    window.toggleUserMenu = (event) => {
      if (event) event.stopPropagation();
      const menu = document.getElementById('user-dropdown-menu');
      if (menu) menu.classList.toggle('hidden');
    };

    window.closeUserMenu = () => {
      const menu = document.getElementById('user-dropdown-menu');
      if (menu) menu.classList.add('hidden');
    };

    document.addEventListener('click', (e) => {
      const menu = document.getElementById('user-dropdown-menu');
      if (menu && !menu.contains(e.target) && !e.target.closest('#header-user-slot')) {
        menu.classList.add('hidden');
      }
    });

    window.handleSignOut = () => {
      state.logout();
      this.showToast("Signed out successfully. Guest mode active.");
      if (state.currentView === "profile" || state.currentView === "dashboard" || state.currentView === "admin") {
        state.setView("welcome");
      }
    };

    window.quickDemoLogin = (role) => {
      const isAdm = role === 'admin';
      state.login({
        name: isAdm ? 'Fleet Administrator' : 'Explorer Elite',
        email: isAdm ? 'admin@easyexplorer.internal' : 'djshiva257@gmail.com',
        role: isAdm ? 'admin' : 'user',
        tier: isAdm ? 'Fleet Administrator' : 'Premium Tier'
      });
      this.showToast(`Signed in successfully as ${isAdm ? 'Fleet Administrator (Admin)' : 'Explorer Elite'}`);
      state.setView("welcome");
    };

    window.handleAuthSubmit = (mode) => {
      const nameInput = document.getElementById('auth-name');
      const emailInput = document.getElementById('auth-email');
      const name = nameInput ? nameInput.value : state.user.name;
      const email = emailInput ? emailInput.value : state.user.email;

      state.login({ name, email });
      this.showToast(`Welcome ${name}! Authenticated successfully`);
      state.setView("welcome");
    };

    // Real-Time Route Discovery Operations (Model A)
    window.triggerRouteSearch = () => {
      const from = document.getElementById('route-from-input')?.value || state.route.from;
      const dest = document.getElementById('route-dest-input')?.value || state.route.destination;
      window.searchRouteAvailabilities(from, dest);
    };

    window.swapRoutePoints = () => {
      const fromInput = document.getElementById('route-from-input');
      const destInput = document.getElementById('route-dest-input');
      if (fromInput && destInput) {
        const tmp = fromInput.value;
        fromInput.value = destInput.value;
        destInput.value = tmp;
        window.searchRouteAvailabilities(fromInput.value, destInput.value);
      }
    };

    window.applyRoutePreset = (from, dest) => {
      const fromInput = document.getElementById('route-from-input');
      const destInput = document.getElementById('route-dest-input');
      if (fromInput) fromInput.value = from;
      if (destInput) destInput.value = dest;
      window.searchRouteAvailabilities(from, dest);
    };

    window.setRouteModel = (model) => {
      state.route.model = model;
      this.showToast(`Discovery Engine switched to: ${model === 'gemini-pro' ? 'Gemini AI Scout' : model === 'osm-live' ? 'OpenStreetMap Live' : 'Smart Pathfinder'}`);
      window.triggerRouteSearch();
    };

    window.setRouteCategoryFilter = (category) => {
      state.route.categoryFilter = category;
      this.renderCurrentView();
    };

    window.useCurrentLocationForOrigin = () => {
      const fromInput = document.getElementById('route-from-input');
      if (fromInput) {
        fromInput.value = state.selectedLocation.name || "Coimbatore, Tamil Nadu";
        this.showToast(`Origin set to your current location: ${fromInput.value}`);
      }
    };

    window.scrollToStopCard = (stopId) => {
      const card = document.getElementById(`stop-card-${stopId}`);
      if (card) {
        card.scrollIntoView({ behavior: 'smooth', block: 'center' });
        card.classList.add('ring-4', 'ring-teal-400');
        setTimeout(() => card.classList.remove('ring-4', 'ring-teal-400'), 2000);
      }
    };

    window.searchRouteAvailabilities = (fromVal, destVal, modelVal) => {
      const from = fromVal || document.getElementById('route-from-input')?.value || state.route.from;
      const dest = destVal || document.getElementById('route-dest-input')?.value || state.route.destination;
      const model = modelVal || state.route.model || 'gemini-pro';

      state.setRouteScanning(true);
      state.setRoute(from, dest);
      this.renderCurrentView();

      setTimeout(() => {
        const endpoints = getCorridorEndpoints(from, dest);
        state.route.startCoords = endpoints.start;
        state.route.destCoords = endpoints.end;

        const dLower = dest.toLowerCase();
        const fLower = from.toLowerCase();

        let distanceKm = 86;
        let estimatedTime = "2h 45m";

        if ((fLower.includes('coimbatore') || fLower.includes('cbe')) && dLower.includes('krishnagiri')) {
          distanceKm = 260;
          estimatedTime = "4h 45m";
        } else if ((fLower.includes('coimbatore') || fLower.includes('cbe')) && dLower.includes('ooty')) {
          distanceKm = 86;
          estimatedTime = "2h 45m";
        } else if (fLower.includes('chennai') && dLower.includes('bangalore')) {
          distanceKm = 345;
          estimatedTime = "6h 15m";
        } else if (fLower.includes('bangalore') && (dLower.includes('mysore') || dLower.includes('mysuru'))) {
          distanceKm = 145;
          estimatedTime = "2h 30m";
        } else if (fLower.includes('coimbatore') && dLower.includes('munnar')) {
          distanceKm = 158;
          estimatedTime = "4h 15m";
        } else if (fLower.includes('delhi') && dLower.includes('agra')) {
          distanceKm = 230;
          estimatedTime = "3h 30m";
        } else if (fLower.includes('paris') && dLower.includes('nice')) {
          distanceKm = 930;
          estimatedTime = "9h 15m";
        } else {
          // Accurate distance from true GPS endpoints
          const sLat = endpoints.start.lat;
          const sLng = endpoints.start.lng;
          const dLat = endpoints.end.lat;
          const dLng = endpoints.end.lng;
          const dLatRad = (dLat - sLat) * Math.PI / 180;
          const dLngRad = (dLng - sLng) * Math.PI / 180;
          const a = Math.sin(dLatRad / 2) * Math.sin(dLatRad / 2) +
            Math.cos(sLat * Math.PI / 180) * Math.cos(dLat * Math.PI / 180) *
            Math.sin(dLngRad / 2) * Math.sin(dLngRad / 2);
          const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
          distanceKm = Math.max(25, Math.round(6371 * c * 1.24));
          const speed = distanceKm > 150 ? 58 : 42;
          const totalMinutes = Math.round((distanceKm / speed) * 60);
          const hours = Math.floor(totalMinutes / 60);
          const mins = totalMinutes % 60;
          estimatedTime = `${hours}h ${mins}m`;
        }

        // Generate verified stops for this exact corridor
        const stops = getDefaultCorridorStops(from, dest);

        state.route.distanceKm = distanceKm;
        state.route.estimatedTime = estimatedTime;
        state.route.model = model;
        state.setDiscoveredAvailabilities(stops);
        state.setRouteScanning(false);

        const engineLabel = model === 'gemini-pro' ? 'Gemini AI Scout' : model === 'osm-live' ? 'OSM Live Scanner' : 'Smart Pathfinder';
        this.showToast(`✨ ${engineLabel} discovered ${stops.length} verified stops between ${from.split(',')[0]} and ${dest.split(',')[0]}!`);
      }, 850);
    };

    window.handleProfileSave = () => {
      const name = document.getElementById('prof-name')?.value || state.user.name;
      const email = document.getElementById('prof-email')?.value || state.user.email;
      const phone = document.getElementById('prof-phone')?.value || state.user.phone;
      const emergency = document.getElementById('prof-emergency')?.value || state.user.emergencyContact;

      state.updateProfile({ name, email, phone, emergencyContact: emergency });
      this.showToast("Profile credentials & discovery preferences updated");
      state.setView("dashboard");
    };

    window.toggleUserRoleAction = () => {
      state.toggleRole();
      if (state.user.role === "admin") {
        this.showToast("Root access granted: Admin mode active");
        state.setView("admin");
      } else {
        this.showToast("Switched to Standard Explorer Mode");
        state.setView("dashboard");
      }
    };
  }

  showToast(message) {
    const toastMount = document.getElementById('toast-mount');
    if (!toastMount) return;

    const toast = document.createElement('div');
    toast.className = "bg-slate-900/95 text-white border border-teal-400/40 px-4 py-3 rounded-xl shadow-2xl text-xs font-semibold flex items-center gap-2.5 backdrop-blur-md animate-in slide-in-from-bottom duration-300";
    toast.innerHTML = `
      <span class="w-2 h-2 rounded-full bg-teal-400 animate-ping"></span>
      <span>${message}</span>
    `;

    toastMount.appendChild(toast);
    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px)';
      toast.style.transition = 'all 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, 3500);
  }

  showBookingSuccessModal(booking) {
    const modalMount = document.getElementById('modal-mount');
    if (!modalMount) return;

    modalMount.innerHTML = `
      <div id="booking-modal-backdrop" class="fixed inset-0 z-50 bg-slate-950/75 backdrop-blur-md flex items-center justify-center p-4">
        <div class="glass-card max-w-md w-full p-8 border border-white/80 shadow-2xl rounded-3xl text-center relative animate-in zoom-in-95 duration-200">
          <div class="w-16 h-16 rounded-2xl bg-teal-500 text-slate-950 mx-auto flex items-center justify-center mb-4 shadow-xl border-2 border-white">
            <span class="material-symbols-outlined text-3xl font-bold">check_circle</span>
          </div>

          <span class="text-[10px] font-bold uppercase tracking-widest text-teal-700 bg-teal-50 px-2.5 py-1 rounded-full border border-teal-200">
            CONFIRMED BOOKING PASS
          </span>
          <h2 class="text-xl font-extrabold text-slate-900 mt-2">${booking.itemTitle}</h2>
          <p class="text-xs text-slate-500 mt-1">Host: ${booking.host} • 📍 ${booking.location}</p>

          <!-- QR Code Voucher Card -->
          <div class="p-4 my-6 bg-slate-50 rounded-2xl border border-slate-200 flex flex-col items-center">
            <div class="w-32 h-32 bg-white p-2 rounded-xl border border-slate-200 shadow-inner flex items-center justify-center">
              <span class="material-symbols-outlined text-8xl text-slate-900">qr_code_2</span>
            </div>
            <p class="font-mono text-xs font-bold text-slate-700 mt-2.5">${booking.id} • TOKEN ACTIVE</p>
            <p class="text-[10px] text-slate-400 mt-0.5">Show this digital QR voucher on arrival</p>
          </div>

          <div class="flex items-center gap-3">
            <button onclick="document.getElementById('booking-modal-backdrop').remove()" class="flex-1 py-3 rounded-xl border border-slate-300 hover:bg-slate-50 text-xs font-bold text-slate-700 transition-colors">
              Close
            </button>
            <button onclick="document.getElementById('booking-modal-backdrop').remove(); window.appRouter('dashboard')" class="flex-1 py-3 rounded-xl bg-slate-900 text-white hover:bg-slate-800 text-xs font-bold shadow-md transition-all">
              Go to Dashboard
            </button>
          </div>
        </div>
      </div>
    `;
  }

  showEmergencySOSModal() {
    const modalMount = document.getElementById('modal-mount');
    if (!modalMount) return;

    modalMount.innerHTML = `
      <div id="sos-modal-backdrop" class="fixed inset-0 z-50 bg-red-950/80 backdrop-blur-md flex items-center justify-center p-4">
        <div class="glass-card max-w-lg w-full p-8 border-2 border-red-500 shadow-2xl rounded-3xl text-center relative animate-in zoom-in-95 duration-200">
          <div class="w-16 h-16 rounded-2xl bg-red-600 text-white mx-auto flex items-center justify-center mb-4 shadow-xl border-2 border-white animate-pulse">
            <span class="material-symbols-outlined text-4xl">emergency</span>
          </div>

          <span class="text-[10px] font-bold uppercase tracking-widest text-red-700 bg-red-50 px-2.5 py-1 rounded-full border border-red-200">
            EMERGENCY SOS DISPATCH TRIGGERED
          </span>
          <h2 class="text-2xl font-extrabold text-slate-900 mt-2">Connecting to KMCH & 108 Dispatch</h2>
          <p class="text-xs text-slate-600 mt-1 max-w-sm mx-auto">
            Broadcasting your GPS coordinates: <strong>11.0168° N, 76.9558° E (Gandhipuram, Coimbatore)</strong> to nearest rapid emergency ambulances.
          </p>

          <div class="my-6 p-4 bg-red-50 border border-red-200 rounded-2xl text-left space-y-2 text-xs">
            <div class="flex items-center justify-between font-bold text-red-900">
              <span>Ambulance Standby Unit #04</span>
              <span>En Route (ETA: 6 mins)</span>
            </div>
            <p class="text-red-700">Paramedic triage team alerted with oxygen, telemetry & trauma splints.</p>
          </div>

          <div class="flex items-center gap-3">
            <button onclick="document.getElementById('sos-modal-backdrop').remove()" class="flex-1 py-3 rounded-xl border border-slate-300 bg-white text-xs font-bold text-slate-700">
              Cancel Dispatch
            </button>
            <a href="tel:108" class="flex-1 py-3 rounded-xl bg-red-600 text-white text-xs font-bold flex items-center justify-center gap-1 shadow-lg hover:bg-red-500">
              <span class="material-symbols-outlined text-sm">call</span>
              <span>Direct Hotline (108)</span>
            </a>
          </div>
        </div>
      </div>
    `;
  }

  showDigitalMenuModal(rest) {
    const modalMount = document.getElementById('modal-mount');
    if (!modalMount) return;

    modalMount.innerHTML = `
      <div id="menu-modal-backdrop" class="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
        <div class="glass-card max-w-2xl w-full p-8 border border-white/80 shadow-2xl rounded-3xl relative my-8">
          <button onclick="document.getElementById('menu-modal-backdrop').remove()" class="absolute top-5 right-5 w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-700 text-sm font-bold">
            ✕
          </button>

          <div class="flex items-center gap-3 pb-4 border-b border-slate-200">
            <div class="w-12 h-12 rounded-xl bg-amber-400 text-slate-950 flex items-center justify-center font-bold">
              <span class="material-symbols-outlined text-2xl">restaurant_menu</span>
            </div>
            <div>
              <h2 class="text-xl font-bold text-slate-900">${rest.name}</h2>
              <p class="text-xs text-slate-500">${rest.cuisine} • ${rest.area}</p>
            </div>
          </div>

          <div class="my-6 space-y-6 max-h-[420px] overflow-y-auto pr-2">
            ${rest.menu.map(cat => `
              <div>
                <h3 class="text-xs font-extrabold uppercase tracking-wider text-slate-400 mb-3">${cat.category}</h3>
                <div class="space-y-2.5">
                  ${cat.items.map(item => `
                    <div class="p-3 rounded-xl bg-white border border-slate-200 flex items-center justify-between">
                      <div>
                        <h4 class="text-xs font-bold text-slate-900">${item.name}</h4>
                        <p class="text-[11px] text-slate-500 mt-0.5">${item.desc}</p>
                      </div>
                      <span class="text-xs font-extrabold text-amber-700">₹${item.price}</span>
                    </div>
                  `).join('')}
                </div>
              </div>
            `).join('')}
          </div>

          <button onclick="document.getElementById('menu-modal-backdrop').remove(); window.reserveRestaurantTable('${rest.id}')" class="w-full bg-slate-900 text-white font-bold text-xs py-3 rounded-xl hover:bg-slate-800">
            Proceed to Table Reservation
          </button>
        </div>
      </div>
    `;
  }

  showPlaceDetailsModal(place) {
    const modalMount = document.getElementById('modal-mount');
    if (!modalMount) return;

    modalMount.innerHTML = `
      <div id="place-modal-backdrop" class="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
        <div class="glass-card max-w-2xl w-full p-8 border border-white/80 shadow-2xl rounded-3xl relative my-8">
          <button onclick="document.getElementById('place-modal-backdrop').remove()" class="absolute top-5 right-5 w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-700 text-sm font-bold">
            ✕
          </button>

          <img src="${place.image}" class="w-full h-56 rounded-2xl object-cover mb-4" />
          <h2 class="text-2xl font-bold text-slate-900">${place.name}</h2>
          <p class="text-xs text-slate-500 mb-4">${place.address} • Opening: ${place.openingHours}</p>
          <p class="text-xs text-slate-700 leading-relaxed mb-4">${place.description}</p>
          
          <button onclick="document.getElementById('place-modal-backdrop').remove(); window.bookTouristPlacePass('${place.id}')" class="w-full bg-teal-500 text-slate-950 font-bold text-xs py-3 rounded-xl hover:bg-teal-400">
            Book Priority Pass (${place.currency}${place.price})
          </button>
        </div>
      </div>
    `;
  }

  showHotelDetailsModal(hotel) {
    const modalMount = document.getElementById('modal-mount');
    if (!modalMount) return;

    modalMount.innerHTML = `
      <div id="hotel-modal-backdrop" class="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
        <div class="glass-card max-w-2xl w-full p-8 border border-white/80 shadow-2xl rounded-3xl relative my-8">
          <button onclick="document.getElementById('hotel-modal-backdrop').remove()" class="absolute top-5 right-5 w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-700 text-sm font-bold">
            ✕
          </button>

          <img src="${hotel.image}" class="w-full h-56 rounded-2xl object-cover mb-4" />
          <h2 class="text-2xl font-bold text-slate-900">${hotel.name}</h2>
          <p class="text-xs text-slate-500 mb-2">${hotel.propertyType} • ${hotel.locationArea}, ${hotel.city}</p>
          <p class="text-xs text-slate-700 leading-relaxed mb-4">${hotel.description}</p>
          
          <h3 class="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Available Suites</h3>
          <div class="space-y-2 mb-6">
            ${hotel.rooms.map(r => `
              <div class="p-3 rounded-xl bg-white border border-slate-200 flex items-center justify-between">
                <div>
                  <p class="text-xs font-bold text-slate-900">${r.name}</p>
                  <p class="text-[11px] text-slate-500">${r.bed} • ${r.size} • ${r.view}</p>
                </div>
                <div class="text-right">
                  <span class="text-xs font-extrabold text-teal-700">${hotel.currency}${r.price}/night</span>
                </div>
              </div>
            `).join('')}
          </div>

          <button onclick="document.getElementById('hotel-modal-backdrop').remove(); window.bookHotelRoom('${hotel.id}')" class="w-full bg-teal-500 text-slate-950 font-bold text-xs py-3 rounded-xl hover:bg-teal-400">
            Confirm Room Reservation
          </button>
        </div>
      </div>
    `;
  }

  showVehicleDetailsModal(veh) {
    const modalMount = document.getElementById('modal-mount');
    if (!modalMount) return;

    modalMount.innerHTML = `
      <div id="veh-modal-backdrop" class="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
        <div class="glass-card max-w-2xl w-full p-8 border border-white/80 shadow-2xl rounded-3xl relative my-8">
          <button onclick="document.getElementById('veh-modal-backdrop').remove()" class="absolute top-5 right-5 w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-700 text-sm font-bold">
            ✕
          </button>

          <img src="${veh.image}" class="w-full h-56 rounded-2xl object-cover mb-4" />
          <h2 class="text-2xl font-bold text-slate-900">${veh.name}</h2>
          <p class="text-xs text-slate-500 mb-2">${veh.category} • ${veh.subType} (${veh.modelYear})</p>
          
          <div class="grid grid-cols-2 gap-3 my-4 p-4 bg-slate-50 rounded-2xl border border-slate-200 text-xs">
            <div><strong>Fuel/Powertrain:</strong> ${veh.fuel}</div>
            <div><strong>Transmission:</strong> ${veh.transmission}</div>
            <div><strong>Seating Capacity:</strong> ${veh.seats} Passengers</div>
            <div><strong>Included Mileage:</strong> ${veh.mileage}</div>
            <div class="col-span-2"><strong>Pickup Station:</strong> ${veh.pickupLocation}</div>
          </div>

          <div class="flex items-center justify-between p-3 rounded-xl bg-white border border-slate-200 mb-6">
            <div class="flex items-center gap-3">
              <img src="${veh.owner.avatar}" class="w-9 h-9 rounded-full object-cover" />
              <div>
                <p class="text-xs font-bold text-slate-900">${veh.owner.name} (Verified Owner)</p>
                <p class="text-[10px] text-slate-500">Fleet Host • ${veh.owner.rating} ★ Rating</p>
              </div>
            </div>
            <button onclick="document.getElementById('veh-modal-backdrop').remove(); window.openOwnerProfileModal()" class="text-xs font-bold text-teal-700 hover:underline">
              View Profile
            </button>
          </div>

          <button onclick="document.getElementById('veh-modal-backdrop').remove(); window.bookRentalVehicle('${veh.id}')" class="w-full bg-teal-500 text-slate-950 font-bold text-xs py-3 rounded-xl hover:bg-teal-400">
            Book This Vehicle (${veh.currency}${veh.pricePerDay}/day)
          </button>
        </div>
      </div>
    `;
  }
}

// Instantiate on DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
  window.easyExplorerApp = new AppController();
});
