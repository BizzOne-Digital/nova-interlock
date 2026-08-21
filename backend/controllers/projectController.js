const asyncHandler = require('express-async-handler');
const Project = require('../models/Project');
const { uploadBuffer, deleteImage } = require('../services/cloudinaryService');

const getProjects = asyncHandler(async (req, res) => {
  const filter = req.query.all === 'true' && req.admin ? {} : { published: true };
  if (req.query.category) filter.category = req.query.category;
  const projects = await Project.find(filter).sort({ featured: -1, createdAt: -1 });
  res.json({ success: true, count: projects.length, data: projects });
});

const getProjectById = asyncHandler(async (req, res) => {
  const project = await Project.findById(req.params.id);
  if (!project) {
    res.status(404);
    throw new Error('Project not found');
  }
  res.json({ success: true, data: project });
});

const createProject = asyncHandler(async (req, res) => {
  const { title, location, category, description, featured, published } = req.body;

  let coverImage, beforeImage, afterImage, galleryImages = [];

  if (req.files?.coverImage?.[0]) {
    coverImage = await uploadBuffer(req.files.coverImage[0].buffer, 'nova-hardscapes/projects');
  }
  if (req.files?.beforeImage?.[0]) {
    beforeImage = await uploadBuffer(req.files.beforeImage[0].buffer, 'nova-hardscapes/projects');
  }
  if (req.files?.afterImage?.[0]) {
    afterImage = await uploadBuffer(req.files.afterImage[0].buffer, 'nova-hardscapes/projects');
  }
  if (req.files?.galleryImages?.length) {
    galleryImages = await Promise.all(
      req.files.galleryImages.map((f) => uploadBuffer(f.buffer, 'nova-hardscapes/projects'))
    );
  }

  const project = await Project.create({
    title,
    location,
    category,
    description,
    featured,
    published,
    coverImage,
    beforeImage,
    afterImage,
    galleryImages,
  });

  res.status(201).json({ success: true, data: project });
});

const updateProject = asyncHandler(async (req, res) => {
  const project = await Project.findById(req.params.id);
  if (!project) {
    res.status(404);
    throw new Error('Project not found');
  }

  const { title, location, category, description, featured, published } = req.body;

  if (req.files?.coverImage?.[0]) {
    if (project.coverImage?.publicId) await deleteImage(project.coverImage.publicId);
    project.coverImage = await uploadBuffer(req.files.coverImage[0].buffer, 'nova-hardscapes/projects');
  }
  if (req.files?.beforeImage?.[0]) {
    if (project.beforeImage?.publicId) await deleteImage(project.beforeImage.publicId);
    project.beforeImage = await uploadBuffer(req.files.beforeImage[0].buffer, 'nova-hardscapes/projects');
  }
  if (req.files?.afterImage?.[0]) {
    if (project.afterImage?.publicId) await deleteImage(project.afterImage.publicId);
    project.afterImage = await uploadBuffer(req.files.afterImage[0].buffer, 'nova-hardscapes/projects');
  }
  if (req.files?.galleryImages?.length) {
    const newImages = await Promise.all(
      req.files.galleryImages.map((f) => uploadBuffer(f.buffer, 'nova-hardscapes/projects'))
    );
    project.galleryImages.push(...newImages);
  }

  project.title = title ?? project.title;
  project.location = location ?? project.location;
  project.category = category ?? project.category;
  project.description = description ?? project.description;
  if (featured !== undefined) project.featured = featured;
  if (published !== undefined) project.published = published;

  await project.save();
  res.json({ success: true, data: project });
});

const deleteProject = asyncHandler(async (req, res) => {
  const project = await Project.findById(req.params.id);
  if (!project) {
    res.status(404);
    throw new Error('Project not found');
  }

  const publicIds = [
    project.coverImage?.publicId,
    project.beforeImage?.publicId,
    project.afterImage?.publicId,
    ...project.galleryImages.map((g) => g.publicId),
  ].filter(Boolean);

  await Promise.all(publicIds.map((id) => deleteImage(id)));
  await project.deleteOne();
  res.json({ success: true, message: 'Project deleted' });
});

module.exports = { getProjects, getProjectById, createProject, updateProject, deleteProject };
