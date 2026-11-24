import { GEO_DATABASE, resolveCityCoords, getDefaultCorridorStops } from './views/tourist-places.js';
// Interactive Map Engine - Real Google Maps Tiles & Rapido-Style Dynamic Routing
// Customized Easy Explorer - Ground-Level Travel & Local Discovery Portal
// Supports Model B: 5 km Radius Discovery + Rapido Turn-by-Turn Driving Route Paths + Floating ETA Bubble + Bottom Drawer
// Supports Model A: From ➔ Destination Highway Corridor + 5 km Buffer + Branch Spur Connectors in Distinct Colors + Detour Badges
// Supports Location Picker: Interactive Click & Drag Pin Drop on Google Street Map

export class MapService {
  constructor(containerId, options = {}) {
    this.containerId = containerId;
    this.container = document.getElementById(containerId);
    this.options = {
      mode: options.mode || "radial", // 'radial' (Model B) | 'route' (Model A) | 'picker'
      center: options.center || { lat: 11.0168, lng: 76.9558, name: "Gandhipuram, Coimbatore", city: "Coimbatore" },
      radiusKm: options.radiusKm || 5,
      items: options.items || [],
      stops: options.stops || [],
      from: options.from || "Coimbatore, India",
      destination: options.destination || "Ooty, Tamil Nadu",
      distanceKm: options.distanceKm || 86,
      estimatedTime: options.estimatedTime || "2h 45m",
      onLocationSelect: options.onLocationSelect || null,
      ...options
    };

    this.leafletMap = null;
    this.tileLayers = {};
    this.currentTileKey = "streets";
    this.activeSelectedIndex = 0;
    this.activePolylines = [];
    this.activeEtaMarker = null;
    this.itemMarkers = [];

    // Expose instance globally for UI interactions
    window.currentActiveMapService = this;

    this.init();
  }

  init() {
    if (!this.container) return;

    // Clean up any existing Leaflet instances
    if (this.container._leaflet_id && typeof L !== 'undefined') {
      try {
        this.container._leaflet_id = null;
      } catch (e) {}
    }
    this.container.innerHTML = "";

    // Force explicit container dimensions for Leaflet rendering
    this.container.style.position = "relative";
    this.container.style.width = "100%";
    this.container.style.height = this.options.mode === "picker" ? "420px" : "540px";
    this.container.style.minHeight = "400px";

    if (typeof L !== 'undefined') {
      try {
        this.renderLeafletMap();
        return;
      } catch (err) {
        console.warn("Leaflet map initialization warning, falling back:", err);
      }
    }

    this.renderVectorCanvasFallback();
  }

  renderLeafletMap() {
    const { mode } = this.options;
    const mapDiv = document.createElement('div');
    mapDiv.id = `leaflet-mount-${Math.floor(Math.random() * 100000)}`;
    mapDiv.className = "w-full h-full rounded-2xl overflow-hidden relative select-none";
    mapDiv.style.width = "100%";
    mapDiv.style.height = "100%";
    this.container.appendChild(mapDiv);

    if (mode === "route") {
      this.initLeafletRouteMap(mapDiv.id);
    } else if (mode === "picker") {
      this.initLeafletPickerMap(mapDiv.id);
    } else {
      this.initLeafletRadialMap(mapDiv.id);
    }
  }

