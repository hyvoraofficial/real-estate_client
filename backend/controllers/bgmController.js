const supabase = require("../config/supabaseClient");
const crypto = require("crypto");
const uuidv4 = () => crypto.randomUUID();

// Default initial sample properties for BGM Real Estate
const initialSampleProperties = [
  {
    id: "e4a7a8d2-9b21-4f1b-872e-8390b11a0001",
    title: "Prime 5-Floor Commercial Plaza & Corporate Complex",
    slug: "prime-5-floor-commercial-plaza-bangalore",
    category: "buildings",
    property_type: "Commercial Building",
    description: "An exceptional G+4 standalone commercial tower located on a bustling 100ft main road. Fully equipped with modern glass facade, 2 high-speed passenger lifts, 100% DG power backup, dedicated basement parking for 25+ four-wheelers, and high rental yield.",
    location: "Koramangala 100ft Road, Bangalore",
    address: "Plot No. 42, 100 Feet Road, 4th Block, Koramangala",
    city: "Bangalore",
    state: "Karnataka",
    pincode: "560034",
    price: 145000000,
    price_display: "₹14.50 Crore",
    price_type: "negotiable",
    status: "available",
    featured: true,
    plot_area: "6,400 sq.ft",
    built_up_area: "24,500 sq.ft",
    carpet_area: "20,000 sq.ft",
    road_width: "100 ft Main Road",
    facing: "North-East",
    property_age: "2 Years",
    images: [
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80"
    ],
    category_details: {
      total_floors: 5,
      total_units: 10,
      parking_spaces: 28,
      rental_income_monthly: "₹8,50,000 / month",
      expected_roi_percent: "7.1% Net Yield",
      occupancy_status: "80% Leased to Grade-A IT Tenants",
      year_built: "2023",
      lift_available: "2 Passenger Lifts (10 Pax)",
      commercial_type: "Standalone IT / Retail Tower"
    },
    amenities: ["24/7 Security", "100% Power Backup", "2 Passenger Lifts", "Basement Parking", "Fire Safety NOC Approved", "Central HVAC Ready"],
    map_lat: 12.9352,
    map_lng: 77.6245,
    seo_title: "Commercial Building for Sale in Koramangala Bangalore - BGM Real Estate",
    seo_description: "Prime G+4 commercial tower for sale in Koramangala Bangalore with active rental income and 7.1% yield."
  },
  {
    id: "e4a7a8d2-9b21-4f1b-872e-8390b11a0002",
    title: "Exclusive G+3 Boutique Residential Building (12 Units)",
    slug: "exclusive-g3-boutique-residential-building-indiranagar",
    category: "buildings",
    property_type: "Residential Building",
    description: "Well-constructed residential apartment building comprising 12 spacious units (8 units of 2BHK and 4 units of 3BHK). Superior quality vitrified tiles, borewell + Cauvery water connection, covered parking, and prime high-rental residential locality.",
    location: "Indiranagar 12th Main, Bangalore",
    address: "12th Main Road, HAL 2nd Stage, Indiranagar",
    city: "Bangalore",
    state: "Karnataka",
    pincode: "560038",
    price: 92000000,
    price_display: "₹9.20 Crore",
    price_type: "fixed",
    status: "available",
    featured: true,
    plot_area: "4,800 sq.ft",
    built_up_area: "16,200 sq.ft",
    carpet_area: "13,800 sq.ft",
    road_width: "40 ft Road",
    facing: "East",
    property_age: "1 Year",
    images: [
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80"
    ],
    category_details: {
      total_floors: 4,
      total_units: 12,
      parking_spaces: 14,
      rental_income_monthly: "₹4,80,000 / month",
      expected_roi_percent: "6.3%",
      occupancy_status: "Fully Occupied",
      year_built: "2024",
      lift_available: "6 Passenger Auto Lift"
    },
    amenities: ["Automatic Lift", "Covered Stilt Parking", "Cauvery Water", "Rainwater Harvesting", "CCTV Surveillance"],
    map_lat: 12.9719,
    map_lng: 77.6412,
    seo_title: "Residential Building for Sale in Indiranagar Bangalore - BGM Real Estate",
    seo_description: "Buy whole residential building in Indiranagar Bangalore with 12 rental units and stable cashflow."
  },
  {
    id: "e4a7a8d2-9b21-4f1b-872e-8390b11a0003",
    title: "BDA Approved 60x40 Prime Commercial Corner Plot",
    slug: "bda-approved-60x40-commercial-corner-plot-hsr",
    category: "sites",
    property_type: "Commercial / Residential Site",
    description: "Rare corner plot measuring 2,400 sq.ft (60x40) situated on a prime 80ft double road junction. Clear 'A' Khata with BDA sanction, excellent FAR eligibility up to G+4 commercial development, surrounded by upscale corporate offices and elite residences.",
    location: "HSR Layout Sector 2, Bangalore",
    address: "27th Main, Sector 2, HSR Layout",
    city: "Bangalore",
    state: "Karnataka",
    pincode: "560102",
    price: 48000000,
    price_display: "₹4.80 Crore",
    price_type: "negotiable",
    status: "available",
    featured: true,
    plot_area: "2,400 sq.ft (60x40)",
    road_width: "80 ft Double Road",
    facing: "North-East Corner",
    images: [
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1524813686514-a57563d77d66?auto=format&fit=crop&w=1200&q=80"
    ],
    category_details: {
      plot_dimensions: "60 ft x 40 ft",
      corner_plot: "Yes (Dual Road Access)",
      khata_type: "BDA Clear 'A' Khata",
      approval_authority: "BDA / BBMP",
      gated_community: "No - Prime Main Road Commercial"
    },
    amenities: ["80ft Main Road", "Underground Electricity", "BWSSB Water & Sanitary Lines", "Immediate Registration"],
    map_lat: 12.9121,
    map_lng: 77.6446,
    seo_title: "60x40 Corner Site for Sale in HSR Layout Bangalore - BGM Real Estate",
    seo_description: "BDA approved commercial corner plot 60x40 in HSR Layout Sector 2 Bangalore."
  },
  {
    id: "e4a7a8d2-9b21-4f1b-872e-8390b11a0004",
    title: "8.5 Acres Highway Frontage Commercial & Industrial Land",
    slug: "8-5-acres-highway-frontage-development-land-hubballi",
    category: "land",
    property_type: "Commercial / Industrial Land",
    description: "Sprawling 8.5 Acres development land with 350+ feet direct frontage on the National Highway. Converted for commercial/industrial use with clear single-owner title, high-tension power sanction, borewells, and ideal for logistics hub, manufacturing plant, or grand resort.",
    location: "National Highway 48 Frontage, Hubballi Bypass",
    address: "NH 48 Pune-Bangalore Corridor, Hubballi Outer",
    city: "Hubballi",
    state: "Karnataka",
    pincode: "580024",
    price: 180000000,
    price_display: "₹18.00 Crore",
    price_type: "negotiable",
    status: "available",
    featured: true,
    plot_area: "8.5 Acres (3,70,260 sq.ft)",
    road_width: "6-Lane National Highway",
    facing: "North Frontage",
    images: [
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&w=1200&q=80"
    ],
    category_details: {
      total_land_area: "8.5 Acres (340 Guntas)",
      land_type: "Commercial / Industrial Converted",
      road_access: "350 ft National Highway Frontage",
      zoning_status: "Industrial / Commercial Zone",
      water_source: "3 Heavy Yield Borewells",
      electricity_sanction: "150 KVA Industrial Power Sanction",
      conversion_status: "DC Converted with NOC"
    },
    amenities: ["Direct Highway Access", "Heavy Vehicle Turning Radius", "Fully Fenced Boundary", "Clear Legal Title"],
    map_lat: 15.3647,
    map_lng: 75.1240,
    seo_title: "8.5 Acres Highway Land for Sale in Karnataka - BGM Real Estate",
    seo_description: "Prime 8.5 Acres NH 48 highway development land for sale with clear titles and direct road frontage."
  },
  {
    id: "e4a7a8d2-9b21-4f1b-872e-8390b11a0005",
    title: "High-Street Ground Floor Commercial Showroom",
    slug: "high-street-ground-floor-commercial-showroom-mg-road",
    category: "commercial",
    property_type: "Commercial Showroom",
    description: "Prime retail showroom space with wide 45-foot glass frontage on prime shopping boulevard. High footfall commercial catchment area, ideal for jewelry showroom, national retail brand, bank branch, or flagship corporate store.",
    location: "MG Road Commercial Corridor, Hubballi",
    address: "MG Road Center, Hubballi",
    city: "Hubballi",
    state: "Karnataka",
    pincode: "580020",
    price: 36000000,
    price_display: "₹3.60 Crore",
    price_type: "fixed",
    status: "available",
    featured: false,
    plot_area: "3,500 sq.ft",
    built_up_area: "3,200 sq.ft",
    carpet_area: "2,850 sq.ft",
    road_width: "60 ft Main Road",
    facing: "East",
    property_age: "New Construction",
    images: [
      "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80"
    ],
    category_details: {
      commercial_type: "Retail Showroom / Bank Space",
      parking_spaces: 8,
      frontage_width: "45 Feet Double Height Glass",
      rental_income_monthly: "₹2,25,000 / month",
      expected_roi_percent: "7.5%"
    },
    amenities: ["Glass Frontage", "3-Phase Power", "Dedicated Customer Parking", "Central Air Conditioning Ready"],
    map_lat: 15.3524,
    map_lng: 75.1387,
    seo_title: "Commercial Showroom for Sale on MG Road - BGM Real Estate",
    seo_description: "High street commercial retail showroom space for sale on MG Road."
  }
];

