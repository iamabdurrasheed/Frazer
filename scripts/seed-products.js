// Seed script for Frazer Building Material Trading products
const { MongoClient } = require('mongodb');

const products = [
  // HVAC Products
  {
    title: "ABB Variable Frequency Drive ACS580",
    description: "High-performance variable frequency drive for HVAC applications. Energy-efficient motor control with advanced features.",
    price: 1250.00,
    category: "hvac",
    brand: "ABB",
    image: "/images/products/abb-vfd.jpg",
    stock: 15,
    featured: true,
    specifications: {
      "Power Rating": "5.5 kW",
      "Voltage": "380-480V",
      "Frequency": "50/60 Hz",
      "Protection": "IP20"
    }
  },
  {
    title: "HVAC Control Panel",
    description: "Complete HVAC control panel with digital display and programmable controls for commercial applications.",
    price: 850.00,
    category: "hvac",
    brand: "Frazer",
    image: "/images/products/hvac-control.jpg",
    stock: 8,
    featured: true
  },
  {
    title: "Industrial Air Handler Unit",
    description: "High-capacity air handling unit for industrial HVAC systems with energy recovery ventilator.",
    price: 3200.00,
    category: "hvac",
    brand: "Carrier",
    image: "/images/products/air-handler.jpg",
    stock: 5
  },

  // Valves
  {
    title: "FGV Ball Valve DN50",
    description: "High-quality brass ball valve with full port design. Suitable for water, oil, and gas applications.",
    price: 125.00,
    category: "valves",
    brand: "FGV",
    image: "/images/products/fgv-ball-valve.jpg",
    stock: 25,
    featured: true,
    specifications: {
      "Size": "DN50 (2 inch)",
      "Material": "Brass",
      "Pressure": "PN16",
      "Temperature": "-20°C to +120°C"
    }
  },
  {
    title: "Kitz Gate Valve Stainless Steel",
    description: "Premium stainless steel gate valve for industrial applications. Corrosion resistant and durable.",
    price: 380.00,
    category: "valves",
    brand: "Kitz",
    image: "/images/products/kitz-gate-valve.jpg",
    stock: 12,
    featured: true
  },
  {
    title: "FGV Check Valve",
    description: "Spring-loaded check valve to prevent backflow in piping systems.",
    price: 75.00,
    category: "valves",
    brand: "FGV",
    image: "/images/products/fgv-check-valve.jpg",
    stock: 30
  },

  // Electrical
  {
    title: "ABB Contactor A145-30",
    description: "3-pole contactor for motor control applications. Reliable switching for industrial motors.",
    price: 95.00,
    category: "electrical",
    brand: "ABB",
    image: "/images/products/abb-contactor.jpg",
    stock: 40,
    featured: true
  },
  {
    title: "WALTHER-WERKE Industrial Socket",
    description: "Heavy-duty industrial power socket with IP67 protection rating.",
    price: 180.00,
    category: "electrical",
    brand: "WALTHER-WERKE",
    image: "/images/products/walther-socket.jpg",
    stock: 20
  },
  {
    title: "nVent HOFFMAN Enclosure",
    description: "NEMA 4X stainless steel electrical enclosure for harsh environments.",
    price: 650.00,
    category: "electrical",
    brand: "nVent Hoffman",
    image: "/images/products/hoffman-enclosure.jpg",
    stock: 8,
    featured: true
  },

  // Plumbing & Fittings
  {
    title: "Cepex PVC Ball Valve",
    description: "Industrial grade PVC ball valve for chemical and water applications.",
    price: 45.00,
    category: "plumbing",
    brand: "Cepex",
    image: "/images/products/cepex-valve.jpg",
    stock: 50
  },
  {
    title: "Stainless Steel Pipe Fitting Set",
    description: "Complete set of 316L stainless steel pipe fittings including elbows, tees, and reducers.",
    price: 220.00,
    category: "plumbing",
    brand: "Frazer",
    image: "/images/products/ss-fittings.jpg",
    stock: 15,
    featured: true
  },
  {
    title: "Industrial Flange Set",
    description: "ANSI B16.5 carbon steel flanges for industrial piping systems.",
    price: 85.00,
    category: "plumbing",
    brand: "Frazer",
    image: "/images/products/flanges.jpg",
    stock: 35
  },

  // Adhesives & Lubricants
  {
    title: "Industrial Epoxy Adhesive",
    description: "Two-component epoxy adhesive for structural bonding of metals, ceramics, and composites.",
    price: 65.00,
    category: "adhesives",
    brand: "3M",
    image: "/images/products/epoxy-adhesive.jpg",
    stock: 25
  },
  {
    title: "High-Temperature Lubricant",
    description: "Synthetic lubricant for high-temperature industrial applications up to 250°C.",
    price: 120.00,
    category: "adhesives",
    brand: "Shell",
    image: "/images/products/ht-lubricant.jpg",
    stock: 18
  },

  // Pump Spare Parts
  {
    title: "Centrifugal Pump Impeller",
    description: "Cast iron impeller for centrifugal pumps. Balanced for smooth operation.",
    price: 280.00,
    category: "pumps",
    brand: "Grundfos",
    image: "/images/products/pump-impeller.jpg",
    stock: 12
  },
  {
    title: "Pump Mechanical Seal Kit",
    description: "Complete mechanical seal kit for industrial pumps with silicon carbide faces.",
    price: 150.00,
    category: "pumps",
    brand: "Frazer",
    image: "/images/products/pump-seal.jpg",
    stock: 20,
    featured: true
  },

  // Welding Accessories
  {
    title: "Professional MIG Welding Torch",
    description: "Air-cooled MIG welding torch for industrial applications. 350A capacity.",
    price: 320.00,
    category: "welding",
    brand: "Lincoln",
    image: "/images/products/mig-torch.jpg",
    stock: 8
  },
  {
    title: "Welding Electrode Set",
    description: "E7018 low-hydrogen welding electrodes for structural steel welding.",
    price: 45.00,
    category: "welding",
    brand: "ESAB",
    image: "/images/products/electrodes.jpg",
    stock: 60
  },

  // Raktherm (Thermal Management)
  {
    title: "Raktherm Heat Exchanger",
    description: "Plate heat exchanger for efficient thermal transfer in industrial processes.",
    price: 1800.00,
    category: "thermal",
    brand: "Raktherm",
    image: "/images/products/heat-exchanger.jpg",
    stock: 6,
    featured: true
  },
  {
    title: "Thermal Insulation Material",
    description: "High-performance thermal insulation for pipes and equipment.",
    price: 25.00,
    category: "thermal",
    brand: "Raktherm",
    image: "/images/products/insulation.jpg",
    stock: 100
  }
];

async function seedProducts() {
  const client = new MongoClient(process.env.MONGODB_URI || 'mongodb://localhost:27017/ecommerce');
  
  try {
    await client.connect();
    const db = client.db();
    const collection = db.collection('products');
    
    // Clear existing products
    await collection.deleteMany({});
    
    // Insert new products
    const result = await collection.insertMany(products);
    console.log(`Inserted ${result.insertedCount} products`);
    
    // Create indexes
    await collection.createIndex({ title: 'text', description: 'text' });
    await collection.createIndex({ category: 1 });
    await collection.createIndex({ brand: 1 });
    await collection.createIndex({ featured: 1 });
    
    console.log('Database seeded successfully with Frazer BMT products!');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    await client.close();
  }
}

if (require.main === module) {
  seedProducts();
}

module.exports = { seedProducts, products };
