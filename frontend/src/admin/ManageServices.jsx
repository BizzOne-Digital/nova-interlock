import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import { servicesApi } from '../api/endpoints';
import SEO from '../components/common/SEO';
import Modal from '../components/admin/Modal';

const ICON_OPTIONS = [
  { value: 'driveway', label: 'Driveway' },
  { value: 'patio', label: 'Patio' },
  { value: 'pathway', label: 'Walkway / Pathway' },
  { value: 'steps', label: 'Steps' },
  { value: 'wall', label: 'Retaining Wall' },
  { value: 'excavation', label: 'Excavation' },
  { value: 'stone', label: 'Decorative Stone' },
  { value: 'design', label: 'Landscape Design' },
];

const emptyForm = { title: '', slug: '', description: '', icon: 'design', order: 0, published: true };

const ManageServices = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [file, setFile] = useState(null);
  const [saving, setSaving] = useState(false);

  const fetchServices = async () => {
    setLoading(true);
    try {
      const res = await servicesApi.getAll({ all: true });
      setServices(res.data.data);
    } catch {
      toast.error('Failed to load services');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const openCreate = () => {
    setEditing(null);
    setForm(emptyForm);
    setFile(null);
    setModalOpen(true);
  };

  const openEdit = (service) => {
    setEditing(service);
    setForm({
      title: service.title,
      slug: service.slug,
      description: service.description,
      icon: service.icon,
      order: service.order,
      published: service.published,
    });
    setFile(null);
    setModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    const formData = new FormData();
    Object.entries(form).forEach(([key, value]) => formData.append(key, value));
    if (file) formData.append('image', file);

    try {
      if (editing) {
        await servicesApi.update(editing._id, formData);
        toast.success('Service updated');
      } else {
        await servicesApi.create(formData);
        toast.success('Service created');
      }
      setModalOpen(false);
      fetchServices();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to save service');
    } finally {
      setSaving(false);
    }
  };

  const removeService = async (id) => {
    if (!confirm('Delete this service?')) return;
    try {
      await servicesApi.remove(id);
      setServices((prev) => prev.filter((s) => s._id !== id));
      toast.success('Service deleted');
    } catch {
      toast.error('Failed to delete service');
    }
  };

  return (
    <>
      <SEO title="Manage Services | Nova Hardscapes Admin" />
      <div className="flex items-center justify-between">
        <h1 className="font-heading text-2xl font-bold text-nova-text">Services</h1>
        <button onClick={openCreate} className="btn-primary focus-ring">
          <Plus size={16} /> Add Service
        </button>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {loading && <p className="text-nova-text-secondary">Loading...</p>}
        {!loading && services.length === 0 && <p className="text-nova-text-secondary">No services yet.</p>}
        {services.map((service) => (
          <div key={service._id} className="overflow-hidden rounded-xl border border-nova-border bg-nova-card">
            {service.image?.url && (
              <img src={service.image.url} alt={service.title} className="h-32 w-full object-cover" />
            )}
            <div className="p-4">
              <div className="flex items-center justify-between">
                <h3 className="font-heading text-sm font-semibold text-nova-text">{service.title}</h3>
                <span className={`rounded-full px-2 py-0.5 text-xs ${service.published ? 'bg-green-500/15 text-green-300' : 'bg-white/10 text-nova-text-secondary'}`}>
                  {service.published ? 'Published' : 'Draft'}
                </span>
              </div>
              <p className="mt-2 line-clamp-2 text-xs text-nova-text-secondary">{service.description}</p>
              <div className="mt-3 flex items-center gap-3">
                <button onClick={() => openEdit(service)} className="focus-ring flex items-center gap-1 text-xs text-nova-gold">
                  <Pencil size={13} /> Edit
                </button>
                <button onClick={() => removeService(service._id)} className="focus-ring flex items-center gap-1 text-xs text-red-400">
                  <Trash2 size={13} /> Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editing ? 'Edit Service' : 'Add Service'}>
        <form onSubmit={handleSubmit} className="space-y-4">
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
            <label className="mb-1.5 block text-sm text-nova-text">Slug</label>
            <input
              required
              value={form.slug}
              onChange={(e) => setForm({ ...form, slug: e.target.value })}
              className="focus-ring w-full rounded-lg border border-nova-border bg-nova-bg-secondary px-3 py-2 text-nova-text"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-sm text-nova-text">Description</label>
            <textarea
              required
              rows={3}
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              className="focus-ring w-full rounded-lg border border-nova-border bg-nova-bg-secondary px-3 py-2 text-nova-text"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-1.5 block text-sm text-nova-text">Icon</label>
              <select
                value={form.icon}
                onChange={(e) => setForm({ ...form, icon: e.target.value })}
                className="focus-ring w-full rounded-lg border border-nova-border bg-nova-bg-secondary px-3 py-2 text-nova-text"
              >
                {ICON_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="mb-1.5 block text-sm text-nova-text">Order</label>
              <input
                type="number"
                value={form.order}
                onChange={(e) => setForm({ ...form, order: e.target.value })}
                className="focus-ring w-full rounded-lg border border-nova-border bg-nova-bg-secondary px-3 py-2 text-nova-text"
              />
            </div>
          </div>
          <div>
            <label className="mb-1.5 block text-sm text-nova-text">Image</label>
            <input type="file" accept="image/*" onChange={(e) => setFile(e.target.files[0])} className="text-sm text-nova-text-secondary" />
          </div>
          <label className="flex items-center gap-2 text-sm text-nova-text">
            <input
              type="checkbox"
              checked={form.published}
              onChange={(e) => setForm({ ...form, published: e.target.checked })}
            />
            Published
          </label>
          <button type="submit" disabled={saving} className="btn-primary focus-ring w-full justify-center disabled:opacity-60">
            {saving ? 'Saving...' : 'Save Service'}
          </button>
        </form>
      </Modal>
    </>
  );
};

export default ManageServices;