let memoryProperties = [...initialSampleProperties];
let memoryEnquiries = [
  {
    id: "enq-001",
    name: "Dr. Rajeshwar Sharma",
    phone: "+91 98450 11223",
    email: "dr.rajeshwar@gmail.com",
    property_id: "e4a7a8d2-9b21-4f1b-872e-8390b11a0001",
    property_title: "Prime 5-Floor Commercial Plaza & Corporate Complex",
    message: "Interested in evaluating the commercial building in Koramangala for institutional investment. Please share the lease schedule and rent agreements.",
    status: "new",
    created_at: new Date(Date.now() - 3600000 * 4).toISOString()
  },
  {
    id: "enq-002",
    name: "Vikram Mehta",
    phone: "+91 97411 88990",
    email: "vikram.mehta@infra-invest.in",
    property_id: "e4a7a8d2-9b21-4f1b-872e-8390b11a0004",
    property_title: "8.5 Acres Highway Frontage Commercial & Industrial Land",
    message: "Looking for logistics hub site on NH 48 corridor. Requesting site visit this weekend.",
    status: "contacted",
    created_at: new Date(Date.now() - 3600000 * 24).toISOString()
  }
];

let memorySettings = {
  company_name: "BGM Real Estate",
  contact_person: "Balaji",
  logo_url: "/logo.png",
  phone: "+91 98450 10604",
  secondary_phone: "+91 88921 40055",
  whatsapp: "+91 98450 10604",
  email: "bgmrealestates@gmail.com",
  address: "BGM REAL ESTATE, Office, Opp. to NR Colony Bus Stand, Above Dose Master, NR Colony, Basavanagudi, Bengaluru, Karnataka 560019",
  google_maps_url: "https://maps.google.com/?q=NR+Colony+Bus+Stand+Bengaluru",
  business_hours: "Mon - Sat: 9:00 AM - 8:00 PM (Sunday by Appointment)",
  hero_headline: "Exceptional Real Estate. Extraordinary Opportunities.",
  hero_subheading: "Discover premium entire buildings, commercial properties, prime sites, and development land curated by BGM Real Estate.",
  hero_image_url: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1920&q=80",
  about_content: "BGM Real Estate is a premier corporate real estate consultancy and investment advisory firm led by Balaji. We specialize in the acquisition, disposition, and strategic marketing of entire commercial and residential buildings, prime layout plots, industrial acreage, and high-yield real estate assets across Karnataka.",
  mission: "To deliver uncompromising transparency, rigorous legal title verification, and maximum financial return for real estate buyers, corporate investors, and property developers.",
  vision: "To be Karnataka's most trusted and preferred corporate real estate advisory and high-value asset brokerage partner."
};

