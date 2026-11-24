// View: Rental Vehicles (MODEL B — LOCATION-BASED NEARBY DISCOVERY)
// No destination required! Includes full Rohan K. Rental Owner Profile

import { state } from '../state.js';
import { RENTAL_VEHICLES, RENTAL_OWNERS, getNearbyResourcesForLocation } from '../data.js';
import { renderLocationSelectionScreen } from './location-discovery.js';

export function renderRentals(subview = "results") {
  // If location is not confirmed yet, show dedicated location-selection screen
  if (!state.locationConfirmed && subview !== "results") {
    return renderLocationSelectionScreen({
      serviceKey: "rentals",
      heading: "Where do you need a vehicle?",
      subheading: "Select a pickup location to discover available bikes, cars, SUVs and electric fleet nearby.",
      actionButtonText: "Find Rentals Nearby",
      onConfirmCallbackName: "confirmRentalsLocation"
    });
  }

  const currentLoc = state.selectedLocation;
  const isMapView = state.activeViewMode === "map";
  const localVehicles = getNearbyResourcesForLocation('Rental Vehicles', currentLoc, state.nearbyRadius);

  return `
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      
      <!-- Top Navigation & Model Badge -->
      <div class="flex items-center justify-between mb-6">
        <button onclick="window.appRouter('welcome')" class="flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-900 transition-colors">
          <span class="material-symbols-outlined text-sm">arrow_back</span>
          <span>Back to Home</span>
        </button>
        <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-50 text-cyan-900 text-[11px] font-bold border border-cyan-200">
          <span class="w-2 h-2 rounded-full bg-cyan-500 animate-pulse"></span>
          MODEL B • NO DESTINATION REQUIRED
        </span>
      </div>

      <!-- Context Bar: Showing options near [Selected Location] -->
      <section class="glass-card p-5 border border-white/80 shadow-lg mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div class="flex items-center gap-3.5">
          <div class="w-11 h-11 rounded-xl bg-slate-900 text-cyan-300 flex items-center justify-center flex-shrink-0">
            <span class="material-symbols-outlined text-2xl">directions_car</span>
          </div>
          <div>
            <span class="text-[10px] font-bold uppercase tracking-wider text-cyan-800 bg-cyan-50 px-2 py-0.5 rounded border border-cyan-200">
              Nearby Fleet Discovery
            </span>
            <h1 class="text-xl sm:text-2xl font-extrabold text-slate-900 mt-0.5">
              Available rentals near ${currentLoc.name}
            </h1>
            <p class="text-xs text-slate-500">
              Showing verified bikes, cars & SUVs within ${state.nearbyRadius} km of pickup point
            </p>
          </div>
        </div>

        <div class="flex items-center gap-2 self-start md:self-auto">
          <!-- Change Location Button -->
          <button onclick="window.openLocationSelectorFor('rentals')" class="px-3.5 py-2 text-xs font-bold rounded-lg border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 transition-all flex items-center gap-1 shadow-sm">
            <span class="material-symbols-outlined text-sm">edit_location</span>
            <span>Change Location</span>
          </button>

          <!-- Map / List Toggle -->
          <div class="bg-slate-100 p-1 rounded-lg flex items-center border border-slate-200">
            <button onclick="window.setRentalsViewMode('list')" class="px-3 py-1.5 text-xs font-bold rounded-md transition-all ${!isMapView ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-900'} flex items-center gap-1">
              <span class="material-symbols-outlined text-sm">view_list</span>
              <span>List View</span>
            </button>
            <button onclick="window.setRentalsViewMode('map')" class="px-3 py-1.5 text-xs font-bold rounded-md transition-all ${isMapView ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-900'} flex items-center gap-1">
              <span class="material-symbols-outlined text-sm">map</span>
              <span>Map View</span>
            </button>
          </div>
        </div>
      </section>

      <!-- Vehicle Search Parameters Bar (Pickup/Return Dates & Times, Type, Seats - ZERO DESTINATION ASKED) -->
      <section class="glass-panel rounded-2xl p-4 sm:p-5 border border-white/80 shadow-md mb-8">
        <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 items-end">
          <div>
            <label class="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">Pickup Date</label>
            <input type="date" value="${state.filters.rentals.pickupDate}" class="w-full bg-white border border-slate-200 rounded-lg py-2 px-2.5 text-xs font-medium text-slate-800" />
          </div>
          <div>
            <label class="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">Pickup Time</label>
            <input type="time" value="${state.filters.rentals.pickupTime}" class="w-full bg-white border border-slate-200 rounded-lg py-2 px-2.5 text-xs font-medium text-slate-800" />
          </div>
          <div>
            <label class="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">Return Date</label>
            <input type="date" value="${state.filters.rentals.returnDate}" class="w-full bg-white border border-slate-200 rounded-lg py-2 px-2.5 text-xs font-medium text-slate-800" />
          </div>
          <div>
            <label class="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">Return Time</label>
            <input type="time" value="${state.filters.rentals.returnTime}" class="w-full bg-white border border-slate-200 rounded-lg py-2 px-2.5 text-xs font-medium text-slate-800" />
          </div>
          <div>
            <label class="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">Category</label>
            <select class="w-full bg-white border border-slate-200 rounded-lg py-2 px-2.5 text-xs font-medium text-slate-800">
              <option>All Types</option>
              <option>Bikes & Scooters</option>
              <option>Electric Cars</option>
              <option>SUVs (4x4)</option>
              <option>Luxury Sedans</option>
            </select>
          </div>
          <button class="w-full bg-slate-900 text-white font-bold text-xs py-2.5 rounded-lg hover:bg-slate-800 transition-colors flex items-center justify-center gap-1 shadow-sm">
            <span class="material-symbols-outlined text-sm">tune</span>
            <span>Update Filter</span>
          </button>
        </div>
      </section>

      <!-- Main Display: Map View or List View -->
      ${isMapView ? `
        <div class="mb-8">
          <div id="rentals-map-mount" class="w-full rounded-2xl overflow-hidden shadow-2xl border border-slate-200" style="height: 540px; min-height: 480px; width: 100%;"></div>
        </div>
      ` : ''}

      <!-- Vehicle Fleet Results -->
      <section class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        ${localVehicles.map(veh => `
          <div class="glass-panel glass-panel-hover rounded-2xl overflow-hidden border border-white/80 shadow-lg flex flex-col justify-between group">
            <div>
              <div class="relative h-48 w-full overflow-hidden">
                <img src="${veh.image}" alt="${veh.name}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div class="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent"></div>
                
                <span class="absolute top-3 left-3 bg-slate-900/80 text-white text-[11px] font-bold px-2.5 py-1 rounded-full backdrop-blur-md border border-white/20">
                  ${veh.category} • ${veh.subType}
                </span>

                <div class="absolute bottom-3 left-4 right-4 flex items-center justify-between">
                  <div class="flex items-center gap-1 text-white text-xs font-semibold">
                    <span class="material-symbols-outlined text-sm text-cyan-300">near_me</span>
                    <span>${veh.distanceKm} km from ${currentLoc.name.split(',')[0]}</span>
                  </div>
                  <span class="bg-amber-400 text-slate-950 text-xs font-bold px-2 py-0.5 rounded flex items-center gap-0.5">
                    <span class="material-symbols-outlined text-xs">star</span>
                    <span>${veh.rating}</span>
                  </span>
                </div>
              </div>

              <div class="p-5">
                <h3 class="text-lg font-bold text-slate-900 mb-1">${veh.name}</h3>
                
                <!-- Vehicle Specs Badges -->
                <div class="grid grid-cols-2 gap-2 my-3 text-xs text-slate-600 bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                  <div class="flex items-center gap-1.5">
                    <span class="material-symbols-outlined text-sm text-slate-400">group</span>
                    <span>${veh.seats} Seats</span>
                  </div>
                  <div class="flex items-center gap-1.5">
                    <span class="material-symbols-outlined text-sm text-slate-400">settings</span>
                    <span class="truncate">${veh.transmission.split('/')[0]}</span>
                  </div>
                  <div class="flex items-center gap-1.5 col-span-2">
                    <span class="material-symbols-outlined text-sm text-teal-600">bolt</span>
                    <span class="truncate font-medium text-slate-800">${veh.fuel}</span>
                  </div>
                </div>

                <!-- Verified Owner Quick Card -->
                <div class="flex items-center justify-between p-2.5 rounded-xl bg-white border border-slate-200 shadow-sm">
                  <div class="flex items-center gap-2.5">
                    <img src="${veh.owner.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80'}" class="w-8 h-8 rounded-full object-cover border border-teal-400" />
                    <div>
                      <p class="text-xs font-bold text-slate-900 flex items-center gap-1">
                        <span>${veh.owner.name}</span>
                        <span class="material-symbols-outlined text-teal-500 text-xs">verified</span>
                      </p>
                      <p class="text-[10px] text-slate-500">Fleet Host • ${veh.owner.rating} ★</p>
                    </div>
                  </div>
                  <button onclick="window.openOwnerProfileModal('${veh.owner.id || 'owner-rohan-k'}')" class="text-[11px] font-bold text-teal-700 hover:underline">
                    View Owner
                  </button>
                </div>
              </div>
            </div>

            <div class="p-5 pt-0 border-t border-slate-100 flex items-center justify-between mt-auto">
              <div>
                <span class="text-[10px] uppercase font-bold text-slate-400">Daily Rate</span>
                <p class="text-lg font-bold text-slate-900">${veh.currency}${veh.pricePerDay} <span class="text-xs text-slate-500 font-normal">/ day</span></p>
              </div>
              <div class="flex items-center gap-2">
                <button onclick="window.openVehicleDetailsModal('${veh.id}')" class="px-3 py-2 text-xs font-semibold border border-slate-300 hover:bg-slate-100 rounded-lg text-slate-700 transition-colors">
                  Details
                </button>
                <button onclick="window.bookRentalVehicle('${veh.id}')" class="px-3.5 py-2 text-xs font-bold bg-teal-500 text-slate-950 hover:bg-teal-400 rounded-lg shadow-md transition-all">
                  Book Rental
                </button>
              </div>
            </div>
          </div>
        `).join('')}
      </section>

    </div>
  `;
}

