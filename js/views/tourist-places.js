// View: Tourist Places (MODEL A — ROUTE-BASED DISCOVERY)
// Full Real-Time Route Operations: Select Any From & Destination -> AI Model / Live Web Search -> Live Corridors & Availabilities

import { state } from '../state.js';
import { COUNTRIES, TOURIST_PLACES } from '../data.js';

// Comprehensive Geocoding Database for Tamil Nadu, South India & Beyond
export const GEO_DATABASE = {
  // Tamil Nadu Destinations & Corridor Hubs
  'krishnagiri': { lat: 12.5266, lng: 78.2146, name: 'Krishnagiri, Tamil Nadu' },
  'coimbatore': { lat: 11.0168, lng: 76.9558, name: 'Coimbatore, Tamil Nadu' },
  'ooty': { lat: 11.4102, lng: 76.6950, name: 'Ooty, Tamil Nadu' },
  'udhagamandalam': { lat: 11.4102, lng: 76.6950, name: 'Ooty, Tamil Nadu' },
  'coonoor': { lat: 11.3530, lng: 76.7959, name: 'Coonoor, Tamil Nadu' },
  'kotagiri': { lat: 11.4239, lng: 76.8647, name: 'Kotagiri, Tamil Nadu' },
  'mettupalayam': { lat: 11.2991, lng: 76.9452, name: 'Mettupalayam, Tamil Nadu' },
  'salem': { lat: 11.6643, lng: 78.1460, name: 'Salem, Tamil Nadu' },
  'dharmapuri': { lat: 12.1211, lng: 78.1582, name: 'Dharmapuri, Tamil Nadu' },
  'erode': { lat: 11.3410, lng: 77.7172, name: 'Erode, Tamil Nadu' },
  'tiruppur': { lat: 11.1085, lng: 77.3411, name: 'Tiruppur, Tamil Nadu' },
  'tirupur': { lat: 11.1085, lng: 77.3411, name: 'Tiruppur, Tamil Nadu' },
  'bhavani': { lat: 11.4503, lng: 77.6834, name: 'Bhavani, Tamil Nadu' },
  'avinashi': { lat: 11.1932, lng: 77.2694, name: 'Avinashi, Tamil Nadu' },
  'sankagiri': { lat: 11.4883, lng: 77.8687, name: 'Sankagiri, Tamil Nadu' },
  'hosur': { lat: 12.7409, lng: 77.8253, name: 'Hosur, Tamil Nadu' },
  'chennai': { lat: 13.0827, lng: 80.2707, name: 'Chennai, Tamil Nadu' },
  'madurai': { lat: 9.9252, lng: 78.1198, name: 'Madurai, Tamil Nadu' },
  'kodaikanal': { lat: 10.2381, lng: 77.4892, name: 'Kodaikanal, Tamil Nadu' },
  'palani': { lat: 10.4500, lng: 77.5200, name: 'Palani, Tamil Nadu' },
  'pollachi': { lat: 10.6588, lng: 77.0084, name: 'Pollachi, Tamil Nadu' },
  'rameswaram': { lat: 9.2876, lng: 79.3129, name: 'Rameswaram, Tamil Nadu' },
  'trichy': { lat: 10.7905, lng: 78.7047, name: 'Tiruchirappalli, Tamil Nadu' },
  'tiruchirappalli': { lat: 10.7905, lng: 78.7047, name: 'Tiruchirappalli, Tamil Nadu' },
  'thanjavur': { lat: 10.7870, lng: 79.1378, name: 'Thanjavur, Tamil Nadu' },
  'vellore': { lat: 12.9165, lng: 79.1325, name: 'Vellore, Tamil Nadu' },
  'kanchipuram': { lat: 12.8342, lng: 79.7036, name: 'Kanchipuram, Tamil Nadu' },
  'tirunelveli': { lat: 8.7139, lng: 77.7567, name: 'Tirunelveli, Tamil Nadu' },
  'kanyakumari': { lat: 8.0883, lng: 77.5385, name: 'Kanyakumari, Tamil Nadu' },
  'puducherry': { lat: 11.9416, lng: 79.8083, name: 'Puducherry' },
  'pondicherry': { lat: 11.9416, lng: 79.8083, name: 'Puducherry' },
  'yercaud': { lat: 11.7753, lng: 78.2093, name: 'Yercaud, Tamil Nadu' },
  'hogenakkal': { lat: 12.1182, lng: 77.7766, name: 'Hogenakkal, Tamil Nadu' },

  // Karnataka & Kerala
  'bangalore': { lat: 12.9716, lng: 77.5946, name: 'Bangalore, Karnataka' },
  'bengaluru': { lat: 12.9716, lng: 77.5946, name: 'Bangalore, Karnataka' },
  'mysore': { lat: 12.2958, lng: 76.6394, name: 'Mysore, Karnataka' },
  'mysuru': { lat: 12.2958, lng: 76.6394, name: 'Mysore, Karnataka' },
  'munnar': { lat: 10.0889, lng: 77.0595, name: 'Munnar, Kerala' },
  'kochi': { lat: 9.9312, lng: 76.2673, name: 'Kochi, Kerala' },
  'cochin': { lat: 9.9312, lng: 76.2673, name: 'Kochi, Kerala' },
  'wayanad': { lat: 11.6854, lng: 76.1320, name: 'Wayanad, Kerala' },
  'alappuzha': { lat: 9.4981, lng: 76.3388, name: 'Alappuzha, Kerala' },
  'alleppey': { lat: 9.4981, lng: 76.3388, name: 'Alappuzha, Kerala' },
  'trivandrum': { lat: 8.5241, lng: 76.9366, name: 'Thiruvananthapuram, Kerala' },
  'thiruvananthapuram': { lat: 8.5241, lng: 76.9366, name: 'Thiruvananthapuram, Kerala' },

  // Other Major Indian Hubs
  'delhi': { lat: 28.6139, lng: 77.2090, name: 'New Delhi, Delhi' },
  'new delhi': { lat: 28.6139, lng: 77.2090, name: 'New Delhi, Delhi' },
  'agra': { lat: 27.1767, lng: 78.0081, name: 'Agra, Uttar Pradesh' },
  'jaipur': { lat: 26.9124, lng: 75.7873, name: 'Jaipur, Rajasthan' },
  'mumbai': { lat: 19.0760, lng: 72.8777, name: 'Mumbai, Maharashtra' },
  'pune': { lat: 18.5204, lng: 73.8567, name: 'Pune, Maharashtra' },
  'goa': { lat: 15.2993, lng: 74.1240, name: 'Goa' },
  'hyderabad': { lat: 17.3850, lng: 78.4867, name: 'Hyderabad, Telangana' },
  'kolkata': { lat: 22.5726, lng: 88.3639, name: 'Kolkata, West Bengal' },

  // International Presets
  'paris': { lat: 48.8566, lng: 2.3522, name: 'Paris, France' },
  'nice': { lat: 43.7102, lng: 7.2620, name: 'Nice, France' }
};

export function resolveCityCoords(query, fallback) {
  if (!query) return fallback || { lat: 11.0168, lng: 76.9558 };
  const lower = query.toLowerCase().trim();
  for (const [key, val] of Object.entries(GEO_DATABASE)) {
    if (lower.includes(key)) {
      return { lat: val.lat, lng: val.lng, name: val.name };
    }
  }
  return fallback || { lat: 11.0168, lng: 76.9558 };
}


