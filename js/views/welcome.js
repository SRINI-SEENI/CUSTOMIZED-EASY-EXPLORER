// View: Welcome & Landing Page
// Customized Easy Explorer - Stitch Project 2755528737693230469

import { state } from '../state.js';
import { PRESET_LOCATIONS } from '../data.js';

export function renderWelcome() {
  return `
    <div class="relative min-h-[calc(100vh-160px)] flex flex-col justify-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      
      <!-- Ambient Glow Behind Hero -->
      <div class="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-cyan-400/20 via-blue-500/10 to-teal-300/20 blur-[100px] pointer-events-none rounded-full"></div>

      <!-- Hero Header -->
      <section class="text-center mb-12 relative z-10">
        <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/5 border border-cyan-400/30 text-teal-800 font-medium text-xs mb-6 shadow-sm backdrop-blur-md">
          <span class="w-2 h-2 rounded-full bg-teal-400 animate-pulse"></span>
          <span>Customized Easy Explorer • Local Discovery Active</span>
        </div>
        
        <h1 class="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-slate-950 tracking-tight leading-[1.1] mb-6">
          Your Journey. <br class="hidden sm:inline" />Your Preferences. <br />
          <span class="text-transparent bg-clip-text bg-gradient-to-r from-blue-900 via-teal-600 to-cyan-500">
            Your Explorer.
          </span>
        </h1>

        <p class="text-base sm:text-xl text-slate-600 max-w-2xl mx-auto font-normal leading-relaxed">
          Plan your perfect journey and discover nearby services with ease. Experience route-based tourist destinations or find verified hotels, rentals, restaurants, guides, and hospitals near you.
        </p>
      </section>

      <!-- Dual Mode Discovery Visual Banner (The Core Distinction) -->
      <section class="mb-14 relative z-10">
        <div class="glass-panel rounded-2xl p-6 sm:p-8 max-w-5xl mx-auto border border-white/60 shadow-xl">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            
            <!-- Model A Pill Info -->
            <div class="p-5 rounded-xl bg-gradient-to-br from-blue-950 to-slate-900 text-white relative overflow-hidden group hover:border-cyan-400/50 transition-all border border-slate-800">
              <div class="absolute top-0 right-0 p-3 opacity-20 group-hover:opacity-40 transition-opacity">
                <span class="material-symbols-outlined text-6xl text-cyan-400">conversion_path</span>
              </div>
              <span class="text-[10px] uppercase font-bold tracking-widest text-cyan-300 bg-cyan-950/60 px-2.5 py-1 rounded-full border border-cyan-400/30">
                MODEL A • ROUTE-BASED
              </span>
              <h3 class="text-xl font-bold mt-3 mb-1">Tourist Places & Expeditions</h3>
              <p class="text-slate-300 text-xs mb-4">
                "I want to travel from A to B." Requires Origin ➔ Destination route mapping with scenic highlights along the path.
              </p>
              <div class="flex items-center gap-2 text-xs font-semibold text-cyan-300">
                <span>📍 Origin</span>
                <span class="text-slate-500">━━━━✦━━━━</span>
                <span>📍 Destination</span>
              </div>
              <button onclick="window.appRouter('tourist-places')" class="mt-4 w-full bg-cyan-400 text-slate-950 text-xs font-bold py-2.5 rounded-lg hover:bg-cyan-300 transition-colors flex items-center justify-center gap-2">
                <span>Launch Route Explorer</span>
                <span class="material-symbols-outlined text-sm">arrow_forward</span>
              </button>
            </div>

            <!-- Model B Pill Info -->
            <div class="p-5 rounded-xl bg-gradient-to-br from-teal-950 to-slate-900 text-white relative overflow-hidden group hover:border-teal-400/50 transition-all border border-slate-800">
              <div class="absolute top-0 right-0 p-3 opacity-20 group-hover:opacity-40 transition-opacity">
                <span class="material-symbols-outlined text-6xl text-teal-400">radar</span>
              </div>
              <span class="text-[10px] uppercase font-bold tracking-widest text-teal-300 bg-teal-950/60 px-2.5 py-1 rounded-full border border-teal-400/30">
                MODEL B • NEARBY RADIAL DISCOVERY
              </span>
              <h3 class="text-xl font-bold mt-3 mb-1">Stays, Rentals, Dining & Health</h3>
              <p class="text-slate-300 text-xs mb-4">
                "I want something near a particular place." Single location pin ➔ instant radial scanner covering resources within 1–25 km.
              </p>
              <div class="flex items-center gap-2 text-xs font-semibold text-teal-300">
                <span>🏨 Stays</span> • <span>🚗 Rentals</span> • <span>🍽️ Food</span> • <span>🏥 Emergency</span>
              </div>
              <button onclick="window.appRouter('hotels')" class="mt-4 w-full bg-teal-400 text-slate-950 text-xs font-bold py-2.5 rounded-lg hover:bg-teal-300 transition-colors flex items-center justify-center gap-2">
                <span>Launch Nearby Discovery</span>
                <span class="material-symbols-outlined text-sm">radar</span>
              </button>
            </div>

          </div>
        </div>
      </section>

      <!-- Bento Grid: 6 Service Categories -->
      <section class="max-w-6xl mx-auto w-full relative z-10 mb-16">
        <div class="text-center mb-8">
          <h2 class="text-2xl sm:text-3xl font-bold text-slate-900">Explore Travel & Local Services</h2>
          <p class="text-slate-500 text-sm mt-1">Select any service to initiate its streamlined exploration flow</p>
        </div>

        <div class="grid grid-cols-2 md:grid-cols-3 gap-5 sm:gap-6">
          
          <!-- 1. Tourist Places (Model A) -->
          <div onclick="window.appRouter('tourist-places')" class="glass-panel glass-panel-hover rounded-2xl p-6 flex flex-col items-center text-center cursor-pointer group relative overflow-hidden">
            <span class="absolute top-3 right-3 text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 border border-blue-200">
              Route Model
            </span>
            <div class="w-16 h-16 rounded-2xl bg-blue-500/10 flex items-center justify-center mb-4 text-blue-900 group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition-all shadow-sm">
              <span class="material-symbols-outlined text-3xl">landscape</span>
            </div>
            <h3 class="text-lg font-bold text-slate-900 mb-1">Tourist Places</h3>
            <p class="text-xs text-slate-500">From ➔ Destination scenic journeys</p>
          </div>

          <!-- 2. Hotels & Resorts (Model B) -->
          <div onclick="window.appRouter('hotels')" class="glass-panel glass-panel-hover rounded-2xl p-6 flex flex-col items-center text-center cursor-pointer group relative overflow-hidden">
            <span class="absolute top-3 right-3 text-[10px] font-bold px-2 py-0.5 rounded-full bg-teal-100 text-teal-800 border border-teal-200">
              Nearby Radial
            </span>
            <div class="w-16 h-16 rounded-2xl bg-teal-500/10 flex items-center justify-center mb-4 text-teal-800 group-hover:scale-110 group-hover:bg-teal-600 group-hover:text-white transition-all shadow-sm">
              <span class="material-symbols-outlined text-3xl">hotel</span>
            </div>
            <h3 class="text-lg font-bold text-slate-900 mb-1">Hotels & Resorts</h3>
            <p class="text-xs text-slate-500">Stays near your chosen location</p>
          </div>

          <!-- 3. Rental Vehicles (Model B) -->
          <div onclick="window.appRouter('rentals')" class="glass-panel glass-panel-hover rounded-2xl p-6 flex flex-col items-center text-center cursor-pointer group relative overflow-hidden">
            <span class="absolute top-3 right-3 text-[10px] font-bold px-2 py-0.5 rounded-full bg-teal-100 text-teal-800 border border-teal-200">
              Nearby Radial
            </span>
            <div class="w-16 h-16 rounded-2xl bg-cyan-500/10 flex items-center justify-center mb-4 text-cyan-900 group-hover:scale-110 group-hover:bg-cyan-600 group-hover:text-white transition-all shadow-sm">
              <span class="material-symbols-outlined text-3xl">directions_car</span>
            </div>
            <h3 class="text-lg font-bold text-slate-900 mb-1">Rental Vehicles</h3>
            <p class="text-xs text-slate-500">Verified owners • No destination needed</p>
          </div>

          <!-- 4. Restaurants (Model B) -->
          <div onclick="window.appRouter('restaurants')" class="glass-panel glass-panel-hover rounded-2xl p-6 flex flex-col items-center text-center cursor-pointer group relative overflow-hidden">
            <span class="absolute top-3 right-3 text-[10px] font-bold px-2 py-0.5 rounded-full bg-teal-100 text-teal-800 border border-teal-200">
              Nearby Radial
            </span>
            <div class="w-16 h-16 rounded-2xl bg-amber-500/10 flex items-center justify-center mb-4 text-amber-800 group-hover:scale-110 group-hover:bg-amber-500 group-hover:text-white transition-all shadow-sm">
              <span class="material-symbols-outlined text-3xl">restaurant</span>
            </div>
            <h3 class="text-lg font-bold text-slate-900 mb-1">Restaurants</h3>
            <p class="text-xs text-slate-500">Culinary dining & table reservations</p>
          </div>

          <!-- 5. Tourist Guides (Model B) -->
          <div onclick="window.appRouter('guides')" class="glass-panel glass-panel-hover rounded-2xl p-6 flex flex-col items-center text-center cursor-pointer group relative overflow-hidden">
            <span class="absolute top-3 right-3 text-[10px] font-bold px-2 py-0.5 rounded-full bg-teal-100 text-teal-800 border border-teal-200">
              Nearby Radial
            </span>
            <div class="w-16 h-16 rounded-2xl bg-purple-500/10 flex items-center justify-center mb-4 text-purple-900 group-hover:scale-110 group-hover:bg-purple-600 group-hover:text-white transition-all shadow-sm">
              <span class="material-symbols-outlined text-3xl">record_voice_over</span>
            </div>
            <h3 class="text-lg font-bold text-slate-900 mb-1">Tourist Guides</h3>
            <p class="text-xs text-slate-500">Verified regional guides & heritage walk</p>
          </div>

          <!-- 6. Hospitals & Emergency (Model B) -->
          <div onclick="window.appRouter('hospitals')" class="glass-panel glass-panel-hover rounded-2xl p-6 flex flex-col items-center text-center cursor-pointer group relative overflow-hidden">
            <span class="absolute top-3 right-3 text-[10px] font-bold px-2 py-0.5 rounded-full bg-red-100 text-red-800 border border-red-200">
              Emergency 24/7
            </span>
            <div class="w-16 h-16 rounded-2xl bg-red-500/10 flex items-center justify-center mb-4 text-red-700 group-hover:scale-110 group-hover:bg-red-600 group-hover:text-white transition-all shadow-sm">
              <span class="material-symbols-outlined text-3xl">emergency</span>
            </div>
            <h3 class="text-lg font-bold text-slate-900 mb-1">Hospitals & SOS</h3>
            <p class="text-xs text-slate-500">Instant triage, ambulance & emergency</p>
          </div>

        </div>
      </section>

      <!-- Active Location Snapshot & Quick Switcher -->
      <section class="max-w-4xl mx-auto w-full relative z-10">
        <div class="glass-card p-5 flex flex-col sm:flex-row items-center justify-between gap-4 border border-white/80">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-full bg-teal-100 text-teal-800 flex items-center justify-center">
              <span class="material-symbols-outlined text-xl">near_me</span>
            </div>
            <div>
              <p class="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Active Location Anchor</p>
              <p class="text-sm font-bold text-slate-900">📍 ${state.selectedLocation.name}</p>
            </div>
          </div>
          <div class="flex items-center gap-3 w-full sm:w-auto">
            <button onclick="window.openLocationSelectorModal()" class="flex-1 sm:flex-none px-4 py-2 text-xs font-semibold rounded-lg bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 transition-colors">
              Change Anchor Location
            </button>
            <button onclick="window.appRouter('dashboard')" class="flex-1 sm:flex-none px-4 py-2 text-xs font-semibold rounded-lg bg-slate-900 text-white hover:bg-slate-800 transition-colors flex items-center justify-center gap-1.5">
              <span>Open Dashboard</span>
              <span class="material-symbols-outlined text-sm">space_dashboard</span>
            </button>
          </div>
        </div>
      </section>

    </div>
  `;
}
