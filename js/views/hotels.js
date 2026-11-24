// View: Hotels & Resorts (MODEL B — LOCATION-BASED NEARBY DISCOVERY)
// Replaces route with location-based nearby stays

import { state } from '../state.js';
import { HOTELS, getNearbyResourcesForLocation } from '../data.js';
import { renderLocationSelectionScreen } from './location-discovery.js';

export function renderHotels(subview = "results") {
  // If location is not confirmed yet, show dedicated location-selection screen
  if (!state.locationConfirmed && subview !== "results") {
    return renderLocationSelectionScreen({
      serviceKey: "hotels",
      heading: "Where do you want to stay?",
      subheading: "Select a location to discover premium hotels and resorts nearby.",
      actionButtonText: "Find Stays Near This Location",
      onConfirmCallbackName: "confirmHotelsLocation"
    });
  }

  const currentLoc = state.selectedLocation;
  const isMapView = state.activeViewMode === "map";
  const localHotels = getNearbyResourcesForLocation('Hotels & Resorts', currentLoc, state.nearbyRadius);

  return `
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      
      <!-- Top Navigation & Model Badge -->
      <div class="flex items-center justify-between mb-6">
        <button onclick="window.appRouter('welcome')" class="flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-900 transition-colors">
          <span class="material-symbols-outlined text-sm">arrow_back</span>
          <span>Back to Home</span>
        </button>
        <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-50 text-teal-800 text-[11px] font-bold border border-teal-200">
          <span class="w-2 h-2 rounded-full bg-teal-500 animate-pulse"></span>
          MODEL B • LOCATION-BASED DISCOVERY
        </span>
      </div>

      <!-- Context Bar: Showing options near [Selected Location] -->
      <section class="glass-card p-5 border border-white/80 shadow-lg mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div class="flex items-center gap-3.5">
          <div class="w-11 h-11 rounded-xl bg-slate-900 text-teal-300 flex items-center justify-center flex-shrink-0">
            <span class="material-symbols-outlined text-2xl">hotel</span>
          </div>
          <div>
            <span class="text-[10px] font-bold uppercase tracking-wider text-teal-700 bg-teal-50 px-2 py-0.5 rounded border border-teal-200">
              Active Radial Search
            </span>
            <h1 class="text-xl sm:text-2xl font-extrabold text-slate-900 mt-0.5">
              Stays near ${currentLoc.name}
            </h1>
            <p class="text-xs text-slate-500">
              Showing vetted hotels & resorts within ${state.nearbyRadius} km radius
            </p>
          </div>
        </div>

        <div class="flex items-center gap-2 self-start md:self-auto">
          <!-- Change Location Button -->
          <button onclick="window.openLocationSelectorFor('hotels')" class="px-3.5 py-2 text-xs font-bold rounded-lg border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 transition-all flex items-center gap-1 shadow-sm">
            <span class="material-symbols-outlined text-sm">edit_location</span>
            <span>Change Location</span>
          </button>

          <!-- Map / List Toggle -->
          <div class="bg-slate-100 p-1 rounded-lg flex items-center border border-slate-200">
            <button onclick="window.setHotelsViewMode('list')" class="px-3 py-1.5 text-xs font-bold rounded-md transition-all ${!isMapView ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-900'} flex items-center gap-1">
              <span class="material-symbols-outlined text-sm">view_list</span>
              <span>List View</span>
            </button>
            <button onclick="window.setHotelsViewMode('map')" class="px-3 py-1.5 text-xs font-bold rounded-md transition-all ${isMapView ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-900'} flex items-center gap-1">
              <span class="material-symbols-outlined text-sm">map</span>
              <span>Map View</span>
            </button>
          </div>
        </div>
      </section>

      <!-- Stay Booking Parameters Bar (Dates, Guests, Rooms) -->
      <section class="glass-panel rounded-2xl p-4 sm:p-5 border border-white/80 shadow-md mb-8">
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4 items-end">
          <div>
            <label class="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">Check-In Date</label>
            <input type="date" value="${state.filters.hotels.checkIn}" class="w-full bg-white border border-slate-200 rounded-lg py-2 px-3 text-xs font-medium text-slate-800" />
          </div>
          <div>
            <label class="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">Check-Out Date</label>
            <input type="date" value="${state.filters.hotels.checkOut}" class="w-full bg-white border border-slate-200 rounded-lg py-2 px-3 text-xs font-medium text-slate-800" />
          </div>
          <div>
            <label class="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">Guests & Rooms</label>
            <select class="w-full bg-white border border-slate-200 rounded-lg py-2 px-3 text-xs font-medium text-slate-800">
              <option>2 Guests • 1 Room</option>
              <option>1 Guest • 1 Room</option>
              <option>4 Guests • 2 Rooms (Family)</option>
              <option>2 Guests • Luxury Suite (Couple)</option>
            </select>
          </div>
          <button class="w-full bg-slate-900 text-white font-bold text-xs py-2.5 rounded-lg hover:bg-slate-800 transition-colors flex items-center justify-center gap-1.5 shadow-sm">
            <span class="material-symbols-outlined text-sm">tune</span>
            <span>Update Search</span>
          </button>
        </div>
      </section>

      <!-- Main Display: Map View or List View -->
      ${isMapView ? `
        <!-- Map View Container -->
        <div class="mb-8">
          <div id="hotels-map-mount" class="w-full rounded-2xl overflow-hidden shadow-2xl border border-slate-200" style="height: 540px; min-height: 480px; width: 100%;"></div>
        </div>
      ` : ''}

      <!-- Results List Cards -->
      <section class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        ${localHotels.map(hotel => `
          <div class="glass-panel glass-panel-hover rounded-2xl overflow-hidden border border-white/80 shadow-lg flex flex-col justify-between group">
            <div>
              <div class="relative h-52 w-full overflow-hidden">
                <img src="${hotel.image}" alt="${hotel.name}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div class="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent"></div>
                
                <span class="absolute top-3 left-3 bg-slate-900/80 text-white text-[11px] font-bold px-2.5 py-1 rounded-full backdrop-blur-md border border-white/20">
                  ${hotel.propertyType}
                </span>

                ${hotel.freeCancellation ? `
                  <span class="absolute top-3 right-3 bg-teal-400 text-slate-950 text-[10px] font-bold px-2 py-0.5 rounded-full shadow-md">
                    Free Cancellation
                  </span>
                ` : ''}

                <div class="absolute bottom-3 left-4 right-4 flex items-center justify-between">
                  <div class="flex items-center gap-1 text-white text-xs font-semibold">
                    <span class="material-symbols-outlined text-sm text-cyan-300">near_me</span>
                    <span>${hotel.distanceKm} km from ${currentLoc.name.split(',')[0]}</span>
                  </div>
                  <span class="bg-amber-400 text-slate-950 text-xs font-bold px-2 py-0.5 rounded flex items-center gap-0.5">
                    <span class="material-symbols-outlined text-xs">star</span>
                    <span>${hotel.rating}</span>
                  </span>
                </div>
              </div>

              <div class="p-5">
                <h3 class="text-lg font-bold text-slate-900 mb-1">${hotel.name}</h3>
                <p class="text-xs text-slate-500 mb-3">${hotel.locationArea}, ${hotel.city}</p>
                
                <div class="flex flex-wrap gap-1.5 mb-4">
                  ${hotel.amenities.slice(0, 3).map(a => `
                    <span class="text-[10px] font-semibold bg-slate-100 text-slate-700 px-2 py-0.5 rounded border border-slate-200">
                      ✓ ${a}
                    </span>
                  `).join('')}
                </div>
              </div>
            </div>

            <div class="p-5 pt-0 border-t border-slate-100 flex items-center justify-between mt-auto">
              <div>
                <span class="text-[10px] uppercase font-bold text-slate-400">Nightly Rate</span>
                <p class="text-lg font-bold text-slate-900">${hotel.currency}${hotel.pricePerNight} <span class="text-xs text-slate-500 font-normal">/ night</span></p>
              </div>
              <div class="flex items-center gap-2">
                <button onclick="window.openHotelDetailsModal('${hotel.id}')" class="px-3 py-2 text-xs font-semibold border border-slate-300 hover:bg-slate-100 rounded-lg text-slate-700 transition-colors">
                  Details
                </button>
                <button onclick="window.bookHotelRoom('${hotel.id}')" class="px-3.5 py-2 text-xs font-bold bg-teal-500 text-slate-950 hover:bg-teal-400 rounded-lg shadow-md transition-all">
                  Book Stay
                </button>
              </div>
            </div>
          </div>
        `).join('')}
      </section>

    </div>
  `;
}