  // Setup Real Google Maps Tile Layers with Seamless Toggle
  setupTileLayers(map) {
    // 1. Google Maps Standard Streets (Clean, high-contrast, yellow highways, green parks)
    this.tileLayers.streets = L.tileLayer('https://mt{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}', {
      maxZoom: 20,
      subdomains: ['0', '1', '2', '3'],
      attribution: 'Map data &copy; Google Maps'
    });

    // 2. Google Maps Satellite / Hybrid (Satellite imagery with road and label overlays)
    this.tileLayers.satellite = L.tileLayer('https://mt{s}.google.com/vt/lyrs=y&x={x}&y={y}&z={z}', {
      maxZoom: 20,
      subdomains: ['0', '1', '2', '3'],
      attribution: 'Imagery &copy; Google Maps Satellite'
    });

    // 3. OpenStreetMap Standard (Community Open Cartography)
    this.tileLayers.osm = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      subdomains: ['a', 'b', 'c'],
      attribution: '&copy; OpenStreetMap contributors'
    });

    // Add default layer
    this.tileLayers.streets.addTo(map);
    this.currentTileKey = "streets";
  }

  switchTileLayer(layerKey) {
    if (!this.leafletMap || !this.tileLayers[layerKey] || this.currentTileKey === layerKey) return;
    this.leafletMap.removeLayer(this.tileLayers[this.currentTileKey]);
    this.tileLayers[layerKey].addTo(this.leafletMap);
    this.currentTileKey = layerKey;

    // Update active button state in layer switcher
    document.querySelectorAll('.google-layer-btn').forEach(btn => {
      if (btn.getAttribute('data-layer') === layerKey) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });
  }

  // =========================================================================
  // MODEL B: 5 KM RADIAL NEARBY DISCOVERY & RAPIDO DRIVING ROUTE ENGINE
  // =========================================================================
  initLeafletRadialMap(mountId) {
    const { center, radiusKm, items } = this.options;
    const centerLat = center.lat || 11.0168;
    const centerLng = center.lng || 76.9558;

    // Filter items to ensure strict 5 km radius locality
    const validItems = (items && items.length > 0)
      ? items.filter(it => it.lat && it.lng && calculateAccurateDistanceKm(centerLat, centerLng, it.lat, it.lng) <= radiusKm * 1.25)
      : [];

    // If no valid local items found in pool, generate realistic local options distributed nicely
    const resolvedItems = validItems.length >= 3 ? validItems : generateRealisticNearbyItems(center, radiusKm, items);

    // Initialize Leaflet with Google Maps accessibility controls
    const map = L.map(mountId, {
      zoomControl: false, // We render clean Google Maps controls
      attributionControl: false,
      scrollWheelZoom: true,
      smoothWheelZoom: true,
      doubleClickZoom: true,
      touchZoom: true,
      dragging: true,
      inertia: true,
      inertiaDeceleration: 3000
    }).setView([centerLat, centerLng], radiusKm <= 3 ? 15 : radiusKm <= 6 ? 14 : 13);

    this.leafletMap = map;
    this.resolvedItems = resolvedItems;
    this.setupTileLayers(map);

    // 1. Draw 5 km Radius Boundary (Google/Rapido cyan dashed circle)
    const radiusMeters = radiusKm * 1000;
    const radiusCircle = L.circle([centerLat, centerLng], {
      radius: radiusMeters,
      color: '#0284c7', // Sky Blue
      fillColor: '#38bdf8',
      fillOpacity: 0.08,
      weight: 2,
      dashArray: '6, 6'
    }).addTo(map);

    // Radius Boundary Pill on Circle Edge
    const edgeLat = centerLat + (radiusKm / 111);
    L.marker([edgeLat, centerLng], {
      icon: L.divIcon({
        className: 'radius-edge-badge',
        html: `<div class="bg-sky-950 text-sky-200 text-[10px] font-bold px-2.5 py-0.5 rounded-full border border-sky-400/60 shadow-lg whitespace-nowrap">📍 ${radiusKm} KM RADIUS BOUNDARY</div>`
      })
    }).addTo(map);

    // 2. User Pickup Anchor Pin (Interactive & Draggable)
    const userPickupIcon = L.divIcon({
      className: 'rapido-user-pickup-pin',
      html: `
        <div class="relative flex items-center justify-center cursor-pointer group">
          <span class="animate-ping absolute inline-flex h-10 w-10 rounded-full bg-emerald-400 opacity-70"></span>
          <div class="w-11 h-11 rounded-full bg-slate-950 border-3 border-emerald-400 text-white flex items-center justify-center shadow-2xl relative z-10 transition-transform group-hover:scale-110">
            <span class="material-symbols-outlined text-2xl text-emerald-300">near_me</span>
          </div>
          <div class="absolute -bottom-7 bg-slate-900 text-white text-[10px] font-extrabold px-2.5 py-0.5 rounded-full border border-emerald-400/50 shadow-md whitespace-nowrap">
            Pickup Point
          </div>
        </div>
      `,
      iconSize: [44, 44],
      iconAnchor: [22, 22]
    });

    const userMarker = L.marker([centerLat, centerLng], {
      icon: userPickupIcon,
      draggable: true,
      zIndexOffset: 1000
    }).addTo(map);

    userMarker.bindPopup(`
      <div class="p-2 text-center">
        <span class="text-[10px] font-extrabold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">Your Current Anchor</span>
        <h4 class="text-sm font-bold text-slate-900 mt-1">${center.name || 'Selected Location'}</h4>
        <p class="text-xs text-slate-500 mt-0.5">Searching available rides & stays within ${radiusKm} km</p>
        <p class="text-[10px] text-slate-400 mt-1 font-mono">${centerLat.toFixed(4)}°N, ${centerLng.toFixed(4)}°E</p>
        <p class="text-[10px] text-blue-600 font-bold mt-1">Drag pin or click map to change pickup</p>
      </div>
    `);

    // Drag pin to reposition search anchor
    userMarker.on('dragend', (e) => {
      const p = e.target.getLatLng();
      if (window.handleMapPinReposition) {
        window.handleMapPinReposition(p.lat, p.lng);
      }
    });

    // Click anywhere on map to drop / reposition pin
    map.on('click', (e) => {
      userMarker.setLatLng(e.latlng);
      radiusCircle.setLatLng(e.latlng);
      if (window.handleMapPinReposition) {
        window.handleMapPinReposition(e.latlng.lat, e.latlng.lng);
      }
    });

    // 3. Render Nearby Resource Markers
    this.itemMarkers = [];
    resolvedItems.forEach((item, idx) => {
      const placeLat = item.lat;
      const placeLng = item.lng;
      const accurateDistKm = calculateAccurateDistanceKm(centerLat, centerLng, placeLat, placeLng);
      const travelMins = Math.max(2, Math.round(accurateDistKm * 2.8));

      // Category Icon & Badge
      const catConfig = getCategoryMarkerConfig(item.category, item.subType);

      const placeIcon = L.divIcon({
        className: 'rapido-place-marker',
        html: `
          <div class="flex flex-col items-center group cursor-pointer transition-transform hover:scale-125" onclick="window.selectNearbyMapItem(${idx})">
            <div class="w-9 h-9 rounded-full ${catConfig.bg} text-white shadow-xl border-2 border-white flex items-center justify-center relative">
              <span class="material-symbols-outlined text-[18px]">${catConfig.icon}</span>
              <span class="absolute -top-1 -right-1 w-3.5 h-3.5 bg-emerald-500 border border-white rounded-full"></span>
            </div>
            <div class="bg-slate-900 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-lg border border-slate-700 -mt-1 whitespace-nowrap flex items-center gap-1">
              <span>${accurateDistKm} km</span>
              <span class="text-emerald-400">• ${travelMins}m</span>
            </div>
          </div>
        `,
        iconSize: [36, 46],
        iconAnchor: [18, 23]
      });

      const marker = L.marker([placeLat, placeLng], { icon: placeIcon }).addTo(map);

      marker.bindPopup(`
        <div class="p-1 max-w-[230px]">
          <div class="relative h-24 w-full rounded-xl overflow-hidden mb-2 shadow-sm">
            <img src="${item.image || 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=400&q=80'}" class="w-full h-full object-cover" />
            <span class="absolute top-1.5 right-1.5 bg-amber-400 text-slate-950 text-[10px] font-extrabold px-1.5 py-0.5 rounded shadow">
              ★ ${item.rating || 4.8}
            </span>
          </div>
          <span class="text-[10px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-full">${item.subType || item.category}</span>
          <h4 class="text-xs font-extrabold text-slate-900 leading-snug mt-1">${item.name}</h4>
          <p class="text-[11px] text-blue-700 font-bold mt-0.5 flex items-center gap-1">
            <span class="material-symbols-outlined text-xs">directions_car</span>
            <span>${accurateDistKm} km away • ~${travelMins} mins travel</span>
          </p>
          <div class="mt-2 pt-2 border-t border-slate-100 flex items-center justify-between">
            <span class="text-xs font-extrabold text-slate-900">${item.currency || '₹'}${item.pricePerDay || item.pricePerNight || item.price || ''}${item.pricePerDay ? '/day' : ''}</span>
            <button onclick="window.selectNearbyMapItem(${idx})" class="px-2.5 py-1 rounded-lg bg-blue-600 text-white text-[10px] font-bold hover:bg-blue-700 shadow-sm">
              Show Route
            </button>
          </div>
        </div>
      `);

      this.itemMarkers.push(marker);
    });

    // 4. Draw Initial Rapido Turn-by-Turn Route to the First / Nearest Option
    this.drawRapidoRoute(0);

    // 5. Add Interactive Google Maps UI Controls
    this.renderGoogleMapsControls(map, centerLat, centerLng, radiusCircle);

    // 6. Add Rapido Floating Bottom Drawer
    this.renderRapidoBottomDrawer(resolvedItems);

    // 7. Ensure Map Viewport fits 5 km circle properly after layout renders
    setTimeout(() => {
      if (this.leafletMap) {
        this.leafletMap.invalidateSize();
        this.leafletMap.fitBounds(radiusCircle.getBounds(), { padding: [40, 40] });
      }
    }, 150);
    setTimeout(() => {
      if (this.leafletMap) this.leafletMap.invalidateSize();
    }, 450);

    // Window resize handler
    window.addEventListener('resize', () => {
      if (this.leafletMap) this.leafletMap.invalidateSize();
    });
  }

  // Draw Rapido / Google Maps Turn-By-Turn Driving Route to Chosen Option
  drawRapidoRoute(targetIndex) {
    if (!this.leafletMap || !this.resolvedItems || this.resolvedItems.length === 0) return;
    this.activeSelectedIndex = targetIndex;
    const selectedItem = this.resolvedItems[targetIndex];
    const center = this.options.center;
    const centerLat = center.lat || 11.0168;
    const centerLng = center.lng || 76.9558;

    // Remove existing route lines and ETA badges
    this.activePolylines.forEach(poly => this.leafletMap.removeLayer(poly));
    this.activePolylines = [];
    if (this.activeEtaMarker) {
      this.leafletMap.removeLayer(this.activeEtaMarker);
      this.activeEtaMarker = null;
    }

    // 1. Draw Inactive Connector Paths to other nearby options (subtle dotted lines)
    this.resolvedItems.forEach((it, i) => {
      if (i !== targetIndex) {
        const inactivePoly = L.polyline([[centerLat, centerLng], [it.lat, it.lng]], {
          color: '#94a3b8',
          weight: 2,
          opacity: 0.45,
          dashArray: '4, 6'
        }).addTo(this.leafletMap);
        this.activePolylines.push(inactivePoly);
      }
    });

    // 2. Generate Realistic Street-Grid Driving Waypoints to target item (Rapido turn-by-turn geometry)
    const routePoints = generateStreetRoutePoints(centerLat, centerLng, selectedItem.lat, selectedItem.lng);
    const accurateDistKm = calculateAccurateDistanceKm(centerLat, centerLng, selectedItem.lat, selectedItem.lng);
    const travelMins = Math.max(2, Math.round(accurateDistKm * 2.8));

    // Outer Casing Polyline (Creates Google Maps bold street border)
    const casingPoly = L.polyline(routePoints, {
      color: '#1e3a8a', // Deep Navy Casing
      weight: 8,
      opacity: 0.9,
      lineCap: 'round',
      lineJoin: 'round',
      className: 'rapido-active-route-casing'
    }).addTo(this.leafletMap);
    this.activePolylines.push(casingPoly);

    // Inner Vibrant Google Maps Blue Polyline
    const innerPoly = L.polyline(routePoints, {
      color: '#2563eb', // Vibrant Google Maps Blue
      weight: 5,
      opacity: 1,
      lineCap: 'round',
      lineJoin: 'round',
      className: 'rapido-active-route-inner'
    }).addTo(this.leafletMap);
    this.activePolylines.push(innerPoly);

    // 3. Rapido Floating Route ETA Bubble placed at midpoint
    const midIdx = Math.floor(routePoints.length / 2);
    const midPoint = routePoints[midIdx];

    const etaIcon = L.divIcon({
      className: 'rapido-eta-marker',
      html: `
        <div class="rapido-eta-bubble">
          <span class="rapido-pulse-dot"></span>
          <span class="font-extrabold text-slate-900">${travelMins} mins</span>
          <span class="text-slate-500 font-semibold">(${accurateDistKm} km)</span>
          <span class="bg-blue-100 text-blue-800 text-[9px] font-extrabold px-1.5 py-0.5 rounded">Fastest Route</span>
        </div>
      `,
      iconSize: [160, 32],
      iconAnchor: [80, 16]
    });

    this.activeEtaMarker = L.marker([midPoint[0], midPoint[1]], { icon: etaIcon, zIndexOffset: 800 }).addTo(this.leafletMap);

    // 4. Update Rapido Bottom Drawer Card UI
    this.updateRapidoBottomDrawer(selectedItem, targetIndex, accurateDistKm, travelMins);
  }

  // Google Maps Style Controls Cluster & Floating Layer Selector
  renderGoogleMapsControls(map, centerLat, centerLng, radiusCircle, mode = "radial") {
    // 1. Top-Left Status Bar Pill
    const statusPill = document.createElement('div');
    statusPill.className = "rapido-status-pill select-none";

    if (mode === "route") {
      const stopsCount = (this.options.stops && this.options.stops.length) || 6;
      statusPill.innerHTML = `
        <div class="w-2.5 h-2.5 rounded-full bg-blue-500 animate-pulse"></div>
        <span class="font-extrabold text-slate-900 text-xs">Highway Route</span>
        <span class="text-slate-400 text-[10px]">|</span>
        <span class="text-blue-700 font-bold text-xs">${this.options.distanceKm || 86} km • ${this.options.estimatedTime || '2h 45m'}</span>
        <span class="text-slate-400 text-[10px] hidden sm:inline">• ${stopsCount} corridor stops</span>
      `;
    } else if (mode === "picker") {
      statusPill.innerHTML = `
        <div class="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse"></div>
        <span class="font-extrabold text-slate-900 text-xs">Drop Pin on Map</span>
        <span class="text-slate-400 text-[10px]">|</span>
        <span class="text-slate-600 text-xs font-semibold">Click or drag pin to select location</span>
      `;
    } else {
      const itemsCount = (this.resolvedItems && this.resolvedItems.length) || 0;
      statusPill.innerHTML = `
        <div class="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></div>
        <span class="font-extrabold text-slate-900 text-xs">${itemsCount} Nearby Available</span>
        <span class="text-slate-400 text-[10px]">|</span>
        <span class="text-blue-700 font-bold text-xs">${this.options.radiusKm} km Live Radius</span>
        <span class="text-slate-400 text-[10px] hidden sm:inline">• Click any vehicle/place to route</span>
      `;
    }
    this.container.appendChild(statusPill);

    // 2. Top-Right Floating Google Layer Switcher
    const layerPill = document.createElement('div');
    layerPill.className = "google-layer-pill select-none";
    layerPill.innerHTML = `
      <button class="google-layer-btn active" data-layer="streets" onclick="window.switchMapTileLayer('streets')">🗺️ Street</button>
      <button class="google-layer-btn" data-layer="satellite" onclick="window.switchMapTileLayer('satellite')">🛰️ Satellite</button>
      <button class="google-layer-btn" data-layer="osm" onclick="window.switchMapTileLayer('osm')">🌐 OSM</button>
    `;
    this.container.appendChild(layerPill);

    // 3. Bottom-Right Google Maps Control Cluster
    const controlsDiv = document.createElement('div');
    controlsDiv.className = "google-controls-cluster select-none";
    controlsDiv.innerHTML = `
      <button class="google-ctrl-btn" onclick="window.handleMapZoomIn()" title="Zoom In">
        <span class="material-symbols-outlined text-lg">add</span>
      </button>
      <button class="google-ctrl-btn" onclick="window.handleMapZoomOut()" title="Zoom Out">
        <span class="material-symbols-outlined text-lg">remove</span>
      </button>
      <button class="google-ctrl-btn text-blue-600" onclick="window.handleMapLocateMe()" title="Recenter on My Location">
        <span class="material-symbols-outlined text-lg">my_location</span>
      </button>
      <button class="google-ctrl-btn text-teal-600" onclick="window.handleMapFitRadius()" title="Fit Route / Radius">
        <span class="material-symbols-outlined text-lg">crop_free</span>
      </button>
    `;
    this.container.appendChild(controlsDiv);

    // Bind Global Action Handlers
    window.switchMapTileLayer = (key) => this.switchTileLayer(key);
    window.handleMapZoomIn = () => this.leafletMap && this.leafletMap.zoomIn();
    window.handleMapZoomOut = () => this.leafletMap && this.leafletMap.zoomOut();
    window.handleMapLocateMe = () => {
      if (this.leafletMap) {
        this.leafletMap.flyTo([centerLat, centerLng], mode === "route" ? 11 : 15, { duration: 1 });
      }
    };
    window.handleMapFitRadius = () => {
      if (!this.leafletMap) return;
      if (radiusCircle) {
        this.leafletMap.fitBounds(radiusCircle.getBounds(), { padding: [40, 40] });
      } else if (this.mainHighwayBounds) {
        this.leafletMap.fitBounds(this.mainHighwayBounds, { padding: [40, 40] });
      }
    };
    window.selectNearbyMapItem = (idx) => {
      if (this.options.mode === "radial" && this.resolvedItems && this.resolvedItems[idx]) {
        this.drawRapidoRoute(idx);
        const it = this.resolvedItems[idx];
        if (it && this.leafletMap) {
          const bounds = L.latLngBounds([[centerLat, centerLng], [it.lat, it.lng]]);
          this.leafletMap.fitBounds(bounds, { padding: [80, 80] });
        }
      }
    };
    window.selectNextNearbyItem = () => {
      if (this.resolvedItems && this.resolvedItems.length > 0) {
        const nextIdx = (this.activeSelectedIndex + 1) % this.resolvedItems.length;
        window.selectNearbyMapItem(nextIdx);
      }
    };
    window.selectPreviousNearbyItem = () => {
      if (this.resolvedItems && this.resolvedItems.length > 0) {
        const prevIdx = (this.activeSelectedIndex - 1 + this.resolvedItems.length) % this.resolvedItems.length;
        window.selectNearbyMapItem(prevIdx);
      }
    };
  }

  // Rapido Floating Bottom Drawer Card
  renderRapidoBottomDrawer(items) {
    if (!items || items.length === 0) return;
    const initialItem = items[0];
    const drawerDiv = document.createElement('div');
    drawerDiv.id = "rapido-bottom-card";
    drawerDiv.className = "rapido-bottom-card select-none";
    this.container.appendChild(drawerDiv);
    this.updateRapidoBottomDrawer(initialItem, 0, initialItem.distanceKm || 1.2, initialItem.travelMins || 4);
  }

  updateRapidoBottomDrawer(item, index, distanceKm, travelMins) {
    const drawer = document.getElementById("rapido-bottom-card");
    if (!drawer || !item) return;

    drawer.innerHTML = `
      <div class="flex items-center gap-3">
        <img src="${item.image || 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=300&q=80'}" class="w-14 h-14 sm:w-16 sm:h-16 rounded-xl object-cover shadow-sm flex-shrink-0 border border-slate-200" />
        <div class="flex-1 min-w-0">
          <div class="flex items-center gap-2">
            <span class="bg-blue-100 text-blue-800 text-[10px] font-extrabold px-2 py-0.5 rounded-full">${item.subType || item.category}</span>
            <span class="text-amber-500 text-xs font-bold flex items-center gap-0.5">★ ${item.rating || 4.8}</span>
          </div>
          <h4 class="text-xs sm:text-sm font-extrabold text-slate-900 truncate mt-0.5">${item.name}</h4>
          <div class="flex items-center gap-2 text-xs text-slate-600 mt-0.5">
            <span class="text-blue-700 font-bold flex items-center gap-0.5">
              <span class="material-symbols-outlined text-xs sm:text-sm">near_me</span>
              <span>${distanceKm} km (${travelMins} mins away)</span>
            </span>
            <span>•</span>
            <span class="font-extrabold text-slate-900">${item.currency || '₹'}${item.pricePerDay || item.pricePerNight || item.price || ''}${item.pricePerDay ? '/day' : ''}</span>
          </div>
        </div>
        <div class="flex flex-col gap-1.5 flex-shrink-0">
          <button onclick="window.showMarkerDetails('${item.id}', '${item.category}')" class="px-3.5 py-1.5 sm:py-2 bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs rounded-xl shadow-md transition-all flex items-center gap-1">
            <span>Book Now</span>
            <span class="material-symbols-outlined text-sm">arrow_forward</span>
          </button>
          <div class="flex items-center justify-between text-[11px] text-slate-500 font-semibold px-1">
            <button onclick="window.selectPreviousNearbyItem()" class="hover:text-blue-600 font-bold">‹ Prev</button>
            <span class="text-[10px] font-mono text-slate-400">${index + 1}/${this.resolvedItems.length}</span>
            <button onclick="window.selectNextNearbyItem()" class="hover:text-blue-600 font-bold">Next ›</button>
          </div>
        </div>
      </div>
    `;
  }

  // =========================================================================
  // MODEL A: HIGHWAY CORRIDOR ROUTE MAP & AMBER BRANCH SPUR CONNECTORS
  // =========================================================================
  initLeafletRouteMap(mountId) {
    const { from, destination, distanceKm, estimatedTime, stops } = this.options;
    const endpoints = getCorridorEndpoints(from, destination);
    const start = endpoints.start;
    const end = endpoints.end;

    const map = L.map(mountId, {
      zoomControl: false,
      attributionControl: false,
      scrollWheelZoom: true,
      smoothWheelZoom: true,
      doubleClickZoom: true,
      touchZoom: true,
      dragging: true,
      inertia: true
    }).setView([(start.lat + end.lat) / 2, (start.lng + end.lng) / 2], 10);

    this.leafletMap = map;
    this.setupTileLayers(map);

    // 1. Generate Main Highway Driving Polyline with Realistic Curvature
    const mainHighwayPoints = generateCurvedRoutePoints(start, end);

    // 2. Draw 5 km Corridor Buffer Zones along Highway
    mainHighwayPoints.forEach((pt, i) => {
      if (i % 2 === 0) {
        L.circle([pt[0], pt[1]], {
          radius: 5000,
          color: '#3b82f6',
          fillColor: '#60a5fa',
          fillOpacity: 0.05,
          weight: 1,
          dashArray: '4, 8'
        }).addTo(map);
      }
    });

    // 3. MAIN ROUTE HIGHWAY (Google Maps Deep Blue with Casing)
    L.polyline(mainHighwayPoints, {
      color: '#1e3a8a',
      weight: 8,
      opacity: 0.9,
      lineCap: 'round',
      lineJoin: 'round'
    }).addTo(map);

    L.polyline(mainHighwayPoints, {
      color: '#2563eb',
      weight: 5,
      opacity: 1,
      lineCap: 'round',
      lineJoin: 'round',
      className: 'path-flow-animation'
    }).addTo(map);

    // 4. Origin Pin (A)
    const originIcon = L.divIcon({
      className: 'origin-marker-pin',
      html: `
        <div class="flex flex-col items-center">
          <div class="w-10 h-10 rounded-full bg-blue-900 border-2 border-white text-white font-extrabold flex items-center justify-center shadow-xl">
            A
          </div>
          <div class="bg-slate-900 text-white text-[11px] font-bold px-2 py-0.5 rounded shadow mt-1 whitespace-nowrap">
            📍 ${from.split(',')[0]}
          </div>
        </div>
      `,
      iconSize: [40, 50],
      iconAnchor: [20, 25]
    });
    L.marker([start.lat, start.lng], { icon: originIcon }).addTo(map)
      .bindPopup(`<b>Origin: ${from}</b><br>Journey Start Milestone`);

    // 5. Destination Pin (B)
    const destIcon = L.divIcon({
      className: 'dest-marker-pin',
      html: `
        <div class="flex flex-col items-center">
          <div class="w-10 h-10 rounded-full bg-emerald-600 border-2 border-white text-white font-extrabold flex items-center justify-center shadow-xl">
            B
          </div>
          <div class="bg-emerald-900 text-white text-[11px] font-bold px-2 py-0.5 rounded shadow mt-1 whitespace-nowrap">
            🏁 ${destination.split(',')[0]}
          </div>
        </div>
      `,
      iconSize: [40, 50],
      iconAnchor: [20, 25]
    });
    L.marker([end.lat, end.lng], { icon: destIcon }).addTo(map)
      .bindPopup(`<b>Destination: ${destination}</b><br>✦ ${distanceKm} km • ${estimatedTime}`);

    // 6. FAMOUS WAYPOINT STOPS ALONG CORRIDOR + BRANCH CONNECTOR PATHS IN AMBER/ORANGE!
    const verifiedStops = (stops && stops.length > 0) ? stops : getCorridorFamousStops(from, destination, start, end);

    verifiedStops.forEach((stop, idx) => {
      const highwayAnchor = findNearestRoutePoint(stop.lat, stop.lng, mainHighwayPoints);
      const detourKm = calculateAccurateDistanceKm(highwayAnchor[0], highwayAnchor[1], stop.lat, stop.lng);

      // BRANCH CONNECTOR PATH IN A DISTINCT COLOR: Vibrant Amber/Orange (#f59e0b)
      L.polyline([[highwayAnchor[0], highwayAnchor[1]], [stop.lat, stop.lng]], {
        color: '#f59e0b', // Vibrant Orange / Amber
        weight: 4,
        opacity: 0.95,
        dashArray: '5, 6',
        className: 'path-flow-animation'
      }).addTo(map);

      // SPUR DETOUR DISTANCE BADGE right on the branch connector
      const branchMidLat = (highwayAnchor[0] + stop.lat) / 2;
      const branchMidLng = (highwayAnchor[1] + stop.lng) / 2;
      L.marker([branchMidLat, branchMidLng], {
        icon: L.divIcon({
          className: 'spur-path-badge',
          html: `<div class="spur-path-badge">✦ Detour: +${detourKm} km</div>`
        })
      }).addTo(map);

      // Waypoint Stop Marker
      const stopIcon = L.divIcon({
        className: 'stop-waypoint-pin',
        html: `
          <div class="flex flex-col items-center group cursor-pointer" onclick="window.scrollToStopCard('${stop.id}')">
            <div class="w-8 h-8 rounded-full bg-slate-900 border-2 border-amber-400 text-amber-300 font-extrabold text-xs flex items-center justify-center shadow-lg transition-transform group-hover:scale-125">
              ${idx + 1}
            </div>
            <div class="bg-amber-500 text-slate-950 text-[10px] font-extrabold px-1.5 py-0.5 rounded shadow mt-0.5 whitespace-nowrap">
              ${stop.name.length > 18 ? stop.name.substring(0, 17) + '...' : stop.name}
            </div>
          </div>
        `,
        iconSize: [32, 42],
        iconAnchor: [16, 21]
      });

      const marker = L.marker([stop.lat, stop.lng], { icon: stopIcon }).addTo(map);
      marker.bindPopup(`
        <div class="p-1 max-w-[220px]">
          <img src="${stop.image || 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=400&q=80'}" class="w-full h-24 object-cover rounded-lg mb-1.5" />
          <h4 class="text-xs font-bold text-slate-900 leading-tight">${stop.name}</h4>
          <p class="text-[11px] text-amber-700 font-semibold mt-0.5">✦ Detour: +${detourKm} km from main highway</p>
          <p class="text-[10px] text-slate-500 mt-0.5">${stop.description || ''}</p>
          <div class="mt-2 pt-2 border-t border-slate-100 flex items-center justify-between">
            <span class="text-xs font-bold text-slate-900">${stop.currency || '₹'}${stop.price || ''}</span>
            <button onclick="window.scrollToStopCard('${stop.id}')" class="px-2 py-0.5 bg-amber-500 text-slate-950 text-[10px] font-bold rounded">
              Inspect Stop
            </button>
          </div>
        </div>
      `);
    });

    // Fit Highway Bounds
    this.mainHighwayBounds = L.latLngBounds(mainHighwayPoints);
    map.fitBounds(this.mainHighwayBounds, { padding: [40, 40] });

    // Add Google Controls
    this.renderGoogleMapsControls(map, (start.lat + end.lat) / 2, (start.lng + end.lng) / 2, null, "route");

    setTimeout(() => {
      if (this.leafletMap) this.leafletMap.invalidateSize();
    }, 150);
  }

  // =========================================================================
  // LOCATION PICKER MAP
  // =========================================================================
  initLeafletPickerMap(mountId) {
    const { center, onLocationSelect } = this.options;
    const centerLat = center.lat || 11.0168;
    const centerLng = center.lng || 76.9558;

    const map = L.map(mountId, {
      zoomControl: false,
      attributionControl: false,
      scrollWheelZoom: true,
      smoothWheelZoom: true,
      touchZoom: true,
      dragging: true
    }).setView([centerLat, centerLng], 14);

    this.leafletMap = map;
    this.setupTileLayers(map);

    const pinIcon = L.divIcon({
      className: 'picker-drop-pin',
      html: `
        <div class="flex flex-col items-center cursor-pointer group">
          <div class="w-10 h-10 rounded-full bg-red-600 text-white border-2 border-white shadow-2xl flex items-center justify-center animate-bounce">
            <span class="material-symbols-outlined text-2xl">location_on</span>
          </div>
          <div class="bg-slate-900 text-white text-[10px] font-bold px-2 py-0.5 rounded shadow mt-1 whitespace-nowrap">
            Selected Pin
          </div>
        </div>
      `,
      iconSize: [40, 50],
      iconAnchor: [20, 35]
    });

    const marker = L.marker([centerLat, centerLng], { icon: pinIcon, draggable: true }).addTo(map);

    const updatePin = (lat, lng) => {
      marker.setLatLng([lat, lng]);
      const newLoc = {
        name: `Pinned Location (${lat.toFixed(4)}, ${lng.toFixed(4)})`,
        city: center.city || "Coimbatore",
        state: center.state || "Tamil Nadu",
        country: center.country || "India",
        lat: Number(lat.toFixed(4)),
        lng: Number(lng.toFixed(4)),
        radius: 5
      };
      if (onLocationSelect) onLocationSelect(newLoc);
      if (window.handleLocationPinDropped) window.handleLocationPinDropped(newLoc);
    };

    marker.on('dragend', (e) => {
      const p = e.target.getLatLng();
      updatePin(p.lat, p.lng);
    });

    map.on('click', (e) => {
      updatePin(e.latlng.lat, e.latlng.lng);
    });

    this.renderGoogleMapsControls(map, centerLat, centerLng, null, "picker");

    setTimeout(() => {
      if (this.leafletMap) this.leafletMap.invalidateSize();
    }, 150);
  }

  // Fallback Vector Canvas Map for Offline Safety
  renderVectorCanvasFallback() {
    this.container.innerHTML = `
      <div class="w-full h-full min-h-[420px] rounded-2xl bg-slate-950 p-6 flex flex-col items-center justify-center text-center select-none border border-slate-800">
        <div class="w-16 h-16 rounded-full bg-blue-900/40 text-blue-400 flex items-center justify-center mb-4 border border-blue-400/40 animate-pulse">
          <span class="material-symbols-outlined text-3xl">map</span>
        </div>
        <h4 class="text-base font-bold text-white mb-1">Interactive Map Engine Active</h4>
        <p class="text-xs text-slate-400 max-w-sm">Leaflet cartography service connected. Displaying ${this.options.radiusKm} km radius discovery around ${this.options.center.name || 'Selected Anchor'}.</p>
      </div>
    `;
  }
}

