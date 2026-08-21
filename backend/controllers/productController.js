const asyncHandler = require('express-async-handler');
const Product = require('../models/Product');
const { uploadBuffer, deleteImage } = require('../services/cloudinaryService');

const getProducts = asyncHandler(async (req, res) => {
  const filter = req.query.all === 'true' && req.admin ? {} : { published: true };
  if (req.query.category) filter.category = req.query.category;
  const products = await Product.find(filter).sort({ featured: -1, createdAt: -1 });
  res.json({ success: true, count: products.length, data: products });
});

const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    res.status(404);
    throw new Error('Product not found');
  }
  res.json({ success: true, data: product });
});

const createProduct = asyncHandler(async (req, res) => {
  const { name, category, description, colors, style, manufacturer, featured, published } = req.body;

  let images = [];
  if (req.files?.length) {
    images = await Promise.all(req.files.map((f) => uploadBuffer(f.buffer, 'nova-hardscapes/products')));
  }

  const product = await Product.create({
    name,
    category,
    description,
    colors: colors ? (Array.isArray(colors) ? colors : colors.split(',').map((c) => c.trim())) : [],
    style,
    manufacturer,
    featured,
    published,
    images,
  });

  res.status(201).json({ success: true, data: product });
});

const updateProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    res.status(404);
    throw new Error('Product not found');
  }

  const { name, category, description, colors, style, manufacturer, featured, published } = req.body;

  if (req.files?.length) {
    const newImages = await Promise.all(req.files.map((f) => uploadBuffer(f.buffer, 'nova-hardscapes/products')));
    product.images.push(...newImages);
  }

  product.name = name ?? product.name;
  product.category = category ?? product.category;
  product.description = description ?? product.description;
  if (colors !== undefined) {
    product.colors = Array.isArray(colors) ? colors : colors.split(',').map((c) => c.trim());
  }
  product.style = style ?? product.style;
  product.manufacturer = manufacturer ?? product.manufacturer;
  if (featured !== undefined) product.featured = featured;
  if (published !== undefined) product.published = published;

  await product.save();
  res.json({ success: true, data: product });
});

const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    res.status(404);
    throw new Error('Product not found');
  }
  await Promise.all(product.images.map((img) => deleteImage(img.publicId)));
  await product.deleteOne();
  res.json({ success: true, message: 'Product deleted' });
});

module.exports = { getProducts, getProductById, createProduct, updateProduct, deleteProduct };