// Helper to generate clean slugs
const generateSlug = (title) => {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .trim()
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
};

/* =======================================================
   PUBLIC ENDPOINTS
======================================================= */

// 1. Get All Properties with Filters, Search, Sorting
exports.getProperties = async (req, res) => {
  try {
    const { category, property_type, min_price, max_price, status, search, sort, featured } = req.query;

    // Try Supabase first
    try {
      let query = supabase.from("properties").select("*");

      if (category && category !== "all") query = query.eq("category", category);
      if (property_type && property_type !== "all") query = query.ilike("property_type", `%${property_type}%`);
      if (status && status !== "all") query = query.eq("status", status);
      if (featured === "true") query = query.eq("featured", true);
      if (min_price) query = query.gte("price", Number(min_price));
      if (max_price) query = query.lte("price", Number(max_price));
      if (search) {
        query = query.or(`title.ilike.%${search}%,location.ilike.%${search}%,description.ilike.%${search}%`);
      }

      if (sort === "price_asc") query = query.order("price", { ascending: true });
      else if (sort === "price_desc") query = query.order("price", { ascending: false });
      else query = query.order("created_at", { ascending: false });

      const { data, error } = await query;
      if (!error && data && data.length > 0) {
        return res.json(data);
      }
    } catch (e) {
      console.warn("Supabase query fallback to memory store:", e.message);
    }

    // Memory fallback
    let results = [...memoryProperties];

    if (category && category !== "all") {
      results = results.filter((p) => p.category === category);
    }
    if (status && status !== "all") {
      results = results.filter((p) => p.status === status);
    }
    if (featured === "true") {
      results = results.filter((p) => p.featured === true);
    }
    if (min_price) {
      results = results.filter((p) => p.price >= Number(min_price));
    }
    if (max_price) {
      results = results.filter((p) => p.price <= Number(max_price));
    }
    if (search) {
      const q = search.toLowerCase();
      results = results.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.location?.toLowerCase().includes(q) ||
          p.property_type?.toLowerCase().includes(q) ||
          p.description?.toLowerCase().includes(q)
      );
    }

    if (sort === "price_asc") {
      results.sort((a, b) => a.price - b.price);
    } else if (sort === "price_desc") {
      results.sort((a, b) => b.price - a.price);
    }

    return res.json(results);
  } catch (error) {
    console.error("Get properties error:", error);
    res.status(500).json({ error: error.message });
  }
};

