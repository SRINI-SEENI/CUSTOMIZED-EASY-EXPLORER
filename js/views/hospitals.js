// View: Hospitals & Emergency Services (MODEL B — LOCATION-BASED NEARBY DISCOVERY)
// Ultra-urgent triage & discovery: Use Current Location banner + Emergency SOS Hotline

import { state } from '../state.js';
import { HOSPITALS, getNearbyResourcesForLocation } from '../data.js';
import { renderLocationSelectionScreen } from './location-discovery.js';

export function renderHospitals(subview = "results") {
  if (!state.locationConfirmed && subview !== "results") {
    return renderLocationSelectionScreen({
      serviceKey: "hospitals",
      heading: "Find hospitals near you",
      subheading: "Immediate emergency triage, multi-specialty trauma centers and 24/7 ambulances near your GPS location.",
      actionButtonText: "Find Hospitals Nearby",
      onConfirmCallbackName: "confirmHospitalsLocation"
    });
  }

  const currentLoc = state.selectedLocation;
  const isMapView = state.activeViewMode === "map";
  const localHospitals = getNearbyResourcesForLocation('Hospitals', currentLoc, state.nearbyRadius);

  return `
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      
      <!-- Top Navigation & Model Badge -->
      <div class="flex items-center justify-between mb-6">
        <button onclick="window.appRouter('welcome')" class="flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-900 transition-colors">
          <span class="material-symbols-outlined text-sm">arrow_back</span>
          <span>Back to Home</span>
        </button>
        <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-50 text-red-900 text-[11px] font-bold border border-red-200">
          <span class="w-2 h-2 rounded-full bg-red-600 animate-ping"></span>
          CRITICAL DISCOVERY • 24/7 EMERGENCY
        </span>
      </div>

      <!-- Urgent Red Alert Banner (Immediate GPS Triage) -->
      <div class="bg-gradient-to-r from-red-600 to-rose-700 text-white rounded-2xl p-5 mb-8 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4">
        <div class="flex items-center gap-4">
          <div class="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center flex-shrink-0 animate-pulse">
            <span class="material-symbols-outlined text-3xl">emergency</span>
          </div>
          <div>
            <h2 class="text-lg font-bold">Need Immediate Emergency Ambulance?</h2>
            <p class="text-xs text-rose-100">National Emergency Dispatch: <strong>108 / 1066</strong> • Average response in Gandhipuram: <strong>8 mins</strong></p>
          </div>
        </div>
        <button onclick="window.triggerEmergencySOSModal()" class="w-full sm:w-auto px-6 py-3 rounded-xl bg-white text-red-700 font-extrabold text-xs shadow-lg hover:bg-rose-50 transition-all flex items-center justify-center gap-2">
          <span class="material-symbols-outlined text-sm">call</span>
          <span>DISPATCH SOS AMBULANCE</span>
        </button>
      </div>

      <!-- Context Bar: Showing hospitals near [Selected Location] -->
      <section class="glass-card p-5 border border-white/80 shadow-lg mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div class="flex items-center gap-3.5">
          <div class="w-11 h-11 rounded-xl bg-slate-900 text-red-400 flex items-center justify-center flex-shrink-0">
            <span class="material-symbols-outlined text-2xl">local_hospital</span>
          </div>
          <div>
            <span class="text-[10px] font-bold uppercase tracking-wider text-red-800 bg-red-50 px-2 py-0.5 rounded border border-red-200">
              Emergency Radial Locator
            </span>
            <h1 class="text-xl sm:text-2xl font-extrabold text-slate-900 mt-0.5">
              Hospitals near ${currentLoc.name}
            </h1>
            <p class="text-xs text-slate-500">
              Showing critical care facilities within ${state.nearbyRadius} km of anchor
            </p>
          </div>
        </div>

        <div class="flex items-center gap-2 self-start md:self-auto">
          <button onclick="window.openLocationSelectorFor('hospitals')" class="px-3.5 py-2 text-xs font-bold rounded-lg border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 transition-all flex items-center gap-1 shadow-sm">
            <span class="material-symbols-outlined text-sm">edit_location</span>
            <span>Change Location</span>
          </button>

          <!-- Map / List Toggle -->
          <div class="bg-slate-100 p-1 rounded-lg flex items-center border border-slate-200">
            <button onclick="window.setHospitalsViewMode('list')" class="px-3 py-1.5 text-xs font-bold rounded-md transition-all ${!isMapView ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-900'} flex items-center gap-1">
              <span class="material-symbols-outlined text-sm">view_list</span>
              <span>List View</span>
            </button>
            <button onclick="window.setHospitalsViewMode('map')" class="px-3 py-1.5 text-xs font-bold rounded-md transition-all ${isMapView ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-900'} flex items-center gap-1">
              <span class="material-symbols-outlined text-sm">map</span>
              <span>Map View</span>
            </button>
          </div>
        </div>
      </section>

      <!-- Radius & Facility Filters -->
      <section class="glass-panel rounded-2xl p-4 sm:p-5 border border-white/80 shadow-md mb-8">
        <div class="flex flex-wrap items-center justify-between gap-4">
          <div class="flex items-center gap-2">
            <span class="text-xs font-bold uppercase tracking-wider text-slate-400">Search Radius:</span>
            ${[1, 5, 10, 25].map(r => `
              <button 
                onclick="window.setHospitalRadiusAction(${r})" 
                class="px-3 py-1 rounded-lg text-xs font-bold transition-all ${state.nearbyRadius === r ? 'bg-red-600 text-white shadow-sm' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}">
                ${r} km
              </button>
            `).join('')}
          </div>

          <div class="flex flex-wrap items-center gap-2">
            <button class="px-3 py-1 rounded-lg text-xs font-bold bg-red-100 text-red-800 border border-red-200 flex items-center gap-1">
              <span class="w-1.5 h-1.5 rounded-full bg-red-600"></span>
              <span>24/7 Emergency Active</span>
            </button>
            <button class="px-3 py-1 rounded-lg text-xs font-bold bg-slate-100 text-slate-700 hover:bg-slate-200">
              Ambulance on Standby
            </button>
            <button class="px-3 py-1 rounded-lg text-xs font-bold bg-slate-100 text-slate-700 hover:bg-slate-200">
              24/7 Pharmacy
            </button>
          </div>
        </div>
      </section>

      <!-- Main Display: Map View or List View -->
      ${isMapView ? `
        <div class="mb-8">
          <div id="hospitals-map-mount" class="w-full rounded-2xl overflow-hidden shadow-2xl border border-slate-200" style="height: 540px; min-height: 480px; width: 100%;"></div>
        </div>
      ` : ''}

      <!-- Hospital Cards -->
      <section class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        ${localHospitals.map(hosp => `
          <div class="glass-panel glass-panel-hover rounded-2xl overflow-hidden border border-white/80 shadow-lg flex flex-col justify-between group">
            <div>
              <div class="relative h-48 w-full overflow-hidden">
                <img src="${hosp.image}" alt="${hosp.name}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div class="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent"></div>
                
                <span class="absolute top-3 left-3 bg-red-600 text-white text-[11px] font-bold px-2.5 py-1 rounded-full shadow-md flex items-center gap-1">
                  <span class="w-1.5 h-1.5 rounded-full bg-white animate-ping"></span>
                  <span>24/7 Trauma Unit</span>
                </span>

                <div class="absolute bottom-3 left-4 right-4 flex items-center justify-between">
                  <div class="flex items-center gap-1 text-white text-xs font-semibold">
                    <span class="material-symbols-outlined text-sm text-red-300">near_me</span>
                    <span>${hosp.distanceKm} km from ${currentLoc.name.split(',')[0]}</span>
                  </div>
                  <span class="bg-amber-400 text-slate-950 text-xs font-bold px-2 py-0.5 rounded flex items-center gap-0.5">
                    <span class="material-symbols-outlined text-xs">star</span>
                    <span>${hosp.rating}</span>
                  </span>
                </div>
              </div>

              <div class="p-5">
                <h3 class="text-base font-bold text-slate-900 mb-1 leading-snug">${hosp.name}</h3>
                <p class="text-xs text-slate-500 mb-3">${hosp.address}</p>

                <!-- Readiness Badges -->
                <div class="grid grid-cols-2 gap-2 mb-4 p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs">
                  <div>
                    <span class="text-[10px] uppercase font-bold text-slate-400 block">Ambulances</span>
                    <span class="font-bold text-teal-700">${hosp.ambulanceStandbyCount} on Standby</span>
                  </div>
                  <div>
                    <span class="text-[10px] uppercase font-bold text-slate-400 block">ICU Beds</span>
                    <span class="font-bold text-slate-800">${hosp.icuBedsAvailable} Available</span>
                  </div>
                </div>

                <div class="flex flex-wrap gap-1 mb-2">
                  ${hosp.specializations.slice(0, 3).map(s => `
                    <span class="text-[10px] font-semibold bg-white text-slate-700 px-2 py-0.5 rounded border border-slate-200">
                      ${s}
                    </span>
                  `).join('')}
                </div>
              </div>
            </div>

            <div class="p-5 pt-0 border-t border-slate-100 flex items-center justify-between gap-2 mt-auto">
              <a href="tel:${hosp.phone}" class="flex-1 py-2 rounded-lg text-xs font-bold border border-slate-300 hover:bg-slate-100 text-slate-800 flex items-center justify-center gap-1 transition-colors">
                <span class="material-symbols-outlined text-sm text-teal-600">call</span>
                <span>Call Hospital</span>
              </a>
              <button onclick="window.getHospitalDirections('${hosp.name}')" class="flex-1 py-2 rounded-lg text-xs font-bold bg-slate-900 text-white hover:bg-slate-800 transition-all flex items-center justify-center gap-1">
                <span class="material-symbols-outlined text-sm text-cyan-300">directions</span>
                <span>Get Directions</span>
              </button>
            </div>
          </div>
        `).join('')}
      </section>

    </div>
  `;
}
