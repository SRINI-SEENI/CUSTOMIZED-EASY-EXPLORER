// View: User Dashboard
// Command Center matching Stitch Screen 981051f2b790469281dba1cfc24a0775

import { state } from '../state.js';

export function renderDashboard() {
  const user = state.user;
  const bookings = state.bookings;

  return `
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      
      <!-- Top Profile Welcome Card -->
      <section class="glass-card p-6 sm:p-8 border border-white/80 shadow-xl mb-8 relative overflow-hidden">
        <div class="flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
          <div class="flex items-center gap-5 text-center sm:text-left">
            <div class="relative">
              <img src="${user.avatar}" alt="${user.name}" class="w-20 h-20 rounded-2xl object-cover border-4 border-white shadow-xl" />
              <div class="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-teal-400 border-2 border-white flex items-center justify-center text-slate-950 font-bold text-xs" title="Online">
                ✓
              </div>
            </div>
            <div>
              <div class="flex items-center gap-2">
                <h1 class="text-2xl sm:text-3xl font-extrabold text-slate-900">${user.name}</h1>
                <span class="text-[10px] font-bold px-2 py-0.5 rounded-full bg-teal-50 text-teal-800 border border-teal-200">
                  ${user.tier}
                </span>
              </div>
              <p class="text-xs text-slate-500 mt-1">
                Connected Anchor: <strong>📍 ${state.selectedLocation.name}</strong> • ${user.email}
              </p>
            </div>
          </div>

          <div class="flex items-center gap-3">
            <button onclick="window.appRouter('profile')" class="px-4 py-2.5 rounded-xl border border-slate-300 bg-white hover:bg-slate-50 text-xs font-bold text-slate-700 shadow-sm transition-all flex items-center gap-1.5">
              <span class="material-symbols-outlined text-sm">settings</span>
              <span>Preferences</span>
            </button>
            <button onclick="window.appRouter('tourist-places')" class="px-5 py-2.5 rounded-xl bg-slate-900 text-white hover:bg-slate-800 text-xs font-bold shadow-md transition-all flex items-center gap-1.5">
              <span class="material-symbols-outlined text-sm text-cyan-300">explore</span>
              <span>New Expedition</span>
            </button>
          </div>
        </div>
      </section>

      <!-- 4 Quick Stats Counters -->
      <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div class="glass-panel rounded-2xl p-4 sm:p-5 border border-white/80">
          <div class="flex items-center justify-between text-teal-600 mb-2">
            <span class="material-symbols-outlined text-2xl">confirmation_number</span>
            <span class="text-[10px] font-bold uppercase tracking-wider text-slate-400">Total Bookings</span>
          </div>
          <p class="text-2xl sm:text-3xl font-extrabold text-slate-900">${bookings.length}</p>
          <p class="text-[11px] text-teal-700 font-semibold mt-1">All tickets & passes active</p>
        </div>

        <div class="glass-panel rounded-2xl p-4 sm:p-5 border border-white/80">
          <div class="flex items-center justify-between text-blue-600 mb-2">
            <span class="material-symbols-outlined text-2xl">pin_drop</span>
            <span class="text-[10px] font-bold uppercase tracking-wider text-slate-400">Location Radius</span>
          </div>
          <p class="text-2xl sm:text-3xl font-extrabold text-slate-900">${state.nearbyRadius} km</p>
          <p class="text-[11px] text-blue-700 font-semibold mt-1">Around ${state.selectedLocation.city}</p>
        </div>

        <div class="glass-panel rounded-2xl p-4 sm:p-5 border border-white/80">
          <div class="flex items-center justify-between text-amber-500 mb-2">
            <span class="material-symbols-outlined text-2xl">loyalty</span>
            <span class="text-[10px] font-bold uppercase tracking-wider text-slate-400">Reward Points</span>
          </div>
          <p class="text-2xl sm:text-3xl font-extrabold text-slate-900">14,250</p>
          <p class="text-[11px] text-amber-700 font-semibold mt-1">Tier Multiplier 2.5x</p>
        </div>

        <div class="glass-panel rounded-2xl p-4 sm:p-5 border border-white/80">
          <div class="flex items-center justify-between text-purple-600 mb-2">
            <span class="material-symbols-outlined text-2xl">flight_takeoff</span>
            <span class="text-[10px] font-bold uppercase tracking-wider text-slate-400">Route Status</span>
          </div>
          <p class="text-xl sm:text-2xl font-extrabold text-slate-900 truncate">Coimbatore</p>
          <p class="text-[11px] text-purple-700 font-semibold mt-1">Expedition Model A Ready</p>
        </div>
      </div>

      <!-- Active Bookings & Passes List -->
      <section class="glass-card p-6 sm:p-8 border border-white/80 shadow-lg mb-8">
        <div class="flex items-center justify-between mb-6">
          <div>
            <h2 class="text-xl font-bold text-slate-900">Active Bookings & Vouchers</h2>
            <p class="text-xs text-slate-500">Instant digital passes with verified QR code booking confirmation</p>
          </div>
          <span class="text-xs font-bold text-teal-800 bg-teal-50 px-2.5 py-1 rounded-full border border-teal-200">
            ${bookings.length} Confirmed
          </span>
        </div>

        <div class="space-y-4">
          ${bookings.map(b => `
            <div class="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div class="flex items-start gap-3.5">
                <div class="w-12 h-12 rounded-xl bg-slate-900 text-cyan-300 flex items-center justify-center flex-shrink-0">
                  <span class="material-symbols-outlined text-2xl">
                    ${b.serviceType.includes('Hotel') ? 'hotel' : b.serviceType.includes('Rental') ? 'directions_car' : b.serviceType.includes('Restaurant') ? 'restaurant' : 'confirmation_number'}
                  </span>
                </div>
                <div>
                  <div class="flex items-center gap-2">
                    <span class="text-[10px] font-bold uppercase tracking-wider text-teal-700 bg-teal-50 px-2 py-0.5 rounded border border-teal-200">
                      ${b.serviceType}
                    </span>
                    <span class="text-xs text-slate-400 font-mono">${b.id}</span>
                  </div>
                  <h3 class="text-base font-bold text-slate-900 mt-1">${b.itemTitle}</h3>
                  <p class="text-xs text-slate-500">Host: ${b.host} • 📍 ${b.location} • 📅 ${b.date}</p>
                </div>
              </div>

              <div class="flex items-center justify-between md:justify-end gap-4 pt-3 md:pt-0 border-t md:border-t-0 border-slate-100">
                <div class="text-right">
                  <span class="text-[10px] uppercase font-bold text-slate-400">Total Paid</span>
                  <p class="text-base font-bold text-slate-900">${b.amount}</p>
                </div>
                <button onclick="window.viewPassModal('${b.id}')" class="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-xs font-bold text-slate-800 transition-colors flex items-center gap-1">
                  <span class="material-symbols-outlined text-sm">qr_code</span>
                  <span>View Pass</span>
                </button>
              </div>
            </div>
          `).join('')}
        </div>
      </section>

      <!-- Quick Services Launcher (6 Categories) -->
      <section class="glass-panel rounded-2xl p-6 border border-white/80 shadow-md">
        <h2 class="text-base font-bold text-slate-900 mb-4">Quick Service Launcher</h2>
        <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          <button onclick="window.appRouter('tourist-places')" class="p-3.5 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-center transition-all">
            <span class="material-symbols-outlined text-blue-600 text-2xl mb-1">landscape</span>
            <p class="text-xs font-bold text-slate-800">Tourist Places</p>
          </button>
          <button onclick="window.appRouter('hotels')" class="p-3.5 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-center transition-all">
            <span class="material-symbols-outlined text-teal-600 text-2xl mb-1">hotel</span>
            <p class="text-xs font-bold text-slate-800">Hotels</p>
          </button>
          <button onclick="window.appRouter('rentals')" class="p-3.5 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-center transition-all">
            <span class="material-symbols-outlined text-cyan-600 text-2xl mb-1">directions_car</span>
            <p class="text-xs font-bold text-slate-800">Rentals</p>
          </button>
          <button onclick="window.appRouter('restaurants')" class="p-3.5 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-center transition-all">
            <span class="material-symbols-outlined text-amber-500 text-2xl mb-1">restaurant</span>
            <p class="text-xs font-bold text-slate-800">Restaurants</p>
          </button>
          <button onclick="window.appRouter('guides')" class="p-3.5 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-center transition-all">
            <span class="material-symbols-outlined text-purple-600 text-2xl mb-1">record_voice_over</span>
            <p class="text-xs font-bold text-slate-800">Guides</p>
          </button>
          <button onclick="window.appRouter('hospitals')" class="p-3.5 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-center transition-all">
            <span class="material-symbols-outlined text-red-600 text-2xl mb-1">emergency</span>
            <p class="text-xs font-bold text-slate-800">Hospitals</p>
          </button>
        </div>
      </section>

    </div>
  `;
}
