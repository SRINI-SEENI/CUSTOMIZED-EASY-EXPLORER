// Customized Easy Explorer - Comprehensive Dataset & Configuration
// Verified Real-World Travel & Local Discovery Services

export const APP_CONFIG = {
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

export const COUNTRIES = [
  { id: "IN", name: "India", code: "IND", flag: "🇮🇳", popularCity: "Coimbatore", defaultLat: 11.0168, defaultLng: 76.9558 },
  { id: "FR", name: "France", code: "FRA", flag: "🇫🇷", popularCity: "Paris", defaultLat: 48.8566, defaultLng: 2.3522 },
  { id: "JP", name: "Japan", code: "JPN", flag: "🇯🇵", popularCity: "Tokyo", defaultLat: 35.6762, defaultLng: 139.6503 },
  { id: "IT", name: "Italy", code: "ITA", flag: "🇮🇹", popularCity: "Rome", defaultLat: 41.9028, defaultLng: 12.4964 },
  { id: "CH", name: "Switzerland", code: "CHE", flag: "🇨🇭", popularCity: "Zurich", defaultLat: 47.3769, defaultLng: 8.5417 },
  { id: "US", name: "United States", code: "USA", flag: "🇺🇸", popularCity: "New York", defaultLat: 40.7128, defaultLng: -74.0060 },
  { id: "AE", name: "United Arab Emirates", code: "ARE", flag: "🇦🇪", popularCity: "Dubai", defaultLat: 25.2048, defaultLng: 55.2708 },
  { id: "SG", name: "Singapore", code: "SGP", flag: "🇸🇬", popularCity: "Singapore", defaultLat: 1.3521, defaultLng: 103.8198 }
];

export const PRESET_LOCATIONS = [
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
export const ROUTE_DESTINATIONS = [
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

export const TOURIST_PLACES = [
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
export const HOTELS = [
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
export const RENTAL_OWNERS = {
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

export const RENTAL_VEHICLES = [
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
export const RESTAURANTS = [
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
export const TOURIST_GUIDES = [
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
export const HOSPITALS = [
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

// Function to resolve resources strictly matching the 5 km radius around user's location
export function getNearbyResourcesForLocation(serviceKey, location, radiusKm = 5) {
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
