// View: Profile Setup & Travel Preferences
// Conforms to Stitch Screens d9829e0f57f6496ba272747e7f7619a0 and 2b2b847255984d6db81d9cbf3a2fc6cd

import { state } from '../state.js';

export function renderProfile() {
  const user = state.user;

  return `
    <div class="max-w-4xl mx-auto px-4 py-8">
      
      <!-- Top Navigation -->
      <div class="flex items-center justify-between mb-6">
        <button onclick="window.appRouter('dashboard')" class="flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-900 transition-colors">
          <span class="material-symbols-outlined text-sm">arrow_back</span>
          <span>Back to Dashboard</span>
        </button>
        <span class="text-xs font-bold text-teal-800 bg-teal-50 px-3 py-1 rounded-full border border-teal-200">
          Profile Protocol Active
        </span>
      </div>

      <!-- Main Form Container -->
      <div class="glass-card p-6 sm:p-10 border border-white/80 shadow-2xl rounded-3xl">
        
        <div class="text-center mb-8">
          <h1 class="text-2xl sm:text-3xl font-extrabold text-slate-900">Explorer Profile & Preferences</h1>
          <p class="text-xs text-slate-500 mt-1">Configure your personal credentials and AI discovery calibration</p>
        </div>

        <form onsubmit="event.preventDefault(); window.handleProfileSave()" class="space-y-6">
          
          <!-- Avatar Section -->
          <div class="flex flex-col sm:flex-row items-center gap-5 p-5 bg-slate-50 rounded-2xl border border-slate-200">
            <img src="${user.avatar}" class="w-20 h-20 rounded-full object-cover border-4 border-white shadow-md" />
            <div class="text-center sm:text-left flex-1">
              <h3 class="text-sm font-bold text-slate-900">${user.name}</h3>
              <p class="text-xs text-slate-500">${user.tier} • ${user.email}</p>
              <div class="mt-2.5 flex flex-wrap gap-2 justify-center sm:justify-start">
                <button type="button" class="px-3 py-1.5 rounded-lg bg-white border border-slate-300 text-slate-700 text-xs font-semibold hover:bg-slate-100">
                  Change Photo
                </button>
                <button type="button" onclick="window.toggleUserRoleAction()" class="px-3 py-1.5 rounded-lg ${user.role === 'admin' ? 'bg-purple-600 text-white' : 'bg-slate-200 text-slate-800'} text-xs font-semibold">
                  Role: ${user.role.toUpperCase()}
                </button>
              </div>
            </div>
          </div>

          <!-- Personal Info Grid -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label class="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">Display Name</label>
              <input type="text" id="prof-name" value="${user.name}" class="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-medium text-slate-800" />
            </div>
            <div>
              <label class="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">Registered Email</label>
              <input type="email" id="prof-email" value="${user.email}" class="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-medium text-slate-800" />
            </div>
            <div>
              <label class="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">Phone Number</label>
              <input type="tel" id="prof-phone" value="${user.phone}" class="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-medium text-slate-800" />
            </div>
            <div>
              <label class="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">Emergency SOS Contact</label>
              <input type="tel" id="prof-emergency" value="${user.emergencyContact}" class="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-medium text-slate-800" />
            </div>
          </div>

          <!-- Travel Preferences Section -->
          <div class="pt-4 border-t border-slate-200">
            <h3 class="text-sm font-bold text-slate-900 mb-3">AI Discovery Preferences</h3>
            
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label class="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">Travel Style</label>
                <select id="pref-style" class="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-medium text-slate-800">
                  <option selected>Luxury & Spatial Comfort</option>
                  <option>Backpacker & Adventure</option>
                  <option>Family & Children Friendly</option>
                  <option>Couple Romantic Escape</option>
                </select>
              </div>
              <div>
                <label class="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">Dietary Profile</label>
                <select id="pref-dietary" class="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-medium text-slate-800">
                  <option selected>Vegetarian Friendly</option>
                  <option>Pure Vegetarian (South Indian / Jain)</option>
                  <option>Non-Vegetarian / Seafood</option>
                  <option>Halal Certified</option>
                  <option>Vegan & Gluten-Free</option>
                </select>
              </div>
            </div>
          </div>

          <!-- Save Button -->
          <button type="submit" class="w-full mt-4 bg-slate-900 text-white font-bold text-xs py-3.5 rounded-xl hover:bg-slate-800 shadow-xl transition-all flex items-center justify-center gap-2">
            <span>Save Profile & Recalibrate Discovery</span>
            <span class="material-symbols-outlined text-sm text-cyan-300">check</span>
          </button>
        </form>

      </div>
    </div>
  `;
}
