# Customized Easy Explorer (v2.0)

A comprehensive real-world travel, tourism, and nearby discovery web application based on the **Stitch project `Customized Easy Explorer` (ID: `2755528737693230469`)**, featuring the **Updated Location Logic Architecture**.

---

## 🗺️ Architectural Summary

### 1. The Two Global Discovery Models

| Feature | Model | Location Flow | Visual Identity |
| :--- | :--- | :--- | :--- |
| **Tourist Places** | **Model A** | `From Location ➔ Destination` (Route confirmation) | **Linear Journey Path**: `📍 Coimbatore ━━━━✦━━━━ 📍 Paris` with animated SVG route line, distance & travel time |
| **Hotels & Resorts** | **Model B** | `Select Location ➔ Radial Nearby Scanner` (NO destination) | **Concentric Sonar Radar**: Animated radial waves covering 1–25 km around selected anchor with nearby stays |
| **Rental Vehicles** | **Model B** | `Select Location ➔ Radial Nearby Scanner` (NO destination) | **Concentric Sonar Radar**: Available fleet near pickup point + verified owner profiles (e.g. Rohan K.) |
| **Restaurants** | **Model B** | `Select Location ➔ Radial Nearby Scanner` (NO destination) | **Concentric Sonar Radar**: Culinary spots within radius + digital menus & table reservations |
| **Tourist Guides** | **Model B** | `Select Location ➔ Radial Nearby Scanner` (NO destination) | **Concentric Sonar Radar**: Certified local guides & naturalists within radius |
| **Hospitals & SOS**| **Model B** | `Select Location ➔ Rapid Emergency Triage` (NO destination) | **Concentric Sonar Radar**: 24/7 emergency centers, live ICU beds & instant SOS dispatch |

---

## 🎨 Visual Design System

* **Typography**: Montserrat (Headings) + Inter (Body & Labels)
* **Aesthetic**: Premium Glassmorphism (`backdrop-filter: blur(20px)`, `border: 1px solid rgba(255, 255, 255, 0.45)`, `box-shadow: 0 20px 50px rgba(0, 53, 128, 0.12)`)
* **Color Palette**:
  * **Deep Midnight Blue**: `#0a192f`
  * **Deep Ocean**: `#003580`
  * **Turquoise / Teal**: `#0f766e` / `#14b8a6` (Primary interactive trigger)
  * **Warm Gold**: `#f59e0b` (Ratings & verified badges)
  * **Surface Crisp White**: `#f6fafe`

---

## 🚀 Key Implemented Features

1. **Universal Reusable Location Selection**:
   * Context-aware headings (*"Where do you want to stay?"*, *"Where do you need a vehicle?"*, *"Where do you want to eat?"*, *"Find hospitals near you"*).
   * 3 instant selection modes:
     * **Use Current Location** (Auto-detects GPS coordinates e.g. 📍 *Gandhipuram, Coimbatore, Tamil Nadu*).
     * **Search Location** (Real-time auto-complete with quick regional presets: Coimbatore, Chennai, Bangalore, Ooty, Marina Beach, Paris, etc.).
     * **Select on Map** (Interactive map canvas with clickable/draggable pin drop).
   * Location Confirmation Card with radius selector pills (`1 km`, `5 km`, `10 km`, `25 km`) and `[Change Location]` button (modifies anchor without restarting the flow).

2. **Rental Vehicles (No Destination Required)**:
   * Asks only for parameters needed for rental availability: Pickup Date/Time, Return Date/Time, Vehicle Type, Passenger count.
   * **Rohan K. Rental Owner Profile** faithfully preserved: 5.0 rating, 128 reviews, verified host badge, 42 vehicles in fleet, 15 years experience, 99% response rate, and direct contact.

3. **Hospitals & Emergency Discovery**:
   * Prominent **Use Current Location** priority banner for immediate triage.
   * Emergency 24/7 filters, ambulance standby counters, and 1-click **Emergency SOS Dispatch** modal.

4. **Model A Expedition (Tourist Places)**:
   * Origin ➔ Destination route confirmation with dynamic flight/road distance, travel time, and ranked landmark cards.

5. **Real-Time Dynamic Route Operations (Model A)**:
   * Dynamic Origin (`From`) and Destination (`To`) inputs with 1-click swap (`⇄`), current location autofill, and quick route presets (Coimbatore ➔ Ooty, Chennai ➔ Bangalore, Delhi ➔ Agra, Paris ➔ Nice).
   * **AI Model & Live Web Discovery Engine Selector**:
     * 🧠 **Gemini AI Corridor Scout**: AI-powered corridor analysis for scenic waypoints, mountain lookouts, highway eateries, and regional heritage.
     * 🌐 **OpenStreetMap Live Web Scanner**: Live geospatial extraction of real POIs along the bounding highway corridor.
     * ⚡ **Smart Route Pathfinder**: Instant heuristic route solver.
   * Real-time Corridor Visualizer SVG map plotting origin A, destination B, and numbered clickable waypoints.
   * Dynamic Availabilities Grid with category filters (Scenic Viewpoints, Stays & Resorts, Highway Dining).

6. **Authentication & Sign In System**:
   * Prominently accessible in the top header and left navigation bar.
   * Reactive state: Instant toggling between logged-in user profile with dropdown menu (Profile, Bookings, Admin, Sign Out) and logged-out guest state (`[Sign In]`, `[Create Account]`).
   * 1-Click Demo Accounts: Instant test sign-in as *Explorer Elite* (User) or *Fleet Administrator* (Admin).
   * Full custom email/password registration and login forms with toast notifications.

7. **User Dashboard & Bookings**:
   * Instant digital QR voucher passes for all reservations.
   * Complete admin system toggle with platform KPIs and partner verification tables.

---

## 💻 Running the Application

This is a modern, dependency-free web application.

### Option 1: Zero-Install Local Server
Run with Node.js built into your system:
```bash
node server.js
```
Then navigate to: **`http://localhost:3000`**

### Option 2: Direct Browser Launch
Simply open **`index.html`** in any modern web browser.
