export const FALLBACK_SERVICES = [
  {
    _id: 'driveway',
    title: 'Interlock Driveways',
    description: 'New installations, extensions and replacements.',
    icon: 'driveway',
    image: { url: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=1200&auto=format&fit=crop' },
  },
  {
    _id: 'patio',
    title: 'Patios',
    description: 'Custom backyard patios and outdoor living spaces.',
    icon: 'patio',
    image: { url: 'https://images.unsplash.com/photo-1600566752355-35792bedcfea?q=80&w=1200&auto=format&fit=crop' },
  },
  {
    _id: 'pathway',
    title: 'Walkways & Pathways',
    description: 'Front entrances, side walkways and garden paths.',
    icon: 'pathway',
    image: { url: 'https://images.unsplash.com/photo-1558904541-efd8e654729d?q=80&w=1200&auto=format&fit=crop' },
  },
  {
    _id: 'steps',
    title: 'Steps & Porch Capping',
    description: 'Modern stone steps, landings and porch finishes.',
    icon: 'steps',
    image: { url: 'https://images.unsplash.com/photo-1600607688969-a5bfcd646154?q=80&w=1200&auto=format&fit=crop' },
  },
  {
    _id: 'wall',
    title: 'Retaining Walls',
    description: 'Decorative and functional retaining walls.',
    icon: 'wall',
    image: { url: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?q=80&w=1200&auto=format&fit=crop' },
  },
  {
    _id: 'excavation',
    title: 'Excavation & Base Preparation',
    description: 'Proper excavation, grading and compaction.',
    icon: 'excavation',
    image: { url: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=1200&auto=format&fit=crop' },
  },
  {
    _id: 'stone',
    title: 'River Rock & Decorative Stone',
    description: 'Low-maintenance decorative landscape installations.',
    icon: 'stone',
    image: { url: 'https://images.unsplash.com/photo-1600607687644-c7171b42498b?q=80&w=1200&auto=format&fit=crop' },
  },
  {
    _id: 'design',
    title: 'Landscape Design',
    description: 'Complete outdoor transformations designed around the property.',
    icon: 'design',
    image: { url: 'https://images.unsplash.com/photo-1600585152220-90363fe7e115?q=80&w=1200&auto=format&fit=crop' },
  },
];

export const FALLBACK_TESTIMONIALS = [
  {
    _id: '1',
    clientName: 'Ottawa Homeowner',
    review:
      'The team transformed our driveway completely. Proper base preparation and clean edges — you can tell they take pride in the work.',
    projectType: 'Interlock Driveway',
    rating: 5,
  },
  {
    _id: '2',
    clientName: 'Barrhaven Homeowner',
    review:
      'Our backyard patio turned out better than we imagined. Communication was clear throughout the whole project.',
    projectType: 'Patio',
    rating: 5,
  },
  {
    _id: '3',
    clientName: 'Kanata Homeowner',
    review: 'Professional, on time, and the retaining wall has held up perfectly through the seasons.',
    projectType: 'Retaining Wall',
    rating: 5,
  },
];

export const FALLBACK_STATISTICS = {
  projectsCompleted: '100+',
  yearsExperience: '5+',
  customerFocused: '100%',
  servingArea: 'Ottawa',
};

export const FALLBACK_PROJECTS = [
  {
    _id: 'p1',
    title: 'Interlock Driveway',
    location: 'Ottawa, Ontario',
    category: 'Driveways',
    coverImage: { url: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=1200&auto=format&fit=crop' },
  },
  {
    _id: 'p2',
    title: 'Backyard Patio',
    location: 'Barrhaven, Ontario',
    category: 'Patios',
    coverImage: { url: 'https://images.unsplash.com/photo-1600566752355-35792bedcfea?q=80&w=1200&auto=format&fit=crop' },
  },
  {
    _id: 'p3',
    title: 'Front Walkway',
    location: 'Kanata, Ontario',
    category: 'Walkways',
    coverImage: { url: 'https://images.unsplash.com/photo-1558904541-efd8e654729d?q=80&w=1200&auto=format&fit=crop' },
  },
  {
    _id: 'p4',
    title: 'Stone Entrance Steps',
    location: 'Nepean, Ontario',
    category: 'Steps',
    coverImage: { url: 'https://images.unsplash.com/photo-1600607688969-a5bfcd646154?q=80&w=1200&auto=format&fit=crop' },
  },
  {
    _id: 'p5',
    title: 'Retaining Wall & Garden Bed',
    location: 'Orleans, Ontario',
    category: 'Retaining Walls',
    coverImage: { url: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?q=80&w=1200&auto=format&fit=crop' },
  },
  {
    _id: 'p6',
    title: 'Full Property Landscaping',
    location: 'Stittsville, Ontario',
    category: 'Landscaping',
    coverImage: { url: 'https://images.unsplash.com/photo-1600585152220-90363fe7e115?q=80&w=1200&auto=format&fit=crop' },
  },
];

export const FALLBACK_PRODUCTS = [
  { _id: 'm1', name: 'Classic Interlock Pavers', category: 'Interlock Pavers', description: 'Durable, versatile pavers for driveways and walkways.', colors: ['Charcoal', 'Sand', 'Grey Blend'] },
  { _id: 'm2', name: 'Premium Patio Stones', category: 'Patio Stones', description: 'Elegant large-format stones for outdoor living spaces.', colors: ['Onyx', 'Sable'] },
  { _id: 'm3', name: 'Retaining Wall Blocks', category: 'Retaining Wall Blocks', description: 'Engineered blocks for structural and decorative walls.', colors: ['Graphite', 'Earth Tone'] },
  { _id: 'm4', name: 'Coping & Step Units', category: 'Steps & Coping', description: 'Precision-cut units for steps, landings and pool coping.', colors: ['Grey', 'Beige'] },
  { _id: 'm5', name: 'Decorative River Rock', category: 'River Rock', description: 'Low-maintenance rock for borders and drainage areas.', colors: ['Mixed Earth', 'Grey/White'] },
  { _id: 'm6', name: 'Decorative Stone Accents', category: 'Decorative Stone', description: 'Accent stone for garden beds and feature areas.', colors: ['Natural', 'Slate'] },
];
