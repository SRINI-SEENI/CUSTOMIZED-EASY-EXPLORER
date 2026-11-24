// View: Tourist Guides (MODEL B — LOCATION-BASED NEARBY DISCOVERY)
// Replaces route with local guide discovery near selected anchor

import { state } from '../state.js';
import { TOURIST_GUIDES, getNearbyResourcesForLocation } from '../data.js';
import { renderLocationSelectionScreen } from './location-discovery.js';

export function renderGuides(subview = "results") {
  if (!state.locationConfirmed && subview !== "results") {
    return renderLocationSelectionScreen({
      serviceKey: "guides",
      heading: "Where do you need a guide?",
      subheading: "Select a location to discover certified local heritage guides, naturalists and historians nearby.",
      actionButtonText: "Find Guides Nearby",
      onConfirmCallbackName: "confirmGuidesLocation"
    });
  }

  const currentLoc = state.selectedLocation;
  const isMapView = state.activeViewMode === "map";
  const localGuides = getNearbyResourcesForLocation('Tourist Guides', currentLoc, state.nearbyRadius);

  return `
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      
      <!-- Top Navigation & Model Badge -->
      <div class="flex items-center justify-between mb-6">
        <button onclick="window.appRouter('welcome')" class="flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-900 transition-colors">
          <span class="material-symbols-outlined text-sm">arrow_back</span>
          <span>Back to Home</span>
        </button>
        <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-50 text-purple-900 text-[11px] font-bold border border-purple-200">
          <span class="w-2 h-2 rounded-full bg-purple-500 animate-pulse"></span>
          MODEL B • LOCAL EXPERTISE DISCOVERY
        </span>
      </div>

      <!-- Context Bar: Showing options near [Selected Location] -->
      <section class="glass-card p-5 border border-white/80 shadow-lg mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div class="flex items-center gap-3.5">
          <div class="w-11 h-11 rounded-xl bg-slate-900 text-purple-300 flex items-center justify-center flex-shrink-0">
            <span class="material-symbols-outlined text-2xl">record_voice_over</span>
          </div>
          <div>
            <span class="text-[10px] font-bold uppercase tracking-wider text-purple-800 bg-purple-50 px-2 py-0.5 rounded border border-purple-200">
              Regional Host Discovery
            </span>
            <h1 class="text-xl sm:text-2xl font-extrabold text-slate-900 mt-0.5">
              Guides near ${currentLoc.name}
            </h1>
            <p class="text-xs text-slate-500">
              Verified local experts, art historians & trek leaders within ${state.nearbyRadius} km
            </p>
          </div>
        </div>

        <div class="flex items-center gap-2 self-start md:self-auto">
          <button onclick="window.openLocationSelectorFor('guides')" class="px-3.5 py-2 text-xs font-bold rounded-lg border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 transition-all flex items-center gap-1 shadow-sm">
            <span class="material-symbols-outlined text-sm">edit_location</span>
            <span>Change Location</span>
          </button>

          <!-- Map / List Toggle -->
          <div class="bg-slate-100 p-1 rounded-lg flex items-center border border-slate-200">
            <button onclick="window.setGuidesViewMode('list')" class="px-3 py-1.5 text-xs font-bold rounded-md transition-all ${!isMapView ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-900'} flex items-center gap-1">
              <span class="material-symbols-outlined text-sm">view_list</span>
              <span>List View</span>
            </button>
            <button onclick="window.setGuidesViewMode('map')" class="px-3 py-1.5 text-xs font-bold rounded-md transition-all ${isMapView ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-900'} flex items-center gap-1">
              <span class="material-symbols-outlined text-sm">map</span>
              <span>Map View</span>
            </button>
          </div>
        </div>
      </section>

      <!-- Guide Parameters Filter Bar -->
      <section class="glass-panel rounded-2xl p-4 sm:p-5 border border-white/80 shadow-md mb-8">
        <div class="grid grid-cols-2 md:grid-cols-5 gap-3 items-end">
          <div>
            <label class="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">Tour Date</label>
            <input type="date" value="${state.filters.guides.date}" class="w-full bg-white border border-slate-200 rounded-lg py-2 px-3 text-xs font-medium text-slate-800" />
          </div>
          <div>
            <label class="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">Duration</label>
            <select class="w-full bg-white border border-slate-200 rounded-lg py-2 px-3 text-xs font-medium text-slate-800">
              <option>Half Day (4 hrs)</option>
              <option>Full Day (8 hrs)</option>
              <option>Multi-Day Expedition</option>
            </select>
          </div>
          <div>
            <label class="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">Language</label>
            <select class="w-full bg-white border border-slate-200 rounded-lg py-2 px-3 text-xs font-medium text-slate-800">
              <option>All Languages</option>
              <option>English</option>
              <option>Tamil</option>
              <option>Hindi</option>
              <option>French</option>
            </select>
          </div>
          <div>
            <label class="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">Specialization</label>
            <select class="w-full bg-white border border-slate-200 rounded-lg py-2 px-3 text-xs font-medium text-slate-800">
              <option>All Specializations</option>
              <option>Temple Architecture & History</option>
              <option>Wildlife & Eco-Treks</option>
              <option>Culinary & Spice Walks</option>
            </select>
          </div>
          <button class="w-full bg-slate-900 text-white font-bold text-xs py-2.5 rounded-lg hover:bg-slate-800 transition-colors flex items-center justify-center gap-1 shadow-sm">
            <span class="material-symbols-outlined text-sm">tune</span>
            <span>Filter Guides</span>
          </button>
        </div>
      </section>

      <!-- Main Display: Map View or List View -->
      ${isMapView ? `
        <div class="mb-8">
          <div id="guides-map-mount" class="w-full rounded-2xl overflow-hidden shadow-2xl border border-slate-200" style="height: 540px; min-height: 480px; width: 100%;"></div>
        </div>
      ` : ''}

      <!-- Guide Cards Grid -->
      <section class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        ${localGuides.map(guide => `
          <div class="glass-panel glass-panel-hover rounded-2xl overflow-hidden border border-white/80 shadow-lg flex flex-col justify-between group p-6">
            <div>
              <div class="flex items-start gap-4 mb-4">
                <div class="relative">
                  <img src="${guide.avatar}" alt="${guide.name}" class="w-16 h-16 rounded-2xl object-cover border-2 border-teal-400 shadow-md" />
                  ${guide.verified ? `
                    <div class="absolute -bottom-1 -right-1 bg-teal-500 text-white rounded-full p-0.5 border-2 border-white flex items-center justify-center">
                      <span class="material-symbols-outlined text-[12px] font-bold">verified</span>
                    </div>
                  ` : ''}
                </div>
                <div>
                  <h3 class="text-base font-bold text-slate-900">${guide.name}</h3>
                  <p class="text-xs text-purple-700 font-semibold">${guide.title.split('&')[0]}</p>
                  <div class="flex items-center gap-2 mt-1 text-xs text-slate-500">
                    <span class="flex items-center gap-0.5 text-amber-500 font-bold">
                      <span class="material-symbols-outlined text-xs">star</span>
                      <span>${guide.rating}</span>
                    </span>
                    <span>(${guide.reviewsCount})</span>
                    <span>•</span>
                    <span>${guide.yearsExp} Yrs Exp</span>
                  </div>
                </div>
              </div>

              <p class="text-xs text-slate-600 line-clamp-3 leading-relaxed mb-4">${guide.bio}</p>

              <div class="p-3 bg-slate-50 rounded-xl border border-slate-200 mb-4 text-xs space-y-1.5">
                <div class="flex items-center justify-between">
                  <span class="text-slate-400 font-semibold">Languages:</span>
                  <span class="font-bold text-slate-800">${guide.languages.join(', ')}</span>
                </div>
                <div class="flex items-center justify-between">
                  <span class="text-slate-400 font-semibold">Proximity:</span>
                  <span class="font-bold text-teal-700">${guide.distanceKm} km from ${currentLoc.name.split(',')[0]}</span>
                </div>
              </div>
            </div>

            <div class="pt-4 border-t border-slate-100 flex items-center justify-between mt-auto">
              <div>
                <span class="text-[10px] uppercase font-bold text-slate-400">Hourly Rate</span>
                <p class="text-base font-bold text-slate-900">${guide.currency}${guide.pricePerHour} <span class="text-xs text-slate-500 font-normal">/ hour</span></p>
              </div>
              <button onclick="window.bookGuideSession('${guide.id}')" class="px-4 py-2 rounded-lg text-xs font-bold bg-purple-600 text-white hover:bg-purple-500 shadow-md transition-all flex items-center gap-1">
                <span>Book Guide</span>
                <span class="material-symbols-outlined text-sm">arrow_forward</span>
              </button>
            </div>
          </div>
        `).join('')}
      </section>

    </div>
  `;
}