// Full Dedicated Modal / Page: Rental Owner Profile (Rohan K.)
export function renderOwnerProfileModal(ownerKey = "rohanK") {
  const owner = RENTAL_OWNERS[ownerKey] || RENTAL_OWNERS.rohanK;

  return `
    <div id="owner-profile-modal-backdrop" class="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div class="glass-card max-w-3xl w-full p-6 sm:p-8 border border-white/80 shadow-2xl relative my-8 animate-in fade-in zoom-in duration-200">
        
        <!-- Close button -->
        <button onclick="window.closeOwnerProfileModal()" class="absolute top-5 right-5 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-700 text-sm font-bold">
          ✕
        </button>

        <!-- Top Profile Bento Block -->
        <div class="flex flex-col sm:flex-row items-center sm:items-start gap-6 pb-6 border-b border-slate-200">
          <div class="relative">
            <img src="${owner.avatar}" alt="${owner.name}" class="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl object-cover border-4 border-white shadow-xl" />
            <div class="absolute -bottom-2 -right-2 bg-teal-500 text-white rounded-full p-1 border-2 border-white flex items-center justify-center" title="Verified Fleet Commander">
              <span class="material-symbols-outlined text-sm font-bold">verified</span>
            </div>
          </div>
          
          <div class="text-center sm:text-left flex-1">
            <div class="flex flex-wrap items-center justify-center sm:justify-start gap-2 mb-1">
              <h2 class="text-2xl font-extrabold text-slate-900">${owner.name}</h2>
              <span class="bg-teal-50 text-teal-800 text-[10px] font-bold px-2 py-0.5 rounded border border-teal-200">
                Verified Host
              </span>
            </div>
            <p class="text-xs text-teal-700 font-semibold mb-2">${owner.title}</p>
            <p class="text-xs text-slate-600 leading-relaxed max-w-xl">${owner.bio}</p>
            
            <div class="flex flex-wrap items-center justify-center sm:justify-start gap-4 mt-3 text-xs text-slate-500">
              <span class="flex items-center gap-1 font-bold text-amber-500">
                <span class="material-symbols-outlined text-xs">star</span>
                <span>${owner.rating} (${owner.reviewsCount} reviews)</span>
              </span>
              <span>•</span>
              <span>📍 ${owner.location}</span>
            </div>
          </div>
        </div>

        <!-- 3 Key Owner Metrics -->
        <div class="grid grid-cols-3 gap-3 my-6">
          <div class="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-center">
            <p class="text-lg sm:text-xl font-extrabold text-slate-900">${owner.totalVehicles}</p>
            <p class="text-[10px] uppercase font-bold text-slate-400">Total Fleet</p>
          </div>
          <div class="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-center">
            <p class="text-lg sm:text-xl font-extrabold text-slate-900">${owner.yearsExp} Yrs</p>
            <p class="text-[10px] uppercase font-bold text-slate-400">Experience</p>
          </div>
          <div class="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-center">
            <p class="text-lg sm:text-xl font-extrabold text-teal-600">${owner.responseRate}</p>
            <p class="text-[10px] uppercase font-bold text-slate-400">Response Rate</p>
          </div>
        </div>

        <!-- Fleet Overview List -->
        <div class="mb-6">
          <h3 class="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">Other Vehicles Managed by ${owner.name}</h3>
          <div class="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            ${owner.otherVehicles.map(vehName => `
              <div class="p-2.5 rounded-lg bg-white border border-slate-200 shadow-sm text-xs font-bold text-slate-800 text-center">
                🚗 ${vehName}
              </div>
            `).join('')}
          </div>
        </div>

        <!-- Action Buttons -->
        <div class="flex items-center justify-end gap-3 pt-4 border-t border-slate-200">
          <button onclick="window.contactOwnerAction('${owner.name}')" class="px-4 py-2.5 rounded-xl border border-slate-300 text-slate-700 font-bold text-xs hover:bg-slate-50 transition-colors flex items-center gap-1.5">
            <span class="material-symbols-outlined text-sm">chat</span>
            <span>Contact Host</span>
          </button>
          <button onclick="window.closeOwnerProfileModal()" class="px-5 py-2.5 rounded-xl bg-slate-900 text-white font-bold text-xs hover:bg-slate-800 shadow-md transition-all flex items-center gap-1.5">
            <span>Continue Booking</span>
            <span class="material-symbols-outlined text-sm">arrow_forward</span>
          </button>
        </div>

      </div>
    </div>
  `;
}
