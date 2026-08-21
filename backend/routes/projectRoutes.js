const express = require('express');
const {
  getProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
} = require('../controllers/projectController');
const { protect } = require('../middleware/authMiddleware');
const optionalAuth = require('../middleware/optionalAuth');
const upload = require('../middleware/uploadMiddleware');

const router = express.Router();

const projectUploadFields = upload.fields([
  { name: 'coverImage', maxCount: 1 },
  { name: 'beforeImage', maxCount: 1 },
  { name: 'afterImage', maxCount: 1 },
  { name: 'galleryImages', maxCount: 15 },
]);

router.get('/', optionalAuth, getProjects);
router.get('/:id', getProjectById);
router.post('/', protect, projectUploadFields, createProject);
router.put('/:id', protect, projectUploadFields, updateProject);
router.delete('/:id', protect, deleteProject);

module.exports = router;