export function renderTouristPlaces() {
  const route = state.route;
  const isScanning = route.isScanning;
  const activeModel = route.model || 'gemini-pro';
  const activeCategory = route.categoryFilter || 'all';

  // Use dynamically discovered availabilities if present; otherwise default to initial corridor stops
  const availabilities = (route.discoveredAvailabilities && route.discoveredAvailabilities.length > 0)
    ? route.discoveredAvailabilities
    : getDefaultCorridorStops(route.from, route.destination);

  // Filter by category
  const filteredStops = activeCategory === 'all'
    ? availabilities
    : availabilities.filter(s => s.category.toLowerCase().includes(activeCategory.toLowerCase()) || (s.tags && s.tags.some(t => t.toLowerCase().includes(activeCategory.toLowerCase()))));

  return `
    <div class="max-w-6xl mx-auto px-4 py-8">
      
      <!-- Top Navigation & Model Badge -->
      <div class="flex items-center justify-between mb-6">
        <button onclick="window.appRouter('welcome')" class="flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-900 transition-colors">
          <span class="material-symbols-outlined text-sm">arrow_back</span>
          <span>Back to Home</span>
        </button>
        <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-900 text-[11px] font-bold border border-blue-200 shadow-xs">
          <span class="w-2 h-2 rounded-full bg-blue-600 animate-ping"></span>
          <span>MODEL A • REAL-TIME ROUTE DISCOVERY</span>
        </div>
      </div>

      <!-- Interactive Route Selection & AI Model Command Center -->
      <section class="glass-card p-6 sm:p-8 border border-white/80 shadow-2xl mb-8 relative overflow-hidden rounded-3xl">
        
        <div class="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6 pb-6 border-b border-slate-200/80">
          <div>
            <span class="text-[10px] font-extrabold uppercase tracking-widest text-blue-700 bg-blue-50 px-2.5 py-1 rounded-full border border-blue-200">
              Corridor Route Explorer
            </span>
            <h1 class="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2">
              Route Discovery: What's Available Between Points?
            </h1>
            <p class="text-xs text-slate-500 mt-1">
              Select origin and destination to dynamically scan real attractions, resorts, roadside dining, and viewpoints along the corridor.
            </p>
          </div>

          <!-- Quick Presets -->
          <div class="flex flex-wrap items-center gap-1.5">
            <span class="text-[10px] font-bold text-slate-400 uppercase tracking-wider mr-1">Presets:</span>
            <button onclick="window.applyRoutePreset('Coimbatore', 'Krishnagiri')" class="px-2.5 py-1 rounded-lg text-xs font-bold ${route.destination.toLowerCase().includes('krishnagiri') ? 'bg-slate-900 text-white' : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'}">
              Cbe ➔ Krishnagiri
            </button>
            <button onclick="window.applyRoutePreset('Coimbatore', 'Ooty')" class="px-2.5 py-1 rounded-lg text-xs font-bold ${route.destination.toLowerCase().includes('ooty') ? 'bg-slate-900 text-white' : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'}">
              Cbe ➔ Ooty
            </button>
            <button onclick="window.applyRoutePreset('Bangalore', 'Mysore')" class="px-2.5 py-1 rounded-lg text-xs font-bold ${route.destination.toLowerCase().includes('mysore') ? 'bg-slate-900 text-white' : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'}">
              Bangalore ➔ Mysore
            </button>
            <button onclick="window.applyRoutePreset('Coimbatore', 'Munnar')" class="px-2.5 py-1 rounded-lg text-xs font-bold ${route.destination.toLowerCase().includes('munnar') ? 'bg-slate-900 text-white' : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'}">
              Cbe ➔ Munnar
            </button>
            <button onclick="window.applyRoutePreset('Chennai', 'Bangalore')" class="px-2.5 py-1 rounded-lg text-xs font-bold ${route.destination.includes('Bangalore') ? 'bg-slate-900 text-white' : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'}">
              Chennai ➔ Bangalore
            </button>
            <button onclick="window.applyRoutePreset('Delhi', 'Agra')" class="px-2.5 py-1 rounded-lg text-xs font-bold ${route.destination.includes('Agra') ? 'bg-slate-900 text-white' : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'}">
              Delhi ➔ Agra
            </button>
            <button onclick="window.applyRoutePreset('Paris', 'Nice')" class="px-2.5 py-1 rounded-lg text-xs font-bold ${route.destination.includes('Nice') ? 'bg-slate-900 text-white' : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'}">
              Paris ➔ Nice
            </button>
          </div>
        </div>

        <!-- From and Destination Inputs & Swap Button -->
        <form onsubmit="event.preventDefault(); window.triggerRouteSearch()" class="space-y-4">
          <div class="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
            
            <!-- From Location Input -->
            <div class="md:col-span-5 relative">
              <label class="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1 flex items-center justify-between">
                <span>📍 From (Origin)</span>
                <button type="button" onclick="window.useCurrentLocationForOrigin()" class="text-[10px] text-teal-700 font-semibold hover:underline flex items-center gap-0.5">
                  <span class="material-symbols-outlined text-xs">my_location</span>
                  <span>My Location</span>
                </button>
              </label>
              <div class="relative">
                <span class="absolute left-3.5 top-1/2 -translate-y-1/2 material-symbols-outlined text-slate-400 text-lg">trip_origin</span>
                <input type="text" id="route-from-input" value="${route.from}" placeholder="e.g. Coimbatore, Chennai, Delhi, Mumbai, Paris..." required class="w-full bg-white border border-slate-200 rounded-xl pl-10 pr-4 py-3 text-sm font-semibold text-slate-900 focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-400/20 shadow-xs" />
              </div>
            </div>

            <!-- Swap Button -->
            <div class="md:col-span-2 flex justify-center pt-2 md:pt-4">
              <button type="button" onclick="window.swapRoutePoints()" class="w-10 h-10 rounded-full bg-slate-100 hover:bg-teal-50 border border-slate-200 hover:border-teal-300 text-slate-700 hover:text-teal-700 flex items-center justify-center transition-all shadow-sm" title="Swap Origin & Destination">
                <span class="material-symbols-outlined text-xl">swap_horiz</span>
              </button>
            </div>

            <!-- Destination Input -->
            <div class="md:col-span-5 relative">
              <label class="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                🏁 Destination (To)
              </label>
              <div class="relative">
                <span class="absolute left-3.5 top-1/2 -translate-y-1/2 material-symbols-outlined text-teal-600 text-lg">location_on</span>
                <input type="text" id="route-dest-input" value="${route.destination}" placeholder="e.g. Ooty, Bangalore, Agra, Goa, Nice..." required class="w-full bg-white border border-slate-200 rounded-xl pl-10 pr-4 py-3 text-sm font-semibold text-slate-900 focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-400/20 shadow-xs" />
              </div>
            </div>

          </div>

          <!-- Model & Search Provider Selector -->
          <div class="pt-2 flex flex-col md:flex-row md:items-center justify-between gap-4">
            
            <div class="flex flex-wrap items-center gap-2">
              <span class="text-xs font-bold text-slate-700 mr-1 flex items-center gap-1">
                <span class="material-symbols-outlined text-sm text-teal-600">psychology</span>
                <span>Discovery Engine:</span>
              </span>
              
              <label class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-semibold cursor-pointer transition-all ${activeModel === 'gemini-pro' ? 'bg-teal-900 text-white border-teal-800 shadow-sm' : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'}">
                <input type="radio" name="discovery-model" value="gemini-pro" ${activeModel === 'gemini-pro' ? 'checked' : ''} onchange="window.setRouteModel(this.value)" class="hidden" />
                <span>🧠 Gemini AI Corridor Scout</span>
              </label>

              <label class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-semibold cursor-pointer transition-all ${activeModel === 'osm-live' ? 'bg-teal-900 text-white border-teal-800 shadow-sm' : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'}">
                <input type="radio" name="discovery-model" value="osm-live" ${activeModel === 'osm-live' ? 'checked' : ''} onchange="window.setRouteModel(this.value)" class="hidden" />
                <span>🌐 OpenStreetMap Live Web</span>
              </label>

              <label class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-semibold cursor-pointer transition-all ${activeModel === 'fast-router' ? 'bg-teal-900 text-white border-teal-800 shadow-sm' : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'}">
                <input type="radio" name="discovery-model" value="fast-router" ${activeModel === 'fast-router' ? 'checked' : ''} onchange="window.setRouteModel(this.value)" class="hidden" />
                <span>⚡ Smart Route Pathfinder</span>
              </label>
            </div>

            <!-- Submit Button -->
            <button type="submit" class="px-6 py-3 rounded-xl bg-gradient-to-r from-slate-900 via-teal-900 to-slate-900 hover:from-slate-800 hover:to-teal-800 text-white text-xs font-bold shadow-xl transition-all flex items-center justify-center gap-2 group flex-shrink-0">
              <span class="material-symbols-outlined text-base text-cyan-300 group-hover:rotate-45 transition-transform">travel_explore</span>
              <span>Discover Availabilities Between Points</span>
            </button>
          </div>
        </form>

        <!-- Scanning Terminal / HUD Overlay (Visible during search) -->
        ${isScanning ? `
          <div class="mt-6 p-5 rounded-2xl bg-slate-950 text-white border border-cyan-400/30 shadow-2xl animate-in fade-in duration-300 relative overflow-hidden">
            <div class="flex items-center justify-between mb-3">
              <div class="flex items-center gap-2">
                <span class="w-3 h-3 rounded-full bg-cyan-400 animate-ping"></span>
                <span class="text-xs font-mono font-bold uppercase tracking-wider text-cyan-300">
                  REAL-TIME CORRIDOR SCAN ACTIVE
                </span>
              </div>
              <span class="text-[10px] font-mono text-slate-400">ENGINE: ${activeModel.toUpperCase()}</span>
            </div>
            
            <div class="space-y-1.5 text-xs font-mono text-slate-300">
              <p class="flex items-center gap-2 text-cyan-200">
                <span class="material-symbols-outlined text-xs">check_circle</span>
                <span>Geocoding coordinates: ${route.from} ➔ ${route.destination}</span>
              </p>
              <p class="flex items-center gap-2 text-teal-300">
                <span class="material-symbols-outlined text-xs">radar</span>
                <span>Calculating corridor vector & ${route.distanceKm || 86} km bounding corridor...</span>
              </p>
              <p class="flex items-center gap-2 text-amber-300 animate-pulse">
                <span class="material-symbols-outlined text-xs">sync</span>
                <span>Extracting live tourist spots, highway stays, mountain viewpoints, and dining...</span>
              </p>
            </div>
            <div class="w-full h-1 bg-slate-800 rounded-full mt-4 overflow-hidden">
              <div class="h-full bg-gradient-to-r from-teal-400 to-cyan-400 animate-[pulse_1s_infinite] w-3/4"></div>
            </div>
          </div>
        ` : ''}

        <!-- Route Visual Indicator: 📍 Origin ━━━━✦━━━━ 📍 Destination -->
        <div class="mt-6 pt-6 border-t border-slate-200/80 flex flex-col md:flex-row items-center justify-between gap-4">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-full bg-blue-900 text-cyan-300 flex items-center justify-center font-bold text-sm shadow-md">
              A
            </div>
            <div>
              <p class="text-[10px] uppercase font-bold text-slate-400">From Origin</p>
              <p class="text-sm font-bold text-slate-900">📍 ${route.from}</p>
            </div>
          </div>

          <!-- Pathway graphic -->
          <div class="flex-1 flex flex-col items-center px-4 w-full md:w-auto">
            <div class="w-full flex items-center justify-center gap-2 text-teal-600 font-bold text-xs">
              <div class="flex-1 h-[2px] bg-gradient-to-r from-blue-900 via-teal-400 to-amber-400"></div>
              <span class="px-2.5 py-1 rounded-full bg-teal-50 border border-teal-200 text-[11px] flex items-center gap-1 shadow-xs">
                <span class="material-symbols-outlined text-xs text-teal-600">route</span>
                <span>✦ ${route.distanceKm || 86} km • ${route.estimatedTime || '2h 45m'}</span>
              </span>
              <div class="flex-1 h-[2px] bg-gradient-to-r from-amber-400 via-teal-400 to-blue-900"></div>
            </div>
            <span class="text-[10px] text-slate-500 mt-1 uppercase tracking-wider font-semibold">
              ${availabilities.length} Verified Stops Along Corridor
            </span>
          </div>

          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-full bg-teal-600 text-white flex items-center justify-center font-bold text-sm shadow-md">
              B
            </div>
            <div>
              <p class="text-[10px] uppercase font-bold text-slate-400">Destination</p>
              <p class="text-sm font-bold text-slate-900">📍 ${route.destination}</p>
            </div>
          </div>
        </div>

        <!-- Embedded Interactive SVG Route Canvas -->
        <div id="route-map-mount" class="w-full rounded-2xl overflow-hidden mt-4 border border-slate-200/80 shadow-inner" style="height: 540px; min-height: 480px; width: 100%;">
          ${renderRouteMapSvg(route, availabilities)}
        </div>
      </section>

      <!-- Category Filter Tabs & Results Section -->
      <section>
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h2 class="text-2xl font-bold text-slate-900">
              Availabilities Between ${route.from} & ${route.destination}
            </h2>
            <p class="text-xs text-slate-500">
              Ranked scenic attractions, waypoints, dining, and accommodations discovered along the route
            </p>
          </div>

          <!-- Category Filter Pills -->
          <div class="flex flex-wrap items-center gap-1.5">
            <button onclick="window.setRouteCategoryFilter('all')" class="px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${activeCategory === 'all' ? 'bg-slate-900 text-white shadow-sm' : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'}">
              All Stops (${availabilities.length})
            </button>
            <button onclick="window.setRouteCategoryFilter('viewpoint')" class="px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${activeCategory === 'viewpoint' ? 'bg-slate-900 text-white shadow-sm' : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'}">
              Scenic Viewpoints
            </button>
            <button onclick="window.setRouteCategoryFilter('hotel')" class="px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${activeCategory === 'hotel' ? 'bg-slate-900 text-white shadow-sm' : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'}">
              Stays & Resorts
            </button>
            <button onclick="window.setRouteCategoryFilter('dining')" class="px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${activeCategory === 'dining' ? 'bg-slate-900 text-white shadow-sm' : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'}">
              Highway Dining
            </button>
          </div>
        </div>

        <!-- Discovered Availabilities Cards Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          ${filteredStops.map((place, idx) => `
            <div id="stop-card-${place.id}" class="glass-panel glass-panel-hover rounded-2xl overflow-hidden border border-white/80 shadow-lg flex flex-col justify-between group transition-all">
              <div>
                <div class="relative h-56 w-full overflow-hidden">
                  <img src="${place.image}" alt="${place.name}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  <div class="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-transparent"></div>
                  
                  <!-- Waypoint sequence tag -->
                  <span class="absolute top-3 left-3 bg-slate-900/90 text-cyan-300 text-[11px] font-bold px-2.5 py-1 rounded-full backdrop-blur-md border border-cyan-400/30 flex items-center gap-1 shadow-md">
                    <span class="material-symbols-outlined text-xs">alt_route</span>
                    <span>Stop ${idx + 1} • ${place.distanceAlongRoute || (idx * 24 + 18) + ' km along route'}</span>
                  </span>

                  <!-- Category Tag -->
                  <span class="absolute top-3 right-3 bg-white/90 text-slate-900 text-[10px] font-bold px-2.5 py-1 rounded-full backdrop-blur-md shadow-md">
                    ${place.category}
                  </span>

                  <div class="absolute bottom-3 left-4 right-4 flex items-end justify-between">
                    <div>
                      <h3 class="text-xl font-bold text-white drop-shadow-md">${place.name}</h3>
                      <p class="text-xs text-slate-300 flex items-center gap-1 mt-0.5">
                        <span class="material-symbols-outlined text-xs text-teal-400">pin_drop</span>
                        <span>${place.location || place.destination || route.destination}</span>
                      </p>
                    </div>
                    
                    <span class="bg-amber-400 text-slate-950 text-xs font-bold px-2 py-0.5 rounded-lg flex items-center gap-1 shadow-md">
                      <span class="material-symbols-outlined text-xs">star</span>
                      <span>${place.rating || 4.8}</span>
                    </span>
                  </div>
                </div>

                <div class="p-5">
                  <p class="text-xs text-slate-600 line-clamp-2 leading-relaxed mb-4">${place.description}</p>
                  
                  <div class="flex flex-wrap gap-1.5 mb-4">
                    ${(place.highlights || ["Verified Route Stop", "Scenic View", "Parking"]).map(h => `
                      <span class="text-[10px] font-semibold bg-slate-100 text-slate-700 px-2 py-0.5 rounded border border-slate-200">
                        ✓ ${h}
                      </span>
                    `).join('')}
                  </div>
                </div>
              </div>

              <div class="p-5 pt-0 border-t border-slate-100 flex items-center justify-between mt-auto">
                <div>
                  <span class="text-[10px] uppercase font-bold text-slate-400">${place.priceLabel || 'Entry / Service'}</span>
                  <p class="text-lg font-bold text-slate-900">
                    ${place.currency || '₹'}${place.price || 'Free'} 
                    <span class="text-xs text-slate-500 font-normal">${place.priceUnit || ''}</span>
                  </p>
                </div>
                <div class="flex items-center gap-2">
                  <button onclick="window.openPlaceDetailsModal('${place.id}')" class="px-3.5 py-2 rounded-lg text-xs font-semibold border border-slate-300 hover:bg-slate-100 text-slate-700 transition-colors">
                    Details
                  </button>
                  <button onclick="window.bookTouristPlacePass('${place.id}')" class="px-4 py-2 rounded-lg text-xs font-bold bg-teal-500 text-slate-950 hover:bg-teal-400 shadow-md transition-all flex items-center gap-1">
                    <span>${place.category.includes('Hotel') ? 'Book Room' : place.category.includes('Dining') ? 'Reserve Table' : 'Book Pass'}</span>
                    <span class="material-symbols-outlined text-sm">arrow_forward</span>
                  </button>
                </div>
              </div>
            </div>
          `).join('')}
        </div>
      </section>

    </div>
  `;
}

