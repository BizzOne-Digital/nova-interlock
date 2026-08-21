const asyncHandler = require('express-async-handler');
const Gallery = require('../models/Gallery');
const { uploadBuffer, deleteImage } = require('../services/cloudinaryService');

const getGalleryImages = asyncHandler(async (req, res) => {
  const filter = req.query.all === 'true' && req.admin ? {} : { published: true };
  const images = await Gallery.find(filter).sort({ order: 1, createdAt: -1 });
  res.json({ success: true, count: images.length, data: images });
});

const createGalleryImage = asyncHandler(async (req, res) => {
  if (!req.file) {
    res.status(400);
    throw new Error('Image file is required');
  }
  const { title, category, order, published } = req.body;
  const image = await uploadBuffer(req.file.buffer, 'nova-hardscapes/gallery');

  const galleryItem = await Gallery.create({ title, category, order, published, image });
  res.status(201).json({ success: true, data: galleryItem });
});

const updateGalleryImage = asyncHandler(async (req, res) => {
  const galleryItem = await Gallery.findById(req.params.id);
  if (!galleryItem) {
    res.status(404);
    throw new Error('Gallery image not found');
  }

  const { title, category, order, published } = req.body;

  if (req.file) {
    if (galleryItem.image?.publicId) await deleteImage(galleryItem.image.publicId);
    galleryItem.image = await uploadBuffer(req.file.buffer, 'nova-hardscapes/gallery');
  }

  galleryItem.title = title ?? galleryItem.title;
  galleryItem.category = category ?? galleryItem.category;
  if (order !== undefined) galleryItem.order = order;
  if (published !== undefined) galleryItem.published = published;

  await galleryItem.save();
  res.json({ success: true, data: galleryItem });
});

const deleteGalleryImage = asyncHandler(async (req, res) => {
  const galleryItem = await Gallery.findById(req.params.id);
  if (!galleryItem) {
    res.status(404);
    throw new Error('Gallery image not found');
  }
  if (galleryItem.image?.publicId) await deleteImage(galleryItem.image.publicId);
  await galleryItem.deleteOne();
  res.json({ success: true, message: 'Gallery image deleted' });
});

module.exports = { getGalleryImages, createGalleryImage, updateGalleryImage, deleteGalleryImage };
