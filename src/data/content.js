export const brand = {
  name: 'Organic Origin',
  shortName: 'O2',
  tagline: 'Pure by Origin. Organic by Nature.',
  sub: 'Kalimpong Mountain Farming',
};

export const nav = [
  { label: 'About', href: '#about' },
  { label: 'Products', href: '#products' },
  { label: 'Process', href: '#process' },
  { label: 'Contact', href: '#contact' },
];

export const hero = {
  eyebrow: "From Kalimpong's Mountains",
  title: "to Your Family's Table",
  body: 'Naturally grown, chemical-free produce cultivated by local farmers in the pristine mountains of Kalimpong, West Bengal — harvested with care and delivered with honesty.',
  signpost: ['Healthy Food', 'Happier People', 'Greener Planet'],
  ctaPrimary: { label: 'Explore Products', href: '#products' },
  ctaSecondary: { label: 'Our Story', href: '#about' },
};

export const about = {
  heading: 'Company Profile',
  items: [
    {
      icon: 'Leaf',
      title: 'About Us',
      body: 'Organic Origin – O2 is an organic farming company based in the pristine mountains of Kalimpong, West Bengal. We are dedicated to cultivating naturally grown, chemical-free and nutritious food while supporting local farmers and protecting the fragile Himalayan ecosystem.',
    },
    {
      icon: 'Eye',
      title: 'Our Vision',
      body: 'To be a leading organic farming brand that brings the pure goodness of the mountains to people’s lives, creating a healthier and more sustainable future.',
    },
    {
      icon: 'Target',
      title: 'Our Mission',
      list: [
        'Cultivate natural and chemical-free produce',
        'Empower local farmers and communities',
        'Promote sustainable mountain agriculture',
        'Deliver high-quality, safe and nutritious food',
        'Protect the environment for future generations',
      ],
    },
  ],
  quote: 'Good Food Grows a Better Tomorrow',
};

export const values = [
  { icon: 'Leaf', label: 'Purity' },
  { icon: 'Recycle', label: 'Sustainability' },
  { icon: 'Award', label: 'Quality' },
  { icon: 'HandHeart', label: 'Farmer First' },
  { icon: 'Users', label: 'Community' },
  { icon: 'Globe2', label: 'Care for Nature' },
];

export const story = {
  lines: ['Healthy Soil', 'Healthy Food', 'Healthy Generations'],
  quote: 'Nurturing Nature, Empowering Farmers',
};

export const products = {
  heading: 'Our Products',
  sub: 'Naturally Grown in Kalimpong',
  items: [
    { icon: 'Sprout', name: 'Ginger', image: 'ginger' },
    { icon: 'Leaf', name: 'Large Cardamom', image: 'cardamom' },
    { icon: 'Flame', name: 'Dalle Khursani', image: 'khursani' },
    { icon: 'Sun', name: 'Turmeric', image: 'tumeric' },
    { icon: 'Carrot', name: 'Fresh Vegetables', image: 'vegetables' },
    { icon: 'Citrus', name: 'Oranges & Citrus', image: 'orange' },
    { icon: 'Wheat', name: 'Millets & Pulses', image: 'millet' },
    { icon: 'Coffee', name: 'Organic Coffee', image: 'cofee' },
    { icon: 'Flower2', name: 'Himalayan Herbs', image: 'himalayan_herb' },
    { icon: 'Droplet', name: 'Natural Honey', image: 'honey' },
    { icon: 'Mushroom', name: 'Mushrooms', image: 'mushrooms' },
    { icon: 'Package', name: 'Spices & Value Added Products', image: 'spices' },
  ],
};

export const process = {
  heading: 'Our Farming Process',
  sub: 'Pure. Sustainable. Transparent.',
  steps: [
    { icon: 'Sprout', label: 'Healthy Soil' },
    { icon: 'Leaf', label: 'Natural Cultivation' },
    { icon: 'Hand', label: 'Careful Harvesting' },
    { icon: 'Settings2', label: 'Processing & Quality Check' },
    { icon: 'Package', label: 'Eco-friendly Packaging' },
    { icon: 'Truck', label: 'From Farm to You' },
  ],
};

export const cta = {
  quote: 'Mountains Give Life, We Keep It Natural',
};

export const contact = {
  companyLine: 'Organic Origin – O2',
  address: 'Kalimpong, West Bengal, India',
  phone: '+91 8293429313',
  phoneHref: '+918293429313',
  email: 'organicorigino2@gmail.com',
  social: {
    handle: '@organico2',
    instagram: 'https://instagram.com/organico2',
    facebook: 'https://facebook.com/organico2',
    whatsapp: 'https://wa.me/918293429313',
  },
  closing: 'Eat Organic. Live Better.',
};

export const chatbot = {
  title: 'O2 Assistant',
  greeting: 'Hello! Welcome to Organic Origin. How may we help you today?',
  reply: (c) =>
    `Thank you for your message. Kindly drop us an email at ${c.email} or call us on ${c.phone}, and our team will get back to you shortly.`,
};