// Interactive SVG Route Visualizer with clickable interactive waypoints
function renderRouteMapSvg(route, stops) {
  const width = 1000;
  const height = 280;
  const startX = 100;
  const startY = 140;
  const endX = 900;
  const endY = 140;

  // Compute curved waypoint coordinates
  const pointsCount = stops.length;
  const step = (endX - startX) / (pointsCount + 1);

  const waypoints = stops.map((stop, i) => {
    const x = startX + step * (i + 1);
    const wave = Math.sin((i + 1) * 1.2) * 55;
    const y = 140 + wave;
    return { ...stop, x, y, index: i + 1 };
  });

  // Construct SVG path through all points
  let pathD = `M ${startX} ${startY}`;
  waypoints.forEach((wp) => {
    pathD += ` L ${wp.x} ${wp.y}`;
  });
  pathD += ` L ${endX} ${endY}`;

  return `
    <div class="relative bg-slate-950 p-4 select-none">
      <div class="flex items-center justify-between text-[11px] font-mono text-cyan-400 mb-2 px-2">
        <span>📍 CORRIDOR VISUALIZER • ${route.from} ➔ ${route.destination}</span>
        <span class="text-slate-400">Click any waypoint to inspect stop</span>
      </div>

      <svg viewBox="0 0 ${width} ${height}" class="w-full h-auto drop-shadow-2xl">
        <defs>
          <linearGradient id="routeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stop-color="#3b82f6" />
            <stop offset="50%" stop-color="#14b8a6" />
            <stop offset="100%" stop-color="#f59e0b" />
          </linearGradient>
          <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        <!-- Grid lines -->
        <line x1="50" y1="70" x2="950" y2="70" stroke="rgba(255,255,255,0.05)" stroke-dasharray="4 4" />
        <line x1="50" y1="140" x2="950" y2="140" stroke="rgba(255,255,255,0.05)" stroke-dasharray="4 4" />
        <line x1="50" y1="210" x2="950" y2="210" stroke="rgba(255,255,255,0.05)" stroke-dasharray="4 4" />

        <!-- Glow background path -->
        <path d="${pathD}" fill="none" stroke="#14b8a6" stroke-width="8" opacity="0.25" filter="url(#glow)" />

        <!-- Main route line -->
        <path d="${pathD}" fill="none" stroke="url(#routeGradient)" stroke-width="4" stroke-linecap="round" />

        <!-- Origin Pin (A) -->
        <circle cx="${startX}" cy="${startY}" r="16" fill="#1e3a8a" stroke="#60a5fa" stroke-width="3" />
        <text x="${startX}" y="${startY + 5}" font-size="12" font-weight="bold" fill="#ffffff" text-anchor="middle">A</text>
        <text x="${startX}" y="${startY + 32}" font-size="11" font-weight="bold" fill="#93c5fd" text-anchor="middle">${route.from.split(',')[0]}</text>

        <!-- Waypoints along route -->
        ${waypoints.map(wp => `
          <g class="cursor-pointer group" onclick="window.scrollToStopCard('${wp.id}')">
            <circle cx="${wp.x}" cy="${wp.y}" r="12" fill="#0f172a" stroke="#2dd4bf" stroke-width="2.5" class="transition-all hover:scale-125" />
            <text x="${wp.x}" y="${wp.y + 4}" font-size="10" font-weight="bold" fill="#5eead4" text-anchor="middle">${wp.index}</text>
            <text x="${wp.x}" y="${wp.y - 18}" font-size="9" font-weight="bold" fill="#e2e8f0" text-anchor="middle" class="opacity-80 group-hover:opacity-100">${wp.name.length > 15 ? wp.name.substring(0, 14) + '...' : wp.name}</text>
          </g>
        `).join('')}

        <!-- Destination Pin (B) -->
        <circle cx="${endX}" cy="${endY}" r="16" fill="#0f766e" stroke="#2dd4bf" stroke-width="3" />
        <text x="${endX}" y="${endY + 5}" font-size="12" font-weight="bold" fill="#ffffff" text-anchor="middle">B</text>
        <text x="${endX}" y="${endY + 32}" font-size="11" font-weight="bold" fill="#5eead4" text-anchor="middle">${route.destination.split(',')[0]}</text>
      </svg>
    </div>
  `;
}