// 2. Get Single Property by Slug or ID
exports.getPropertyBySlugOrId = async (req, res) => {
  try {
    const { identifier } = req.params;

    try {
      // Check slug or ID in Supabase
      const isUUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(identifier);
      let query = supabase.from("properties").select("*");
      if (isUUID) {
        query = query.or(`id.eq.${identifier},slug.eq.${identifier}`);
      } else {
        query = query.eq("slug", identifier);
      }

      const { data, error } = await query.single();
      if (!error && data) {
        return res.json(data);
      }
    } catch (e) {}

    // Memory fallback
    const prop = memoryProperties.find(
      (p) => p.slug === identifier || p.id === identifier
    );

    if (!prop) {
      return res.status(404).json({ message: "Property asset not found" });
    }

    return res.json(prop);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 3. Submit Customer Enquiry (Lead)
exports.createEnquiry = async (req, res) => {
  try {
    const { name, phone, email, property_id, property_title, message } = req.body;

    if (!name || !phone) {
      return res.status(400).json({ message: "Name and Phone Number are required" });
    }

    const newEnquiry = {
      id: uuidv4(),
      name,
      phone,
      email: email || "",
      property_id: property_id || null,
      property_title: property_title || "General Enquiry",
      message: message || "Interested in learning more about this property.",
      status: "new",
      created_at: new Date().toISOString()
    };

    try {
      await supabase.from("enquiries").insert([newEnquiry]);
    } catch (e) {
      console.warn("Saved lead to memory fallback");
    }

    memoryEnquiries.unshift(newEnquiry);

    return res.status(201).json({
      message: "Thank you! Your enquiry has been received. A BGM property specialist will contact you shortly.",
      enquiry: newEnquiry
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 4. Get Website Settings (CMS)
exports.getSettings = async (req, res) => {
  try {
    try {
      const { data } = await supabase.from("website_settings").select("*").eq("id", "global_settings").single();
      if (data) {
        return res.json({ ...memorySettings, ...data });
      }
    } catch (e) {}

    return res.json(memorySettings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/* =======================================================
   ADMIN ENDPOINTS (CMS & CRM)
======================================================= */

// 5. Admin Dashboard Statistics
exports.getAdminDashboard = async (req, res) => {
  try {
    const total = memoryProperties.length;
    const available = memoryProperties.filter((p) => p.status === "available").length;
    const sold = memoryProperties.filter((p) => p.status === "sold").length;
    const buildings = memoryProperties.filter((p) => p.category === "buildings").length;
    const sites = memoryProperties.filter((p) => p.category === "sites").length;
    const land = memoryProperties.filter((p) => p.category === "land").length;
    const commercial = memoryProperties.filter((p) => p.category === "commercial").length;
    const totalEnquiries = memoryEnquiries.length;
    const newEnquiries = memoryEnquiries.filter((e) => e.status === "new").length;

    res.json({
      totalProperties: total,
      availableProperties: available,
      soldProperties: sold,
      buildingsCount: buildings,
      sitesCount: sites,
      landCount: land,
      commercialCount: commercial,
      totalEnquiries,
      newEnquiries,
      recentEnquiries: memoryEnquiries.slice(0, 6)
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 6. Admin Create Property
exports.createProperty = async (req, res) => {
  try {
    const data = req.body;
    if (!data.title || !data.category || !data.price) {
      return res.status(400).json({ message: "Title, category, and price are required" });
    }

    const slug = data.slug || generateSlug(data.title) + "-" + Math.floor(Math.random() * 1000);

    const newProperty = {
      id: uuidv4(),
      ...data,
      slug,
      price: Number(data.price),
      price_display: data.price_display || `₹${(Number(data.price) / 10000000).toFixed(2)} Crore`,
      featured: Boolean(data.featured),
      status: data.status || "available",
      images: Array.isArray(data.images) && data.images.length > 0 ? data.images : [
        "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80"
      ],
      category_details: data.category_details || {},
      amenities: data.amenities || [],
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    try {
      await supabase.from("properties").insert([newProperty]);
    } catch (e) {
      console.warn("Inserted into memory fallback:", e.message);
    }

    memoryProperties.unshift(newProperty);

    res.status(201).json({ message: "Property created successfully", property: newProperty });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 7. Admin Update Property
exports.updateProperty = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;

    const index = memoryProperties.findIndex((p) => p.id === id);
    if (index === -1) {
      return res.status(404).json({ message: "Property not found" });
    }

    const updated = {
      ...memoryProperties[index],
      ...data,
      price: data.price !== undefined ? Number(data.price) : memoryProperties[index].price,
      updated_at: new Date().toISOString()
    };

    if (data.title && !data.slug) {
      updated.slug = generateSlug(data.title);
    }

    memoryProperties[index] = updated;

    try {
      await supabase.from("properties").update(updated).eq("id", id);
    } catch (e) {}

    res.json({ message: "Property updated successfully", property: updated });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 8. Admin Delete Property
exports.deleteProperty = async (req, res) => {
  try {
    const { id } = req.params;
    memoryProperties = memoryProperties.filter((p) => p.id !== id);

    try {
      await supabase.from("properties").delete().eq("id", id);
    } catch (e) {}

    res.json({ message: "Property deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 9. Admin Get Enquiries
exports.getEnquiries = async (req, res) => {
  try {
    const { status, search } = req.query;
    let list = [...memoryEnquiries];

    if (status && status !== "all") {
      list = list.filter((e) => e.status === status);
    }

    if (search) {
      const q = search.toLowerCase();
      list = list.filter(
        (e) =>
          e.name.toLowerCase().includes(q) ||
          e.phone.includes(q) ||
          e.property_title?.toLowerCase().includes(q)
      );
    }

    res.json(list);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 10. Admin Update Enquiry Status
exports.updateEnquiryStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const enq = memoryEnquiries.find((e) => e.id === id);
    if (!enq) {
      return res.status(404).json({ message: "Enquiry not found" });
    }

    enq.status = status;
    enq.updated_at = new Date().toISOString();

    try {
      await supabase.from("enquiries").update({ status, updated_at: enq.updated_at }).eq("id", id);
    } catch (e) {}

    res.json({ message: "Lead status updated", enquiry: enq });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 11. Admin Update Website Settings (CMS)
exports.updateSettings = async (req, res) => {
  try {
    const data = req.body;
    memorySettings = {
      ...memorySettings,
      ...data,
      updated_at: new Date().toISOString()
    };

    try {
      await supabase
        .from("website_settings")
        .upsert({ id: "global_settings", ...memorySettings });
    } catch (e) {}

    res.json({ message: "Website CMS settings updated successfully", settings: memorySettings });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
