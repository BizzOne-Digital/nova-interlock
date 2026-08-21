const asyncHandler = require('express-async-handler');
const Service = require('../models/Service');
const { uploadBuffer, deleteImage } = require('../services/cloudinaryService');

// GET /api/services (public: published only, admin: all via ?all=true)
const getServices = asyncHandler(async (req, res) => {
  const filter = req.query.all === 'true' && req.admin ? {} : { published: true };
  const services = await Service.find(filter).sort({ order: 1, createdAt: 1 });
  res.json({ success: true, count: services.length, data: services });
});

const getServiceById = asyncHandler(async (req, res) => {
  const service = await Service.findById(req.params.id);
  if (!service) {
    res.status(404);
    throw new Error('Service not found');
  }
  res.json({ success: true, data: service });
});

const createService = asyncHandler(async (req, res) => {
  const { title, slug, description, icon, order, published } = req.body;
  let image;

  if (req.file) {
    image = await uploadBuffer(req.file.buffer, 'nova-hardscapes/services');
  }

  const service = await Service.create({
    title,
    slug,
    description,
    icon,
    order,
    published,
    image,
  });

  res.status(201).json({ success: true, data: service });
});

const updateService = asyncHandler(async (req, res) => {
  const service = await Service.findById(req.params.id);
  if (!service) {
    res.status(404);
    throw new Error('Service not found');
  }

  const { title, slug, description, icon, order, published } = req.body;

  if (req.file) {
    if (service.image?.publicId) await deleteImage(service.image.publicId);
    service.image = await uploadBuffer(req.file.buffer, 'nova-hardscapes/services');
  }

  service.title = title ?? service.title;
  service.slug = slug ?? service.slug;
  service.description = description ?? service.description;
  service.icon = icon ?? service.icon;
  if (order !== undefined) service.order = order;
  if (published !== undefined) service.published = published;

  await service.save();
  res.json({ success: true, data: service });
});

const deleteService = asyncHandler(async (req, res) => {
  const service = await Service.findById(req.params.id);
  if (!service) {
    res.status(404);
    throw new Error('Service not found');
  }
  if (service.image?.publicId) await deleteImage(service.image.publicId);
  await service.deleteOne();
  res.json({ success: true, message: 'Service deleted' });
});

module.exports = { getServices, getServiceById, createService, updateService, deleteService };
