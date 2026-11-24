// View: Restaurants (MODEL B — LOCATION-BASED NEARBY DISCOVERY)
// Location selection -> Dining parameters -> Nearby Dining -> Menu & Table Reservation

import { state } from '../state.js';
import { RESTAURANTS, getNearbyResourcesForLocation } from '../data.js';
import { renderLocationSelectionScreen } from './location-discovery.js';

export function renderRestaurants(subview = "results") {
  if (!state.locationConfirmed && subview !== "results") {
    return renderLocationSelectionScreen({
      serviceKey: "restaurants",
      heading: "Where do you want to eat?",
      subheading: "Select a location to discover exquisite culinary dining and artisanal tables nearby.",
      actionButtonText: "Find Restaurants Nearby",
      onConfirmCallbackName: "confirmRestaurantsLocation"
    });
  }

  const currentLoc = state.selectedLocation;
  const isMapView = state.activeViewMode === "map";
  const localRestaurants = getNearbyResourcesForLocation('Restaurants', currentLoc, state.nearbyRadius);

  return `
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      
      <!-- Top Navigation & Model Badge -->
      <div class="flex items-center justify-between mb-6">
        <button onclick="window.appRouter('welcome')" class="flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-900 transition-colors">
          <span class="material-symbols-outlined text-sm">arrow_back</span>
          <span>Back to Home</span>
        </button>
        <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 text-amber-900 text-[11px] font-bold border border-amber-200">
          <span class="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
          MODEL B • DINING DISCOVERY
        </span>
      </div>

      <!-- Context Bar: Showing options near [Selected Location] -->
      <section class="glass-card p-5 border border-white/80 shadow-lg mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div class="flex items-center gap-3.5">
          <div class="w-11 h-11 rounded-xl bg-slate-900 text-amber-400 flex items-center justify-center flex-shrink-0">
            <span class="material-symbols-outlined text-2xl">restaurant</span>
          </div>
          <div>
            <span class="text-[10px] font-bold uppercase tracking-wider text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
              Nearby Dining Locator
            </span>
            <h1 class="text-xl sm:text-2xl font-extrabold text-slate-900 mt-0.5">
              Restaurants near ${currentLoc.name}
            </h1>
            <p class="text-xs text-slate-500">
              Discovered culinary destinations within ${state.nearbyRadius} km of your table search
            </p>
          </div>
        </div>

        <div class="flex items-center gap-2 self-start md:self-auto">
          <button onclick="window.openLocationSelectorFor('restaurants')" class="px-3.5 py-2 text-xs font-bold rounded-lg border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 transition-all flex items-center gap-1 shadow-sm">
            <span class="material-symbols-outlined text-sm">edit_location</span>
            <span>Change Location</span>
          </button>

          <!-- Map / List Toggle -->
          <div class="bg-slate-100 p-1 rounded-lg flex items-center border border-slate-200">
            <button onclick="window.setRestaurantsViewMode('list')" class="px-3 py-1.5 text-xs font-bold rounded-md transition-all ${!isMapView ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-900'} flex items-center gap-1">
              <span class="material-symbols-outlined text-sm">view_list</span>
              <span>List View</span>
            </button>
            <button onclick="window.setRestaurantsViewMode('map')" class="px-3 py-1.5 text-xs font-bold rounded-md transition-all ${isMapView ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-900'} flex items-center gap-1">
              <span class="material-symbols-outlined text-sm">map</span>
              <span>Map View</span>
            </button>
          </div>
        </div>
      </section>

      <!-- Dining Filter Parameters Bar -->
      <section class="glass-panel rounded-2xl p-4 sm:p-5 border border-white/80 shadow-md mb-8">
        <div class="grid grid-cols-2 md:grid-cols-5 gap-3 items-end">
          <div>
            <label class="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">Reservation Date</label>
            <input type="date" value="${state.filters.restaurants.date}" class="w-full bg-white border border-slate-200 rounded-lg py-2 px-3 text-xs font-medium text-slate-800" />
          </div>
          <div>
            <label class="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">Time Slot</label>
            <input type="time" value="${state.filters.restaurants.time}" class="w-full bg-white border border-slate-200 rounded-lg py-2 px-3 text-xs font-medium text-slate-800" />
          </div>
          <div>
            <label class="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">Party Size</label>
            <select class="w-full bg-white border border-slate-200 rounded-lg py-2 px-3 text-xs font-medium text-slate-800">
              <option>Table for 2 Guests</option>
              <option>Table for 1 Guest</option>
              <option>Table for 4 Guests</option>
              <option>Large Party (6+ Guests)</option>
            </select>
          </div>
          <div>
            <label class="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">Cuisine Preference</label>
            <select class="w-full bg-white border border-slate-200 rounded-lg py-2 px-3 text-xs font-medium text-slate-800">
              <option>All Cuisines</option>
              <option>Authentic South Indian</option>
              <option>French Haute & Continental</option>
              <option>Chettinad Non-Veg</option>
              <option>Italian Artisanal</option>
            </select>
          </div>
          <button class="w-full bg-slate-900 text-white font-bold text-xs py-2.5 rounded-lg hover:bg-slate-800 transition-colors flex items-center justify-center gap-1 shadow-sm">
            <span class="material-symbols-outlined text-sm">tune</span>
            <span>Apply Filters</span>
          </button>
        </div>
      </section>

      <!-- Main Display: Map View or List View -->
      ${isMapView ? `
        <div class="mb-8">
          <div id="restaurants-map-mount" class="w-full rounded-2xl overflow-hidden shadow-2xl border border-slate-200" style="height: 540px; min-height: 480px; width: 100%;"></div>
        </div>
      ` : ''}

      <!-- Restaurant Cards List -->
      <section class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        ${localRestaurants.map(rest => `
          <div class="glass-panel glass-panel-hover rounded-2xl overflow-hidden border border-white/80 shadow-lg flex flex-col justify-between group">
            <div>
              <div class="relative h-48 w-full overflow-hidden">
                <img src="${rest.image}" alt="${rest.name}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div class="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent"></div>
                
                <span class="absolute top-3 left-3 bg-slate-900/80 text-white text-[11px] font-bold px-2.5 py-1 rounded-full backdrop-blur-md border border-white/20">
                  ${rest.cuisine}
                </span>

                <div class="absolute bottom-3 left-4 right-4 flex items-center justify-between">
                  <div class="flex items-center gap-1 text-white text-xs font-semibold">
                    <span class="material-symbols-outlined text-sm text-amber-300">near_me</span>
                    <span>${rest.distanceKm} km from ${currentLoc.name.split(',')[0]}</span>
                  </div>
                  <span class="bg-amber-400 text-slate-950 text-xs font-bold px-2 py-0.5 rounded flex items-center gap-0.5">
                    <span class="material-symbols-outlined text-xs">star</span>
                    <span>${rest.rating}</span>
                  </span>
                </div>
              </div>

              <div class="p-5">
                <h3 class="text-lg font-bold text-slate-900 mb-1">${rest.name}</h3>
                <p class="text-xs text-slate-500 mb-3">${rest.area} • ${rest.priceRange}</p>
                
                <div class="flex flex-wrap gap-1.5 mb-3">
                  ${rest.dietary.map(d => `
                    <span class="text-[10px] font-semibold bg-emerald-50 text-emerald-800 px-2 py-0.5 rounded border border-emerald-200">
                      ✓ ${d}
                    </span>
                  `).join('')}
                </div>

                <div class="pt-2 border-t border-slate-100">
                  <p class="text-[10px] uppercase font-bold text-slate-400 mb-1">Famous Specialities</p>
                  <p class="text-xs text-slate-700 line-clamp-1">${rest.popularDishes.join(' • ')}</p>
                </div>
              </div>
            </div>

            <div class="p-5 pt-0 border-t border-slate-100 flex items-center justify-between mt-auto">
              <span class="text-xs font-bold text-slate-500">${rest.openingHours.split(' ')[0]} Open</span>
              <div class="flex items-center gap-2">
                <button onclick="window.openMenuModal('${rest.id}')" class="px-3 py-2 text-xs font-semibold border border-slate-300 hover:bg-slate-100 rounded-lg text-slate-700 transition-colors">
                  Digital Menu
                </button>
                <button onclick="window.reserveRestaurantTable('${rest.id}')" class="px-3.5 py-2 text-xs font-bold bg-amber-400 text-slate-950 hover:bg-amber-300 rounded-lg shadow-md transition-all">
                  Reserve Table
                </button>
              </div>
            </div>
          </div>
        `).join('')}
      </section>

    </div>
  `;
}