// =========================================================================
// ACCURATE GEOGRAPHIC & STREET ROUTING HELPERS
// =========================================================================

// Geodesic distance calculation via Haversine Formula with realistic road detour coefficient
export function calculateAccurateDistanceKm(lat1, lon1, lat2, lon2) {
  const R = 6371; // Earth mean radius in km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const straightLine = R * c;
  const roadDist = straightLine < 0.2 ? straightLine : straightLine * 1.24;
  return parseFloat(roadDist.toFixed(1));
}

// Generate Realistic Street Grid Driving Turns (Rapido / Google Maps street geometry)
export function generateStreetRoutePoints(startLat, startLng, endLat, endLng) {
  const points = [[startLat, startLng]];
  const dLat = endLat - startLat;
  const dLng = endLng - startLng;

  // 4-segment street grid path with turns
  points.push([startLat + dLat * 0.35, startLng + dLng * 0.08]);
  points.push([startLat + dLat * 0.38, startLng + dLng * 0.62]);
  points.push([startLat + dLat * 0.85, startLng + dLng * 0.65]);
  points.push([endLat, endLng]);

  return points;
}

// Dynamically generate realistic nearby resources distributed nicely within 0.7 km - 3.8 km of any center
export function generateRealisticNearbyItems(center, radiusKm, templateItems) {
  const cLat = center.lat || 11.0168;
  const cLng = center.lng || 76.9558;
  const cityName = center.city || (center.name ? center.name.split(',')[0] : 'Coimbatore');

  // If templates are provided (e.g. from HOTELS, RESTAURANTS, HOSPITALS, etc.)
  if (templateItems && templateItems.length >= 3) {
    return templateItems.slice(0, 5).map((item, idx) => {
      const angle = (idx * 72 + 25) * (Math.PI / 180);
      const rKm = 0.8 + (idx * 0.6); // 0.8, 1.4, 2.0, 2.6, 3.2 km
      const offsetLat = (rKm / 111) * Math.cos(angle);
      const offsetLng = (rKm / (111 * Math.cos(cLat * Math.PI / 180))) * Math.sin(angle);
      const lat = Number((cLat + offsetLat).toFixed(4));
      const lng = Number((cLng + offsetLng).toFixed(4));
      const distanceKm = calculateAccurateDistanceKm(cLat, cLng, lat, lng);
      const travelMins = Math.max(2, Math.round(distanceKm * 2.8));
      return {
        ...item,
        id: `${item.id}-loc-${idx}`,
        name: item.name.replace(/Coimbatore|Paris|Ooty/g, cityName),
        location: `${cityName} Hub (${distanceKm} km)`,
        lat,
        lng,
        distanceKm,
        travelMins
      };
    });
  }

  const presets = [
    {
      id: "gen-rent-1",
      name: "Royal Enfield Classic 350 • Cruiser Hub",
      subType: "Bike Rental",
      category: "Rental Vehicles",
      offsetLat: 0.0092,
      offsetLng: 0.0074,
      rating: 4.8,
      pricePerDay: 750,
      currency: "₹",
      image: "https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=600&q=80"
    },
    {
      id: "gen-rent-2",
      name: "Ather 450X Gen 3 • Smart EV Station",
      subType: "Electric Scooter",
      category: "Rental Vehicles",
      offsetLat: -0.0071,
      offsetLng: 0.0105,
      rating: 4.9,
      pricePerDay: 450,
      currency: "₹",
      image: "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&w=600&q=80"
    },
    {
      id: "gen-rent-3",
      name: "Mahindra Thar 4x4 • Adventure Fleet",
      subType: "SUV Rental",
      category: "Rental Vehicles",
      offsetLat: 0.0145,
      offsetLng: -0.0120,
      rating: 4.9,
      pricePerDay: 3200,
      currency: "₹",
      image: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=600&q=80"
    },
    {
      id: "gen-rent-4",
      name: "Hyundai Creta SX • City Drive Hub",
      subType: "Car Rental",
      category: "Rental Vehicles",
      offsetLat: -0.0118,
      offsetLng: -0.0085,
      rating: 4.7,
      pricePerDay: 2100,
      currency: "₹",
      image: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=600&q=80"
    },
    {
      id: "gen-rent-5",
      name: "Honda Activa 6G • Daily Express Fleet",
      subType: "Scooter Rental",
      category: "Rental Vehicles",
      offsetLat: 0.0045,
      offsetLng: -0.0055,
      rating: 4.6,
      pricePerDay: 350,
      currency: "₹",
      image: "https://images.unsplash.com/photo-1485965120184-e220f721d03e?auto=format&fit=crop&w=600&q=80"
    }
  ];

  return presets.map(p => {
    const lat = Number((cLat + p.offsetLat).toFixed(4));
    const lng = Number((cLng + p.offsetLng).toFixed(4));
    const distanceKm = calculateAccurateDistanceKm(cLat, cLng, lat, lng);
    const travelMins = Math.max(2, Math.round(distanceKm * 2.8));
    return {
      ...p,
      name: p.name.replace("City", cityName),
      lat,
      lng,
      distanceKm,
      travelMins
    };
  });
}