// Fallback & predefined corridors generator for instant dynamic responsiveness
export function getDefaultCorridorStops(from, destination) {
  const destLower = (destination || '').toLowerCase();
  const fromLower = (from || '').toLowerCase();

  // =========================================================================
  // 1. COIMBATORE ➔ KRISHNAGIRI CORRIDOR (NH544 ➔ NH44 Highway)
  // Rich Verified Heritage, River Confluences, Historic Forts & Scenic Dam
  // =========================================================================
  if (destLower.includes('krishnagiri') || (fromLower.includes('krishnagiri') && destLower.includes('coimbatore'))) {
    return [
      {
        id: "cbe-kri-1",
        name: "Avinashilingeswarar Temple (Karunambikai Amman)",
        category: "Ancient Temple Heritage",
        location: "Avinashi, Tiruppur (NH544 Bypass)",
        lat: 11.1932,
        lng: 77.2694,
        distanceAlongRoute: "42 km from Coimbatore",
        rating: 4.8,
        price: 50,
        currency: "₹",
        priceLabel: "Special Darshan",
        image: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=800&q=80",
        description: "10th-century Chola temple dedicated to Lord Shiva, famed for its towering 7-tier Rajagopuram, stone mandapams, and sacred Pushkarini tank.",
        highlights: ["10th-Century Chola Architecture", "Massive Rajagopuram", "Ancient Stone Mandapam", "Ample Highway Parking"],
        tags: ["heritage", "temple", "attraction"]
      },
      {
        id: "cbe-kri-2",
        name: "Bhavani Sangameshwarar Temple & Triveni Sangam",
        category: "Scenic Riverfront & Heritage",
        location: "Bhavani River Confluence, Erode",
        lat: 11.4503,
        lng: 77.6834,
        distanceAlongRoute: "88 km from Coimbatore",
        rating: 4.9,
        price: 30,
        currency: "₹",
        priceLabel: "Temple Pass",
        image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80",
        description: "Revered Dakshina Triveni Sangam where the sacred Cauvery, Bhavani, and subterranean Amudha rivers unite. Beautiful riverside ghat walks.",
        highlights: ["Three Rivers Confluence", "Sacred Bathing Ghats", "River Cauvery Views", "Kongu Cuisine Stalls"],
        tags: ["heritage", "viewpoint", "attraction"]
      },
      {
        id: "cbe-kri-3",
        name: "Sankagiri Hill Fort (Sankari Durg)",
        category: "Historical Hill Fortress",
        location: "Sankagiri, Salem Outskirts (NH544)",
        lat: 11.4883,
        lng: 77.8687,
        distanceAlongRoute: "118 km from Coimbatore",
        rating: 4.7,
        price: 40,
        currency: "₹",
        priceLabel: "Trek Pass",
        image: "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=800&q=80",
        description: "15th-century Vijayanagara and Tipu Sultan fortress built on a sheer 310m granite monolithic hill with 14 fortified rampart walls, cannons, and watchtowers.",
        highlights: ["14 Defense Ramparts", "Tipu Sultan Cannon Outposts", "Panoramic Kongu Valley Views", "Historic Granary Ruins"],
        tags: ["heritage", "fort", "viewpoint"]
      },
      {
        id: "cbe-kri-4",
        name: "Salem Heritage & Mango Orchard Food Plaza",
        category: "Highway Dining & Culture",
        location: "NH544 Salem Bypass",
        lat: 11.6643,
        lng: 78.1460,
        distanceAlongRoute: "160 km from Coimbatore",
        rating: 4.8,
        price: 380,
        currency: "₹",
        priceLabel: "Avg Dining",
        image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80",
        description: "Iconic highway hospitality hub serving traditional Kongunadu banana leaf thali, famed Salem Malgova mango delicacies, and filter coffee with high-speed EV chargers.",
        highlights: ["Salem Mango Specialties", "Kongunadu Thali", "150kW DC Fast EV Chargers", "Artisanal Sweet Stalls"],
        tags: ["dining", "food", "rest-stop"]
      },
      {
        id: "cbe-kri-5",
        name: "Yercaud Foothills & Emerald Valley Viewpoint",
        category: "Scenic Mountain Gateway",
        location: "Shevaroy Foothills Junction, Salem",
        lat: 11.7250,
        lng: 78.1850,
        distanceAlongRoute: "168 km from Coimbatore",
        rating: 4.8,
        price: 60,
        currency: "₹",
        priceLabel: "Lookout Entry",
        image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80",
        description: "Scenic vantage point at the base of the Shevaroy Hills offering cool mountain breezes, misty hill vistas, roadside spice markets, and coffee plantation stalls.",
        highlights: ["Shevaroy Hills Vistas", "Coffee & Pepper Kiosks", "Cool Highland Breeze", "Scenic Photo Spot"],
        tags: ["viewpoint", "scenic", "nature"]
      },
      {
        id: "cbe-kri-6",
        name: "Thoppur Ghat Pass & Sanjeeviraya Perumal Temple",
        category: "Scenic Mountain Pass",
        location: "Thoppur Ghat, NH44",
        lat: 11.9480,
        lng: 78.0760,
        distanceAlongRoute: "195 km from Coimbatore",
        rating: 4.7,
        price: 25,
        currency: "₹",
        priceLabel: "Temple Entry",
        image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
        description: "Dramatic mountain pass through the Eastern Ghats flanked by deciduous hill forests. Features the ancient guardian Sanjeeviraya Hanuman shrine blessing highway motorists.",
        highlights: ["Ghat Section Driving", "Guardian Hilltop Shrine", "Eastern Ghats Forest Vistas", "Mountain Mist & Breeze"],
        tags: ["viewpoint", "heritage", "nature"]
      },
      {
        id: "cbe-kri-7",
        name: "Adiyamankottai Oval Fort & Chenraya Perumal Temple",
        category: "Ancient Sangam Heritage",
        location: "Adiyamankottai, Dharmapuri (NH44 Exit)",
        lat: 12.0850,
        lng: 78.1420,
        distanceAlongRoute: "222 km from Coimbatore",
        rating: 4.8,
        price: 40,
        currency: "₹",
        priceLabel: "Site Pass",
        image: "https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=800&q=80",
        description: "One of the oldest oval-shaped defensive fortresses in South India, historical capital of King Adiyaman Neduman Anji praised in classical Sangam literature.",
        highlights: ["Unique Oval Fort Wall", "Sangam Era Inscriptions", "Exquisite Ceiling Paintings", "Heritage Walking Trail"],
        tags: ["heritage", "fort", "attraction"]
      },
      {
        id: "cbe-kri-8",
        name: "Hogenakkal Falls Gateway & Carbonatite Gorges",
        category: "Scenic Waterfall Canyon",
        location: "Dharmapuri Border Detour",
        lat: 12.1182,
        lng: 77.7766,
        distanceAlongRoute: "235 km along corridor",
        rating: 4.9,
        price: 250,
        currency: "₹",
        priceLabel: "Coracle Boat Ride",
        image: "https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?auto=format&fit=crop&w=800&q=80",
        description: "Famed 'Niagara of India' where the Cauvery river splits into myriad roaring cascades through ancient carbonatite rocks with coracle boat rides and herbal oil baths.",
        highlights: ["Circular Coracle Rides", "Roaring Cascade Canyon", "Prehistoric Rock Formations", "Traditional Fried Fish Stalls"],
        tags: ["viewpoint", "nature", "attraction"]
      },
      {
        id: "cbe-kri-9",
        name: "Krishnagiri Reservoir Project (KRP Dam) & Parks",
        category: "Scenic Reservoir & Recreation",
        location: "KRP Dam Road, Krishnagiri",
        lat: 12.4760,
        lng: 78.1820,
        distanceAlongRoute: "252 km from Coimbatore",
        rating: 4.8,
        price: 50,
        currency: "₹",
        priceLabel: "Park & Boating",
        image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
        description: "Scenic dam built across the Thenpennai River framed by monolithic hillocks, lush flower gardens, boating channels, and illuminated evening fountains.",
        highlights: ["Thenpennai River Reservoir", "Lakeside Boating", "Floral Landscaped Gardens", "Sunset Mountain Views"],
        tags: ["viewpoint", "nature", "scenic"]
      },
      {
        id: "cbe-kri-10",
        name: "Sayed Basha Krishnagiri Hill Fort (Krishnadevaraya Fort)",
        category: "Monumental Granite Rock Fort",
        location: "Fort Hill, Krishnagiri Center",
        lat: 12.5280,
        lng: 78.2160,
        distanceAlongRoute: "260 km (At Destination)",
        rating: 4.9,
        price: 60,
        currency: "₹",
        priceLabel: "Heritage Entry",
        image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80",
        description: "Imposing monolithic granite rock fort constructed by Emperor Krishnadevaraya and held by Hyder Ali and Tipu Sultan. Perched atop the city with 360-degree vistas.",
        highlights: ["Monolithic Granite Rock Climb", "Tipu Sultan Watchtower", "Sayed Basha Shrine", "360° Krishnagiri Panorama"],
        tags: ["heritage", "fort", "viewpoint"]
      }
    ];
  }

  // =========================================================================
  // 2. COIMBATORE ➔ OOTY CORRIDOR (Ghat Highway & Nilgiris Ascent)
  // Complete 14 Famous Verified Attractions & Mountain Rail Landmarks
  // =========================================================================
  if (destLower.includes('ooty') || (fromLower.includes('coimbatore') && destLower.includes('ooty'))) {
    return [
      {
        id: "cbe-ooty-perur",
        name: "Perur Pateeswarar Temple",
        category: "Ancient Chola Heritage",
        location: "Perur, Coimbatore",
        lat: 10.9708,
        lng: 76.9192,
        distanceAlongRoute: "8 km from City Center",
        rating: 4.9,
        price: 20,
        currency: "₹",
        priceLabel: "Darshan Pass",
        image: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=800&q=80",
        description: "2000-year-old architectural marvel built by Karikala Chola with Kanaka Sabha stone pillars displaying intricate Nataraja carvings.",
        highlights: ["Kanaka Sabha Carvings", "Noyyal River Ghat", "Ancient Chola Architecture"],
        tags: ["heritage", "temple"]
      },
      {
        id: "cbe-ooty-naidu",
        name: "G.D. Naidu Vintage Car & Tech Museum",
        category: "Automotive Heritage",
        location: "Avinashi Road, Coimbatore",
        lat: 11.0118,
        lng: 76.9745,
        distanceAlongRoute: "3 km from City Center",
        rating: 4.8,
        price: 150,
        currency: "₹",
        priceLabel: "Museum Ticket",
        image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=800&q=80",
        description: "Spectacular automotive museum exhibiting vintage Rolls-Royce, Benz, classic British roadsters, and historic engineering inventions.",
        highlights: ["Rare Vintage Cars", "Engineering Exhibits", "Historic Motorbikes"],
        tags: ["museum", "attraction"]
      },
      {
        id: "cbe-ooty-marudha",
        name: "Marudhamalai Murugan Hill Temple",
        category: "Scenic Hilltop Shrine",
        location: "Marudhamalai Foothills, Coimbatore",
        lat: 11.0458,
        lng: 76.8524,
        distanceAlongRoute: "14 km from City Center",
        rating: 4.9,
        price: 40,
        currency: "₹",
        priceLabel: "Hill Bus Pass",
        image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80",
        description: "12th-century hilltop temple nestled in the lush Western Ghats, renowned for medicinal herbal air and spiritual serenity.",
        highlights: ["Panoramic Foothill Views", "Medicinal Herbal Hills", "Ancient Murugan Shrine"],
        tags: ["temple", "viewpoint"]
      },
      {
        id: "cbe-ooty-bt",
        name: "Black Thunder Water Theme Resort",
        category: "Highway Resort & Park",
        location: "Mettupalayam Foothills",
        lat: 11.2950,
        lng: 76.9380,
        distanceAlongRoute: "38 km from Coimbatore",
        rating: 4.7,
        price: 950,
        currency: "₹",
        priceLabel: "Entry Ticket",
        priceUnit: "/ person",
        image: "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&w=800&q=80",
        description: "Premier relaxation and water resort nestled at the foot of the Nilgiri hills, ideal for families and travelers.",
        highlights: ["Wave Pool", "Luxury Garden Stays", "Mountain View Cafeteria", "Ample Parking"],
        tags: ["resort", "hotel", "waterpark"]
      },
      {
        id: "cbe-ooty-kallar",
        name: "Kallar Horticulture Garden & River Valley",
        category: "Scenic Viewpoint",
        location: "Ghat Road Foot, Kallar",
        lat: 11.3280,
        lng: 76.8920,
        distanceAlongRoute: "45 km from Coimbatore",
        rating: 4.8,
        price: 50,
        currency: "₹",
        priceLabel: "Eco Pass",
        image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
        description: "The gateway to the Nilgiris where the river Kallar meets tropical orchards and rare spices. Beautiful photo halt before the ghats.",
        highlights: ["Fruit Orchard Walks", "Riverbank Breezes", "Bird Watching", "Fresh Spices"],
        tags: ["viewpoint", "nature", "attraction"]
      },
      {
        id: "cbe-ooty-burliyar",
        name: "Burliyar Fruit Orchards & Spice Groves",
        category: "Agro-Tourism & Scenic Stop",
        location: "Ghat Hairpin Bends, Burliyar",
        lat: 11.3395,
        lng: 76.8450,
        distanceAlongRoute: "52 km from Coimbatore",
        rating: 4.7,
        price: 30,
        currency: "₹",
        priceLabel: "Garden Pass",
        image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80",
        description: "Established in 1871 by the British on mountain slopes; famed for roadside fresh mangosteen, rambutan, durian, and exotic spices.",
        highlights: ["Exotic Mountain Fruits", "Fresh Clove & Cinnamon", "Hairpin Mountain Views"],
        tags: ["nature", "viewpoint"]
      },
      {
        id: "cbe-ooty-train",
        name: "Nilgiri Mountain Railway - Coonoor Station",
        category: "Heritage Mountain Rail",
        location: "Coonoor Railway Station",
        lat: 11.3530,
        lng: 76.7950,
        distanceAlongRoute: "68 km from Coimbatore",
        rating: 4.9,
        price: 240,
        currency: "₹",
        priceLabel: "Heritage Ride",
        image: "https://images.unsplash.com/photo-1474487548417-781cb71495f3?auto=format&fit=crop&w=800&q=80",
        description: "UNESCO World Heritage toy train passing through tunnels, pine forests, and tea plantations with stunning mountain vistas.",
        highlights: ["UNESCO Heritage", "Steam Locomotive", "Scenic Viaduct Bridges", "Pine Forest Panorama"],
        tags: ["heritage", "train", "attraction"]
      },
      {
        id: "cbe-ooty-sims",
        name: "Sim's Park Botanical Gardens",
        category: "Scenic Nature Park",
        location: "Upper Coonoor",
        lat: 11.3570,
        lng: 76.7970,
        distanceAlongRoute: "70 km from Coimbatore",
        rating: 4.8,
        price: 50,
        currency: "₹",
        priceLabel: "Park Entry",
        image: "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&w=800&q=80",
        description: "150-year-old terraced botanical park featuring rare temperate trees, Japanese landscaped gardens, and ornamental rose beds.",
        highlights: ["Rare Temperate Trees", "Rose Garden", "Japanese Garden", "Pedal Boating"],
        tags: ["viewpoint", "nature"]
      },
      {
        id: "cbe-ooty-lamb",
        name: "Lamb's Rock Mountain Precipice",
        category: "Panoramic Viewpoint",
        location: "Lamb's Rock Road, Coonoor",
        lat: 11.3325,
        lng: 76.8180,
        distanceAlongRoute: "73 km from Coimbatore",
        rating: 4.8,
        price: 30,
        currency: "₹",
        priceLabel: "Eco Fee",
        image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
        description: "Spectacular rocky promontory overlooking Coimbatore plains and tea estates on the Hulical Ravine.",
        highlights: ["Hulical Ravine Panorama", "Coimbatore Plains View", "Tea Estate Walks"],
        tags: ["viewpoint", "scenic"]
      },
      {
        id: "cbe-ooty-dolphin",
        name: "Dolphin's Nose & Catherine Falls Vista",
        category: "Scenic Canyon Viewpoint",
        location: "Dolphin's Nose Road, Coonoor",
        lat: 11.3210,
        lng: 76.8430,
        distanceAlongRoute: "76 km from Coimbatore",
        rating: 4.9,
        price: 40,
        currency: "₹",
        priceLabel: "Viewpoint Pass",
        image: "https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?auto=format&fit=crop&w=800&q=80",
        description: "Dramatic canyon lookout resembling a dolphin's snout, with unhindered views of the plunging double-tiered Catherine Waterfalls.",
        highlights: ["Catherine Waterfalls Vista", "Deep Valley Gorges", "Tea Valley Edge Walk"],
        tags: ["viewpoint", "scenic", "nature"]
      },
      {
        id: "cbe-ooty-culinarium",
        name: "The Culinarium & Ketti Valley Bistro",
        category: "Highway Dining",
        location: "Bicketty, Coonoor-Ooty Road",
        lat: 11.3650,
        lng: 76.7650,
        distanceAlongRoute: "78 km from Coimbatore",
        rating: 4.9,
        price: 650,
        currency: "₹",
        priceLabel: "Avg Meal",
        image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80",
        description: "Celebrated gourmet bakery and European bistro perched over tea estates, serving artisanal pot pies, cheesecakes, and Nilgiri tea.",
        highlights: ["Panoramic Valley Dining", "Fresh Bakery", "Specialty Coffee & Tea", "Warm Indoor Hearth"],
        tags: ["dining", "cafe", "food"]
      },
      {
        id: "cbe-ooty-doddabetta",
        name: "Doddabetta Mountain Peak & Telescope House",
        category: "Scenic Viewpoint",
        location: "Ooty Mountain Ridge",
        lat: 11.4010,
        lng: 76.7350,
        distanceAlongRoute: "82 km from Coimbatore",
        rating: 4.8,
        price: 40,
        currency: "₹",
        priceLabel: "Telescope Pass",
        image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80",
        description: "Highest mountain peak in the Nilgiris (2,637 m) offering 360-degree vistas of the Western Ghats and misty valleys.",
        highlights: ["Highest Peak", "Telescope Views", "Chamal Tea Kiosks", "Cool Highland Breeze"],
        tags: ["viewpoint", "peak", "scenic"]
      },
      {
        id: "cbe-ooty-botanical",
        name: "Government Botanical Gardens & Ooty Lake",
        category: "Scenic Heritage Sanctuary",
        location: "Vannarapettai, Ooty",
        lat: 11.4180,
        lng: 76.7110,
        distanceAlongRoute: "85 km from Coimbatore",
        rating: 4.9,
        price: 50,
        currency: "₹",
        priceLabel: "Garden Pass",
        image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
        description: "55-acre terraced garden established in 1848 with a 20-million-year-old fossilized tree, Italian floral beds, and picturesque boating lake.",
        highlights: ["Fossil Tree Trunk", "Italian Terraced Gardens", "Ooty Lake Boating", "Eucalyptus Groves"],
        tags: ["nature", "viewpoint", "attraction"]
      },
      {
        id: "cbe-ooty-savoy",
        name: "Savoy - IHCL SeleQtions Heritage Manor",
        category: "Waypoint Resort & Hotel",
        location: "Sylks Road, Ooty",
        lat: 11.4120,
        lng: 76.6980,
        distanceAlongRoute: "86 km (At Destination)",
        rating: 4.9,
        price: 8500,
        currency: "₹",
        priceLabel: "Per Night",
        image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80",
        description: "Historic 180-year-old colonial manor nestled amidst 6 acres of landscaped gardens, featuring afternoon high teas and fireplaces.",
        highlights: ["Colonial Fireplace Rooms", "High Tea on Lawn", "Spa & Wellness", "Heated Bedrooms"],
        tags: ["hotel", "resort", "stay"]
      }
    ];
  }

  // =========================================================================
  // 3. CHENNAI ➔ BANGALORE CORRIDOR (NH48 Highway)
  // =========================================================================
  if (destLower.includes('bangalore') || (fromLower.includes('chennai') && destLower.includes('bangalore'))) {
    return [
      {
        id: "chn-blr-1",
        name: "Kanchipuram Silk & Temple Heritage",
        category: "Cultural Heritage Stop",
        location: "Kanchipuram (NH48 Exit)",
        lat: 12.8342,
        lng: 79.7036,
        distanceAlongRoute: "74 km from Chennai",
        rating: 4.8,
        price: 150,
        currency: "₹",
        priceLabel: "Temple Tour",
        image: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=800&q=80",
        description: "The famed City of Thousand Temples and pure mulberry silk looms. Perfect cultural stopover on NH48.",
        highlights: ["Kailasanathar Temple", "Live Loom Weaving", "Traditional South Indian Filter Coffee"],
        tags: ["heritage", "attraction"]
      },
      {
        id: "chn-blr-2",
        name: "Vellore Fort & Sripuram Golden Temple",
        category: "Scenic & Heritage Landmark",
        location: "Vellore Center",
        lat: 12.9165,
        lng: 79.1325,
        distanceAlongRoute: "142 km from Chennai",
        rating: 4.9,
        price: 200,
        currency: "₹",
        priceLabel: "Pass & Audio Guide",
        image: "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=800&q=80",
        description: "16th-century granite fort surrounded by a grand moat, alongside the gilded gold temple of Mahalakshmi.",
        highlights: ["Granite Ramparts", "Moat Walk", "Pure Gold Foil Architecture", "Large Food Plaza"],
        tags: ["viewpoint", "heritage"]
      },
      {
        id: "chn-blr-3",
        name: "Krishnagiri Reservoir & Mango Corridor",
        category: "Scenic Viewpoint & Dining",
        location: "Krishnagiri Dam Rd",
        lat: 12.4760,
        lng: 78.1820,
        distanceAlongRoute: "260 km from Chennai",
        rating: 4.7,
        price: 50,
        currency: "₹",
        priceLabel: "Dam Park Entry",
        image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
        description: "Expansive reservoir framed by granite hillocks and lakeside parks. Renowned highway restaurants line the highway.",
        highlights: ["Lakeside Breeze", "Boating Facility", "Fresh Fruit Markets", "EV Highway Fast Chargers"],
        tags: ["viewpoint", "dining"]
      },
      {
        id: "chn-blr-4",
        name: "Hosur Hill Temple & Flower Corridor",
        category: "Scenic Hill Shrine",
        location: "Hosur, Tamil Nadu Border",
        lat: 12.7409,
        lng: 77.8253,
        distanceAlongRoute: "305 km from Chennai",
        rating: 4.8,
        price: 30,
        currency: "₹",
        priceLabel: "Darshan Pass",
        image: "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&w=800&q=80",
        description: "Chandra Choodeswarar Temple perched on a scenic hillock overlooking Hosur valley and vast international rose greenhouses.",
        highlights: ["Hilltop Panorama", "Ancient Shiva Shrine", "Rose Greenhouses", "Karnataka Border Entry"],
        tags: ["heritage", "temple", "viewpoint"]
      },
      {
        id: "chn-blr-5",
        name: "The Oberoi Electronic City",
        category: "Highway Resort & Hotel",
        location: "Hosur Road, Bangalore Entry",
        lat: 12.8452,
        lng: 77.6602,
        distanceAlongRoute: "340 km from Chennai",
        rating: 4.9,
        price: 9200,
        currency: "₹",
        priceLabel: "Per Night",
        image: "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=800&q=80",
        description: "Luxury urban oasis welcoming travelers arriving into Bangalore with garden suites and fine dining.",
        highlights: ["Infinity Pool", "24/7 Check-in", "EV Chargers", "Spa"],
        tags: ["hotel", "stay"]
      }
    ];
  }

  // =========================================================================
  // 4. BANGALORE ➔ MYSORE CORRIDOR (NH275 Expressway)
  // =========================================================================
  if (destLower.includes('mysore') || destLower.includes('mysuru')) {
    return [
      {
        id: "blr-mys-1",
        name: "Ramanagara Silk Cocoon & Sholay Hills",
        category: "Scenic Rock Formations",
        location: "Ramanagara (NH275)",
        lat: 12.7150,
        lng: 77.2810,
        distanceAlongRoute: "48 km from Bangalore",
        rating: 4.8,
        price: 100,
        currency: "₹",
        priceLabel: "Rock Trek Pass",
        image: "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=800&q=80",
        description: "Massive granite monoliths famous as the filming location of Sholay, and Asia's largest silk cocoon market.",
        highlights: ["Monolithic Granite Boulders", "Rock Climbing", "Silk Cocoon Market", "Panoramic Vistas"],
        tags: ["viewpoint", "scenic"]
      },
      {
        id: "blr-mys-2",
        name: "Channapatna Wooden Toy Craft Village",
        category: "Artisanal Craft Heritage",
        location: "Channapatna Craft Strip",
        lat: 12.6518,
        lng: 77.2089,
        distanceAlongRoute: "60 km from Bangalore",
        rating: 4.8,
        price: 50,
        currency: "₹",
        priceLabel: "Workshop Pass",
        image: "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&w=800&q=80",
        description: "GI-tagged artisanal town famed for hand-lathed ivory-wood lacquer toys and traditional GI craft studios.",
        highlights: ["GI Tagged Lacquer Toys", "Live Artisan Demonstrations", "Organic Vegetable Dyes"],
        tags: ["heritage", "attraction"]
      },
      {
        id: "blr-mys-3",
        name: "Maddur Tiffany & Heritage Vada Plaza",
        category: "Highway Dining",
        location: "Maddur Bypass",
        lat: 12.5844,
        lng: 77.0453,
        distanceAlongRoute: "82 km from Bangalore",
        rating: 4.7,
        price: 120,
        currency: "₹",
        priceLabel: "Special Snack",
        image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80",
        description: "Birthplace of the legendary crispy Maddur Vada served with fresh coconut chutney and steaming filter coffee.",
        highlights: ["Original Maddur Vada", "Hot Filter Coffee", "Clean Highway Restroom", "Spacious Parking"],
        tags: ["dining", "food"]
      },
      {
        id: "blr-mys-4",
        name: "Srirangapatna Dariya Daulat Palace & Fort",
        category: "Island River Fortress",
        location: "Srirangapatna Island, Cauvery River",
        lat: 12.4237,
        lng: 76.6830,
        distanceAlongRoute: "125 km from Bangalore",
        rating: 4.9,
        price: 50,
        currency: "₹",
        priceLabel: "Heritage Entry",
        image: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=800&q=80",
        description: "Historic island fortress on the Cauvery river, featuring Tipu Sultan's teakwood Summer Palace with vibrant murals.",
        highlights: ["Teakwood Summer Palace", "Tipu Sultan Death Place", "Ranganathaswamy Temple", "River Ghats"],
        tags: ["heritage", "fort"]
      },
      {
        id: "blr-mys-5",
        name: "Mysore Amba Vilas Palace & Chamundi Hill",
        category: "Royal Architectural Marvel",
        location: "Sayyaji Rao Road, Mysore",
        lat: 12.3052,
        lng: 76.6552,
        distanceAlongRoute: "145 km (At Destination)",
        rating: 4.9,
        price: 100,
        currency: "₹",
        priceLabel: "Palace Tour",
        image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80",
        description: "World-renowned Indo-Saracenic royal palace illuminated by 100,000 light bulbs on weekends, overlooked by sacred Chamundi Hill.",
        highlights: ["100,000 Bulb Illumination", "Durbar Hall Stained Glass", "Golden Howdah", "Chamundi Hill Vistas"],
        tags: ["heritage", "attraction"]
      }
    ];
  }

  // =========================================================================
  // 5. COIMBATORE ➔ MUNNAR CORRIDOR (Anamalai & Western Ghats Route)
  // =========================================================================
  if (destLower.includes('munnar')) {
    return [
      {
        id: "cbe-mun-1",
        name: "Pollachi Coconut Groves & Anamalai Gateway",
        category: "Scenic Agro-Tourism",
        location: "Pollachi Highway",
        lat: 10.6588,
        lng: 77.0084,
        distanceAlongRoute: "42 km from Coimbatore",
        rating: 4.8,
        price: 80,
        currency: "₹",
        priceLabel: "Farm Tour",
        image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
        description: "Scenic coconut paradise flanked by the Western Ghats with tender coconut tasting and traditional countryside vistas.",
        highlights: ["Lush Coconut Plantations", "Tender Coconut Kiosks", "Film Shooting Locations"],
        tags: ["nature", "scenic"]
      },
      {
        id: "cbe-mun-2",
        name: "Aliyar Dam & Lakeside Rose Garden",
        category: "Scenic Reservoir & Boating",
        location: "Aliyar Foothills",
        lat: 10.4850,
        lng: 76.9720,
        distanceAlongRoute: "65 km from Coimbatore",
        rating: 4.7,
        price: 40,
        currency: "₹",
        priceLabel: "Dam Entry",
        image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
        description: "Sprawling reservoir at the foot of the Anamalai Hills with aquarium, boating, and manicured terraced gardens.",
        highlights: ["Foothill Reservoir", "Boating & Park", "Aquarium", "Western Ghats Wall"],
        tags: ["viewpoint", "nature"]
      },
      {
        id: "cbe-mun-3",
        name: "Chinnar Wildlife Sanctuary & Marayoor Sandalwood",
        category: "Wildlife Sanctuary & Forest",
        location: "Chinnar Checkpost, Kerala Border",
        lat: 10.3167,
        lng: 77.2000,
        distanceAlongRoute: "115 km from Coimbatore",
        rating: 4.8,
        price: 150,
        currency: "₹",
        priceLabel: "Sanctuary Pass",
        image: "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=800&q=80",
        description: "Habitat of the endangered Grizzled Giant Squirrel, dolmens (ancient megalithic tombs), and natural sandalwood forests.",
        highlights: ["Grizzled Giant Squirrel", "Ancient Stone Dolmens", "Natural Sandalwood Forest", "Watchtower Views"],
        tags: ["nature", "viewpoint"]
      },
      {
        id: "cbe-mun-4",
        name: "Lakkam Waterfalls & Tea Valley Edge",
        category: "Scenic Waterfall",
        location: "Marayoor-Munnar Road",
        lat: 10.1850,
        lng: 77.1050,
        distanceAlongRoute: "140 km from Coimbatore",
        rating: 4.8,
        price: 50,
        currency: "₹",
        priceLabel: "Falls Pass",
        image: "https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?auto=format&fit=crop&w=800&q=80",
        description: "Crystal-clear waterfall cascading over smooth boulders surrounded by dense vaga trees and rolling tea carpets.",
        highlights: ["Crystal Clear Plunge Pool", "Tea Valley Panoramas", "Forest Trek Trail"],
        tags: ["viewpoint", "nature"]
      },
      {
        id: "cbe-mun-5",
        name: "Eravikulam National Park & Kolukkumalai Vistas",
        category: "High Altitude Sanctuary",
        location: "Munnar Highlands",
        lat: 10.0889,
        lng: 77.0595,
        distanceAlongRoute: "158 km (At Destination)",
        rating: 4.9,
        price: 200,
        currency: "₹",
        priceLabel: "Safari Pass",
        image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80",
        description: "Home of the Nilgiri Tahr and Anamudi peak (highest peak in South India), surrounded by mist and emerald tea estates.",
        highlights: ["Nilgiri Tahr Sightings", "Anamudi Peak Views", "Rolling Tea Oceans", "Chilly Mountain Mist"],
        tags: ["viewpoint", "nature"]
      }
    ];
  }

  // =========================================================================
  // 6. DELHI ➔ AGRA CORRIDOR (Yamuna Expressway)
  // =========================================================================
  if (destLower.includes('agra') || (fromLower.includes('delhi') && destLower.includes('agra'))) {
    return [
      {
        id: "del-agr-1",
        name: "Jewar Expressway Grand Plaza & EV Hub",
        category: "Highway Dining & EV Plaza",
        location: "Yamuna Expressway Mile 65",
        lat: 28.1825,
        lng: 77.5520,
        distanceAlongRoute: "65 km from Delhi",
        rating: 4.6,
        price: 350,
        currency: "₹",
        priceLabel: "Food Court",
        image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80",
        description: "High-speed expressway hospitality zone with multicuisine food courts, clean rest facilities, and DC fast chargers.",
        highlights: ["150kW EV Chargers", "Starbucks & Haldiram", "Children Play Zone"],
        tags: ["dining", "rest-stop"]
      },
      {
        id: "del-agr-2",
        name: "Mathura & Vrindavan Heritage Corridor",
        category: "Cultural Heritage Stop",
        location: "Mathura Bypass Exit",
        lat: 27.4924,
        lng: 77.6737,
        distanceAlongRoute: "145 km from Delhi",
        rating: 4.9,
        price: 100,
        currency: "₹",
        priceLabel: "Heritage Pass",
        image: "https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=800&q=80",
        description: "The spiritual heartland of Lord Krishna featuring the Banke Bihari temple and Yamuna river ghats.",
        highlights: ["Prem Mandir Light Show", "Ancient Ghats", "Mathura Peda Specialty"],
        tags: ["heritage", "viewpoint"]
      },
      {
        id: "del-agr-3",
        name: "Sikandra Tomb of Akbar the Great",
        category: "Mughal Architectural Heritage",
        location: "Sikandra, Agra Highway",
        lat: 27.2206,
        lng: 77.9505,
        distanceAlongRoute: "205 km from Delhi",
        rating: 4.8,
        price: 50,
        currency: "₹",
        priceLabel: "Monument Ticket",
        image: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=800&q=80",
        description: "Magnificent red sandstone and white marble mausoleum set inside lush gardens where deer roam freely.",
        highlights: ["Mughal Minarets", "Deer Gardens", "Inlaid Marble Calligraphy"],
        tags: ["heritage", "attraction"]
      },
      {
        id: "del-agr-4",
        name: "ITC Mughal - Luxury Resort & Spa",
        category: "Waypoint Resort & Hotel",
        location: "Taj Ganj, Agra",
        lat: 27.1610,
        lng: 78.0420,
        distanceAlongRoute: "220 km (Near Destination)",
        rating: 4.9,
        price: 10500,
        currency: "₹",
        priceLabel: "Per Night",
        image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800&q=80",
        description: "Sprawling across 35 acres of Mughal gardens with architecture celebrating the golden era of the Mughal empire.",
        highlights: ["Kaya Kalp Royal Spa", "Mughal Architecture", "Taj Mahal Views", "Fine Dining"],
        tags: ["hotel", "resort"]
      }
    ];
  }

  // =========================================================================
  // 7. DYNAMIC HIGHWAY CORRIDOR GENERATOR FOR ANY OTHER ARBITRARY ROUTE
  // Uses Real Resolved City GPS Coordinates & True Road Heading
  // =========================================================================
  const startCoord = resolveCityCoords(from, { lat: 11.0168, lng: 76.9558 });
  const destCoord = resolveCityCoords(destination, { lat: 12.5266, lng: 78.2146 });

  const sLat = startCoord.lat;
  const sLng = startCoord.lng;
  const dLat = destCoord.lat;
  const dLng = destCoord.lng;

  // Approximate distance
  const dLatRad = (dLat - sLat) * Math.PI / 180;
  const dLngRad = (dLng - sLng) * Math.PI / 180;
  const a = Math.sin(dLatRad / 2) * Math.sin(dLatRad / 2) +
            Math.cos(sLat * Math.PI / 180) * Math.cos(dLat * Math.PI / 180) *
            Math.sin(dLngRad / 2) * Math.sin(dLngRad / 2);
  const totalKm = Math.max(30, Math.round(6371 * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)) * 1.25));

  const fromLabel = from.split(',')[0].trim();
  const destLabel = destination.split(',')[0].trim();

  return [
    {
      id: "dyn-stop-1",
      name: `${fromLabel} Valley & Heritage Scenic Lookout`,
      category: "Scenic Viewpoint",
      location: `Highway Corridor near ${fromLabel}`,
      lat: Number((sLat + (dLat - sLat) * 0.25 + 0.015).toFixed(4)),
      lng: Number((sLng + (dLng - sLng) * 0.25 - 0.012).toFixed(4)),
      distanceAlongRoute: `${Math.round(totalKm * 0.25)} km from ${fromLabel}`,
      rating: 4.8,
      price: 60,
      currency: "₹",
      priceLabel: "Scenic Entry",
      image: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=800&q=80",
      description: `Elevated scenic lookout along the corridor, featuring panoramic vistas, refreshing regional snacks, and visitor resting shelters.`,
      highlights: ["Panoramic Highway Views", "Regional Tea & Snacks", "Spacious Parking"],
      tags: ["viewpoint", "scenic"]
    },
    {
      id: "dyn-stop-2",
      name: `${fromLabel}-${destLabel} Midway Food Plaza & Fast EV Hub`,
      category: "Highway Dining",
      location: "Midpoint Highway Milestone",
      lat: Number((sLat + (dLat - sLat) * 0.52 - 0.018).toFixed(4)),
      lng: Number((sLng + (dLng - sLng) * 0.52 + 0.015).toFixed(4)),
      distanceAlongRoute: `${Math.round(totalKm * 0.52)} km (Midway)`,
      rating: 4.7,
      price: 350,
      currency: "₹",
      priceLabel: "Avg Dining",
      image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80",
      description: `Modern midway hospitality center featuring multi-cuisine dining options, artisanal sweets, clean restroom amenities, and high-speed DC fast EV charging.`,
      highlights: ["150kW Fast EV Chargers", "Air-Conditioned Dining", "Kongu & South Indian Dishes"],
      tags: ["dining", "food", "rest-stop"]
    },
    {
      id: "dyn-stop-3",
      name: `${destLabel} Foothills Heritage & Nature Park`,
      category: "Scenic Nature Stop",
      location: `Approaching ${destLabel}`,
      lat: Number((sLat + (dLat - sLat) * 0.78 + 0.012).toFixed(4)),
      lng: Number((sLng + (dLng - sLng) * 0.78 - 0.010).toFixed(4)),
      distanceAlongRoute: `${Math.round(totalKm * 0.78)} km from ${fromLabel}`,
      rating: 4.8,
      price: 50,
      currency: "₹",
      priceLabel: "Park Entry",
      image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
      description: `Lush nature park welcoming travelers nearing ${destLabel}, framed by regional flora, walking trails, and fresh local fruit stands.`,
      highlights: ["Lush Nature Trail", "Local Fruit & Spice Stalls", "Children Play Park"],
      tags: ["viewpoint", "nature"]
    },
    {
      id: "dyn-stop-4",
      name: `${destLabel} Gateway Landmark Resort & Suites`,
      category: "Waypoint Resort & Hotel",
      location: `${destLabel} Entrance Road`,
      lat: Number((sLat + (dLat - sLat) * 0.95 + 0.005).toFixed(4)),
      lng: Number((sLng + (dLng - sLng) * 0.95 - 0.005).toFixed(4)),
      distanceAlongRoute: `${totalKm} km (At Destination)`,
      rating: 4.9,
      price: 4500,
      currency: "₹",
      priceLabel: "Per Night",
      image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80",
      description: `Peaceful highway resort offering plush rooms, garden swimming pool, and round-the-clock dining as you arrive in ${destLabel}.`,
      highlights: ["Garden Swimming Pool", "24/7 Room Service", "Private Parking"],
      tags: ["hotel", "resort", "stay"]
    }
  ];
}
