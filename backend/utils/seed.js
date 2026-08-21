require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('../config/db');

const Admin = require('../models/Admin');
const Service = require('../models/Service');
const Project = require('../models/Project');
const Product = require('../models/Product');
const Testimonial = require('../models/Testimonial');
const SiteSettings = require('../models/SiteSettings');
const Statistics = require('../models/Statistics');

const services = [
  {
    title: 'Interlock Driveways',
    slug: 'interlock-driveways',
    description: 'New installations, extensions and replacements.',
    icon: 'driveway',
    order: 1,
    image: { url: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=1200&auto=format&fit=crop', publicId: 'seed/services/driveway' },
  },
  {
    title: 'Patios',
    slug: 'patios',
    description: 'Custom backyard patios and outdoor living spaces.',
    icon: 'patio',
    order: 2,
    image: { url: 'https://images.unsplash.com/photo-1600566752355-35792bedcfea?q=80&w=1200&auto=format&fit=crop', publicId: 'seed/services/patio' },
  },
  {
    title: 'Walkways & Pathways',
    slug: 'walkways-pathways',
    description: 'Front entrances, side walkways and garden paths.',
    icon: 'pathway',
    order: 3,
    image: { url: 'https://images.unsplash.com/photo-1600607688969-a5bfcd646154?q=80&w=1200&auto=format&fit=crop', publicId: 'seed/services/pathway' },
  },
  {
    title: 'Steps & Porch Capping',
    slug: 'steps-porch-capping',
    description: 'Modern stone steps, landings and porch finishes.',
    icon: 'steps',
    order: 4,
    image: { url: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?q=80&w=1200&auto=format&fit=crop', publicId: 'seed/services/steps' },
  },
  {
    title: 'Retaining Walls',
    slug: 'retaining-walls',
    description: 'Decorative and functional retaining walls.',
    icon: 'wall',
    order: 5,
    image: { url: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=1200&auto=format&fit=crop', publicId: 'seed/services/wall' },
  },
  {
    title: 'Excavation & Base Preparation',
    slug: 'excavation-base-preparation',
    description: 'Proper excavation, grading and compaction.',
    icon: 'excavation',
    order: 6,
    image: { url: 'https://images.unsplash.com/photo-1600607687644-c7171b42498b?q=80&w=1200&auto=format&fit=crop', publicId: 'seed/services/excavation' },
  },
  {
    title: 'River Rock & Decorative Stone',
    slug: 'river-rock-decorative-stone',
    description: 'Low-maintenance decorative landscape installations.',
    icon: 'stone',
    order: 7,
    image: { url: 'https://images.unsplash.com/photo-1600585152220-90363fe7e115?q=80&w=1200&auto=format&fit=crop', publicId: 'seed/services/stone' },
  },
  {
    title: 'Landscape Design',
    slug: 'landscape-design',
    description: 'Complete outdoor transformations designed around the property.',
    icon: 'design',
    order: 8,
    image: { url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop', publicId: 'seed/services/design' },
  },
];

const projects = [
  {
    title: 'Interlock Driveway',
    location: 'Ottawa, Ontario',
    category: 'Driveways',
    description: 'A full driveway replacement with premium interlock pavers and clean border edging.',
    featured: true,
    coverImage: { url: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=1200&auto=format&fit=crop', publicId: 'seed/projects/driveway' },
  },
  {
    title: 'Backyard Patio',
    location: 'Barrhaven, Ontario',
    category: 'Patios',
    description: 'Custom backyard patio designed for outdoor entertaining.',
    featured: true,
    coverImage: { url: 'https://images.unsplash.com/photo-1600566752355-35792bedcfea?q=80&w=1200&auto=format&fit=crop', publicId: 'seed/projects/patio' },
  },
  {
    title: 'Front Walkway',
    location: 'Kanata, Ontario',
    category: 'Walkways',
    description: 'A front entrance walkway connecting the driveway to the porch.',
    featured: false,
    coverImage: { url: 'https://images.unsplash.com/photo-1558904541-efd8e654729d?q=80&w=1200&auto=format&fit=crop', publicId: 'seed/projects/walkway' },
  },
  {
    title: 'Stone Entrance Steps',
    location: 'Nepean, Ontario',
    category: 'Steps',
    description: 'Modern stone steps and landing replacing worn concrete stairs.',
    featured: false,
    coverImage: { url: 'https://images.unsplash.com/photo-1600607688969-a5bfcd646154?q=80&w=1200&auto=format&fit=crop', publicId: 'seed/projects/steps' },
  },
  {
    title: 'Retaining Wall & Garden Bed',
    location: 'Orleans, Ontario',
    category: 'Retaining Walls',
    description: 'A tiered retaining wall paired with a new garden bed.',
    featured: false,
    coverImage: { url: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?q=80&w=1200&auto=format&fit=crop', publicId: 'seed/projects/wall' },
  },
  {
    title: 'Full Property Landscaping',
    location: 'Stittsville, Ontario',
    category: 'Landscaping',
    description: 'A complete front and back yard landscape transformation.',
    featured: true,
    coverImage: { url: 'https://images.unsplash.com/photo-1600585152220-90363fe7e115?q=80&w=1200&auto=format&fit=crop', publicId: 'seed/projects/landscaping' },
  },
];

const products = [
  {
    name: 'Classic Interlock Pavers',
    category: 'Interlock Pavers',
    description: 'Durable, versatile pavers for driveways and walkways.',
    colors: ['Charcoal', 'Sand', 'Grey Blend'],
    style: 'Classic',
    manufacturer: 'Nova Select Supplier',
    featured: true,
    images: [{ url: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=1200&auto=format&fit=crop', publicId: 'seed/products/pavers' }],
  },
  {
    name: 'Premium Patio Stones',
    category: 'Patio Stones',
    description: 'Elegant large-format stones for outdoor living spaces.',
    colors: ['Onyx', 'Sable'],
    style: 'Large Format',
    manufacturer: 'Nova Select Supplier',
    featured: true,
    images: [{ url: 'https://images.unsplash.com/photo-1600566752355-35792bedcfea?q=80&w=1200&auto=format&fit=crop', publicId: 'seed/products/patio-stone' }],
  },
  {
    name: 'Retaining Wall Blocks',
    category: 'Retaining Wall Blocks',
    description: 'Engineered blocks for structural and decorative walls.',
    colors: ['Graphite', 'Earth Tone'],
    style: 'Modular',
    manufacturer: 'Nova Select Supplier',
    featured: false,
    images: [{ url: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?q=80&w=1200&auto=format&fit=crop', publicId: 'seed/products/wall-block' }],
  },
  {
    name: 'Coping & Step Units',
    category: 'Steps & Coping',
    description: 'Precision-cut units for steps, landings and pool coping.',
    colors: ['Grey', 'Beige'],
    style: 'Precision Cut',
    manufacturer: 'Nova Select Supplier',
    featured: false,
    images: [{ url: 'https://images.unsplash.com/photo-1600607688969-a5bfcd646154?q=80&w=1200&auto=format&fit=crop', publicId: 'seed/products/steps' }],
  },
  {
    name: 'Decorative River Rock',
    category: 'River Rock',
    description: 'Low-maintenance rock for borders and drainage areas.',
    colors: ['Mixed Earth', 'Grey/White'],
    style: 'Natural',
    manufacturer: 'Nova Select Supplier',
    featured: false,
    images: [{ url: 'https://images.unsplash.com/photo-1600607687644-c7171b42498b?q=80&w=1200&auto=format&fit=crop', publicId: 'seed/products/river-rock' }],
  },
  {
    name: 'Decorative Stone Accents',
    category: 'Decorative Stone',
    description: 'Accent stone for garden beds and feature areas.',
    colors: ['Natural', 'Slate'],
    style: 'Accent',
    manufacturer: 'Nova Select Supplier',
    featured: false,
    images: [{ url: 'https://images.unsplash.com/photo-1600585152220-90363fe7e115?q=80&w=1200&auto=format&fit=crop', publicId: 'seed/products/decorative-stone' }],
  },
];

const testimonials = [
  {
    clientName: 'Ottawa Homeowner',
    review:
      'The team transformed our driveway completely. Proper base preparation and clean edges — you can tell they take pride in the work.',
    projectType: 'Interlock Driveway',
    rating: 5,
    featured: true,
  },
  {
    clientName: 'Barrhaven Homeowner',
    review:
      'Our backyard patio turned out better than we imagined. Communication was clear throughout the whole project.',
    projectType: 'Patio',
    rating: 5,
    featured: true,
  },
  {
    clientName: 'Kanata Homeowner',
    review: 'Professional, on time, and the retaining wall has held up perfectly through the seasons.',
    projectType: 'Retaining Wall',
    rating: 5,
    featured: false,
  },
];

const seed = async () => {
  await connectDB();

  const adminEmail = process.env.ADMIN_SEED_EMAIL || 'admin@novahardscapes.com';
  const adminPassword = process.env.ADMIN_SEED_PASSWORD || 'ChangeMe123!';

  const existingAdmin = await Admin.findOne({ email: adminEmail });
  if (!existingAdmin) {
    await Admin.create({
      name: 'Nova Admin',
      email: adminEmail,
      password: adminPassword,
      role: 'superadmin',
    });
    console.log(`Admin account created: ${adminEmail}`);
  } else {
    console.log('Admin account already exists, skipping.');
  }

  const serviceCount = await Service.countDocuments();
  if (serviceCount === 0) {
    await Service.insertMany(services);
    console.log(`Seeded ${services.length} services.`);
  }

  const projectCount = await Project.countDocuments();
  if (projectCount === 0) {
    await Project.insertMany(projects);
    console.log(`Seeded ${projects.length} projects.`);
  }

  const productCount = await Product.countDocuments();
  if (productCount === 0) {
    await Product.insertMany(products);
    console.log(`Seeded ${products.length} products.`);
  }

  const testimonialCount = await Testimonial.countDocuments();
  if (testimonialCount === 0) {
    await Testimonial.insertMany(testimonials);
    console.log(`Seeded ${testimonials.length} testimonials.`);
  }

  const settingsCount = await SiteSettings.countDocuments();
  if (settingsCount === 0) {
    await SiteSettings.create({
      serviceAreas: ['Ottawa', 'Nepean', 'Kanata', 'Barrhaven', 'Orleans', 'Stittsville', 'Gloucester'],
    });
    console.log('Seeded default site settings.');
  }

  const statsCount = await Statistics.countDocuments();
  if (statsCount === 0) {
    await Statistics.create({});
    console.log('Seeded default statistics.');
  }

  console.log('Seeding complete.');
  await mongoose.connection.close();
  process.exit(0);
};

seed().catch((err) => {
  console.error('Seeding failed:', err);
  process.exit(1);
});
