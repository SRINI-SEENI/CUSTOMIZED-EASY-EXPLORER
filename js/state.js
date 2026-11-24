// Central Application State Manager
// Supports reactive updates across all views

import { PRESET_LOCATIONS, APP_CONFIG } from './data.js';

class AppState {
  constructor() {
    this.listeners = [];

    // Current authenticated user
    this.user = {
      isLoggedIn: true,
      id: "usr-explorer-01",
      name: "Explorer Elite",
      email: "djshiva257@gmail.com",
      tier: "Premium Tier",
      role: "user", // "user" | "admin"
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
      phone: "+91 98765 43210",
      nationality: "India",
      emergencyContact: "+91 98765 00000",
      preferences: {
        travelStyle: "Luxury & Spatial Comfort",
        dietary: "Vegetarian Friendly",
        pace: "Curated & Relaxed",
        currency: "INR (₹)"
      }
    };

    // Active screen navigation
    this.currentView = "welcome"; // 'welcome' | 'dashboard' | 'auth' | 'profile' | 'tourist-places' | 'hotels' | 'rentals' | 'restaurants' | 'guides' | 'hospitals' | 'admin'
    this.viewHistory = [];

    // Global Location State (Model B: Location-Based Nearby Discovery)
    this.selectedCountry = "India";
    this.selectedLocation = { ...PRESET_LOCATIONS[0] }; // Default: Gandhipuram, Coimbatore
    this.locationConfirmed = false;
    this.nearbyRadius = 5; // Default 5 km
    this.activeViewMode = "map"; // Default to 'map' so interactive Google/Rapido map is visible immediately!

    // Model A: Route-Based Discovery State (Tourist Places ONLY)
    this.route = {
      country: "India",
      from: "Coimbatore, India",
      fromCoords: { lat: 11.0168, lng: 76.9558 },
      destination: "Ooty, Tamil Nadu",
      destinationCoords: { lat: 11.4102, lng: 76.6950 },
      distanceKm: 86,
      estimatedTime: "2h 45m",
      confirmed: true,
      model: "gemini-pro",
      categoryFilter: "all",
      isScanning: false,
      discoveredAvailabilities: []
    };

    // Specific Service Search Filters
    this.filters = {
      hotels: {
        checkIn: this.getRelativeDate(1),
        checkOut: this.getRelativeDate(3),
        guests: 2,
        rooms: 1,
        propertyType: "all",
        freeCancellationOnly: false,
        priceMax: 15000
      },
      rentals: {
        pickupDate: this.getRelativeDate(1),
        pickupTime: "10:00",
        returnDate: this.getRelativeDate(2),
        returnTime: "18:00",
        vehicleType: "all", // "all" | "Bikes" | "Cars" | "SUVs" | "Luxury"
        passengers: 4
      },
      restaurants: {
        date: this.getRelativeDate(0),
        time: "19:30",
        guests: 2,
        cuisine: "all",
        vegOnly: false
      },
      guides: {
        date: this.getRelativeDate(1),
        duration: "Full Day (8 hrs)",
        language: "all",
        specialization: "all"
      },
      hospitals: {
        emergencyOnly: true,
        ambulanceRequired: false,
        pharmacy247: false,
        radiusKm: 5
      }
    };

    // User Bookings & Orders
    this.bookings = [
      {
        id: "BK-89021",
        serviceType: "Rental Vehicles",
        itemTitle: "Aura Sedan Pro (Electric)",
        host: "Rohan K. (Verified)",
        location: "Gandhipuram, Coimbatore",
        date: "Tomorrow, 10:00 AM",
        amount: "₹3,400",
        status: "CONFIRMED",
        qrCode: "EASY-EXP-89021-AUTH"
      },
      {
        id: "BK-76120",
        serviceType: "Hotels & Resorts",
        itemTitle: "The Residency Towers - Executive Suite",
        host: "Residency Hospitality",
        location: "Gandhipuram, Coimbatore",
        date: "Nov 22 - Nov 24, 2026",
        amount: "₹11,600",
        status: "CONFIRMED",
        qrCode: "EASY-EXP-76120-AUTH"
      }
    ];

    // Notifications
    this.notifications = [
      { id: "n1", text: "Welcome to Customized Easy Explorer: Coimbatore Hub Connected", time: "Just now", read: false },
      { id: "n2", text: "Rohan K. confirmed your Aura Sedan Pro pickup", time: "1 hour ago", read: false }
    ];
  }

