// Reusable Location-Based Discovery Component (Model B Core Requirement)
// Follows all prompt rules for Hotels, Rentals, Restaurants, Guides, and Hospitals

import { state } from '../state.js';
import { PRESET_LOCATIONS } from '../data.js';

export function renderLocationSelectionScreen({
  serviceKey = "general",
  heading = "Where do you need this?",
  subheading = "Select a location to discover available options nearby.",
  actionButtonText = "Find Nearby Options",
  onConfirmCallbackName = "confirmCurrentLocationFlow"
}) {
  const currentLoc = state.selectedLocation;
  const currentRadius = state.nearbyRadius || 5;

  return `
    <div class="max-w-4xl mx-auto px-4 py-8">
      
      <!-- Top Breadcrumb / Model Badge -->
      <div class="flex items-center justify-between mb-6">
        <button onclick="window.appRouter('welcome')" class="flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-900 transition-colors">
          <span class="material-symbols-outlined text-sm">arrow_back</span>
          <span>Back to Home</span>
        </button>
        <span class="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-teal-50 text-teal-800 text-[11px] font-bold border border-teal-200">
          <span class="w-2 h-2 rounded-full bg-teal-500 animate-pulse"></span>
          MODEL B • NEARBY RADIAL DISCOVERY
        </span>
      </div>

      <!-- Main Header -->
      <div class="text-center mb-8">
        <h1 class="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-2">${heading}</h1>
        <p class="text-slate-500 text-sm max-w-lg mx-auto">${subheading}</p>
      </div>

      <!-- 3 Location Selection Choices -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        
        <!-- Choice 1: Use Current Location -->
        <div onclick="window.useCurrentLocationAction()" class="glass-panel glass-panel-hover rounded-2xl p-5 cursor-pointer border border-white/80 flex flex-col justify-between group">
          <div>
            <div class="w-12 h-12 rounded-xl bg-teal-500/10 text-teal-700 flex items-center justify-center mb-4 group-hover:bg-teal-500 group-hover:text-white transition-all">
              <span class="material-symbols-outlined text-2xl">my_location</span>
            </div>
            <h3 class="text-base font-bold text-slate-900 mb-1">Use Current Location</h3>
            <p class="text-xs text-slate-500 leading-relaxed">
              Auto-detect GPS coordinates around your device location.
            </p>
          </div>
          <div class="mt-4 pt-3 border-t border-slate-200/60 flex items-center justify-between text-xs font-semibold text-teal-700">
            <span>Detect Now</span>
            <span class="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">arrow_forward</span>
          </div>
        </div>

        <!-- Choice 2: Search Location -->
        <div onclick="document.getElementById('location-search-input').focus()" class="glass-panel glass-panel-hover rounded-2xl p-5 cursor-pointer border border-white/80 flex flex-col justify-between group">
          <div>
            <div class="w-12 h-12 rounded-xl bg-blue-500/10 text-blue-700 flex items-center justify-center mb-4 group-hover:bg-blue-600 group-hover:text-white transition-all">
              <span class="material-symbols-outlined text-2xl">search</span>
            </div>
            <h3 class="text-base font-bold text-slate-900 mb-1">Search Location</h3>
            <p class="text-xs text-slate-500 leading-relaxed">
              Search by city, neighborhood, landmark or pin code.
            </p>
          </div>
          <div class="mt-4 pt-3 border-t border-slate-200/60 flex items-center justify-between text-xs font-semibold text-blue-700">
            <span>Type Below</span>
            <span class="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">south</span>
          </div>
        </div>

        <!-- Choice 3: Select on Map -->
        <div onclick="window.toggleInteractiveMapPicker()" class="glass-panel glass-panel-hover rounded-2xl p-5 cursor-pointer border border-white/80 flex flex-col justify-between group">
          <div>
            <div class="w-12 h-12 rounded-xl bg-purple-500/10 text-purple-700 flex items-center justify-center mb-4 group-hover:bg-purple-600 group-hover:text-white transition-all">
              <span class="material-symbols-outlined text-2xl">map</span>
            </div>
            <h3 class="text-base font-bold text-slate-900 mb-1">Select on Map</h3>
            <p class="text-xs text-slate-500 leading-relaxed">
              Drag, zoom and drop an interactive location pin on map.
            </p>
          </div>
          <div class="mt-4 pt-3 border-t border-slate-200/60 flex items-center justify-between text-xs font-semibold text-purple-700">
            <span>Open Map</span>
            <span class="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">open_in_full</span>
          </div>
        </div>

      </div>

      <!-- Search Input & Presets -->
      <div class="glass-panel rounded-2xl p-6 border border-white/80 shadow-lg mb-8">
        <label class="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
          Search City, Area, Landmark or Location
        </label>
        <div class="relative flex items-center">
          <span class="material-symbols-outlined absolute left-4 text-slate-400">search</span>
          <input 
            type="text" 
            id="location-search-input" 
            placeholder="e.g. Coimbatore, Chennai, Bangalore, Ooty, Marina Beach, Gandhipuram..."
            value="${currentLoc.name}"
            oninput="window.handleLocationSearch(this.value)"
            class="w-full bg-white/80 border border-slate-200 rounded-xl py-3.5 pl-12 pr-28 text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-400/20 transition-all"
          />
          <button onclick="window.useCurrentLocationAction()" class="absolute right-2 px-3 py-1.5 text-xs font-semibold rounded-lg bg-teal-50 text-teal-800 hover:bg-teal-100 border border-teal-200 transition-colors flex items-center gap-1">
            <span class="material-symbols-outlined text-sm">my_location</span>
            <span>Current</span>
          </button>
        </div>

        <!-- Autocomplete Suggestions List (Dynamic or Presets) -->
        <div class="mt-4 pt-3 border-t border-slate-100">
          <p class="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">Quick Regional Presets</p>
          <div class="flex flex-wrap gap-2">
            ${PRESET_LOCATIONS.map(loc => `
              <button 
                onclick='window.selectPresetLocation(${JSON.stringify(loc).replace(/'/g, "&#39;")})'
                class="px-3 py-1.5 rounded-lg text-xs font-medium ${loc.name === currentLoc.name ? 'bg-slate-900 text-white shadow-sm' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'} transition-all flex items-center gap-1.5">
                <span>📍 ${loc.name}</span>
                <span class="text-[10px] opacity-60">(${loc.city})</span>
              </button>
            `).join('')}
          </div>
        </div>
      </div>

      <!-- Interactive Map Drop-Pin Panel (Toggleable) -->
      <div id="interactive-map-picker-panel" class="hidden mb-8 glass-panel rounded-2xl p-4 border border-cyan-400/30">
        <div class="flex items-center justify-between mb-3 px-2">
          <div class="flex items-center gap-2">
            <span class="material-symbols-outlined text-teal-600">touch_app</span>
            <span class="text-xs font-bold text-slate-800 uppercase tracking-wide">Interactive Map Canvas Pin Drop</span>
          </div>
          <button onclick="window.toggleInteractiveMapPicker()" class="text-xs text-slate-500 hover:text-slate-900 font-semibold">
            Close Map ✕
          </button>
        </div>
        <div id="picker-map-canvas-container" class="w-full h-[360px] rounded-xl overflow-hidden"></div>
      </div>

      <!-- Location Confirmation Card (Required State Before Results) -->
      <div class="glass-card p-6 sm:p-8 border-2 border-teal-400/40 shadow-2xl relative overflow-hidden mb-8">
        <div class="absolute top-0 right-0 w-32 h-32 bg-teal-400/10 rounded-full blur-2xl pointer-events-none"></div>

        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200/80">
          <div class="flex items-start gap-3.5">
            <div class="w-12 h-12 rounded-xl bg-slate-900 text-teal-300 flex items-center justify-center shadow-md flex-shrink-0">
              <span class="material-symbols-outlined text-2xl">pin_drop</span>
            </div>
            <div>
              <span class="text-[10px] font-bold text-teal-700 uppercase tracking-widest bg-teal-50 px-2 py-0.5 rounded border border-teal-200">
                Your Selected Location
              </span>
              <h2 class="text-xl font-bold text-slate-900 mt-1">📍 ${currentLoc.name}</h2>
              <p class="text-xs text-slate-500 mt-0.5">
                ${currentLoc.city}, ${currentLoc.state}, ${currentLoc.country} • Lat: ${currentLoc.lat ? currentLoc.lat.toFixed(4) : '11.0168'}°, Lng: ${currentLoc.lng ? currentLoc.lng.toFixed(4) : '76.9558'}°
              </p>
            </div>
          </div>

          <!-- Change Location Button (Modifies without restarting complete flow) -->
          <button onclick="document.getElementById('location-search-input').focus()" class="px-4 py-2 text-xs font-bold rounded-lg border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 transition-all flex items-center gap-1.5 self-start sm:self-auto shadow-sm">
            <span class="material-symbols-outlined text-sm">edit_location</span>
            <span>Change Location</span>
          </button>
        </div>

        <!-- Radius Selector -->
        <div class="pt-6">
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
            <div>
              <p class="text-xs font-bold uppercase tracking-wider text-slate-600">Nearby Search Radius</p>
              <p class="text-xs text-teal-700 font-semibold">“Showing services within ${currentRadius} km”</p>
            </div>
            
            <!-- Radius Pills -->
            <div class="flex items-center gap-2">
              ${[1, 5, 10, 25].map(r => `
                <button 
                  onclick="window.setRadiusAction(${r})" 
                  class="px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${currentRadius === r ? 'bg-teal-600 text-white shadow-md scale-105' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}">
                  ${r} km
                </button>
              `).join('')}
            </div>
          </div>

          <!-- Final Confirm Action Button -->
          <button 
            onclick="window.${onConfirmCallbackName}()"
            class="w-full mt-2 bg-gradient-to-r from-teal-500 to-cyan-400 text-slate-950 font-bold text-sm py-4 rounded-xl shadow-lg hover:shadow-cyan-400/30 hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2">
            <span>${actionButtonText}</span>
            <span class="material-symbols-outlined text-lg">radar</span>
          </button>
        </div>

      </div>

      <!-- Distinct Radial Discovery Visual Identity (As Required by Prompt) -->
      <div class="glass-panel rounded-2xl p-6 border border-white/60 text-center">
        <p class="text-xs font-bold uppercase tracking-widest text-slate-400 mb-6">Radial Discovery Architecture</p>
        
        <div class="flex flex-col items-center justify-center relative py-6">
          
          <!-- Concentric Ring Visual -->
          <div class="relative w-48 h-48 rounded-full border border-teal-300/40 flex items-center justify-center bg-teal-50/20">
            <div class="absolute w-36 h-36 rounded-full border border-teal-400/50 flex items-center justify-center bg-teal-100/30">
              <div class="w-14 h-14 rounded-full bg-slate-900 text-teal-300 flex items-center justify-center shadow-xl border-2 border-teal-400">
                <span class="material-symbols-outlined text-2xl">location_on</span>
              </div>
            </div>

            <!-- Radiating Orbital Service Badges -->
            <div class="absolute -top-3 bg-white px-2.5 py-1 rounded-full shadow-md border border-slate-200 text-[11px] font-bold text-blue-700 flex items-center gap-1">
              <span>🏨 Hotel</span>
            </div>
            <div class="absolute -bottom-3 bg-white px-2.5 py-1 rounded-full shadow-md border border-slate-200 text-[11px] font-bold text-red-700 flex items-center gap-1">
              <span>🏥 Hospital</span>
            </div>
            <div class="absolute -left-4 bg-white px-2.5 py-1 rounded-full shadow-md border border-slate-200 text-[11px] font-bold text-teal-700 flex items-center gap-1">
              <span>🚗 Rental</span>
            </div>
            <div class="absolute -right-4 bg-white px-2.5 py-1 rounded-full shadow-md border border-slate-200 text-[11px] font-bold text-purple-700 flex items-center gap-1">
              <span>🧑‍🏫 Guide</span>
            </div>
          </div>

          <div class="mt-6">
            <p class="text-sm font-bold text-slate-900">“Showing options near ${currentLoc.name}”</p>
            <p class="text-xs text-slate-500 mt-1">Concentric radial scan automatically filters all resources within ${currentRadius} km</p>
          </div>

        </div>
      </div>

    </div>
  `;
}
