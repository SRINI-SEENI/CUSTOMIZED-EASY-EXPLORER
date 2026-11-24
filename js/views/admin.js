// View: Admin Console & Partner Management System
// Platform oversight across Stays, Rentals, Dining, Guides and Emergency Services

import { state } from '../state.js';
import { HOTELS, RENTAL_VEHICLES, RESTAURANTS, TOURIST_GUIDES, HOSPITALS } from '../data.js';

export function renderAdmin() {
  return `
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      
      <!-- Top Navigation & Role Banner -->
      <div class="flex items-center justify-between mb-6">
        <button onclick="window.appRouter('dashboard')" class="flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-900 transition-colors">
          <span class="material-symbols-outlined text-sm">arrow_back</span>
          <span>Back to Dashboard</span>
        </button>
        <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-100 text-purple-900 text-[11px] font-bold border border-purple-300">
          <span class="w-2 h-2 rounded-full bg-purple-600 animate-pulse"></span>
          PLATFORM ADMIN CONSOLE • ROOT PRIVILEGES
        </span>
      </div>

      <!-- Admin Header -->
      <div class="glass-card p-6 sm:p-8 border border-white/80 shadow-xl mb-8">
        <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 class="text-2xl sm:text-3xl font-extrabold text-slate-900">Customized Easy Explorer Admin</h1>
            <p class="text-xs text-slate-500 mt-1">Multi-tenant partner verification, inventory management & emergency dispatch oversight</p>
          </div>
          <div class="flex items-center gap-2">
            <button onclick="alert('Exporting system audit logs...')" class="px-3.5 py-2 text-xs font-bold rounded-lg border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 shadow-sm flex items-center gap-1.5">
              <span class="material-symbols-outlined text-sm">download</span>
              <span>Export Audit Log</span>
            </button>
            <button onclick="window.toggleUserRoleAction()" class="px-3.5 py-2 text-xs font-bold rounded-lg bg-slate-900 text-white hover:bg-slate-800 shadow-md">
              Exit Admin Mode
            </button>
          </div>
        </div>
      </div>

      <!-- 4 Platform Metric KPIs -->
      <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div class="glass-panel rounded-2xl p-4 sm:p-5 border border-white/80">
          <span class="text-[10px] font-bold uppercase tracking-wider text-slate-400">Total Partners</span>
          <p class="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">142</p>
          <span class="text-[11px] text-teal-700 font-semibold">98.4% Verified Status</span>
        </div>
        <div class="glass-panel rounded-2xl p-4 sm:p-5 border border-white/80">
          <span class="text-[10px] font-bold uppercase tracking-wider text-slate-400">Total Fleet Vehicles</span>
          <p class="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">${RENTAL_VEHICLES.length * 14}+</p>
          <span class="text-[11px] text-cyan-700 font-semibold">Lead Host: Rohan K. (42)</span>
        </div>
        <div class="glass-panel rounded-2xl p-4 sm:p-5 border border-white/80">
          <span class="text-[10px] font-bold uppercase tracking-wider text-slate-400">Active Bookings</span>
          <p class="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">${state.bookings.length + 34}</p>
          <span class="text-[11px] text-purple-700 font-semibold">Live Real-time Vouchers</span>
        </div>
        <div class="glass-panel rounded-2xl p-4 sm:p-5 border border-white/80">
          <span class="text-[10px] font-bold uppercase tracking-wider text-slate-400">Emergency Hotlines</span>
          <p class="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">100%</p>
          <span class="text-[11px] text-red-700 font-semibold">All Trauma Centers Online</span>
        </div>
      </div>

      <!-- Partner Management Table -->
      <section class="glass-card p-6 border border-white/80 shadow-lg mb-8">
        <div class="flex items-center justify-between mb-4">
          <h2 class="text-lg font-bold text-slate-900">Registered Verified Partners</h2>
          <span class="text-xs text-slate-500">Showing active hosts in Tamil Nadu sector</span>
        </div>

        <div class="overflow-x-auto">
          <table class="w-full text-left text-xs">
            <thead>
              <tr class="border-b border-slate-200 text-slate-400 uppercase tracking-wider text-[10px]">
                <th class="py-3 px-3">Partner / Host</th>
                <th class="py-3 px-3">Service Category</th>
                <th class="py-3 px-3">Base Location</th>
                <th class="py-3 px-3">Rating</th>
                <th class="py-3 px-3">Status</th>
                <th class="py-3 px-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100 font-medium">
              <tr>
                <td class="py-3 px-3 font-bold text-slate-900">Rohan K.</td>
                <td class="py-3 px-3 text-cyan-800">Rental Vehicles (42 fleet)</td>
                <td class="py-3 px-3 text-slate-500">Gandhipuram Hub</td>
                <td class="py-3 px-3 font-bold text-amber-500">5.0 ★</td>
                <td class="py-3 px-3"><span class="px-2 py-0.5 rounded bg-teal-50 text-teal-800 font-bold border border-teal-200">VERIFIED</span></td>
                <td class="py-3 px-3 text-right"><button class="text-teal-700 hover:underline font-bold">Audit Fleet</button></td>
              </tr>
              <tr>
                <td class="py-3 px-3 font-bold text-slate-900">KMCH Hospital</td>
                <td class="py-3 px-3 text-red-700">Level 1 Trauma Center</td>
                <td class="py-3 px-3 text-slate-500">Avinashi Road</td>
                <td class="py-3 px-3 font-bold text-amber-500">4.8 ★</td>
                <td class="py-3 px-3"><span class="px-2 py-0.5 rounded bg-teal-50 text-teal-800 font-bold border border-teal-200">VERIFIED</span></td>
                <td class="py-3 px-3 text-right"><button class="text-teal-700 hover:underline font-bold">Live Beds</button></td>
              </tr>
              <tr>
                <td class="py-3 px-3 font-bold text-slate-900">Sree Annapoorna</td>
                <td class="py-3 px-3 text-amber-700">Restaurants (Pure Veg)</td>
                <td class="py-3 px-3 text-slate-500">Gandhipuram Central</td>
                <td class="py-3 px-3 font-bold text-amber-500">4.9 ★</td>
                <td class="py-3 px-3"><span class="px-2 py-0.5 rounded bg-teal-50 text-teal-800 font-bold border border-teal-200">VERIFIED</span></td>
                <td class="py-3 px-3 text-right"><button class="text-teal-700 hover:underline font-bold">Menu Sync</button></td>
              </tr>
              <tr>
                <td class="py-3 px-3 font-bold text-slate-900">Kavitha S.</td>
                <td class="py-3 px-3 text-purple-700">Tourist Guide (Temple Architecture)</td>
                <td class="py-3 px-3 text-slate-500">Coimbatore Metro</td>
                <td class="py-3 px-3 font-bold text-amber-500">4.9 ★</td>
                <td class="py-3 px-3"><span class="px-2 py-0.5 rounded bg-teal-50 text-teal-800 font-bold border border-teal-200">VERIFIED</span></td>
                <td class="py-3 px-3 text-right"><button class="text-teal-700 hover:underline font-bold">Inspect License</button></td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

    </div>
  `;
}