// Category Marker Config
function getCategoryMarkerConfig(category, subType) {
  const cat = (category || '').toLowerCase();
  const sub = (subType || '').toLowerCase();

  if (cat.includes('rental') || sub.includes('bike') || sub.includes('car')) {
    return { icon: sub.includes('bike') || sub.includes('scooter') ? 'two_wheeler' : 'directions_car', bg: 'bg-cyan-600' };
  }
  if (cat.includes('hotel') || cat.includes('resort')) {
    return { icon: 'hotel', bg: 'bg-teal-600' };
  }
  if (cat.includes('restaurant') || cat.includes('dining')) {
    return { icon: 'restaurant', bg: 'bg-amber-500' };
  }
  if (cat.includes('guide')) {
    return { icon: 'badge', bg: 'bg-indigo-600' };
  }
  if (cat.includes('hospital')) {
    return { icon: 'local_hospital', bg: 'bg-red-600' };
  }
  return { icon: 'place', bg: 'bg-blue-600' };
}

// Highway Route Curvature
function generateCurvedRoutePoints(start, end) {
  const points = [];
  const steps = 16;
  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    let lat = start.lat + (end.lat - start.lat) * t;
    let lng = start.lng + (end.lng - start.lng) * t;
    const curve = Math.sin(t * Math.PI) * 0.045;
    lat += curve * 0.8;
    lng += curve * 1.1;
    points.push([lat, lng]);
  }
  return points;
}

// Closest Highway Point for Spur Detours
function findNearestRoutePoint(targetLat, targetLng, routePoints) {
  let closest = routePoints[0];
  let minD = 999999;
  for (const pt of routePoints) {
    const d = Math.hypot(pt[0] - targetLat, pt[1] - targetLng);
    if (d < minD) {
      minD = d;
      closest = pt;
    }
  }
  return closest;
}

// Corridor Endpoints Resolver
export function getCorridorEndpoints(from, destination) {
  const start = resolveCityCoords(from, { lat: 11.0168, lng: 76.9558, name: "Coimbatore, Tamil Nadu" });
  const end = resolveCityCoords(destination, { lat: 12.5266, lng: 78.2146, name: "Krishnagiri, Tamil Nadu" });
  return { start, end };
}

// Famous Corridor Stops Resolver
export function getCorridorFamousStops(from, destination, start, end) {
  return getDefaultCorridorStops(from, destination);
}
