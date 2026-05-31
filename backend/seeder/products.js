const products = [
  // Electronics
  {
    name: 'Wireless Bluetooth Headphones Pro',
    slug: 'wireless-bluetooth-headphones-pro',
    description: 'Experience pure audio fidelity with our premium over-ear wireless headphones. Featuring active noise cancellation and 40-hour battery life.',
    category: 'Electronics',
    subcategory: 'Audio',
    brand: 'Acoustix',
    price: 14999,
    originalPrice: 18999,
    discountPercentage: 21,
    stock: 45,
    rating: 4.8,
    numReviews: 342,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1000&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1583394838336-acd977736f90?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1484704849700-f032a568e944?q=80&w=1000&auto=format&fit=crop'
    ],
    featured: true,
    bestseller: true,
    newArrival: false,
    specifications: {
      'Battery Life': '40 Hours',
      'Connectivity': 'Bluetooth 5.2',
      'Noise Cancellation': 'Active (ANC)',
      'Weight': '250g'
    },
    tags: ['wireless', 'headphones', 'audio', 'premium']
  },
  {
    name: 'Smart Watch Pro Series 8',
    slug: 'smart-watch-pro-series-8',
    description: 'Advanced health tracking, seamless connectivity, and a stunning edge-to-edge OLED display. Your ultimate companion for a healthy lifestyle.',
    category: 'Electronics',
    subcategory: 'Wearables',
    brand: 'NovaTech',
    price: 24999,
    originalPrice: 24999,
    discountPercentage: 0,
    stock: 80,
    rating: 4.9,
    numReviews: 512,
    image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?q=80&w=1000&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?q=80&w=1000&auto=format&fit=crop'
    ],
    featured: true,
    bestseller: true,
    newArrival: true,
    specifications: {
      'Display': '1.9" OLED',
      'Water Resistance': '50m',
      'Battery': '2 Days',
      'Sensors': 'ECG, Heart Rate, SpO2'
    },
    tags: ['smartwatch', 'fitness', 'wearable', 'tech']
  },
  {
    name: 'Mechanical Gaming Keyboard',
    slug: 'mechanical-gaming-keyboard',
    description: 'Aircraft-grade aluminum frame, tactile mechanical switches, and customizable per-key RGB lighting.',
    category: 'Electronics',
    subcategory: 'Accessories',
    brand: 'KeyForge',
    price: 8999,
    originalPrice: 10999,
    discountPercentage: 18,
    stock: 120,
    rating: 4.7,
    numReviews: 215,
    image: 'https://images.unsplash.com/photo-1595225476474-87563907a212?q=80&w=1000&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?q=80&w=1000&auto=format&fit=crop'
    ],
    featured: false,
    bestseller: true,
    newArrival: false,
    specifications: {
      'Switches': 'Cherry MX Brown',
      'Lighting': 'Per-key RGB',
      'Connectivity': 'USB-C Detachable',
      'Layout': 'Tenkeyless (TKL)'
    },
    tags: ['keyboard', 'gaming', 'mechanical', 'rgb']
  },
  {
    name: 'Ultra-Light Gaming Mouse',
    slug: 'ultra-light-gaming-mouse',
    description: 'Weighing only 60g, this esports-ready gaming mouse features a 20K DPI optical sensor and PTFE feet for maximum glide.',
    category: 'Electronics',
    subcategory: 'Accessories',
    brand: 'Vortex',
    price: 5499,
    originalPrice: 6999,
    discountPercentage: 21,
    stock: 150,
    rating: 4.6,
    numReviews: 188,
    image: 'https://images.unsplash.com/photo-1527814050087-379381547996?q=80&w=1000&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1615663245857-ac9310d5b463?q=80&w=1000&auto=format&fit=crop'
    ],
    featured: false,
    bestseller: false,
    newArrival: true,
    specifications: {
      'Sensor': '20K DPI Optical',
      'Weight': '60g',
      'Buttons': '6 Programmable',
      'Connectivity': '2.4GHz Wireless'
    },
    tags: ['mouse', 'gaming', 'wireless', 'esports']
  },
  {
    name: '20000mAh Portable Power Bank',
    slug: '20000mah-portable-power-bank',
    description: 'High-capacity fast-charging power bank. Capable of charging your smartphone up to 5 times. Includes dual USB-C PD ports.',
    category: 'Electronics',
    subcategory: 'Accessories',
    brand: 'ChargeMax',
    price: 3499,
    originalPrice: 4499,
    discountPercentage: 22,
    stock: 90,
    rating: 4.5,
    numReviews: 430,
    image: 'https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?q=80&w=1000&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1615526675159-e248c3021d3f?q=80&w=1000&auto=format&fit=crop'
    ],
    featured: false,
    bestseller: false,
    newArrival: false,
    specifications: {
      'Capacity': '20,000 mAh',
      'Output': '65W USB-C PD',
      'Ports': '2x USB-C, 1x USB-A',
      'Weight': '350g'
    },
    tags: ['powerbank', 'charging', 'battery', 'travel']
  },

  // Fashion
  {
    name: 'Premium Men\'s Casual Hoodie',
    slug: 'premium-mens-casual-hoodie',
    description: 'Crafted from heavyweight French terry cotton, this oversized hoodie offers unparalleled comfort and a modern minimalist aesthetic.',
    category: 'Fashion',
    subcategory: 'Men',
    brand: 'UrbanLoom',
    price: 3999,
    originalPrice: 4999,
    discountPercentage: 20,
    stock: 65,
    rating: 4.8,
    numReviews: 120,
    image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=1000&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=1000&auto=format&fit=crop'
    ],
    featured: true,
    bestseller: false,
    newArrival: true,
    specifications: {
      'Material': '100% Organic Cotton',
      'Fit': 'Oversized',
      'Care': 'Machine wash cold'
    },
    tags: ['hoodie', 'apparel', 'men', 'casual', 'streetwear']
  },
  {
    name: 'Women\'s Performance Running Shoes',
    slug: 'womens-performance-running-shoes',
    description: 'Engineered for speed and comfort. Features a responsive foam midsole and a breathable knit upper for marathon-level performance.',
    category: 'Fashion',
    subcategory: 'Women',
    brand: 'Velocity',
    price: 8999,
    originalPrice: 10999,
    discountPercentage: 18,
    stock: 40,
    rating: 4.6,
    numReviews: 89,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1000&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1460353581641-37baddab0fa2?q=80&w=1000&auto=format&fit=crop'
    ],
    featured: false,
    bestseller: true,
    newArrival: false,
    specifications: {
      'Material': 'Flyknit',
      'Sole': 'Responsive EVA Foam',
      'Weight': '220g'
    },
    tags: ['shoes', 'running', 'women', 'fitness', 'sneakers']
  },
  {
    name: 'Classic Vintage Denim Jacket',
    slug: 'classic-vintage-denim-jacket',
    description: 'A timeless wardrobe staple. Made from rigid 14oz raw denim that fades beautifully with wear.',
    category: 'Fashion',
    subcategory: 'Unisex',
    brand: 'Heritage',
    price: 6499,
    originalPrice: 6499,
    discountPercentage: 0,
    stock: 55,
    rating: 4.7,
    numReviews: 145,
    image: 'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?q=80&w=1000&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1551028719-00167b16eac5?q=80&w=1000&auto=format&fit=crop'
    ],
    featured: false,
    bestseller: false,
    newArrival: false,
    specifications: {
      'Material': '100% Cotton Denim',
      'Weight': '14oz',
      'Fit': 'Regular Fit'
    },
    tags: ['jacket', 'denim', 'vintage', 'apparel']
  },
  {
    name: 'Minimalist White Sneakers',
    slug: 'minimalist-white-sneakers',
    description: 'Clean, classic, and versatile. Handcrafted from premium Italian leather with a durable rubber cupsole.',
    category: 'Fashion',
    subcategory: 'Unisex',
    brand: 'Aura',
    price: 7999,
    originalPrice: 9999,
    discountPercentage: 20,
    stock: 85,
    rating: 4.9,
    numReviews: 412,
    image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=1000&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?q=80&w=1000&auto=format&fit=crop'
    ],
    featured: true,
    bestseller: true,
    newArrival: false,
    specifications: {
      'Upper': 'Full-grain Italian Leather',
      'Lining': 'Calfskin Leather',
      'Sole': 'Margom Rubber Cupsole'
    },
    tags: ['sneakers', 'leather', 'shoes', 'minimalist']
  },

  // Home & Living
  {
    name: 'Smart LED Desk Lamp',
    slug: 'smart-led-desk-lamp',
    description: 'Illuminate your workspace with precision. Features adjustable color temperature, wireless charging base, and app integration.',
    category: 'Home & Living',
    subcategory: 'Lighting',
    brand: 'Lumina',
    price: 4999,
    originalPrice: 5999,
    discountPercentage: 16,
    stock: 35,
    rating: 4.5,
    numReviews: 67,
    image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?q=80&w=1000&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=1000&auto=format&fit=crop'
    ],
    featured: false,
    bestseller: false,
    newArrival: true,
    specifications: {
      'Brightness': '800 Lumens',
      'Color Temp': '2700K - 6500K',
      'Features': 'Qi Wireless Charging Pad'
    },
    tags: ['lamp', 'desk', 'office', 'lighting', 'smart']
  },
  {
    name: 'Handcrafted Ceramic Coffee Mug Set',
    slug: 'handcrafted-ceramic-coffee-mug-set',
    description: 'Set of two artisanal ceramic mugs with a matte black finish. Perfect for your morning pour-over or evening tea.',
    category: 'Home & Living',
    subcategory: 'Kitchenware',
    brand: 'Earth & Kiln',
    price: 2499,
    originalPrice: 2499,
    discountPercentage: 0,
    stock: 60,
    rating: 4.8,
    numReviews: 104,
    image: 'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?q=80&w=1000&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1497935586351-b67a49e012bf?q=80&w=1000&auto=format&fit=crop'
    ],
    featured: false,
    bestseller: true,
    newArrival: false,
    specifications: {
      'Material': 'Stoneware Ceramic',
      'Capacity': '350ml',
      'Care': 'Dishwasher & Microwave Safe'
    },
    tags: ['mug', 'coffee', 'ceramic', 'kitchen']
  },
  {
    name: 'Minimalist Matte Wall Clock',
    slug: 'minimalist-matte-wall-clock',
    description: 'Silent sweep movement and an ultra-minimalist unibody design. A perfect statement piece for modern interiors.',
    category: 'Home & Living',
    subcategory: 'Decor',
    brand: 'Chrono',
    price: 3499,
    originalPrice: 4499,
    discountPercentage: 22,
    stock: 25,
    rating: 4.6,
    numReviews: 45,
    image: 'https://images.unsplash.com/photo-1563861826100-9cb868fdbe1c?q=80&w=1000&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1506804886640-ed60eb9df001?q=80&w=1000&auto=format&fit=crop'
    ],
    featured: false,
    bestseller: false,
    newArrival: false,
    specifications: {
      'Diameter': '12 inches',
      'Movement': 'Silent Quartz',
      'Material': 'Anodized Aluminum'
    },
    tags: ['clock', 'decor', 'minimalist', 'home']
  },
  {
    name: 'Ultrasonic Smart Aroma Diffuser',
    slug: 'ultrasonic-smart-aroma-diffuser',
    description: 'Transform your space with calming aromatherapy. Features a sleek wood-grain design, ambient LED lighting, and smartphone control.',
    category: 'Home & Living',
    subcategory: 'Wellness',
    brand: 'Zenith',
    price: 3999,
    originalPrice: 4999,
    discountPercentage: 20,
    stock: 45,
    rating: 4.7,
    numReviews: 132,
    image: 'https://images.unsplash.com/photo-1602928321679-560bb453f190?q=80&w=1000&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1608511674488-8ee11c5d7946?q=80&w=1000&auto=format&fit=crop'
    ],
    featured: true,
    bestseller: false,
    newArrival: true,
    specifications: {
      'Capacity': '400ml',
      'Runtime': 'Up to 12 Hours',
      'Coverage': '400 sq. ft.'
    },
    tags: ['diffuser', 'wellness', 'home', 'aroma', 'smart']
  },

  // Books
  {
    name: 'Atomic Habits by James Clear',
    slug: 'atomic-habits-james-clear',
    description: 'An Easy & Proven Way to Build Good Habits & Break Bad Ones. A masterclass in behavioral psychology and practical self-improvement.',
    category: 'Books',
    subcategory: 'Self-Help',
    brand: 'Penguin Random House',
    price: 499,
    originalPrice: 699,
    discountPercentage: 28,
    stock: 150,
    rating: 4.9,
    numReviews: 854,
    image: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?q=80&w=1000&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=1000&auto=format&fit=crop'
    ],
    featured: false,
    bestseller: true,
    newArrival: false,
    specifications: {
      'Format': 'Hardcover',
      'Pages': '320',
      'Language': 'English'
    },
    tags: ['book', 'self-help', 'productivity', 'habits']
  },
  {
    name: 'Deep Work by Cal Newport',
    slug: 'deep-work-cal-newport',
    description: 'Rules for Focused Success in a Distracted World. Learn how to cultivate the ability to focus without distraction on a cognitively demanding task.',
    category: 'Books',
    subcategory: 'Productivity',
    brand: 'Grand Central Publishing',
    price: 549,
    originalPrice: 799,
    discountPercentage: 31,
    stock: 110,
    rating: 4.8,
    numReviews: 432,
    image: 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?q=80&w=1000&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?q=80&w=1000&auto=format&fit=crop'
    ],
    featured: false,
    bestseller: false,
    newArrival: false,
    specifications: {
      'Format': 'Paperback',
      'Pages': '304',
      'Language': 'English'
    },
    tags: ['book', 'productivity', 'focus', 'business']
  },
  {
    name: 'The Psychology of Money',
    slug: 'the-psychology-of-money',
    description: 'Timeless lessons on wealth, greed, and happiness doing well with money isn\'t necessarily about what you know. It\'s about how you behave.',
    category: 'Books',
    subcategory: 'Finance',
    brand: 'Harriman House',
    price: 399,
    originalPrice: 499,
    discountPercentage: 20,
    stock: 130,
    rating: 4.9,
    numReviews: 610,
    image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=1000&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?q=80&w=1000&auto=format&fit=crop'
    ],
    featured: false,
    bestseller: true,
    newArrival: false,
    specifications: {
      'Format': 'Paperback',
      'Pages': '256',
      'Language': 'English'
    },
    tags: ['book', 'finance', 'wealth', 'investing']
  },

  // Accessories
  {
    name: 'Premium Leather Commuter Backpack',
    slug: 'premium-leather-commuter-backpack',
    description: 'Crafted from full-grain leather, featuring a padded laptop sleeve, water-resistant zippers, and an ergonomic back panel.',
    category: 'Accessories',
    subcategory: 'Bags',
    brand: 'Nomad',
    price: 12999,
    originalPrice: 15999,
    discountPercentage: 18,
    stock: 20,
    rating: 4.8,
    numReviews: 145,
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=1000&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1491438590914-bc09fcaaf77a?q=80&w=1000&auto=format&fit=crop'
    ],
    featured: true,
    bestseller: false,
    newArrival: false,
    specifications: {
      'Material': 'Full-Grain Cowhide Leather',
      'Capacity': '20L',
      'Laptop Fit': 'Up to 16 inches'
    },
    tags: ['backpack', 'leather', 'travel', 'premium']
  },
  {
    name: 'Insulated Stainless Steel Water Bottle',
    slug: 'insulated-stainless-steel-water-bottle',
    description: 'Keep your drinks ice cold for 24 hours or piping hot for 12. Double-wall vacuum insulation with a durable matte powder coat.',
    category: 'Accessories',
    subcategory: 'Travel',
    brand: 'HydroCore',
    price: 2499,
    originalPrice: 3499,
    discountPercentage: 28,
    stock: 120,
    rating: 4.7,
    numReviews: 320,
    image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?q=80&w=1000&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1589365278144-c9e705f843ba?q=80&w=1000&auto=format&fit=crop'
    ],
    featured: false,
    bestseller: true,
    newArrival: false,
    specifications: {
      'Material': '18/8 Pro-Grade Stainless Steel',
      'Capacity': '32 oz (946ml)',
      'Insulation': 'Double-Wall Vacuum'
    },
    tags: ['bottle', 'flask', 'hydration', 'travel']
  },
  {
    name: 'Magnetic Premium Laptop Sleeve',
    slug: 'magnetic-premium-laptop-sleeve',
    description: 'Slim profile sleeve made from vegan leather with a soft microfiber lining and a secure magnetic closure system.',
    category: 'Accessories',
    subcategory: 'Tech',
    brand: 'SleekForm',
    price: 3499,
    originalPrice: 3999,
    discountPercentage: 12,
    stock: 60,
    rating: 4.6,
    numReviews: 89,
    image: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?q=80&w=1000&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1621252179027-94459d278660?q=80&w=1000&auto=format&fit=crop'
    ],
    featured: false,
    bestseller: false,
    newArrival: true,
    specifications: {
      'Material': 'Premium Vegan Leather',
      'Compatibility': 'MacBook Pro 14", XPS 13',
      'Closure': 'N52 Magnetic Array'
    },
    tags: ['sleeve', 'laptop', 'tech', 'accessories']
  },
  {
    name: 'Tech Travel Organizer Kit',
    slug: 'tech-travel-organizer-kit',
    description: 'Keep all your cables, chargers, and accessories neatly organized. Water-resistant exterior with custom elastic mesh pockets.',
    category: 'Accessories',
    subcategory: 'Travel',
    brand: 'PackRight',
    price: 2999,
    originalPrice: 3499,
    discountPercentage: 14,
    stock: 85,
    rating: 4.8,
    numReviews: 110,
    image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=1000&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1522069213448-443a614da9b6?q=80&w=1000&auto=format&fit=crop'
    ],
    featured: false,
    bestseller: false,
    newArrival: true,
    specifications: {
      'Material': '840D Ballistic Nylon',
      'Dimensions': '9" x 5.5" x 2.5"',
      'Zippers': 'YKK Weatherproof'
    },
    tags: ['organizer', 'travel', 'tech', 'bag']
  }
];

export default products;