  getRelativeDate(daysOffset) {
    const d = new Date();
    d.setDate(d.getDate() + daysOffset);
    return d.toISOString().split('T')[0];
  }

  subscribe(listener) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  notify(event, payload) {
    this.listeners.forEach(fn => fn(event, payload, this));
  }

  setView(viewName) {
    if (this.currentView !== viewName) {
      this.viewHistory.push(this.currentView);
      this.currentView = viewName;
      this.notify("VIEW_CHANGED", viewName);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  goBack() {
    if (this.viewHistory.length > 0) {
      const prev = this.viewHistory.pop();
      this.currentView = prev;
      this.notify("VIEW_CHANGED", prev);
    } else {
      this.setView("welcome");
    }
  }

  setLocation(locObj, autoConfirm = false) {
    this.selectedLocation = {
      ...this.selectedLocation,
      ...locObj
    };
    if (autoConfirm) {
      this.locationConfirmed = true;
    }
    this.notify("LOCATION_UPDATED", this.selectedLocation);
  }

  confirmLocation(confirmed = true) {
    this.locationConfirmed = confirmed;
    this.notify("LOCATION_CONFIRMED", this.selectedLocation);
  }

  setNearbyRadius(radiusKm) {
    this.nearbyRadius = radiusKm;
    this.selectedLocation.radius = radiusKm;
    this.notify("RADIUS_CHANGED", radiusKm);
  }

  setViewMode(mode) {
    this.activeViewMode = mode;
    this.notify("VIEW_MODE_CHANGED", mode);
  }

  setCountry(countryName) {
    this.selectedCountry = countryName;
    this.notify("COUNTRY_CHANGED", countryName);
  }

  setRoute(from, dest, distanceKm, time) {
    this.route.from = from;
    this.route.destination = dest;
    if (distanceKm) this.route.distanceKm = distanceKm;
    if (time) this.route.estimatedTime = time;
    this.route.confirmed = true;
    this.notify("ROUTE_UPDATED", this.route);
  }

  setRouteScanning(isScanning) {
    this.route.isScanning = isScanning;
    this.notify("ROUTE_SCANNING", isScanning);
  }

  setDiscoveredAvailabilities(availabilities) {
    this.route.discoveredAvailabilities = availabilities;
    this.notify("AVAILABILITIES_UPDATED", availabilities);
  }

  login(userData = {}) {
    this.user = {
      ...this.user,
      isLoggedIn: true,
      ...userData
    };
    this.notify("AUTH_CHANGED", this.user);
  }

  logout() {
    this.user.isLoggedIn = false;
    this.notify("AUTH_CHANGED", this.user);
  }

  addBooking(booking) {
    const newBooking = {
      id: `BK-${Math.floor(10000 + Math.random() * 90000)}`,
      status: "CONFIRMED",
      createdAt: new Date().toISOString(),
      qrCode: `EASY-EXP-${Math.floor(10000 + Math.random() * 90000)}`,
      ...booking
    };
    this.bookings.unshift(newBooking);
    this.notifications.unshift({
      id: `n-${Date.now()}`,
      text: `Booking Confirmed: ${newBooking.itemTitle} (${newBooking.id})`,
      time: "Just now",
      read: false
    });
    this.notify("BOOKING_ADDED", newBooking);
    return newBooking;
  }

  updateProfile(profileData) {
    this.user = {
      ...this.user,
      ...profileData,
      preferences: {
        ...this.user.preferences,
        ...(profileData.preferences || {})
      }
    };
    this.notify("PROFILE_UPDATED", this.user);
  }

  toggleRole() {
    this.user.role = this.user.role === "admin" ? "user" : "admin";
    this.notify("ROLE_CHANGED", this.user.role);
  }
}

export const state = new AppState();
