import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import { projectsApi } from '../api/endpoints';
import SEO from '../components/common/SEO';
import Modal from '../components/admin/Modal';

const CATEGORIES = ['Driveways', 'Patios', 'Walkways', 'Steps', 'Retaining Walls', 'Landscaping'];
const emptyForm = {
  title: '',
  location: 'Ottawa, Ontario',
  category: 'Driveways',
  description: '',
  featured: false,
  published: true,
};

const ManageProjects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [files, setFiles] = useState({});
  const [saving, setSaving] = useState(false);

  const fetchProjects = async () => {
    setLoading(true);
    try {
      const res = await projectsApi.getAll({ all: true });
      setProjects(res.data.data);
    } catch {
      toast.error('Failed to load projects');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const openCreate = () => {
    setEditing(null);
    setForm(emptyForm);
    setFiles({});
    setModalOpen(true);
  };

  const openEdit = (project) => {
    setEditing(project);
    setForm({
      title: project.title,
      location: project.location,
      category: project.category,
      description: project.description || '',
      featured: project.featured,
      published: project.published,
    });
    setFiles({});
    setModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    const formData = new FormData();
    Object.entries(form).forEach(([key, value]) => formData.append(key, value));
    if (files.coverImage) formData.append('coverImage', files.coverImage);
    if (files.beforeImage) formData.append('beforeImage', files.beforeImage);
    if (files.afterImage) formData.append('afterImage', files.afterImage);
    if (files.galleryImages) {
      Array.from(files.galleryImages).forEach((f) => formData.append('galleryImages', f));
    }

    try {
      if (editing) {
        await projectsApi.update(editing._id, formData);
        toast.success('Project updated');
      } else {
        await projectsApi.create(formData);
        toast.success('Project created');
      }
      setModalOpen(false);
      fetchProjects();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to save project');
    } finally {
      setSaving(false);
    }
  };

  const removeProject = async (id) => {
    if (!confirm('Delete this project?')) return;
    try {
      await projectsApi.remove(id);
      setProjects((prev) => prev.filter((p) => p._id !== id));
      toast.success('Project deleted');
    } catch {
      toast.error('Failed to delete project');
    }
  };

  return (
    <>
      <SEO title="Manage Projects | Nova Hardscapes Admin" />
      <div className="flex items-center justify-between">
        <h1 className="font-heading text-2xl font-bold text-nova-text">Projects</h1>
        <button onClick={openCreate} className="btn-primary focus-ring">
          <Plus size={16} /> Add Project
        </button>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {loading && <p className="text-nova-text-secondary">Loading...</p>}
        {!loading && projects.length === 0 && <p className="text-nova-text-secondary">No projects yet.</p>}
        {projects.map((project) => (
          <div key={project._id} className="overflow-hidden rounded-xl border border-nova-border bg-nova-card">
            {project.coverImage?.url && (
              <img src={project.coverImage.url} alt={project.title} className="h-32 w-full object-cover" />
            )}
            <div className="p-4">
              <div className="flex items-center justify-between">
                <h3 className="font-heading text-sm font-semibold text-nova-text">{project.title}</h3>
                {project.featured && <span className="rounded-full bg-nova-gold/15 px-2 py-0.5 text-xs text-nova-gold">Featured</span>}
              </div>
              <p className="mt-1 text-xs text-nova-text-secondary">{project.category} — {project.location}</p>
              <div className="mt-3 flex items-center gap-3">
                <button onClick={() => openEdit(project)} className="focus-ring flex items-center gap-1 text-xs text-nova-gold">
                  <Pencil size={13} /> Edit
                </button>
                <button onClick={() => removeProject(project._id)} className="focus-ring flex items-center gap-1 text-xs text-red-400">
                  <Trash2 size={13} /> Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editing ? 'Edit Project' : 'Add Project'} wide>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-1.5 block text-sm text-nova-text">Title</label>
              <input
                required
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                className="focus-ring w-full rounded-lg border border-nova-border bg-nova-bg-secondary px-3 py-2 text-nova-text"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm text-nova-text">Location</label>
              <input
                value={form.location}
                onChange={(e) => setForm({ ...form, location: e.target.value })}
                className="focus-ring w-full rounded-lg border border-nova-border bg-nova-bg-secondary px-3 py-2 text-nova-text"
              />
            </div>
          </div>

          <div>
            <label className="mb-1.5 block text-sm text-nova-text">Category</label>
            <select
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
              className="focus-ring w-full rounded-lg border border-nova-border bg-nova-bg-secondary px-3 py-2 text-nova-text"
            >
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-1.5 block text-sm text-nova-text">Description</label>
            <textarea
              rows={3}
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              className="focus-ring w-full rounded-lg border border-nova-border bg-nova-bg-secondary px-3 py-2 text-nova-text"
            />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div>
              <label className="mb-1.5 block text-sm text-nova-text">Cover Image</label>
              <input type="file" accept="image/*" onChange={(e) => setFiles({ ...files, coverImage: e.target.files[0] })} className="text-sm text-nova-text-secondary" />
            </div>
            <div>
              <label className="mb-1.5 block text-sm text-nova-text">Before Image</label>
              <input type="file" accept="image/*" onChange={(e) => setFiles({ ...files, beforeImage: e.target.files[0] })} className="text-sm text-nova-text-secondary" />
            </div>
            <div>
              <label className="mb-1.5 block text-sm text-nova-text">After Image</label>
              <input type="file" accept="image/*" onChange={(e) => setFiles({ ...files, afterImage: e.target.files[0] })} className="text-sm text-nova-text-secondary" />
            </div>
          </div>

          <div>
            <label className="mb-1.5 block text-sm text-nova-text">Gallery Images (multiple)</label>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={(e) => setFiles({ ...files, galleryImages: e.target.files })}
              className="text-sm text-nova-text-secondary"
            />
          </div>

          <div className="flex items-center gap-6">
            <label className="flex items-center gap-2 text-sm text-nova-text">
              <input type="checkbox" checked={form.featured} onChange={(e) => setForm({ ...form, featured: e.target.checked })} />
              Featured
            </label>
            <label className="flex items-center gap-2 text-sm text-nova-text">
              <input type="checkbox" checked={form.published} onChange={(e) => setForm({ ...form, published: e.target.checked })} />
              Published
            </label>
          </div>

          <button type="submit" disabled={saving} className="btn-primary focus-ring w-full justify-center disabled:opacity-60">
            {saving ? 'Saving...' : 'Save Project'}
          </button>
        </form>
      </Modal>
    </>
  );
};

export default ManageProjects;
