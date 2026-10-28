import company from './company.json';

export const brand = {
  name: 'Organic Origin',
  shortName: 'O2',
  tagline: 'Pure by Origin. Organic by Nature.',
  sub: 'Evergreen Highlands',
};

export const nav = [
  { label: 'About', href: '#about' },
  { label: 'Product Catalog', href: '#products' },
  { label: 'Process', href: '#process' },
  { label: 'Contact', href: '#contact' },
];

export const hero = {
  eyebrow: "From Nature's Lap",
  title: "to Your Family's Table",
  body: 'Pure mountain produce, grown without chemicals, by the farmers of Kalimpong, Samsing, Jorethang and Manipur, and delivered fresh and honest to your door.',
  signpost: ['Healthy Food', 'Happier People', 'Greener Planet'],
  ctaPrimary: { label: 'Explore Catalog', href: '#products' },
  ctaSecondary: { label: 'Our Story', href: '#about' },
};

export const about = {
  heading: 'Company Profile',
  items: [
    {
      icon: 'Leaf',
      title: 'About Us',
      body: 'Organic Origin – O2 is an organic farming company rooted in the Himalayan foothills of Kalimpong and Manipur, with produce grown by local farmers across Kalimpong, Samsing, Jorethang and Manipur. We grow food the way nature intended: chemical-free, nutritious and full of mountain freshness. Every harvest supports the farmers who tend the land and helps protect the fragile Himalayan ecosystem.',
    },
    { icon: 'Eye', ...company.vision },
    { icon: 'Target', ...company.mission },
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
  address: 'Kalimpong (WB), Manipur, India',
  phone: '+91 8293429313',
  phoneHref: '+918293429313',
  email: 'organicorigino2@gmail.com',
  social: {
    handle: '@organicorigin_o2',
    instagram: 'https://www.instagram.com/organicorigin_o2',
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
