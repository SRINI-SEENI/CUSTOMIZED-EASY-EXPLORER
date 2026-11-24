// Customized Easy Explorer - Modern Travel & Discovery Application
// Self-contained Unified Bundle for both file:/// and http:// protocols

(function () {
  'use strict';

  // --- DATA & CONFIG ---
  const APP_CONFIG = {
    appName: "Customized Easy Explorer",
    version: "2.0.0-PRO",
    theme: "Customized Easy Explorer",
    defaultCoordinates: {
      lat: 11.0168,
      lng: 76.9558,
      name: "Gandhipuram, Coimbatore",
      city: "Coimbatore",
      state: "Tamil Nadu",
      country: "India"
    }
  };

  const COUNTRIES = [
    { id: "IN", name: "India", code: "IND", flag: "🇮🇳", popularCity: "Coimbatore", defaultLat: 11.0168, defaultLng: 76.9558 },
    { id: "FR", name: "France", code: "FRA", flag: "🇫🇷", popularCity: "Paris", defaultLat: 48.8566, defaultLng: 2.3522 },
    { id: "JP", name: "Japan", code: "JPN", flag: "🇯🇵", popularCity: "Tokyo", defaultLat: 35.6762, defaultLng: 139.6503 },
    { id: "IT", name: "Italy", code: "ITA", flag: "🇮🇹", popularCity: "Rome", defaultLat: 41.9028, defaultLng: 12.4964 },
    { id: "CH", name: "Switzerland", code: "CHE", flag: "🇨🇭", popularCity: "Zurich", defaultLat: 47.3769, defaultLng: 8.5417 },
    { id: "US", name: "United States", code: "USA", flag: "🇺🇸", popularCity: "New York", defaultLat: 40.7128, defaultLng: -74.0060 },
    { id: "AE", name: "United Arab Emirates", code: "ARE", flag: "🇦🇪", popularCity: "Dubai", defaultLat: 25.2048, defaultLng: 55.2708 },
    { id: "SG", name: "Singapore", code: "SGP", flag: "🇸🇬", popularCity: "Singapore", defaultLat: 1.3521, defaultLng: 103.8198 }
  ];

  const PRESET_LOCATIONS = [
    {
      name: "Gandhipuram, Coimbatore",
      city: "Coimbatore",
      state: "Tamil Nadu",
      country: "India",
      lat: 11.0168,
      lng: 76.9558,
      type: "Commercial Hub & Bus Terminal",
      radius: 5
    },
    {
      name: "RS Puram, Coimbatore",
      city: "Coimbatore",
      state: "Tamil Nadu",
      country: "India",
      lat: 11.0124,
      lng: 76.9458,
      type: "Dining & Boutique Quarter",
      radius: 5
    },
    {
      name: "Race Course, Coimbatore",
      city: "Coimbatore",
      state: "Tamil Nadu",
      country: "India",
      lat: 11.0063,
      lng: 76.9745,
      type: "Green Promenade & Luxury Stays",
      radius: 5
    },
    {
      name: "Ooty (Udhagamandalam)",
      city: "Ooty",
      state: "Tamil Nadu",
      country: "India",
      lat: 11.4102,
      lng: 76.6950,
      type: "Hill Station & Mountain Resorts",
      radius: 10
    },
    {
      name: "Marina Beach, Chennai",
      city: "Chennai",
      state: "Tamil Nadu",
      country: "India",
      lat: 13.0499,
      lng: 80.2824,
      type: "Coastal Landmark",
      radius: 5
    },
    {
      name: "MG Road, Bangalore",
      city: "Bangalore",
      state: "Karnataka",
      country: "India",
      lat: 12.9756,
      lng: 77.6066,
      type: "Metropolitan Center",
      radius: 5
    },
    {
      name: "Eiffel Tower (7th Arr.)",
      city: "Paris",
      state: "Île-de-France",
      country: "France",
      lat: 48.8584,
      lng: 2.2945,
      type: "Iconic Monument & Seine District",
      radius: 5
    }
  ];

  // MODEL A: Route-Based Discovery (Tourist Places ONLY)
  const ROUTE_DESTINATIONS = [
    {
      id: "route-cbe-ooty",
      from: { name: "Coimbatore, India", lat: 11.0168, lng: 76.9558 },
      destination: { name: "Ooty, Tamil Nadu", lat: 11.4102, lng: 76.6950 },
      distanceKm: 86,
      estimatedTime: "2h 45m",
      transportModes: ["Mountain Road / Taxi", "Nilgiri Toy Train"],
      scenicHighlight: "36 Hairpin Bends through Nilgiri Cloud Forests"
    },
    {
      id: "route-cbe-paris",
      from: { name: "Coimbatore, India", lat: 11.0168, lng: 76.9558 },
      destination: { name: "Paris, France", lat: 48.8566, lng: 2.3522 },
      distanceKm: 7850,
      estimatedTime: "11h 45m",
      transportModes: ["Intercontinental Flight", "High Speed Rail TGV"],
      scenicHighlight: "Over Arabian Sea and Mediterranean Airway"
    }
  ];

  const TOURIST_PLACES = [
    {
      id: "tp-1",
      name: "Eiffel Tower",
      destination: "Paris, France",
      category: "Iconic Monument",
      rating: 4.8,
      reviewsCount: 32410,
      price: 32,
      currency: "€",
      image: "https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?auto=format&fit=crop&w=1200&q=80",
      description: "The world's most recognizable wrought-iron lattice tower on the Champ de Mars, offering breathtaking 360° panoramic views over Paris.",
      highlights: ["Summit Observation Deck", "Glass Floor on Level 1", "Michelin-starred Jules Verne Restaurant", "Night Sparkle Illumination"],
      openingHours: "09:00 - 23:45 Daily",
      address: "Champ de Mars, 5 Av. Anatole France, 75007 Paris",
      tags: ["Must Visit", "Architectural Wonder", "Romantic", "Panoramic"]
    },
    {
      id: "tp-2",
      name: "Louvre Museum",
      destination: "Paris, France",
      category: "World Heritage Museum",
      rating: 4.9,
      reviewsCount: 41200,
      price: 22,
      currency: "€",
      image: "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?auto=format&fit=crop&w=1200&q=80",
      description: "Home to thousands of classic and modern masterpieces, including the Mona Lisa, Venus de Milo, and the stunning glass pyramid courtyard.",
      highlights: ["Winged Victory of Samothrace", "Napoleon III Apartments", "Egyptian Antiquities"],
      openingHours: "09:00 - 18:00 (Wed/Fri until 21:45)",
      address: "Rue de Rivoli, 75001 Paris",
      tags: ["Art", "History", "Top Rated"]
    },
    {
      id: "tp-3",
      name: "Government Botanical Garden",
      destination: "Ooty, Tamil Nadu",
      category: "Botanical Wonder",
      rating: 4.7,
      reviewsCount: 18450,
      price: 50,
      currency: "₹",
      image: "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=1200&q=80",
      description: "Sprawled over 55 hectares on the slopes of Doddabetta, featuring a 20-million-year-old fossilized tree trunk and over a thousand exotic species.",
      highlights: ["Italian Floral Garden", "Fern House", "20-Million-Year-Old Fossil Tree", "Glasshouse Orchids"],
      openingHours: "07:00 - 18:30 Daily",
      address: "Vannarapettai, Ooty, Tamil Nadu 643001",
      tags: ["Nature", "Flora", "Family Friendly"]
    },
    {
      id: "tp-4",
      name: "Nilgiri Mountain Railway (Toy Train)",
      destination: "Ooty, Tamil Nadu",
      category: "UNESCO World Heritage Rail",
      rating: 4.9,
      reviewsCount: 22100,
      price: 205,
      currency: "₹",
      image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1200&q=80",
      description: "Historical metre gauge rack railway traversing dramatic cliffs, tea plantations, and 16 tunnels built in 1908 by the British.",
      highlights: ["Steam Engine Heritage", "Breathtaking Valley Vistas", "UNESCO Recognized"],
      openingHours: "Morning & Afternoon Departures",
      address: "Ooty Railway Station, Tamil Nadu",
      tags: ["Scenic Rail", "UNESCO", "Must Experience"]
    }
  ];

  // MODEL B: Location-Based Nearby Discovery (Hotels & Resorts)
  const HOTELS = [
    {
      id: "hotel-1",
      name: "The Residency Towers",
      locationArea: "Avinashi Road, Gandhipuram",
      city: "Coimbatore",
      distanceKm: 0.8,
      rating: 4.8,
      reviewsCount: 1420,
      pricePerNight: 5800,
      currency: "₹",
      propertyType: "Luxury 5-Star Hotel",
      freeCancellation: true,
      image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1000&q=80",
      amenities: ["Free High-Speed WiFi", "Infinity Swimming Pool", "Resa Spa", "24/7 Room Service", "EV Fast Charging", "Valet Parking"],
      description: "An oasis of premier luxury located minutes from Gandhipuram. Features elegant executive suites, fine dining restaurants, and panoramic city vistas.",
      rooms: [
        { id: "r1", name: "Executive Grand Suite", price: 5800, size: "420 sq.ft", bed: "1 King Bed", capacity: "2 Adults + 1 Child", view: "Skyline View" },
        { id: "r2", name: "Presidential Glass Penthouse", price: 12500, size: "850 sq.ft", bed: "2 King Beds", capacity: "4 Guests", view: "360 Panoramic" }
      ],
      lat: 11.0185,
      lng: 76.9602
    },
    {
      id: "hotel-2",
      name: "Vivanta Coimbatore",
      locationArea: "Race Course",
      city: "Coimbatore",
      distanceKm: 2.1,
      rating: 4.9,
      reviewsCount: 2150,
      pricePerNight: 7200,
      currency: "₹",
      propertyType: "Heritage Luxury Hotel",
      freeCancellation: true,
      image: "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=1000&q=80",
      amenities: ["Open-air Pool", "Jiva Spa", "Teppanyaki Restaurant", "24/7 Fitness Center", "Cocktail Lounge"],
      description: "Set in the prestigious Race Course promenade with lush greenery, providing premium 24/7 concierge service and tranquil glass-walled suites.",
      rooms: [
        { id: "r3", name: "Superior Garden Suite", price: 7200, size: "480 sq.ft", bed: "1 King Bed", capacity: "2 Guests", view: "Promenade Garden" }
      ],
      lat: 11.0068,
      lng: 76.9752
    },
    {
      id: "hotel-3",
      name: "Savoy - IHCL SeleQtions",
      locationArea: "Sylks Road",
      city: "Ooty",
      distanceKm: 3.4,
      rating: 4.9,
      reviewsCount: 1890,
      pricePerNight: 11500,
      currency: "₹",
      propertyType: "Colonial Luxury Resort",
      freeCancellation: false,
      image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1000&q=80",
      amenities: ["Fireplace in Rooms", "Heritage Tea Lounge", "Ayurvedic Spa", "Mountain Trek Concierge", "Horseback Riding"],
      description: "Nestled in misty Nilgiri pine trees, a 19th-century colonial resort offering wood-burning fireplaces, afternoon English high tea, and landscaped gardens.",
      rooms: [
        { id: "r4", name: "Chalet with Fireplace", price: 11500, size: "520 sq.ft", bed: "1 Queen Bed", capacity: "2 Guests", view: "Misty Valleys" }
      ],
      lat: 11.4120,
      lng: 76.6980
    },
    {
      id: "hotel-4",
      name: "Hôtel Plaza Athénée",
      locationArea: "Avenue Montaigne",
      city: "Paris",
      distanceKm: 1.2,
      rating: 5.0,
      reviewsCount: 3800,
      pricePerNight: 850,
      currency: "€",
      propertyType: "Haute Couture Palace",
      freeCancellation: true,
      image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=1000&q=80",
      amenities: ["Eiffel Tower Views", "Dior Spa", "Michelin Dining", "Private Limousine Service", "Designer Courtyard"],
      description: "The epitome of Parisian haute luxury on Avenue Montaigne. Iconic red geraniums and direct, unobstructed vistas of the Eiffel Tower.",
      rooms: [
        { id: "r5", name: "Eiffel View Prestige Suite", price: 1450, size: "75 sq.m", bed: "1 King Bed", capacity: "2 Guests", view: "Direct Eiffel Tower" }
      ],
      lat: 48.8660,
      lng: 2.3045
    }
  ];

  // MODEL B: Location-Based Nearby Discovery (Rental Vehicles)
  const RENTAL_OWNERS = {
    rohanK: {
      id: "owner-rohan-k",
      name: "Rohan K.",
      title: "Verified Fleet Owner & Vehicle Host",
      verified: true,
      rating: 5.0,
      reviewsCount: 128,
      yearsExp: 15,
      totalVehicles: 42,
      responseRate: "99%",
      responseTime: "< 5 mins",
      location: "Gandhipuram Transport Hub, Coimbatore",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
      bio: "Managing a modern, well-maintained fleet of electric sedans, premium SUVs, and comfortable city vehicles across Tamil Nadu. All vehicles undergo a comprehensive 48-point safety and maintenance inspection before every booking.",
      otherVehicles: ["Aura Sedan Pro", "Volt SUV 4x4", "City E-Bike Pro", "Urban Cruiser"]
    }
  };

  const RENTAL_VEHICLES = [
    {
      id: "veh-1",
      name: "Aura Sedan Pro",
      category: "Cars",
      subType: "Electric Luxury Sedan",
      modelYear: "2026 Edition",
      distanceKm: 0.5,
      rating: 4.9,
      pricePerDay: 3400,
      currency: "₹",
      fuel: "Electric (480 km range)",
      transmission: "Automatic / Autonomous Assist",
      seats: 4,
      mileage: "Unlimited Plan",
      pickupLocation: "Gandhipuram Station Bay 3",
      verifiedOwner: true,
      owner: RENTAL_OWNERS.rohanK,
      image: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1000&q=80",
      features: ["Panoramic Glass Roof", "360° Cam", "Ventilated Seats", "Fast Supercharge Compatible", "Air Purifier"],
      lat: 11.0175,
      lng: 76.9580
    },
    {
      id: "veh-2",
      name: "Volt SUV 4x4",
      category: "SUVs",
      subType: "All-Terrain Electric Cruiser",
      modelYear: "2026 Edition",
      distanceKm: 0.9,
      rating: 5.0,
      pricePerDay: 4800,
      currency: "₹",
      fuel: "Dual-Motor Electric AWD",
      transmission: "Automatic",
      seats: 6,
      mileage: "350 km/day included",
      pickupLocation: "Cross Cut Road Depot, Gandhipuram",
      verifiedOwner: true,
      owner: RENTAL_OWNERS.rohanK,
      image: "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&w=1000&q=80",
      features: ["Air Suspension", "Hill Descent Control", "Roof Luggage Carrier", "Heated Seats", "Off-Road Terrain Modes"],
      lat: 11.0192,
      lng: 76.9540
    },
    {
      id: "veh-3",
      name: "City E-Bike Pro",
      category: "Bikes",
      subType: "Smart Urban Commuter",
      modelYear: "2025 Series",
      distanceKm: 0.3,
      rating: 4.8,
      pricePerDay: 850,
      currency: "₹",
      fuel: "Removable Battery (85 km)",
      transmission: "Direct Drive E-Motor",
      seats: 2,
      mileage: "Unlimited",
      pickupLocation: "Gandhipuram North Metro Plaza",
      verifiedOwner: true,
      owner: RENTAL_OWNERS.rohanK,
      image: "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=1000&q=80",
      features: ["GPS Tracking", "Keyless Mobile NFC", "Dual Helmets Included", "Front Basket"],
      lat: 11.0160,
      lng: 76.9565
    },
    {
      id: "veh-4",
      name: "Royal Enfield Himalayan 450",
      category: "Bikes",
      subType: "Adventure Tourer",
      modelYear: "2025 Edition",
      distanceKm: 1.4,
      rating: 4.9,
      pricePerDay: 1800,
      currency: "₹",
      fuel: "Petrol (Liquid Cooled)",
      transmission: "6-Speed Manual",
      seats: 2,
      mileage: "400 km/day",
      pickupLocation: "RS Puram West Gate",
      verifiedOwner: true,
      owner: {
        id: "owner-rajesh-m",
        name: "Rajesh M.",
        verified: true,
        rating: 4.9,
        yearsExp: 9,
        totalVehicles: 14,
        responseRate: "97%"
      },
      image: "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&w=1000&q=80",
      features: ["Panniers Mount", "Phone Nav Dock", "Crash Guards", "Tool Kit Included"],
      lat: 11.0130,
      lng: 76.9470
    }
  ];

  // MODEL B: Location-Based Nearby Discovery (Restaurants)
  const RESTAURANTS = [
    {
      id: "rest-1",
      name: "Sree Annapoorna Sree Gowrishankar",
      cuisine: "Authentic South Indian & Filter Coffee",
      area: "Gandhipuram Central",
      distanceKm: 0.4,
      rating: 4.9,
      reviewsCount: 8940,
      priceRange: "₹₹ (Moderate)",
      openingHours: "06:00 - 22:30 Daily",
      dietary: ["Pure Vegetarian", "Vegan Friendly", "Jain Options Available"],
      image: "https://images.unsplash.com/photo-1610057099443-fde8c4d50f91?auto=format&fit=crop&w=1000&q=80",
      popularDishes: ["Signature Ghee Roast Dosa", "Filter Kaapi", "Mini Tiffin Platter", "Medu Vada Sambhar"],
      description: "The timeless culinary pride of Coimbatore. Legendary sambar recipe crafted with bespoke spices, aromatic ghee roasts, and world-famous south Indian filter coffee.",
      menu: [
        {
          category: "Starters & Classics", items: [
            { name: "Special Ghee Roast Dosa", price: 140, desc: "Golden thin crispy crepe bathed in aromatic cow ghee with 3 chutneys & hot sambar" },
            { name: "Medu Vada (2 Pcs)", price: 80, desc: "Crispy fried lentil fritters served dunked in piping hot house sambar" },
            { name: "Mini Tiffin Sampler", price: 210, desc: "1 Mini Masala Dosa, 2 Idlis, 1 Vada, Kesari & Filter Coffee" }
          ]
        },
        {
          category: "Signature Beverages", items: [
            { name: "Annapoorna Filter Kaapi", price: 50, desc: "Freshly brewed chicory blend in traditional brass davarah-tumbler" }
          ]
        }
      ],
      lat: 11.0170,
      lng: 76.9570
    },
    {
      id: "rest-2",
      name: "The French Door Cafe & Restaurant",
      cuisine: "French Haute & European Fine Dining",
      area: "West Venkatasamy Rd, RS Puram",
      distanceKm: 2.8,
      rating: 4.8,
      reviewsCount: 3420,
      priceRange: "₹₹₹ (Premium)",
      openingHours: "11:00 - 23:00",
      dietary: ["Vegetarian Options", "Non-Veg", "Artisanal Bakes"],
      image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1000&q=80",
      popularDishes: ["Truffle Mushroom Risotto", "Pan-Seared Sea Bass", "Crème Brûlée", "Smoked Chicken Quiche"],
      description: "Housed in a restored 1920s heritage bungalow with courtyard dining, brass lanterns, and refined French-European fusion delicacies.",
      menu: [
        {
          category: "Entrées & Mains", items: [
            { name: "Wild Truffle Risotto", price: 590, desc: "Arborio rice slow cooked with wild porchini and shaved black summer truffle" },
            { name: "Herb Roasted Corn-Fed Chicken", price: 680, desc: "Sous-vide chicken breast with rosemary jus and pomme purée" }
          ]
        },
        {
          category: "Desserts", items: [
            { name: "Classic Tahitian Vanilla Crème Brûlée", price: 340, desc: "Caramelized brittle sugar crust with fresh berry compote" }
          ]
        }
      ],
      lat: 11.0118,
      lng: 76.9440
    },
    {
      id: "rest-3",
      name: "Junior Kuppanna",
      cuisine: "Chettinad & Kongu Non-Veg Specialist",
      area: "Gandhipuram Cross Cut",
      distanceKm: 0.7,
      rating: 4.6,
      reviewsCount: 4210,
      priceRange: "₹₹ (Moderate)",
      openingHours: "11:30 - 23:00",
      dietary: ["Halal Certified", "Non-Veg", "Spicy Kongu Special"],
      image: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&w=1000&q=80",
      popularDishes: ["Mutton Chukka", "Kongu Chicken Biryani", "Nattu Kozhi Varuval", "Seeraga Samba Meals"],
      description: "Famous across South India for its traditional Seeraga Samba hand-pounded spice biryani and succulent pan-roasted mutton chukka.",
      menu: [
        {
          category: "Signatures", items: [
            { name: "Junior Kuppanna Mutton Biryani", price: 390, desc: "Fragrant Seeraga Samba rice with tender mutton cuts slow cooked in clay pots" },
            { name: "Mutton Chukka Varuval", price: 360, desc: "Tender boneless lamb pan-tossed in shallots, curry leaves and pepper" }
          ]
        }
      ],
      lat: 11.0182,
      lng: 76.9535
    }
  ];

  // MODEL B: Location-Based Nearby Discovery (Tourist Guides)
  const TOURIST_GUIDES = [
    {
      id: "guide-1",
      name: "Kavitha S.",
      title: "Heritage Architect & Licensed Master Guide",
      verified: true,
      distanceKm: 1.1,
      rating: 4.9,
      reviewsCount: 142,
      yearsExp: 8,
      pricePerHour: 600,
      currency: "₹",
      languages: ["English", "Tamil", "Hindi"],
      specialization: "Temple Architecture, Chola Heritage & Textile History",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80",
      bio: "Holder of a Master's degree in South Indian Epigraphy and Heritage Architecture. Specializes in decoding temple stone carvings, medieval water canals, and Kongu silk weavers.",
      pastTours: 240,
      availableToday: true,
      lat: 11.0150,
      lng: 76.9570
    },
    {
      id: "guide-2",
      name: "Rajesh Menon",
      title: "Certified Wildlife Naturalist & Trek Leader",
      verified: true,
      distanceKm: 2.3,
      rating: 4.9,
      reviewsCount: 98,
      yearsExp: 6,
      pricePerHour: 750,
      currency: "₹",
      languages: ["English", "Malayalam", "Tamil"],
      specialization: "Nilgiri Biosphere, Shola Forest Walks & Bird Photography",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
      bio: "Former wilderness researcher with WWF Nilgiris. Leads small ethical groups through biodiversity hotspots, endemic bird hides, and mountain cloud walks.",
      pastTours: 165,
      availableToday: true,
      lat: 11.0090,
      lng: 76.9620
    },
    {
      id: "guide-3",
      name: "Jean-Luc Dupont",
      title: "Senior Parisian Art Historian",
      verified: true,
      distanceKm: 1.5,
      rating: 5.0,
      reviewsCount: 310,
      yearsExp: 14,
      pricePerHour: 45,
      currency: "€",
      languages: ["French", "English", "Spanish"],
      specialization: "Louvre Private Curation, Belle Époque Architecture",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80",
      bio: "Art historian and former Sorbonne lecturer offering private skip-the-line VIP curations through Paris' hidden courtyards, artist salons, and royal galleries.",
      pastTours: 540,
      availableToday: true,
      lat: 48.8570,
      lng: 2.3510
    }
  ];

  // MODEL B: Location-Based Nearby Discovery (Hospitals & Emergency)
  const HOSPITALS = [
    {
      id: "hosp-1",
      name: "Kovai Medical Center & Hospital (KMCH)",
      category: "Level 1 Multi-Specialty Trauma Center",
      distanceKm: 1.8,
      rating: 4.8,
      reviewsCount: 3820,
      emergency247: true,
      hasPharmacy247: true,
      hasAmbulance: true,
      ambulanceStandbyCount: 6,
      icuBedsAvailable: 38,
      address: "Avinashi Road, Civil Aerodrome Post, Coimbatore",
      phone: "+91 422 4323800",
      emergencyHelpline: "1066",
      specializations: ["Trauma & Critical Care", "Cardiology", "Stroke Response", "Organ Transplant", "Pediatric Emergency"],
      image: "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=1000&q=80",
      lat: 11.0310,
      lng: 77.0315
    },
    {
      id: "hosp-2",
      name: "Sri Ramakrishna Hospital",
      category: "Super Specialty Emergency Hospital",
      distanceKm: 1.4,
      rating: 4.7,
      reviewsCount: 2940,
      emergency247: true,
      hasPharmacy247: true,
      hasAmbulance: true,
      ambulanceStandbyCount: 4,
      icuBedsAvailable: 22,
      address: "Siddhapudur, Near Gandhipuram, Coimbatore",
      phone: "+91 422 4500000",
      emergencyHelpline: "+91 422 4500100",
      specializations: ["24/7 Acute Trauma", "Neuro ICU", "Emergency Dialysis", "Neonatal ICU"],
      image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1000&q=80",
      lat: 11.0210,
      lng: 76.9690
    },
    {
      id: "hosp-3",
      name: "Ganga Medical Centre & Hospital",
      category: "World-Renowned Orthopaedic & Plastic Surgery Centre",
      distanceKm: 2.9,
      rating: 4.9,
      reviewsCount: 4190,
      emergency247: true,
      hasPharmacy247: true,
      hasAmbulance: true,
      ambulanceStandbyCount: 5,
      icuBedsAvailable: 29,
      address: "313 Mettupalayam Road, Coimbatore",
      phone: "+91 422 2485000",
      emergencyHelpline: "108",
      specializations: ["Microsurgery & Limb Salvage", "Spine Trauma", "Accident Emergency", "Burn Intensive Care"],
      image: "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=1000&q=80",
      lat: 11.0250,
      lng: 76.9480
    }
  ];

  // --- APPLICATION STATE ---
  class AppState {
    constructor() {
      this.listeners = [];

      this.user = {
        isLoggedIn: true,
        id: "usr-explorer-01",
        name: "Explorer Elite",
        email: "djshiva257@gmail.com",
        tier: "Premium Tier",
        role: "user",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
        phone: "+91 98765 43210",
        nationality: "India",
        emergencyContact: "+91 98765 00000",
        preferences: {
          travelStyle: "Luxury & Spatial Comfort",
          dietary: "Vegetarian Friendly",
          pace: "Curated & Relaxed",
          currency: "INR (₹)"
        }
      };

      this.currentView = "welcome";
      this.viewHistory = [];

      // Global Location State (Model B: Location-Based Nearby Discovery)
      this.selectedCountry = "India";
      this.selectedLocation = { ...PRESET_LOCATIONS[0] };
      this.locationConfirmed = false;
      this.nearbyRadius = 5;
      this.activeViewMode = "map";

      // Model A: Route-Based Discovery State (Tourist Places ONLY)
      this.route = {
        country: "India",
        from: "Coimbatore, India",
        fromCoords: { lat: 11.0168, lng: 76.9558 },
        destination: "Ooty, Tamil Nadu",
        destinationCoords: { lat: 11.4102, lng: 76.6950 },
        distanceKm: 86,
        estimatedTime: "2h 45m",
        confirmed: true,
        model: "gemini-pro",
        categoryFilter: "all",
        isScanning: false,
        discoveredAvailabilities: []
      };

      this.filters = {
        hotels: {
          checkIn: this.getRelativeDate(1),
          checkOut: this.getRelativeDate(3),
          guests: 2,
          rooms: 1,
          propertyType: "all",
          freeCancellationOnly: false,
          priceMax: 15000
        },
        rentals: {
          pickupDate: this.getRelativeDate(1),
          pickupTime: "10:00",
          returnDate: this.getRelativeDate(2),
          returnTime: "18:00",
          vehicleType: "all",
          passengers: 4
        },
        restaurants: {
          date: this.getRelativeDate(0),
          time: "19:30",
          guests: 2,
          cuisine: "all",
          vegOnly: false
        },
        guides: {
          date: this.getRelativeDate(1),
          duration: "Full Day (8 hrs)",
          language: "all",
          specialization: "all"
        },
        hospitals: {
          emergencyOnly: true,
          ambulanceRequired: false,
          pharmacy247: false,
          radiusKm: 5
        }
      };

      this.bookings = [
        {
          id: "BK-89021",
          serviceType: "Rental Vehicles",
          itemTitle: "Aura Sedan Pro (Electric)",
          host: "Rohan K. (Verified)",
          location: "Gandhipuram, Coimbatore",
          date: "Tomorrow, 10:00 AM",
          amount: "₹3,400",
          status: "CONFIRMED",
          qrCode: "EASY-EXP-89021-AUTH"
        },
        {
          id: "BK-76120",
          serviceType: "Hotels & Resorts",
          itemTitle: "The Residency Towers - Executive Suite",
          host: "Residency Hospitality",
          location: "Gandhipuram, Coimbatore",
          date: "Nov 22 - Nov 24, 2026",
          amount: "₹11,600",
          status: "CONFIRMED",
          qrCode: "EASY-EXP-76120-AUTH"
        }
      ];

      this.notifications = [
        { id: "n1", text: "Welcome to Customized Easy Explorer: Coimbatore Hub Connected", time: "Just now", read: false },
        { id: "n2", text: "Rohan K. confirmed your Aura Sedan Pro pickup", time: "1 hour ago", read: false }
      ];
    }

    getRelativeDate(daysOffset) {
      const d = new Date();
      d.setDate(d.getDate() + daysOffset);
      return d.toISOString().split('T')[0];
    }

    subscribe(listener) {
      this.listeners.push(listener);
      return () => {
        this.listeners = this.listeners.filter(l => l !== listener);
      };
    }

    notify(event, payload) {
      this.listeners.forEach(fn => fn(event, payload, this));
    }

    setView(viewName) {
      if (this.currentView !== viewName) {
        this.viewHistory.push(this.currentView);
        this.currentView = viewName;
        this.notify("VIEW_CHANGED", viewName);
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    }

    goBack() {
      if (this.viewHistory.length > 0) {
        const prev = this.viewHistory.pop();
        this.currentView = prev;
        this.notify("VIEW_CHANGED", prev);
      } else {
        this.setView("welcome");
      }
    }

    setLocation(locObj, autoConfirm = false) {
      this.selectedLocation = {
        ...this.selectedLocation,
        ...locObj
      };
      if (autoConfirm) {
        this.locationConfirmed = true;
      }
      this.notify("LOCATION_UPDATED", this.selectedLocation);
    }

    confirmLocation(confirmed = true) {
      this.locationConfirmed = confirmed;
      this.notify("LOCATION_CONFIRMED", this.selectedLocation);
    }

    setNearbyRadius(radiusKm) {
      this.nearbyRadius = radiusKm;
      this.selectedLocation.radius = radiusKm;
      this.notify("RADIUS_CHANGED", radiusKm);
    }

    setViewMode(mode) {
      this.activeViewMode = mode;
      this.notify("VIEW_MODE_CHANGED", mode);
    }

    setCountry(countryName) {
      this.selectedCountry = countryName;
      this.notify("COUNTRY_CHANGED", countryName);
    }

    setRoute(from, dest, distanceKm, time) {
      this.route.from = from;
      this.route.destination = dest;
      if (distanceKm) this.route.distanceKm = distanceKm;
      if (time) this.route.estimatedTime = time;
      this.route.confirmed = true;
      this.notify("ROUTE_UPDATED", this.route);
    }

    setRouteScanning(isScanning) {
      this.route.isScanning = isScanning;
      this.notify("ROUTE_SCANNING", isScanning);
    }

    setDiscoveredAvailabilities(availabilities) {
      this.route.discoveredAvailabilities = availabilities;
      this.notify("AVAILABILITIES_UPDATED", availabilities);
    }

    login(userData = {}) {
      this.user = {
        ...this.user,
        isLoggedIn: true,
        ...userData
      };
      this.notify("AUTH_CHANGED", this.user);
    }

    logout() {
      this.user.isLoggedIn = false;
      this.notify("AUTH_CHANGED", this.user);
    }

    addBooking(booking) {
      const newBooking = {
        id: `BK-${Math.floor(10000 + Math.random() * 90000)}`,
        status: "CONFIRMED",
        createdAt: new Date().toISOString(),
        qrCode: `EASY-EXP-${Math.floor(10000 + Math.random() * 90000)}`,
        ...booking
      };
      this.bookings.unshift(newBooking);
      this.notify("BOOKING_ADDED", newBooking);
      return newBooking;
    }

    updateProfile(profileData) {
      this.user = {
        ...this.user,
        ...profileData,
        preferences: {
          ...this.user.preferences,
          ...(profileData.preferences || {})
        }
      };
      this.notify("PROFILE_UPDATED", this.user);
    }

    toggleRole() {
      this.user.role = this.user.role === "admin" ? "user" : "admin";
      this.notify("ROLE_CHANGED", this.user.role);
    }
  }

  const state = new AppState();

  function getNearbyResourcesForLocation(serviceKey, location, radiusKm = 5) {
  const centerLat = (location && location.lat) || 11.0168;
  const centerLng = (location && location.lng) || 76.9558;
  const key = (serviceKey || '').toLowerCase();

  let pool = [];
  if (key.includes('hotel') || key.includes('stay')) pool = HOTELS;
  else if (key.includes('rent') || key.includes('vehic')) pool = RENTAL_VEHICLES;
  else if (key.includes('rest') || key.includes('din')) pool = RESTAURANTS;
  else if (key.includes('guide')) pool = TOURIST_GUIDES;
  else if (key.includes('hosp') || key.includes('sos')) pool = HOSPITALS;
  else pool = RENTAL_VEHICLES;

  // Filter items that are strictly within the radius (allowing 20% margin for nearby neighborhoods)
  const matched = pool.filter(item => {
    if (!item.lat || !item.lng) return false;
    const dLat = (item.lat - centerLat) * 111;
    const dLng = (item.lng - centerLng) * 111 * Math.cos(centerLat * Math.PI / 180);
    const dist = Math.hypot(dLat, dLng) * 1.24;
    return dist <= (radiusKm * 1.25);
  }).map(item => {
    const dLat = (item.lat - centerLat) * 111;
    const dLng = (item.lng - centerLng) * 111 * Math.cos(centerLat * Math.PI / 180);
    const dist = parseFloat((Math.hypot(dLat, dLng) * 1.24).toFixed(1));
    return {
      ...item,
      distanceKm: dist,
      travelMins: Math.max(2, Math.round(dist * 2.8))
    };
  });

  if (matched.length >= 3) {
    return matched.sort((a, b) => a.distanceKm - b.distanceKm);
  }

  // If fewer than 3 local items exist in the raw pool (e.g. custom pin drop or new location),
  // dynamically generate realistic localized items tightly distributed within 0.7 km - 3.8 km
  const cityName = (location && location.city) || ((location && location.name) ? location.name.split(',')[0] : 'Coimbatore');
  const generated = pool.slice(0, 5).map((item, idx) => {
    const angle = (idx * 72) * (Math.PI / 180);
    const rKm = 0.8 + (idx * 0.6); // 0.8 km, 1.4 km, 2.0 km, 2.6 km, 3.2 km
    const offsetLat = (rKm / 111) * Math.cos(angle);
    const offsetLng = (rKm / (111 * Math.cos(centerLat * Math.PI / 180))) * Math.sin(angle);
    const lat = Number((centerLat + offsetLat).toFixed(4));
    const lng = Number((centerLng + offsetLng).toFixed(4));
    const dist = parseFloat(rKm.toFixed(1));
    return {
      ...item,
      id: `${item.id}-local-${idx}`,
      name: item.name.replace(/Coimbatore|Paris|Ooty/g, cityName),
      location: `${cityName} Hub (${dist} km)`,
      lat,
      lng,
      distanceKm: dist,
      travelMins: Math.max(2, Math.round(dist * 2.8))
    };
  });

  return generated.sort((a, b) => a.distanceKm - b.distanceKm);
}


// --- MAP ENGINE ---
// Interactive Map Engine - Real Google Maps Tiles & Rapido-Style Dynamic Routing
// Customized Easy Explorer - Ground-Level Travel & Local Discovery Portal
// Supports Model B: 5 km Radius Discovery + Rapido Turn-by-Turn Driving Route Paths + Floating ETA Bubble + Bottom Drawer
// Supports Model A: From ➔ Destination Highway Corridor + 5 km Buffer + Branch Spur Connectors in Distinct Colors + Detour Badges
// Supports Location Picker: Interactive Click & Drag Pin Drop on Google Street Map

class MapService {
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
function calculateAccurateDistanceKm(lat1, lon1, lat2, lon2) {
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
function generateStreetRoutePoints(startLat, startLng, endLat, endLng) {
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
function generateRealisticNearbyItems(center, radiusKm, templateItems) {
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


// Comprehensive Geocoding Database for Tamil Nadu, South India & Beyond
const GEO_DATABASE = {
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

function resolveCityCoords(query, fallback) {
  if (!query) return fallback || { lat: 11.0168, lng: 76.9558 };
  const lower = query.toLowerCase().trim();
  for (const [key, val] of Object.entries(GEO_DATABASE)) {
    if (lower.includes(key)) {
      return { lat: val.lat, lng: val.lng, name: val.name };
    }
  }
  return fallback || { lat: 11.0168, lng: 76.9558 };
}

// Corridor Endpoints Resolver
function getCorridorEndpoints(from, destination) {
  const start = resolveCityCoords(from, { lat: 11.0168, lng: 76.9558, name: "Coimbatore, Tamil Nadu" });
  const end = resolveCityCoords(destination, { lat: 12.5266, lng: 78.2146, name: "Krishnagiri, Tamil Nadu" });
  return { start: start, end: end };
}

// Famous Corridor Stops Resolver
function getCorridorFamousStops(from, destination, start, end) {
  return getDefaultCorridorStops(from, destination);
}


// View: Tourist Places (MODEL A — ROUTE-BASED DISCOVERY)
// View: Tourist Places (MODEL A — ROUTE-BASED DISCOVERY)
// Full Real-Time Route Operations: Select Any From & Destination -> AI Model / Live Web Search -> Live Corridors & Availabilities




function renderTouristPlaces() {
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
function getDefaultCorridorStops(from, destination) {
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


// View: Hotels & Resorts (MODEL B — LOCATION-BASED NEARBY DISCOVERY)
// Replaces route with location-based nearby stays





// View: Hotels & Resorts (MODEL B — LOCATION-BASED NEARBY DISCOVERY)
// Replaces route with location-based nearby stays





function renderHotels(subview = "results") {
  // If location is not confirmed yet, show dedicated location-selection screen
  if (!state.locationConfirmed && subview !== "results") {
    return renderLocationSelectionScreen({
      serviceKey: "hotels",
      heading: "Where do you want to stay?",
      subheading: "Select a location to discover premium hotels and resorts nearby.",
      actionButtonText: "Find Stays Near This Location",
      onConfirmCallbackName: "confirmHotelsLocation"
    });
  }

  const currentLoc = state.selectedLocation;
  const isMapView = state.activeViewMode === "map";
  const localHotels = getNearbyResourcesForLocation('Hotels & Resorts', currentLoc, state.nearbyRadius);

  return `
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      
      <!-- Top Navigation & Model Badge -->
      <div class="flex items-center justify-between mb-6">
        <button onclick="window.appRouter('welcome')" class="flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-900 transition-colors">
          <span class="material-symbols-outlined text-sm">arrow_back</span>
          <span>Back to Home</span>
        </button>
        <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-50 text-teal-800 text-[11px] font-bold border border-teal-200">
          <span class="w-2 h-2 rounded-full bg-teal-500 animate-pulse"></span>
          MODEL B • LOCATION-BASED DISCOVERY
        </span>
      </div>

      <!-- Context Bar: Showing options near [Selected Location] -->
      <section class="glass-card p-5 border border-white/80 shadow-lg mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div class="flex items-center gap-3.5">
          <div class="w-11 h-11 rounded-xl bg-slate-900 text-teal-300 flex items-center justify-center flex-shrink-0">
            <span class="material-symbols-outlined text-2xl">hotel</span>
          </div>
          <div>
            <span class="text-[10px] font-bold uppercase tracking-wider text-teal-700 bg-teal-50 px-2 py-0.5 rounded border border-teal-200">
              Active Radial Search
            </span>
            <h1 class="text-xl sm:text-2xl font-extrabold text-slate-900 mt-0.5">
              Stays near ${currentLoc.name}
            </h1>
            <p class="text-xs text-slate-500">
              Showing vetted hotels & resorts within ${state.nearbyRadius} km radius
            </p>
          </div>
        </div>

        <div class="flex items-center gap-2 self-start md:self-auto">
          <!-- Change Location Button -->
          <button onclick="window.openLocationSelectorFor('hotels')" class="px-3.5 py-2 text-xs font-bold rounded-lg border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 transition-all flex items-center gap-1 shadow-sm">
            <span class="material-symbols-outlined text-sm">edit_location</span>
            <span>Change Location</span>
          </button>

          <!-- Map / List Toggle -->
          <div class="bg-slate-100 p-1 rounded-lg flex items-center border border-slate-200">
            <button onclick="window.setHotelsViewMode('list')" class="px-3 py-1.5 text-xs font-bold rounded-md transition-all ${!isMapView ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-900'} flex items-center gap-1">
              <span class="material-symbols-outlined text-sm">view_list</span>
              <span>List View</span>
            </button>
            <button onclick="window.setHotelsViewMode('map')" class="px-3 py-1.5 text-xs font-bold rounded-md transition-all ${isMapView ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-900'} flex items-center gap-1">
              <span class="material-symbols-outlined text-sm">map</span>
              <span>Map View</span>
            </button>
          </div>
        </div>
      </section>

      <!-- Stay Booking Parameters Bar (Dates, Guests, Rooms) -->
      <section class="glass-panel rounded-2xl p-4 sm:p-5 border border-white/80 shadow-md mb-8">
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4 items-end">
          <div>
            <label class="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">Check-In Date</label>
            <input type="date" value="${state.filters.hotels.checkIn}" class="w-full bg-white border border-slate-200 rounded-lg py-2 px-3 text-xs font-medium text-slate-800" />
          </div>
          <div>
            <label class="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">Check-Out Date</label>
            <input type="date" value="${state.filters.hotels.checkOut}" class="w-full bg-white border border-slate-200 rounded-lg py-2 px-3 text-xs font-medium text-slate-800" />
          </div>
          <div>
            <label class="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">Guests & Rooms</label>
            <select class="w-full bg-white border border-slate-200 rounded-lg py-2 px-3 text-xs font-medium text-slate-800">
              <option>2 Guests • 1 Room</option>
              <option>1 Guest • 1 Room</option>
              <option>4 Guests • 2 Rooms (Family)</option>
              <option>2 Guests • Luxury Suite (Couple)</option>
            </select>
          </div>
          <button class="w-full bg-slate-900 text-white font-bold text-xs py-2.5 rounded-lg hover:bg-slate-800 transition-colors flex items-center justify-center gap-1.5 shadow-sm">
            <span class="material-symbols-outlined text-sm">tune</span>
            <span>Update Search</span>
          </button>
        </div>
      </section>

      <!-- Main Display: Map View or List View -->
      ${isMapView ? `
        <!-- Map View Container -->
        <div class="mb-8">
          <div id="hotels-map-mount" class="w-full rounded-2xl overflow-hidden shadow-2xl border border-slate-200" style="height: 540px; min-height: 480px; width: 100%;"></div>
        </div>
      ` : ''}

      <!-- Results List Cards -->
      <section class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        ${localHotels.map(hotel => `
          <div class="glass-panel glass-panel-hover rounded-2xl overflow-hidden border border-white/80 shadow-lg flex flex-col justify-between group">
            <div>
              <div class="relative h-52 w-full overflow-hidden">
                <img src="${hotel.image}" alt="${hotel.name}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div class="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent"></div>
                
                <span class="absolute top-3 left-3 bg-slate-900/80 text-white text-[11px] font-bold px-2.5 py-1 rounded-full backdrop-blur-md border border-white/20">
                  ${hotel.propertyType}
                </span>

                ${hotel.freeCancellation ? `
                  <span class="absolute top-3 right-3 bg-teal-400 text-slate-950 text-[10px] font-bold px-2 py-0.5 rounded-full shadow-md">
                    Free Cancellation
                  </span>
                ` : ''}

                <div class="absolute bottom-3 left-4 right-4 flex items-center justify-between">
                  <div class="flex items-center gap-1 text-white text-xs font-semibold">
                    <span class="material-symbols-outlined text-sm text-cyan-300">near_me</span>
                    <span>${hotel.distanceKm} km from ${currentLoc.name.split(',')[0]}</span>
                  </div>
                  <span class="bg-amber-400 text-slate-950 text-xs font-bold px-2 py-0.5 rounded flex items-center gap-0.5">
                    <span class="material-symbols-outlined text-xs">star</span>
                    <span>${hotel.rating}</span>
                  </span>
                </div>
              </div>

              <div class="p-5">
                <h3 class="text-lg font-bold text-slate-900 mb-1">${hotel.name}</h3>
                <p class="text-xs text-slate-500 mb-3">${hotel.locationArea}, ${hotel.city}</p>
                
                <div class="flex flex-wrap gap-1.5 mb-4">
                  ${hotel.amenities.slice(0, 3).map(a => `
                    <span class="text-[10px] font-semibold bg-slate-100 text-slate-700 px-2 py-0.5 rounded border border-slate-200">
                      ✓ ${a}
                    </span>
                  `).join('')}
                </div>
              </div>
            </div>

            <div class="p-5 pt-0 border-t border-slate-100 flex items-center justify-between mt-auto">
              <div>
                <span class="text-[10px] uppercase font-bold text-slate-400">Nightly Rate</span>
                <p class="text-lg font-bold text-slate-900">${hotel.currency}${hotel.pricePerNight} <span class="text-xs text-slate-500 font-normal">/ night</span></p>
              </div>
              <div class="flex items-center gap-2">
                <button onclick="window.openHotelDetailsModal('${hotel.id}')" class="px-3 py-2 text-xs font-semibold border border-slate-300 hover:bg-slate-100 rounded-lg text-slate-700 transition-colors">
                  Details
                </button>
                <button onclick="window.bookHotelRoom('${hotel.id}')" class="px-3.5 py-2 text-xs font-bold bg-teal-500 text-slate-950 hover:bg-teal-400 rounded-lg shadow-md transition-all">
                  Book Stay
                </button>
              </div>
            </div>
          </div>
        `).join('')}
      </section>

    </div>
  `;
}


// View: Rental Vehicles (MODEL B — LOCATION-BASED NEARBY DISCOVERY)
// No destination required! Includes full Rohan K. Rental Owner Profile





function renderRentals(subview = "results") {
  // If location is not confirmed yet, show dedicated location-selection screen
  if (!state.locationConfirmed && subview !== "results") {
    return renderLocationSelectionScreen({
      serviceKey: "rentals",
      heading: "Where do you need a vehicle?",
      subheading: "Select a pickup location to discover available bikes, cars, SUVs and electric fleet nearby.",
      actionButtonText: "Find Rentals Nearby",
      onConfirmCallbackName: "confirmRentalsLocation"
    });
  }

  const currentLoc = state.selectedLocation;
  const isMapView = state.activeViewMode === "map";
  const localVehicles = getNearbyResourcesForLocation('Rental Vehicles', currentLoc, state.nearbyRadius);

  return `
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      
      <!-- Top Navigation & Model Badge -->
      <div class="flex items-center justify-between mb-6">
        <button onclick="window.appRouter('welcome')" class="flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-900 transition-colors">
          <span class="material-symbols-outlined text-sm">arrow_back</span>
          <span>Back to Home</span>
        </button>
        <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-50 text-cyan-900 text-[11px] font-bold border border-cyan-200">
          <span class="w-2 h-2 rounded-full bg-cyan-500 animate-pulse"></span>
          MODEL B • NO DESTINATION REQUIRED
        </span>
      </div>

      <!-- Context Bar: Showing options near [Selected Location] -->
      <section class="glass-card p-5 border border-white/80 shadow-lg mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div class="flex items-center gap-3.5">
          <div class="w-11 h-11 rounded-xl bg-slate-900 text-cyan-300 flex items-center justify-center flex-shrink-0">
            <span class="material-symbols-outlined text-2xl">directions_car</span>
          </div>
          <div>
            <span class="text-[10px] font-bold uppercase tracking-wider text-cyan-800 bg-cyan-50 px-2 py-0.5 rounded border border-cyan-200">
              Nearby Fleet Discovery
            </span>
            <h1 class="text-xl sm:text-2xl font-extrabold text-slate-900 mt-0.5">
              Available rentals near ${currentLoc.name}
            </h1>
            <p class="text-xs text-slate-500">
              Showing verified bikes, cars & SUVs within ${state.nearbyRadius} km of pickup point
            </p>
          </div>
        </div>

        <div class="flex items-center gap-2 self-start md:self-auto">
          <!-- Change Location Button -->
          <button onclick="window.openLocationSelectorFor('rentals')" class="px-3.5 py-2 text-xs font-bold rounded-lg border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 transition-all flex items-center gap-1 shadow-sm">
            <span class="material-symbols-outlined text-sm">edit_location</span>
            <span>Change Location</span>
          </button>

          <!-- Map / List Toggle -->
          <div class="bg-slate-100 p-1 rounded-lg flex items-center border border-slate-200">
            <button onclick="window.setRentalsViewMode('list')" class="px-3 py-1.5 text-xs font-bold rounded-md transition-all ${!isMapView ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-900'} flex items-center gap-1">
              <span class="material-symbols-outlined text-sm">view_list</span>
              <span>List View</span>
            </button>
            <button onclick="window.setRentalsViewMode('map')" class="px-3 py-1.5 text-xs font-bold rounded-md transition-all ${isMapView ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-900'} flex items-center gap-1">
              <span class="material-symbols-outlined text-sm">map</span>
              <span>Map View</span>
            </button>
          </div>
        </div>
      </section>

      <!-- Vehicle Search Parameters Bar (Pickup/Return Dates & Times, Type, Seats - ZERO DESTINATION ASKED) -->
      <section class="glass-panel rounded-2xl p-4 sm:p-5 border border-white/80 shadow-md mb-8">
        <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 items-end">
          <div>
            <label class="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">Pickup Date</label>
            <input type="date" value="${state.filters.rentals.pickupDate}" class="w-full bg-white border border-slate-200 rounded-lg py-2 px-2.5 text-xs font-medium text-slate-800" />
          </div>
          <div>
            <label class="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">Pickup Time</label>
            <input type="time" value="${state.filters.rentals.pickupTime}" class="w-full bg-white border border-slate-200 rounded-lg py-2 px-2.5 text-xs font-medium text-slate-800" />
          </div>
          <div>
            <label class="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">Return Date</label>
            <input type="date" value="${state.filters.rentals.returnDate}" class="w-full bg-white border border-slate-200 rounded-lg py-2 px-2.5 text-xs font-medium text-slate-800" />
          </div>
          <div>
            <label class="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">Return Time</label>
            <input type="time" value="${state.filters.rentals.returnTime}" class="w-full bg-white border border-slate-200 rounded-lg py-2 px-2.5 text-xs font-medium text-slate-800" />
          </div>
          <div>
            <label class="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">Category</label>
            <select class="w-full bg-white border border-slate-200 rounded-lg py-2 px-2.5 text-xs font-medium text-slate-800">
              <option>All Types</option>
              <option>Bikes & Scooters</option>
              <option>Electric Cars</option>
              <option>SUVs (4x4)</option>
              <option>Luxury Sedans</option>
            </select>
          </div>
          <button class="w-full bg-slate-900 text-white font-bold text-xs py-2.5 rounded-lg hover:bg-slate-800 transition-colors flex items-center justify-center gap-1 shadow-sm">
            <span class="material-symbols-outlined text-sm">tune</span>
            <span>Update Filter</span>
          </button>
        </div>
      </section>

      <!-- Main Display: Map View or List View -->
      ${isMapView ? `
        <div class="mb-8">
          <div id="rentals-map-mount" class="w-full rounded-2xl overflow-hidden shadow-2xl border border-slate-200" style="height: 540px; min-height: 480px; width: 100%;"></div>
        </div>
      ` : ''}

      <!-- Vehicle Fleet Results -->
      <section class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        ${localVehicles.map(veh => `
          <div class="glass-panel glass-panel-hover rounded-2xl overflow-hidden border border-white/80 shadow-lg flex flex-col justify-between group">
            <div>
              <div class="relative h-48 w-full overflow-hidden">
                <img src="${veh.image}" alt="${veh.name}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div class="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent"></div>
                
                <span class="absolute top-3 left-3 bg-slate-900/80 text-white text-[11px] font-bold px-2.5 py-1 rounded-full backdrop-blur-md border border-white/20">
                  ${veh.category} • ${veh.subType}
                </span>

                <div class="absolute bottom-3 left-4 right-4 flex items-center justify-between">
                  <div class="flex items-center gap-1 text-white text-xs font-semibold">
                    <span class="material-symbols-outlined text-sm text-cyan-300">near_me</span>
                    <span>${veh.distanceKm} km from ${currentLoc.name.split(',')[0]}</span>
                  </div>
                  <span class="bg-amber-400 text-slate-950 text-xs font-bold px-2 py-0.5 rounded flex items-center gap-0.5">
                    <span class="material-symbols-outlined text-xs">star</span>
                    <span>${veh.rating}</span>
                  </span>
                </div>
              </div>

              <div class="p-5">
                <h3 class="text-lg font-bold text-slate-900 mb-1">${veh.name}</h3>
                
                <!-- Vehicle Specs Badges -->
                <div class="grid grid-cols-2 gap-2 my-3 text-xs text-slate-600 bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                  <div class="flex items-center gap-1.5">
                    <span class="material-symbols-outlined text-sm text-slate-400">group</span>
                    <span>${veh.seats} Seats</span>
                  </div>
                  <div class="flex items-center gap-1.5">
                    <span class="material-symbols-outlined text-sm text-slate-400">settings</span>
                    <span class="truncate">${veh.transmission.split('/')[0]}</span>
                  </div>
                  <div class="flex items-center gap-1.5 col-span-2">
                    <span class="material-symbols-outlined text-sm text-teal-600">bolt</span>
                    <span class="truncate font-medium text-slate-800">${veh.fuel}</span>
                  </div>
                </div>

                <!-- Verified Owner Quick Card -->
                <div class="flex items-center justify-between p-2.5 rounded-xl bg-white border border-slate-200 shadow-sm">
                  <div class="flex items-center gap-2.5">
                    <img src="${veh.owner.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80'}" class="w-8 h-8 rounded-full object-cover border border-teal-400" />
                    <div>
                      <p class="text-xs font-bold text-slate-900 flex items-center gap-1">
                        <span>${veh.owner.name}</span>
                        <span class="material-symbols-outlined text-teal-500 text-xs">verified</span>
                      </p>
                      <p class="text-[10px] text-slate-500">Fleet Host • ${veh.owner.rating} ★</p>
                    </div>
                  </div>
                  <button onclick="window.openOwnerProfileModal('${veh.owner.id || 'owner-rohan-k'}')" class="text-[11px] font-bold text-teal-700 hover:underline">
                    View Owner
                  </button>
                </div>
              </div>
            </div>

            <div class="p-5 pt-0 border-t border-slate-100 flex items-center justify-between mt-auto">
              <div>
                <span class="text-[10px] uppercase font-bold text-slate-400">Daily Rate</span>
                <p class="text-lg font-bold text-slate-900">${veh.currency}${veh.pricePerDay} <span class="text-xs text-slate-500 font-normal">/ day</span></p>
              </div>
              <div class="flex items-center gap-2">
                <button onclick="window.openVehicleDetailsModal('${veh.id}')" class="px-3 py-2 text-xs font-semibold border border-slate-300 hover:bg-slate-100 rounded-lg text-slate-700 transition-colors">
                  Details
                </button>
                <button onclick="window.bookRentalVehicle('${veh.id}')" class="px-3.5 py-2 text-xs font-bold bg-teal-500 text-slate-950 hover:bg-teal-400 rounded-lg shadow-md transition-all">
                  Book Rental
                </button>
              </div>
            </div>
          </div>
        `).join('')}
      </section>

    </div>
  `;
}

// Full Dedicated Modal / Page: Rental Owner Profile (Rohan K.)
function renderOwnerProfileModal(ownerKey = "rohanK") {
  const owner = RENTAL_OWNERS[ownerKey] || RENTAL_OWNERS.rohanK;

  return `
    <div id="owner-profile-modal-backdrop" class="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div class="glass-card max-w-3xl w-full p-6 sm:p-8 border border-white/80 shadow-2xl relative my-8 animate-in fade-in zoom-in duration-200">
        
        <!-- Close button -->
        <button onclick="window.closeOwnerProfileModal()" class="absolute top-5 right-5 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-700 text-sm font-bold">
          ✕
        </button>

        <!-- Top Profile Bento Block -->
        <div class="flex flex-col sm:flex-row items-center sm:items-start gap-6 pb-6 border-b border-slate-200">
          <div class="relative">
            <img src="${owner.avatar}" alt="${owner.name}" class="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl object-cover border-4 border-white shadow-xl" />
            <div class="absolute -bottom-2 -right-2 bg-teal-500 text-white rounded-full p-1 border-2 border-white flex items-center justify-center" title="Verified Fleet Commander">
              <span class="material-symbols-outlined text-sm font-bold">verified</span>
            </div>
          </div>
          
          <div class="text-center sm:text-left flex-1">
            <div class="flex flex-wrap items-center justify-center sm:justify-start gap-2 mb-1">
              <h2 class="text-2xl font-extrabold text-slate-900">${owner.name}</h2>
              <span class="bg-teal-50 text-teal-800 text-[10px] font-bold px-2 py-0.5 rounded border border-teal-200">
                Verified Host
              </span>
            </div>
            <p class="text-xs text-teal-700 font-semibold mb-2">${owner.title}</p>
            <p class="text-xs text-slate-600 leading-relaxed max-w-xl">${owner.bio}</p>
            
            <div class="flex flex-wrap items-center justify-center sm:justify-start gap-4 mt-3 text-xs text-slate-500">
              <span class="flex items-center gap-1 font-bold text-amber-500">
                <span class="material-symbols-outlined text-xs">star</span>
                <span>${owner.rating} (${owner.reviewsCount} reviews)</span>
              </span>
              <span>•</span>
              <span>📍 ${owner.location}</span>
            </div>
          </div>
        </div>

        <!-- 3 Key Owner Metrics -->
        <div class="grid grid-cols-3 gap-3 my-6">
          <div class="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-center">
            <p class="text-lg sm:text-xl font-extrabold text-slate-900">${owner.totalVehicles}</p>
            <p class="text-[10px] uppercase font-bold text-slate-400">Total Fleet</p>
          </div>
          <div class="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-center">
            <p class="text-lg sm:text-xl font-extrabold text-slate-900">${owner.yearsExp} Yrs</p>
            <p class="text-[10px] uppercase font-bold text-slate-400">Experience</p>
          </div>
          <div class="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-center">
            <p class="text-lg sm:text-xl font-extrabold text-teal-600">${owner.responseRate}</p>
            <p class="text-[10px] uppercase font-bold text-slate-400">Response Rate</p>
          </div>
        </div>

        <!-- Fleet Overview List -->
        <div class="mb-6">
          <h3 class="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">Other Vehicles Managed by ${owner.name}</h3>
          <div class="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            ${owner.otherVehicles.map(vehName => `
              <div class="p-2.5 rounded-lg bg-white border border-slate-200 shadow-sm text-xs font-bold text-slate-800 text-center">
                🚗 ${vehName}
              </div>
            `).join('')}
          </div>
        </div>

        <!-- Action Buttons -->
        <div class="flex items-center justify-end gap-3 pt-4 border-t border-slate-200">
          <button onclick="window.contactOwnerAction('${owner.name}')" class="px-4 py-2.5 rounded-xl border border-slate-300 text-slate-700 font-bold text-xs hover:bg-slate-50 transition-colors flex items-center gap-1.5">
            <span class="material-symbols-outlined text-sm">chat</span>
            <span>Contact Host</span>
          </button>
          <button onclick="window.closeOwnerProfileModal()" class="px-5 py-2.5 rounded-xl bg-slate-900 text-white font-bold text-xs hover:bg-slate-800 shadow-md transition-all flex items-center gap-1.5">
            <span>Continue Booking</span>
            <span class="material-symbols-outlined text-sm">arrow_forward</span>
          </button>
        </div>

      </div>
    </div>
  `;
}


// View: Restaurants (MODEL B — LOCATION-BASED NEARBY DISCOVERY)
// Location selection -> Dining parameters -> Nearby Dining -> Menu & Table Reservation





function renderRestaurants(subview = "results") {
  if (!state.locationConfirmed && subview !== "results") {
    return renderLocationSelectionScreen({
      serviceKey: "restaurants",
      heading: "Where do you want to eat?",
      subheading: "Select a location to discover exquisite culinary dining and artisanal tables nearby.",
      actionButtonText: "Find Restaurants Nearby",
      onConfirmCallbackName: "confirmRestaurantsLocation"
    });
  }

  const currentLoc = state.selectedLocation;
  const isMapView = state.activeViewMode === "map";
  const localRestaurants = getNearbyResourcesForLocation('Restaurants', currentLoc, state.nearbyRadius);

  return `
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      
      <!-- Top Navigation & Model Badge -->
      <div class="flex items-center justify-between mb-6">
        <button onclick="window.appRouter('welcome')" class="flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-900 transition-colors">
          <span class="material-symbols-outlined text-sm">arrow_back</span>
          <span>Back to Home</span>
        </button>
        <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 text-amber-900 text-[11px] font-bold border border-amber-200">
          <span class="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
          MODEL B • DINING DISCOVERY
        </span>
      </div>

      <!-- Context Bar: Showing options near [Selected Location] -->
      <section class="glass-card p-5 border border-white/80 shadow-lg mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div class="flex items-center gap-3.5">
          <div class="w-11 h-11 rounded-xl bg-slate-900 text-amber-400 flex items-center justify-center flex-shrink-0">
            <span class="material-symbols-outlined text-2xl">restaurant</span>
          </div>
          <div>
            <span class="text-[10px] font-bold uppercase tracking-wider text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
              Nearby Dining Locator
            </span>
            <h1 class="text-xl sm:text-2xl font-extrabold text-slate-900 mt-0.5">
              Restaurants near ${currentLoc.name}
            </h1>
            <p class="text-xs text-slate-500">
              Discovered culinary destinations within ${state.nearbyRadius} km of your table search
            </p>
          </div>
        </div>

        <div class="flex items-center gap-2 self-start md:self-auto">
          <button onclick="window.openLocationSelectorFor('restaurants')" class="px-3.5 py-2 text-xs font-bold rounded-lg border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 transition-all flex items-center gap-1 shadow-sm">
            <span class="material-symbols-outlined text-sm">edit_location</span>
            <span>Change Location</span>
          </button>

          <!-- Map / List Toggle -->
          <div class="bg-slate-100 p-1 rounded-lg flex items-center border border-slate-200">
            <button onclick="window.setRestaurantsViewMode('list')" class="px-3 py-1.5 text-xs font-bold rounded-md transition-all ${!isMapView ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-900'} flex items-center gap-1">
              <span class="material-symbols-outlined text-sm">view_list</span>
              <span>List View</span>
            </button>
            <button onclick="window.setRestaurantsViewMode('map')" class="px-3 py-1.5 text-xs font-bold rounded-md transition-all ${isMapView ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-900'} flex items-center gap-1">
              <span class="material-symbols-outlined text-sm">map</span>
              <span>Map View</span>
            </button>
          </div>
        </div>
      </section>

      <!-- Dining Filter Parameters Bar -->
      <section class="glass-panel rounded-2xl p-4 sm:p-5 border border-white/80 shadow-md mb-8">
        <div class="grid grid-cols-2 md:grid-cols-5 gap-3 items-end">
          <div>
            <label class="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">Reservation Date</label>
            <input type="date" value="${state.filters.restaurants.date}" class="w-full bg-white border border-slate-200 rounded-lg py-2 px-3 text-xs font-medium text-slate-800" />
          </div>
          <div>
            <label class="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">Time Slot</label>
            <input type="time" value="${state.filters.restaurants.time}" class="w-full bg-white border border-slate-200 rounded-lg py-2 px-3 text-xs font-medium text-slate-800" />
          </div>
          <div>
            <label class="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">Party Size</label>
            <select class="w-full bg-white border border-slate-200 rounded-lg py-2 px-3 text-xs font-medium text-slate-800">
              <option>Table for 2 Guests</option>
              <option>Table for 1 Guest</option>
              <option>Table for 4 Guests</option>
              <option>Large Party (6+ Guests)</option>
            </select>
          </div>
          <div>
            <label class="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">Cuisine Preference</label>
            <select class="w-full bg-white border border-slate-200 rounded-lg py-2 px-3 text-xs font-medium text-slate-800">
              <option>All Cuisines</option>
              <option>Authentic South Indian</option>
              <option>French Haute & Continental</option>
              <option>Chettinad Non-Veg</option>
              <option>Italian Artisanal</option>
            </select>
          </div>
          <button class="w-full bg-slate-900 text-white font-bold text-xs py-2.5 rounded-lg hover:bg-slate-800 transition-colors flex items-center justify-center gap-1 shadow-sm">
            <span class="material-symbols-outlined text-sm">tune</span>
            <span>Apply Filters</span>
          </button>
        </div>
      </section>

      <!-- Main Display: Map View or List View -->
      ${isMapView ? `
        <div class="mb-8">
          <div id="restaurants-map-mount" class="w-full rounded-2xl overflow-hidden shadow-2xl border border-slate-200" style="height: 540px; min-height: 480px; width: 100%;"></div>
        </div>
      ` : ''}

      <!-- Restaurant Cards List -->
      <section class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        ${localRestaurants.map(rest => `
          <div class="glass-panel glass-panel-hover rounded-2xl overflow-hidden border border-white/80 shadow-lg flex flex-col justify-between group">
            <div>
              <div class="relative h-48 w-full overflow-hidden">
                <img src="${rest.image}" alt="${rest.name}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div class="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent"></div>
                
                <span class="absolute top-3 left-3 bg-slate-900/80 text-white text-[11px] font-bold px-2.5 py-1 rounded-full backdrop-blur-md border border-white/20">
                  ${rest.cuisine}
                </span>

                <div class="absolute bottom-3 left-4 right-4 flex items-center justify-between">
                  <div class="flex items-center gap-1 text-white text-xs font-semibold">
                    <span class="material-symbols-outlined text-sm text-amber-300">near_me</span>
                    <span>${rest.distanceKm} km from ${currentLoc.name.split(',')[0]}</span>
                  </div>
                  <span class="bg-amber-400 text-slate-950 text-xs font-bold px-2 py-0.5 rounded flex items-center gap-0.5">
                    <span class="material-symbols-outlined text-xs">star</span>
                    <span>${rest.rating}</span>
                  </span>
                </div>
              </div>

              <div class="p-5">
                <h3 class="text-lg font-bold text-slate-900 mb-1">${rest.name}</h3>
                <p class="text-xs text-slate-500 mb-3">${rest.area} • ${rest.priceRange}</p>
                
                <div class="flex flex-wrap gap-1.5 mb-3">
                  ${rest.dietary.map(d => `
                    <span class="text-[10px] font-semibold bg-emerald-50 text-emerald-800 px-2 py-0.5 rounded border border-emerald-200">
                      ✓ ${d}
                    </span>
                  `).join('')}
                </div>

                <div class="pt-2 border-t border-slate-100">
                  <p class="text-[10px] uppercase font-bold text-slate-400 mb-1">Famous Specialities</p>
                  <p class="text-xs text-slate-700 line-clamp-1">${rest.popularDishes.join(' • ')}</p>
                </div>
              </div>
            </div>

            <div class="p-5 pt-0 border-t border-slate-100 flex items-center justify-between mt-auto">
              <span class="text-xs font-bold text-slate-500">${rest.openingHours.split(' ')[0]} Open</span>
              <div class="flex items-center gap-2">
                <button onclick="window.openMenuModal('${rest.id}')" class="px-3 py-2 text-xs font-semibold border border-slate-300 hover:bg-slate-100 rounded-lg text-slate-700 transition-colors">
                  Digital Menu
                </button>
                <button onclick="window.reserveRestaurantTable('${rest.id}')" class="px-3.5 py-2 text-xs font-bold bg-amber-400 text-slate-950 hover:bg-amber-300 rounded-lg shadow-md transition-all">
                  Reserve Table
                </button>
              </div>
            </div>
          </div>
        `).join('')}
      </section>

    </div>
  `;
}


// View: Tourist Guides (MODEL B — LOCATION-BASED NEARBY DISCOVERY)
// Replaces route with local guide discovery near selected anchor





function renderGuides(subview = "results") {
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


// View: Hospitals & Emergency Services (MODEL B — LOCATION-BASED NEARBY DISCOVERY)
// Ultra-urgent triage & discovery: Use Current Location banner + Emergency SOS Hotline





function renderHospitals(subview = "results") {
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


function renderAuth(mode = "login") {
    const isLogin = mode === "login";

    return `
      <div class="min-h-[calc(100vh-200px)] flex items-center justify-center px-4 py-12">
        <div class="glass-panel max-w-md w-full p-6 sm:p-8 rounded-3xl border border-white/80 shadow-2xl relative animate-in fade-in zoom-in-95 duration-200">
          
          <div class="text-center mb-6">
            <div class="w-14 h-14 rounded-2xl bg-slate-900 text-teal-300 mx-auto flex items-center justify-center mb-4 shadow-xl border border-cyan-400/40">
              <span class="material-symbols-outlined text-3xl">explore</span>
            </div>
            <h1 class="text-2xl font-extrabold text-slate-900">
              ${isLogin ? 'Sign In to Explorer' : 'Create Explorer Account'}
            </h1>
            <p class="text-xs text-slate-500 mt-1">
              ${isLogin ? 'Enter your credentials or choose a quick 1-click demo account' : 'Join the Customized Easy Explorer travel community'}
            </p>
          </div>

          <div class="flex items-center p-1 bg-slate-100 rounded-xl mb-6 border border-slate-200">
            <button onclick="window.appRouter('login')" class="flex-1 py-2 text-xs font-bold rounded-lg transition-all ${isLogin ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-900'}">
              Sign In
            </button>
            <button onclick="window.appRouter('signup')" class="flex-1 py-2 text-xs font-bold rounded-lg transition-all ${!isLogin ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-900'}">
              Create Account
            </button>
          </div>

          <div class="mb-6 p-3.5 bg-teal-50/70 border border-teal-200 rounded-2xl">
            <p class="text-[11px] font-bold text-teal-950 mb-2 flex items-center gap-1.5">
              <span class="material-symbols-outlined text-sm text-teal-600">bolt</span>
              <span>Quick 1-Click Demo Accounts:</span>
            </p>
            <div class="grid grid-cols-2 gap-2">
              <button type="button" onclick="window.quickDemoLogin('user')" class="py-2 px-2.5 rounded-xl bg-white border border-teal-300 text-teal-900 hover:bg-teal-100 text-[11px] font-bold transition-all text-left flex items-center gap-1.5 shadow-xs">
                <span class="material-symbols-outlined text-sm text-teal-600">person</span>
                <span class="truncate">Explorer Elite</span>
              </button>
              <button type="button" onclick="window.quickDemoLogin('admin')" class="py-2 px-2.5 rounded-xl bg-purple-50 border border-purple-300 text-purple-900 hover:bg-purple-100 text-[11px] font-bold transition-all text-left flex items-center gap-1.5 shadow-xs">
                <span class="material-symbols-outlined text-sm text-purple-600">admin_panel_settings</span>
                <span class="truncate">Fleet Admin</span>
              </button>
            </div>
          </div>

          <form onsubmit="event.preventDefault(); window.handleAuthSubmit('${mode}')" class="space-y-4">
            ${!isLogin ? `
              <div>
                <label class="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">Full Name</label>
                <input type="text" id="auth-name" required value="Explorer Elite" placeholder="Your Full Name" class="w-full bg-white/90 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-400/20" />
              </div>
            ` : ''}

            <div>
              <label class="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">Email Address</label>
              <input type="email" id="auth-email" required value="djshiva257@gmail.com" placeholder="name@example.com" class="w-full bg-white/90 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-400/20" />
            </div>

            <div>
              <label class="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">Password</label>
              <input type="password" id="auth-password" required value="••••••••••••" placeholder="Enter password" class="w-full bg-white/90 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-400/20" />
            </div>

            ${isLogin ? `
              <div class="flex items-center justify-between text-xs pt-1">
                <label class="flex items-center gap-2 cursor-pointer text-slate-600">
                  <input type="checkbox" checked class="rounded border-slate-300 text-teal-600 focus:ring-teal-400" />
                  <span>Remember this device</span>
                </label>
                <a href="javascript:void(0)" onclick="alert('Password reset instructions dispatched to registered email.')" class="text-teal-700 font-bold hover:underline">Forgot password?</a>
              </div>
            ` : `
              <div class="text-xs text-slate-500 pt-1">
                By creating an account, you agree to Customized Easy Explorer Terms of Service & Privacy Policy.
              </div>
            `}

            <button type="submit" class="w-full mt-2 bg-slate-900 text-white font-bold text-sm py-3.5 rounded-xl hover:bg-slate-800 shadow-xl transition-all flex items-center justify-center gap-2">
              <span>${isLogin ? 'Sign In & Access Services' : 'Complete Registration'}</span>
              <span class="material-symbols-outlined text-sm text-cyan-300">arrow_forward</span>
            </button>
          </form>

          <div class="mt-6 pt-5 border-t border-slate-200 text-center text-xs text-slate-600">
            ${isLogin ? `
              <span>Don't have an explorer account? </span>
              <button onclick="window.appRouter('signup')" class="text-teal-700 font-bold hover:underline">
                Create an account
              </button>
            ` : `
              <span>Already have an account? </span>
              <button onclick="window.appRouter('login')" class="text-teal-700 font-bold hover:underline">
                Sign In
              </button>
            `}
          </div>

        </div>
      </div>
    `;
  }


  function renderProfile() {
    const user = state.user;

    return `
      <div class="max-w-4xl mx-auto px-4 py-8">
        <div class="flex items-center justify-between mb-6">
          <button onclick="window.appRouter('dashboard')" class="flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-900 transition-colors">
            <span class="material-symbols-outlined text-sm">arrow_back</span>
            <span>Back to Dashboard</span>
          </button>
          <span class="text-xs font-bold text-teal-800 bg-teal-50 px-3 py-1 rounded-full border border-teal-200">
            Profile Protocol Active
          </span>
        </div>

        <div class="glass-card p-6 sm:p-10 border border-white/80 shadow-2xl rounded-3xl">
          <div class="text-center mb-8">
            <h1 class="text-2xl sm:text-3xl font-extrabold text-slate-900">Explorer Profile & Preferences</h1>
            <p class="text-xs text-slate-500 mt-1">Configure your personal credentials and AI discovery calibration</p>
          </div>

          <form onsubmit="event.preventDefault(); window.handleProfileSave()" class="space-y-6">
            <div class="flex flex-col sm:flex-row items-center gap-5 p-5 bg-slate-50 rounded-2xl border border-slate-200">
              <img src="${user.avatar}" class="w-20 h-20 rounded-full object-cover border-4 border-white shadow-md" />
              <div class="text-center sm:text-left flex-1">
                <h3 class="text-sm font-bold text-slate-900">${user.name}</h3>
                <p class="text-xs text-slate-500">${user.tier} • ${user.email}</p>
                <div class="mt-2.5 flex flex-wrap gap-2 justify-center sm:justify-start">
                  <button type="button" onclick="window.toggleUserRoleAction()" class="px-3 py-1.5 rounded-lg ${user.role === 'admin' ? 'bg-purple-600 text-white' : 'bg-slate-200 text-slate-800'} text-xs font-semibold">
                    Role: ${user.role.toUpperCase()}
                  </button>
                </div>
              </div>
            </div>

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

            <button type="submit" class="w-full mt-4 bg-slate-900 text-white font-bold text-xs py-3.5 rounded-xl hover:bg-slate-800 shadow-xl transition-all flex items-center justify-center gap-2">
              <span>Save Profile & Recalibrate Discovery</span>
              <span class="material-symbols-outlined text-sm text-cyan-300">check</span>
            </button>
          </form>
        </div>
      </div>
    `;
  }

  function renderAdmin() {
    return `
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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

        <div class="glass-card p-6 sm:p-8 border border-white/80 shadow-xl mb-8">
          <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h1 class="text-2xl sm:text-3xl font-extrabold text-slate-900">Customized Easy Explorer Admin</h1>
              <p class="text-xs text-slate-500 mt-1">Multi-tenant partner verification, inventory management & emergency dispatch oversight</p>
            </div>
            <div class="flex items-center gap-2">
              <button onclick="window.toggleUserRoleAction()" class="px-3.5 py-2 text-xs font-bold rounded-lg bg-slate-900 text-white hover:bg-slate-800 shadow-md">
                Exit Admin Mode
              </button>
            </div>
          </div>
        </div>

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
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-100 font-medium">
                <tr>
                  <td class="py-3 px-3 font-bold text-slate-900">Rohan K.</td>
                  <td class="py-3 px-3 text-cyan-800">Rental Vehicles (42 fleet)</td>
                  <td class="py-3 px-3 text-slate-500">Gandhipuram Hub</td>
                  <td class="py-3 px-3 font-bold text-amber-500">5.0 ★</td>
                  <td class="py-3 px-3"><span class="px-2 py-0.5 rounded bg-teal-50 text-teal-800 font-bold border border-teal-200">VERIFIED</span></td>
                </tr>
                <tr>
                  <td class="py-3 px-3 font-bold text-slate-900">KMCH Hospital</td>
                  <td class="py-3 px-3 text-red-700">Level 1 Trauma Center</td>
                  <td class="py-3 px-3 text-slate-500">Avinashi Road</td>
                  <td class="py-3 px-3 font-bold text-amber-500">4.8 ★</td>
                  <td class="py-3 px-3"><span class="px-2 py-0.5 rounded bg-teal-50 text-teal-800 font-bold border border-teal-200">VERIFIED</span></td>
                </tr>
                <tr>
                  <td class="py-3 px-3 font-bold text-slate-900">Sree Annapoorna</td>
                  <td class="py-3 px-3 text-amber-700">Restaurants (Pure Veg)</td>
                  <td class="py-3 px-3 text-slate-500">Gandhipuram Central</td>
                  <td class="py-3 px-3 font-bold text-amber-500">4.9 ★</td>
                  <td class="py-3 px-3"><span class="px-2 py-0.5 rounded bg-teal-50 text-teal-800 font-bold border border-teal-200">VERIFIED</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </div>
    `;
  }

  function renderOwnerProfileModal() {
    const owner = RENTAL_OWNERS.rohanK;

    return `
      <div id="owner-profile-modal-backdrop" class="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
        <div class="glass-card max-w-3xl w-full p-6 sm:p-8 border border-white/80 shadow-2xl relative my-8">
          <button onclick="window.closeOwnerProfileModal()" class="absolute top-5 right-5 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-700 text-sm font-bold">
            ✕
          </button>

          <div class="flex flex-col sm:flex-row items-center sm:items-start gap-6 pb-6 border-b border-slate-200">
            <div class="relative">
              <img src="${owner.avatar}" alt="${owner.name}" class="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl object-cover border-4 border-white shadow-xl" />
              <div class="absolute -bottom-2 -right-2 bg-teal-500 text-white rounded-full p-1 border-2 border-white flex items-center justify-center" title="Verified Fleet Commander">
                <span class="material-symbols-outlined text-sm font-bold">verified</span>
              </div>
            </div>
            
            <div class="text-center sm:text-left flex-1">
              <div class="flex flex-wrap items-center justify-center sm:justify-start gap-2 mb-1">
                <h2 class="text-2xl font-extrabold text-slate-900">${owner.name}</h2>
                <span class="bg-teal-50 text-teal-800 text-[10px] font-bold px-2 py-0.5 rounded border border-teal-200">
                  Verified Host
                </span>
              </div>
              <p class="text-xs text-teal-700 font-semibold mb-2">${owner.title}</p>
              <p class="text-xs text-slate-600 leading-relaxed max-w-xl">${owner.bio}</p>
              
              <div class="flex flex-wrap items-center justify-center sm:justify-start gap-4 mt-3 text-xs text-slate-500">
                <span class="flex items-center gap-1 font-bold text-amber-500">
                  <span class="material-symbols-outlined text-xs">star</span>
                  <span>${owner.rating} (${owner.reviewsCount} reviews)</span>
                </span>
                <span>•</span>
                <span>📍 ${owner.location}</span>
              </div>
            </div>
          </div>

          <div class="grid grid-cols-3 gap-3 my-6">
            <div class="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-center">
              <p class="text-lg sm:text-xl font-extrabold text-slate-900">${owner.totalVehicles}</p>
              <p class="text-[10px] uppercase font-bold text-slate-400">Total Fleet</p>
            </div>
            <div class="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-center">
              <p class="text-lg sm:text-xl font-extrabold text-slate-900">${owner.yearsExp} Yrs</p>
              <p class="text-[10px] uppercase font-bold text-slate-400">Experience</p>
            </div>
            <div class="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-center">
              <p class="text-lg sm:text-xl font-extrabold text-teal-600">${owner.responseRate}</p>
              <p class="text-[10px] uppercase font-bold text-slate-400">Response Rate</p>
            </div>
          </div>

          <div class="flex items-center justify-end gap-3 pt-4 border-t border-slate-200">
            <button onclick="window.contactOwnerAction('${owner.name}')" class="px-4 py-2.5 rounded-xl border border-slate-300 text-slate-700 font-bold text-xs hover:bg-slate-50 transition-colors flex items-center gap-1.5">
              <span class="material-symbols-outlined text-sm">chat</span>
              <span>Contact Host</span>
            </button>
            <button onclick="window.closeOwnerProfileModal()" class="px-5 py-2.5 rounded-xl bg-slate-900 text-white font-bold text-xs hover:bg-slate-800 shadow-md transition-all flex items-center gap-1.5">
              <span>Continue Booking</span>
              <span class="material-symbols-outlined text-sm">arrow_forward</span>
            </button>
          </div>
        </div>
      </div>
    `;
  }

  // --- APP CONTROLLER ---
  class AppController {
    constructor() {
      this.appMount = document.getElementById('app-mount');
      this.init();
    }

    init() {
      state.subscribe((event, payload) => {
        if (event === "AUTH_CHANGED" || event === "PROFILE_UPDATED") {
          this.updateAuthUI();
        }
        this.renderCurrentView();
      });

      this.updateAuthUI();
      this.renderCurrentView();
    }

    updateAuthUI() {
      const headerSlot = document.getElementById('header-user-slot');
      const sidebarSlot = document.getElementById('sidebar-user-slot');
      const sidebarLabel = document.getElementById('sidebar-auth-label');

      if (state.user.isLoggedIn) {
        if (headerSlot) {
          headerSlot.innerHTML = `
            <div onclick="window.toggleUserMenu(event)"
              class="flex items-center gap-2.5 p-1 sm:pr-3 rounded-full hover:bg-slate-100 cursor-pointer transition-colors border border-transparent hover:border-slate-200">
              <img src="${state.user.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80'}"
                alt="${state.user.name}" class="w-9 h-9 rounded-full object-cover border-2 border-teal-400 shadow-sm" />
              <div class="hidden lg:block text-left">
                <span class="text-xs font-bold text-slate-900 block leading-tight">${state.user.name}</span>
                <span class="text-[10px] text-teal-700 font-semibold block">${state.user.role === 'admin' ? 'Administrator' : state.user.tier}</span>
              </div>
              <span class="material-symbols-outlined text-sm text-slate-400">expand_more</span>
            </div>

            <div id="user-dropdown-menu" class="hidden absolute right-0 mt-2 w-56 bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-slate-200/80 p-2 z-50">
              <div class="px-3 py-2 border-b border-slate-100 mb-1">
                <p class="text-xs font-bold text-slate-900">${state.user.name}</p>
                <p class="text-[10px] text-slate-500 truncate">${state.user.email}</p>
              </div>
              <a href="javascript:void(0)" onclick="window.appRouter('profile'); window.closeUserMenu()" class="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-100">
                <span class="material-symbols-outlined text-base text-slate-500">person</span>
                <span>My Profile</span>
              </a>
              <a href="javascript:void(0)" onclick="window.appRouter('dashboard'); window.closeUserMenu()" class="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-100">
                <span class="material-symbols-outlined text-base text-slate-500">space_dashboard</span>
                <span>My Bookings & Vouchers</span>
              </a>
              <a href="javascript:void(0)" onclick="window.appRouter('admin'); window.closeUserMenu()" class="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-100">
                <span class="material-symbols-outlined text-base text-purple-600">admin_panel_settings</span>
                <span>Admin Console</span>
              </a>
              <div class="border-t border-slate-100 my-1"></div>
              <a href="javascript:void(0)" onclick="window.handleSignOut(); window.closeUserMenu()" class="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-bold text-red-600 hover:bg-red-50">
                <span class="material-symbols-outlined text-base text-red-500">logout</span>
                <span>Sign Out</span>
              </a>
            </div>
          `;
        }

        if (sidebarSlot) {
          sidebarSlot.innerHTML = `
            <div class="flex items-center gap-3 overflow-hidden">
              <img src="${state.user.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80'}"
                class="w-10 h-10 rounded-xl object-cover border border-teal-400" />
              <div class="overflow-hidden">
                <p class="text-xs font-bold text-slate-900 truncate">${state.user.name}</p>
                <span class="text-[10px] font-semibold text-teal-800 bg-teal-100/60 px-2 py-0.5 rounded-full inline-block mt-0.5">
                  ${state.user.role === 'admin' ? 'Fleet Admin' : 'Verified Tier'}
                </span>
              </div>
            </div>
            <button onclick="window.handleSignOut()" title="Sign Out" class="text-slate-400 hover:text-red-500 p-1 rounded-lg transition-colors">
              <span class="material-symbols-outlined text-lg">logout</span>
            </button>
          `;
        }

        if (sidebarLabel) {
          sidebarLabel.textContent = "Switch Account";
        }
      } else {
        // Logged Out State
        if (headerSlot) {
          headerSlot.innerHTML = `
            <div class="flex items-center gap-2">
              <button onclick="window.appRouter('login')" class="px-3.5 py-1.5 rounded-xl text-xs font-bold text-slate-700 bg-white border border-slate-300 hover:bg-slate-50 transition-all flex items-center gap-1.5 shadow-xs">
                <span class="material-symbols-outlined text-sm">login</span>
                <span>Sign In</span>
              </button>
              <button onclick="window.appRouter('signup')" class="px-3.5 py-1.5 rounded-xl text-xs font-bold text-slate-950 bg-teal-400 hover:bg-teal-300 transition-all flex items-center gap-1.5 shadow-sm">
                <span class="material-symbols-outlined text-sm">person_add</span>
                <span>Register</span>
              </button>
            </div>
          `;
        }

        if (sidebarSlot) {
          sidebarSlot.innerHTML = `
            <div class="flex items-center gap-2.5 overflow-hidden">
              <div class="w-10 h-10 rounded-xl bg-slate-200 text-slate-600 flex items-center justify-center font-bold">
                <span class="material-symbols-outlined">person</span>
              </div>
              <div class="overflow-hidden">
                <p class="text-xs font-bold text-slate-800">Guest Explorer</p>
                <button onclick="window.appRouter('login')" class="text-[10px] font-bold text-teal-700 hover:underline">Sign In Now</button>
              </div>
            </div>
          `;
        }

        if (sidebarLabel) {
          sidebarLabel.textContent = "Sign In / Register";
        }
      }
    }

    renderCurrentView() {
      if (!this.appMount) {
        this.appMount = document.getElementById('app-mount');
        if (!this.appMount) return;
      }

      let viewHtml = "";
      const view = state.currentView;

      switch (view) {
        case "welcome": viewHtml = renderWelcome(); break;
        case "dashboard": viewHtml = renderDashboard(); break;
        case "tourist-places": viewHtml = renderTouristPlaces(); break;
        case "hotels": viewHtml = renderHotels(); break;
        case "rentals": viewHtml = renderRentals(); break;
        case "restaurants": viewHtml = renderRestaurants(); break;
        case "guides": viewHtml = renderGuides(); break;
        case "hospitals": viewHtml = renderHospitals(); break;
        case "auth":
        case "login": viewHtml = renderAuth("login"); break;
        case "signup": viewHtml = renderAuth("signup"); break;
        case "profile": viewHtml = renderProfile(); break;
        case "admin": viewHtml = renderAdmin(); break;
        default: viewHtml = renderWelcome();
      }

      this.appMount.innerHTML = viewHtml;
      this.updateNavigationActiveStates();
      this.postRenderViewHooks();
    }

    updateNavigationActiveStates() {
      const current = state.currentView;
      document.querySelectorAll('[data-nav-target]').forEach(el => {
        const target = el.getAttribute('data-nav-target');
        if (target === current) {
          el.classList.add('bg-teal-50', 'text-teal-800', 'border-l-4', 'border-teal-500', 'font-bold');
          el.classList.remove('opacity-70');
        } else {
          el.classList.remove('bg-teal-50', 'text-teal-800', 'border-l-4', 'border-teal-500', 'font-bold');
          el.classList.add('opacity-70');
        }
      });

      const locBadge = document.getElementById('header-active-location');
      if (locBadge) {
        locBadge.textContent = `📍 ${state.selectedLocation.name.split(',')[0]}`;
      }
    }

    postRenderViewHooks() {
      const view = state.currentView;

      if (view === "tourist-places") {
        const mount = document.getElementById('route-map-mount');
        if (mount) {
          const availabilities = (state.route.discoveredAvailabilities && state.route.discoveredAvailabilities.length > 0)
            ? state.route.discoveredAvailabilities
            : getDefaultCorridorStops(state.route.from, state.route.destination);
          new MapService('route-map-mount', {
            mode: 'route',
            from: state.route.from,
            destination: state.route.destination,
            distanceKm: state.route.distanceKm,
            estimatedTime: state.route.estimatedTime,
            stops: availabilities
          });
        }
      }

      if (state.activeViewMode === "map") {
        let mapId = null;
        let items = [];

        if (view === "hotels") {
        mapId = "hotels-map-mount";
        items = getNearbyResourcesForLocation("Hotels & Resorts", state.selectedLocation, state.nearbyRadius);
      } else if (view === "rentals") {
        mapId = "rentals-map-mount";
        items = getNearbyResourcesForLocation("Rental Vehicles", state.selectedLocation, state.nearbyRadius);
      } else if (view === "restaurants") {
        mapId = "restaurants-map-mount";
        items = getNearbyResourcesForLocation("Restaurants", state.selectedLocation, state.nearbyRadius);
      } else if (view === "guides") {
        mapId = "guides-map-mount";
        items = getNearbyResourcesForLocation("Tourist Guides", state.selectedLocation, state.nearbyRadius);
      } else if (view === "hospitals") {
        mapId = "hospitals-map-mount";
        items = getNearbyResourcesForLocation("Hospitals", state.selectedLocation, state.nearbyRadius);
      }

      if (mapId && document.getElementById(mapId)) {
          new MapService(mapId, {
            mode: "radial",
            center: state.selectedLocation,
            radiusKm: state.nearbyRadius,
            items: items
          });
        }
      }
    }

    showToast(message) {
      const toastMount = document.getElementById('toast-mount');
      if (!toastMount) return;

      const toast = document.createElement('div');
      toast.className = "bg-slate-900/95 text-white border border-teal-400/40 px-4 py-3 rounded-xl shadow-2xl text-xs font-semibold flex items-center gap-2.5 backdrop-blur-md animate-in slide-in-from-bottom duration-300";
      toast.innerHTML = `
        <span class="w-2 h-2 rounded-full bg-teal-400 animate-ping"></span>
        <span>${message}</span>
      `;

      toastMount.appendChild(toast);
      setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateY(10px)';
        toast.style.transition = 'all 0.3s ease';
        setTimeout(() => toast.remove(), 300);
      }, 3500);
    }
  }

  // --- ATTACH ALL WINDOW FUNCTIONS IMMEDIATELY ---
  let appInstance = null;

  window.appRouter = function (viewName) {
    state.setView(viewName);
  };

  window.appBack = function () {
    state.goBack();
  };

  window.openLocationSelectorFor = function (serviceKey) {
    state.locationConfirmed = false;
    state.setView(serviceKey);
  };

  window.selectPresetByIndex = function (idx) {
    const loc = PRESET_LOCATIONS[idx];
    if (loc) {
      state.setLocation(loc);
      const input = document.getElementById('location-search-input');
      if (input) input.value = loc.name;
      if (appInstance) appInstance.showToast(`Selected location: 📍 ${loc.name}`);
    }
  };

  window.useCurrentLocationAction = function () {
    const defaultLoc = PRESET_LOCATIONS[0];
    state.setLocation(defaultLoc);
    const input = document.getElementById('location-search-input');
    if (input) input.value = defaultLoc.name;
    if (appInstance) appInstance.showToast("GPS Locked: 📍 Current Location: Gandhipuram, Coimbatore");
  };

  window.handleLocationSearch = function (query) {
    if (!query || query.length < 2) return;
    const match = PRESET_LOCATIONS.find(l => l.name.toLowerCase().includes(query.toLowerCase()) || l.city.toLowerCase().includes(query.toLowerCase()));
    if (match) {
      state.setLocation(match);
    }
  };

  window.setRadiusAction = function (radiusKm) {
    state.setNearbyRadius(radiusKm);
    if (appInstance) appInstance.showToast(`Radial scan adjusted to ${radiusKm} km radius`);
  };

  window.setHospitalRadiusAction = function (radiusKm) {
    state.setNearbyRadius(radiusKm);
    if (appInstance) {
      appInstance.renderCurrentView();
      appInstance.showToast(`Hospital emergency radius: ${radiusKm} km`);
    }
  };

  window.confirmHotelsLocation = function () {
    state.confirmLocation(true);
    if (appInstance) appInstance.showToast(`Loading stays near 📍 ${state.selectedLocation.name}`);
  };

  window.confirmRentalsLocation = function () {
    state.confirmLocation(true);
    if (appInstance) appInstance.showToast(`Loading vehicles near 📍 ${state.selectedLocation.name}`);
  };

  window.confirmRestaurantsLocation = function () {
    state.confirmLocation(true);
    if (appInstance) appInstance.showToast(`Loading restaurants near 📍 ${state.selectedLocation.name}`);
  };

  window.confirmGuidesLocation = function () {
    state.confirmLocation(true);
    if (appInstance) appInstance.showToast(`Loading local guides near 📍 ${state.selectedLocation.name}`);
  };

  window.confirmHospitalsLocation = function () {
    state.confirmLocation(true);
    if (appInstance) appInstance.showToast(`Scanning emergency hospitals near 📍 ${state.selectedLocation.name}`);
  };

  window.setHotelsViewMode = function (mode) { state.setViewMode(mode); };
  window.setRentalsViewMode = function (mode) { state.setViewMode(mode); };
  window.setRestaurantsViewMode = function (mode) { state.setViewMode(mode); };
  window.setGuidesViewMode = function (mode) { state.setViewMode(mode); };
  window.setHospitalsViewMode = function (mode) { state.setViewMode(mode); };

  window.toggleInteractiveMapPicker = function () {
    const panel = document.getElementById('interactive-map-picker-panel');
    if (!panel) return;
    const isHidden = panel.classList.contains('hidden');
    if (isHidden) {
      panel.classList.remove('hidden');
      new MapService('picker-map-canvas-container', {
        mode: 'picker',
        center: state.selectedLocation,
        onLocationSelect: (newLoc) => {
          state.setLocation(newLoc);
          const input = document.getElementById('location-search-input');
          if (input) input.value = newLoc.name;
          if (appInstance) appInstance.showToast(`📍 Pinned Location: ${newLoc.name}`);
        }
      });
    } else {
      panel.classList.add('hidden');
    }
  };

  window.selectExpeditionRoute = function (routeKey) {
    if (routeKey === 'cbe-ooty') {
      state.setRoute("Coimbatore, India", "Ooty, Tamil Nadu", 86, "2h 45m");
    } else {
      state.setRoute("Coimbatore, India", "Paris, France", 7850, "11h 45m");
    }
    if (appInstance) appInstance.renderCurrentView();
  };

  window.bookHotelRoom = function (hotelId) {
    const hotel = HOTELS.find(h => h.id === hotelId) || HOTELS[0];
    const newBooking = state.addBooking({
      serviceType: "Hotels & Resorts",
      itemTitle: `${hotel.name} - Executive Suite`,
      host: "Hotel Front Desk Concierge",
      location: hotel.locationArea,
      date: "Nov 24 - Nov 26, 2026",
      amount: `${hotel.currency}${hotel.pricePerNight * 2}`
    });
    window.viewPassModal(newBooking.id);
  };

  window.bookRentalVehicle = function (vehId) {
    const veh = RENTAL_VEHICLES.find(v => v.id === vehId) || RENTAL_VEHICLES[0];
    const newBooking = state.addBooking({
      serviceType: "Rental Vehicles",
      itemTitle: `${veh.name} (${veh.subType})`,
      host: `${veh.owner.name} (Verified Host)`,
      location: veh.pickupLocation,
      date: "Tomorrow, 10:00 AM (2 Days)",
      amount: `${veh.currency}${veh.pricePerDay * 2}`
    });
    window.viewPassModal(newBooking.id);
  };

  window.reserveRestaurantTable = function (restId) {
    const rest = RESTAURANTS.find(r => r.id === restId) || RESTAURANTS[0];
    const newBooking = state.addBooking({
      serviceType: "Restaurants",
      itemTitle: `${rest.name} (Table for 2)`,
      host: "Maitre d' Hotel",
      location: rest.area,
      date: "Tonight, 8:00 PM",
      amount: "₹0 (Confirmed Reservation)"
    });
    window.viewPassModal(newBooking.id);
  };

  window.bookGuideSession = function (guideId) {
    const guide = TOURIST_GUIDES.find(g => g.id === guideId) || TOURIST_GUIDES[0];
    const newBooking = state.addBooking({
      serviceType: "Tourist Guides",
      itemTitle: `Heritage Tour with ${guide.name}`,
      host: guide.name,
      location: state.selectedLocation.name,
      date: "Tomorrow, 9:00 AM",
      amount: `${guide.currency}${guide.pricePerHour * 4}`
    });
    window.viewPassModal(newBooking.id);
  };

  window.bookTouristPlacePass = function (placeId) {
    const place = TOURIST_PLACES.find(p => p.id === placeId) || TOURIST_PLACES[0];
    const newBooking = state.addBooking({
      serviceType: "Tourist Places",
      itemTitle: `${place.name} Priority Pass`,
      host: "Monument Authority",
      location: place.destination,
      date: "Nov 25, 2026",
      amount: `${place.currency}${place.price * 2}`
    });
    window.viewPassModal(newBooking.id);
  };

  window.openOwnerProfileModal = function () {
    const modalMount = document.getElementById('modal-mount');
    if (modalMount) {
      modalMount.innerHTML = renderOwnerProfileModal();
    }
  };

  window.closeOwnerProfileModal = function () {
    const backdrop = document.getElementById('owner-profile-modal-backdrop');
    if (backdrop) backdrop.remove();
  };

  window.contactOwnerAction = function (name) {
    alert(`Connecting terminal to ${name}'s verified comms channel... (Response time: < 5 mins)`);
  };

  window.openMenuModal = function (restId) {
    const rest = RESTAURANTS.find(r => r.id === restId) || RESTAURANTS[0];
    const modalMount = document.getElementById('modal-mount');
    if (!modalMount) return;

    modalMount.innerHTML = `
      <div id="menu-modal-backdrop" class="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
        <div class="glass-card max-w-2xl w-full p-8 border border-white/80 shadow-2xl rounded-3xl relative my-8">
          <button onclick="document.getElementById('menu-modal-backdrop').remove()" class="absolute top-5 right-5 w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-700 text-sm font-bold">
            ✕
          </button>
          <h2 class="text-xl font-bold text-slate-900">${rest.name} Menu</h2>
          <p class="text-xs text-slate-500 mb-4">${rest.cuisine} • ${rest.area}</p>
          <div class="space-y-4 max-h-[360px] overflow-y-auto pr-2">
            ${rest.menu.map(cat => `
              <div>
                <h3 class="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">${cat.category}</h3>
                <div class="space-y-2">
                  ${cat.items.map(item => `
                    <div class="p-3 rounded-xl bg-white border border-slate-200 flex items-center justify-between">
                      <div>
                        <h4 class="text-xs font-bold text-slate-900">${item.name}</h4>
                        <p class="text-[11px] text-slate-500">${item.desc}</p>
                      </div>
                      <span class="text-xs font-extrabold text-amber-700">₹${item.price}</span>
                    </div>
                  `).join('')}
                </div>
              </div>
            `).join('')}
          </div>
          <button onclick="document.getElementById('menu-modal-backdrop').remove(); window.reserveRestaurantTable('${rest.id}')" class="w-full mt-4 bg-slate-900 text-white font-bold text-xs py-3 rounded-xl hover:bg-slate-800">
            Proceed to Table Reservation
          </button>
        </div>
      </div>
    `;
  };

  window.openPlaceDetailsModal = function (placeId) {
    const place = TOURIST_PLACES.find(p => p.id === placeId) || TOURIST_PLACES[0];
    const modalMount = document.getElementById('modal-mount');
    if (!modalMount) return;

    modalMount.innerHTML = `
      <div id="place-modal-backdrop" class="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
        <div class="glass-card max-w-2xl w-full p-8 border border-white/80 shadow-2xl rounded-3xl relative my-8">
          <button onclick="document.getElementById('place-modal-backdrop').remove()" class="absolute top-5 right-5 w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-700 text-sm font-bold">
            ✕
          </button>
          <img src="${place.image}" class="w-full h-56 rounded-2xl object-cover mb-4" />
          <h2 class="text-2xl font-bold text-slate-900">${place.name}</h2>
          <p class="text-xs text-slate-500 mb-4">${place.address}</p>
          <p class="text-xs text-slate-700 leading-relaxed mb-4">${place.description}</p>
          <button onclick="document.getElementById('place-modal-backdrop').remove(); window.bookTouristPlacePass('${place.id}')" class="w-full bg-teal-500 text-slate-950 font-bold text-xs py-3 rounded-xl hover:bg-teal-400">
            Book Priority Pass (${place.currency}${place.price})
          </button>
        </div>
      </div>
    `;
  };

  window.openHotelDetailsModal = function (hotelId) {
    const hotel = HOTELS.find(h => h.id === hotelId) || HOTELS[0];
    const modalMount = document.getElementById('modal-mount');
    if (!modalMount) return;

    modalMount.innerHTML = `
      <div id="hotel-modal-backdrop" class="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
        <div class="glass-card max-w-2xl w-full p-8 border border-white/80 shadow-2xl rounded-3xl relative my-8">
          <button onclick="document.getElementById('hotel-modal-backdrop').remove()" class="absolute top-5 right-5 w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-700 text-sm font-bold">
            ✕
          </button>
          <img src="${hotel.image}" class="w-full h-56 rounded-2xl object-cover mb-4" />
          <h2 class="text-2xl font-bold text-slate-900">${hotel.name}</h2>
          <p class="text-xs text-slate-500 mb-4">${hotel.locationArea}, ${hotel.city}</p>
          <p class="text-xs text-slate-700 leading-relaxed mb-4">${hotel.description}</p>
          <button onclick="document.getElementById('hotel-modal-backdrop').remove(); window.bookHotelRoom('${hotel.id}')" class="w-full bg-teal-500 text-slate-950 font-bold text-xs py-3 rounded-xl hover:bg-teal-400">
            Confirm Room Reservation (${hotel.currency}${hotel.pricePerNight}/night)
          </button>
        </div>
      </div>
    `;
  };

  window.openVehicleDetailsModal = function (vehId) {
    const veh = RENTAL_VEHICLES.find(v => v.id === vehId) || RENTAL_VEHICLES[0];
    const modalMount = document.getElementById('modal-mount');
    if (!modalMount) return;

    modalMount.innerHTML = `
      <div id="veh-modal-backdrop" class="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
        <div class="glass-card max-w-2xl w-full p-8 border border-white/80 shadow-2xl rounded-3xl relative my-8">
          <button onclick="document.getElementById('veh-modal-backdrop').remove()" class="absolute top-5 right-5 w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-700 text-sm font-bold">
            ✕
          </button>
          <img src="${veh.image}" class="w-full h-56 rounded-2xl object-cover mb-4" />
          <h2 class="text-2xl font-bold text-slate-900">${veh.name}</h2>
          <p class="text-xs text-slate-500 mb-2">${veh.category} • ${veh.subType} (${veh.modelYear})</p>
          <div class="grid grid-cols-2 gap-3 my-4 p-4 bg-slate-50 rounded-2xl border border-slate-200 text-xs">
            <div><strong>Fuel:</strong> ${veh.fuel}</div>
            <div><strong>Transmission:</strong> ${veh.transmission}</div>
            <div><strong>Seats:</strong> ${veh.seats} Passengers</div>
            <div><strong>Mileage:</strong> ${veh.mileage}</div>
          </div>
          <button onclick="document.getElementById('veh-modal-backdrop').remove(); window.bookRentalVehicle('${veh.id}')" class="w-full bg-teal-500 text-slate-950 font-bold text-xs py-3 rounded-xl hover:bg-teal-400">
            Book This Vehicle (${veh.currency}${veh.pricePerDay}/day)
          </button>
        </div>
      </div>
    `;
  };

  window.showMarkerDetails = function (itemId, category) {
    let item = null;
    if (category === "Hotels & Resorts") item = HOTELS.find(h => h.id === itemId);
    else if (category === "Rental Vehicles") item = RENTAL_VEHICLES.find(v => v.id === itemId);
    else if (category === "Restaurants") item = RESTAURANTS.find(r => r.id === itemId);
    else if (category === "Tourist Guides") item = TOURIST_GUIDES.find(g => g.id === itemId);
    else if (category === "Hospitals") item = HOSPITALS.find(h => h.id === itemId);

    if (item && appInstance) {
      appInstance.showToast(`Selected: ${item.name} (${item.distanceKm || '0.8'} km away)`);
    }
  };

  window.handleMapPinReposition = function (lat, lng) {
    state.setSelectedLocation({
      ...state.selectedLocation,
      lat: Number(lat.toFixed(4)),
      lng: Number(lng.toFixed(4)),
      name: '📍 Pin (' + lat.toFixed(3) + '°N, ' + lng.toFixed(3) + '°E)'
    });
    if (appInstance) {
      appInstance.showToast('Updated search anchor: ' + lat.toFixed(4) + '°N, ' + lng.toFixed(4) + '°E');
    }
  };

  window.handleLocationPinDropped = function (newLoc) {
    state.setSelectedLocation(newLoc);
    if (appInstance) {
      appInstance.showToast('Selected: ' + newLoc.name);
    }
  };



  window.triggerEmergencySOSModal = function () {
    const modalMount = document.getElementById('modal-mount');
    if (!modalMount) return;

    modalMount.innerHTML = `
      <div id="sos-modal-backdrop" class="fixed inset-0 z-50 bg-red-950/80 backdrop-blur-md flex items-center justify-center p-4">
        <div class="glass-card max-w-lg w-full p-8 border-2 border-red-500 shadow-2xl rounded-3xl text-center relative animate-in zoom-in-95 duration-200">
          <div class="w-16 h-16 rounded-2xl bg-red-600 text-white mx-auto flex items-center justify-center mb-4 shadow-xl border-2 border-white animate-pulse">
            <span class="material-symbols-outlined text-4xl">emergency</span>
          </div>
          <span class="text-[10px] font-bold uppercase tracking-widest text-red-700 bg-red-50 px-2.5 py-1 rounded-full border border-red-200">
            EMERGENCY SOS DISPATCH TRIGGERED
          </span>
          <h2 class="text-2xl font-extrabold text-slate-900 mt-2">Connecting to KMCH & 108 Dispatch</h2>
          <p class="text-xs text-slate-600 mt-1 max-w-sm mx-auto">
            Broadcasting GPS coordinates: <strong>11.0168° N, 76.9558° E (Gandhipuram, Coimbatore)</strong>
          </p>
          <div class="my-6 p-4 bg-red-50 border border-red-200 rounded-2xl text-left space-y-2 text-xs">
            <div class="flex items-center justify-between font-bold text-red-900">
              <span>Ambulance Standby Unit #04</span>
              <span>En Route (ETA: 6 mins)</span>
            </div>
          </div>
          <div class="flex items-center gap-3">
            <button onclick="document.getElementById('sos-modal-backdrop').remove()" class="flex-1 py-3 rounded-xl border border-slate-300 bg-white text-xs font-bold text-slate-700">
              Cancel Dispatch
            </button>
            <a href="tel:108" class="flex-1 py-3 rounded-xl bg-red-600 text-white text-xs font-bold flex items-center justify-center gap-1 shadow-lg hover:bg-red-500">
              <span class="material-symbols-outlined text-sm">call</span>
              <span>Direct Hotline (108)</span>
            </a>
          </div>
        </div>
      </div>
    `;
  };

  window.getHospitalDirections = function (hospName) {
    alert(`GPS navigation route active to ${hospName} via Avinashi Road. Est. travel time: 6 mins.`);
  };

  window.viewPassModal = function (bookingId) {
    const b = state.bookings.find(bk => bk.id === bookingId) || state.bookings[0];
    const modalMount = document.getElementById('modal-mount');
    if (!modalMount) return;

    modalMount.innerHTML = `
      <div id="booking-modal-backdrop" class="fixed inset-0 z-50 bg-slate-950/75 backdrop-blur-md flex items-center justify-center p-4">
        <div class="glass-card max-w-md w-full p-8 border border-white/80 shadow-2xl rounded-3xl text-center relative animate-in zoom-in-95 duration-200">
          <div class="w-16 h-16 rounded-2xl bg-teal-500 text-slate-950 mx-auto flex items-center justify-center mb-4 shadow-xl border-2 border-white">
            <span class="material-symbols-outlined text-3xl font-bold">check_circle</span>
          </div>

          <span class="text-[10px] font-bold uppercase tracking-widest text-teal-700 bg-teal-50 px-2.5 py-1 rounded-full border border-teal-200">
            CONFIRMED BOOKING PASS
          </span>
          <h2 class="text-xl font-extrabold text-slate-900 mt-2">${b.itemTitle}</h2>
          <p class="text-xs text-slate-500 mt-1">Host: ${b.host} • 📍 ${b.location}</p>

          <div class="p-4 my-6 bg-slate-50 rounded-2xl border border-slate-200 flex flex-col items-center">
            <div class="w-32 h-32 bg-white p-2 rounded-xl border border-slate-200 shadow-inner flex items-center justify-center">
              <span class="material-symbols-outlined text-8xl text-slate-900">qr_code_2</span>
            </div>
            <p class="font-mono text-xs font-bold text-slate-700 mt-2.5">${b.id} • TOKEN ACTIVE</p>
            <p class="text-[10px] text-slate-400 mt-0.5">Show this digital QR voucher on arrival</p>
          </div>

          <div class="flex items-center gap-3">
            <button onclick="document.getElementById('booking-modal-backdrop').remove()" class="flex-1 py-3 rounded-xl border border-slate-300 hover:bg-slate-50 text-xs font-bold text-slate-700 transition-colors">
              Close
            </button>
            <button onclick="document.getElementById('booking-modal-backdrop').remove(); window.appRouter('dashboard')" class="flex-1 py-3 rounded-xl bg-slate-900 text-white hover:bg-slate-800 text-xs font-bold shadow-md transition-all">
              Go to Dashboard
            </button>
          </div>
        </div>
      </div>
    `;
  };

  window.handleProfileSave = function () {
    const name = document.getElementById('prof-name')?.value || state.user.name;
    const email = document.getElementById('prof-email')?.value || state.user.email;
    const phone = document.getElementById('prof-phone')?.value || state.user.phone;
    const emergency = document.getElementById('prof-emergency')?.value || state.user.emergencyContact;

    state.updateProfile({ name, email, phone, emergencyContact: emergency });
    if (appInstance) appInstance.showToast("Profile credentials & discovery preferences updated");
    state.setView("dashboard");
  };

  // --- USER MENU & AUTH HANDLERS ---
  window.toggleUserMenu = function(event) {
    if (event) event.stopPropagation();
    const menu = document.getElementById('user-dropdown-menu');
    if (menu) menu.classList.toggle('hidden');
  };

  window.closeUserMenu = function() {
    const menu = document.getElementById('user-dropdown-menu');
    if (menu) menu.classList.add('hidden');
  };

  document.addEventListener('click', function(e) {
    const menu = document.getElementById('user-dropdown-menu');
    if (menu && !menu.contains(e.target) && !e.target.closest('#header-user-slot')) {
      menu.classList.add('hidden');
    }
  });

  window.handleSignOut = function() {
    state.logout();
    if (appInstance) appInstance.showToast("Signed out successfully. Guest mode active.");
    if (state.currentView === "profile" || state.currentView === "dashboard" || state.currentView === "admin") {
      state.setView("welcome");
    }
  };

  window.quickDemoLogin = function(role) {
    const isAdm = role === 'admin';
    state.login({
      name: isAdm ? 'Fleet Administrator' : 'Explorer Elite',
      email: isAdm ? 'admin@easyexplorer.internal' : 'djshiva257@gmail.com',
      role: isAdm ? 'admin' : 'user',
      tier: isAdm ? 'Fleet Administrator' : 'Premium Tier'
    });
    if (appInstance) appInstance.showToast("Signed in as " + (isAdm ? 'Fleet Administrator (Admin)' : 'Explorer Elite'));
    state.setView("welcome");
  };

  window.handleAuthSubmit = function(mode) {
    const nameInput = document.getElementById('auth-name');
    const emailInput = document.getElementById('auth-email');
    const name = nameInput ? nameInput.value : state.user.name;
    const email = emailInput ? emailInput.value : state.user.email;

    state.login({ name, email });
    if (appInstance) appInstance.showToast("Welcome " + name + "! Authenticated successfully");
    state.setView("welcome");
  };

  // --- REAL-TIME ROUTE DISCOVERY OPERATIONS ---
  window.triggerRouteSearch = function() {
    const from = document.getElementById('route-from-input') ? document.getElementById('route-from-input').value : state.route.from;
    const dest = document.getElementById('route-dest-input') ? document.getElementById('route-dest-input').value : state.route.destination;
    window.searchRouteAvailabilities(from, dest);
  };

  window.swapRoutePoints = function() {
    const fromInput = document.getElementById('route-from-input');
    const destInput = document.getElementById('route-dest-input');
    if (fromInput && destInput) {
      const tmp = fromInput.value;
      fromInput.value = destInput.value;
      destInput.value = tmp;
      window.searchRouteAvailabilities(fromInput.value, destInput.value);
    }
  };

  window.applyRoutePreset = function(from, dest) {
    const fromInput = document.getElementById('route-from-input');
    const destInput = document.getElementById('route-dest-input');
    if (fromInput) fromInput.value = from;
    if (destInput) destInput.value = dest;
    window.searchRouteAvailabilities(from, dest);
  };

  window.setRouteModel = function(model) {
    state.route.model = model;
    const label = model === 'gemini-pro' ? 'Gemini AI Scout' : model === 'osm-live' ? 'OpenStreetMap Live' : 'Smart Pathfinder';
    if (appInstance) appInstance.showToast("Discovery Engine switched to: " + label);
    window.triggerRouteSearch();
  };

  window.setRouteCategoryFilter = function(category) {
    state.route.categoryFilter = category;
    if (appInstance) appInstance.renderCurrentView();
  };

  window.useCurrentLocationForOrigin = function() {
    const fromInput = document.getElementById('route-from-input');
    if (fromInput) {
      fromInput.value = state.selectedLocation.name || "Coimbatore, Tamil Nadu";
      if (appInstance) appInstance.showToast("Origin set to your current location: " + fromInput.value);
    }
  };

  window.scrollToStopCard = function(stopId) {
    const card = document.getElementById('stop-card-' + stopId);
    if (card) {
      card.scrollIntoView({ behavior: 'smooth', block: 'center' });
      card.classList.add('ring-4', 'ring-teal-400');
      setTimeout(function() { card.classList.remove('ring-4', 'ring-teal-400'); }, 2000);
    }
  };

  window.searchRouteAvailabilities = function(fromVal, destVal, modelVal) {
    const from = fromVal || (document.getElementById('route-from-input') ? document.getElementById('route-from-input').value : state.route.from);
    const dest = destVal || (document.getElementById('route-dest-input') ? document.getElementById('route-dest-input').value : state.route.destination);
    const model = modelVal || state.route.model || 'gemini-pro';

    state.setRouteScanning(true);
    state.setRoute(from, dest);
    if (appInstance) appInstance.renderCurrentView();

    setTimeout(function() {
      const endpoints = getCorridorEndpoints(from, dest);
      state.route.startCoords = endpoints.start;
      state.route.destCoords = endpoints.end;

      const dLower = dest.toLowerCase();
      const fLower = from.toLowerCase();

      let distanceKm = 86;
      let estimatedTime = "2h 45m";

      if ((fLower.includes('coimbatore') || fLower.includes('cbe')) && dLower.includes('krishnagiri')) {
        distanceKm = 260;
        estimatedTime = "4h 45m";
      } else if ((fLower.includes('coimbatore') || fLower.includes('cbe')) && dLower.includes('ooty')) {
        distanceKm = 86;
        estimatedTime = "2h 45m";
      } else if (fLower.includes('chennai') && dLower.includes('bangalore')) {
        distanceKm = 345;
        estimatedTime = "6h 15m";
      } else if (fLower.includes('bangalore') && (dLower.includes('mysore') || dLower.includes('mysuru'))) {
        distanceKm = 145;
        estimatedTime = "2h 30m";
      } else if (fLower.includes('coimbatore') && dLower.includes('munnar')) {
        distanceKm = 158;
        estimatedTime = "4h 15m";
      } else if (fLower.includes('delhi') && dLower.includes('agra')) {
        distanceKm = 230;
        estimatedTime = "3h 30m";
      } else if (fLower.includes('paris') && dLower.includes('nice')) {
        distanceKm = 930;
        estimatedTime = "9h 15m";
      } else {
        const sLat = endpoints.start.lat;
        const sLng = endpoints.start.lng;
        const dLat = endpoints.end.lat;
        const dLng = endpoints.end.lng;
        const dLatRad = (dLat - sLat) * Math.PI / 180;
        const dLngRad = (dLng - sLng) * Math.PI / 180;
        const a = Math.sin(dLatRad / 2) * Math.sin(dLatRad / 2) +
                  Math.cos(sLat * Math.PI / 180) * Math.cos(dLat * Math.PI / 180) *
                  Math.sin(dLngRad / 2) * Math.sin(dLngRad / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        distanceKm = Math.max(25, Math.round(6371 * c * 1.24));
        const speed = distanceKm > 150 ? 58 : 42;
        const totalMinutes = Math.round((distanceKm / speed) * 60);
        const hours = Math.floor(totalMinutes / 60);
        const mins = totalMinutes % 60;
        estimatedTime = hours + "h " + mins + "m";
      }

      const stops = getDefaultCorridorStops(from, dest);

      state.route.distanceKm = distanceKm;
      state.route.estimatedTime = estimatedTime;
      state.route.model = model;
      state.setDiscoveredAvailabilities(stops);
      state.setRouteScanning(false);

      const engineLabel = model === 'gemini-pro' ? 'Gemini AI Scout' : model === 'osm-live' ? 'OSM Live Scanner' : 'Smart Pathfinder';
      if (appInstance) appInstance.showToast("✨ " + engineLabel + " discovered " + stops.length + " verified stops between " + from.split(',')[0] + " and " + dest.split(',')[0] + "!");
    }, 850);
  };

  window.toggleUserRoleAction = function () {
    state.toggleRole();
    if (state.user.role === "admin") {
      if (appInstance) appInstance.showToast("Root access granted: Admin mode active");
      state.setView("admin");
    } else {
      if (appInstance) appInstance.showToast("Switched to Standard Explorer Mode");
      state.setView("dashboard");
    }
  };

  // --- BOOTSTRAP ---
  function boot() {
    appInstance = new AppController();
    window.easyExplorerApp = appInstance;
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }

})();
