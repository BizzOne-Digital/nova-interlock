import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { Plus, Pencil, Trash2, Star } from 'lucide-react';
import { testimonialsApi } from '../api/endpoints';
import SEO from '../components/common/SEO';
import Modal from '../components/admin/Modal';

const emptyForm = { clientName: '', review: '', projectType: '', rating: 5, featured: false, published: true };

const ManageTestimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);

  const fetchTestimonials = async () => {
    setLoading(true);
    try {
      const res = await testimonialsApi.getAll({ all: true });
      setTestimonials(res.data.data);
    } catch {
      toast.error('Failed to load testimonials');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const openCreate = () => {
    setEditing(null);
    setForm(emptyForm);
    setModalOpen(true);
  };

  const openEdit = (t) => {
    setEditing(t);
    setForm({
      clientName: t.clientName,
      review: t.review,
      projectType: t.projectType || '',
      rating: t.rating,
      featured: t.featured,
      published: t.published,
    });
    setModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (editing) {
        await testimonialsApi.update(editing._id, form);
        toast.success('Testimonial updated');
      } else {
        await testimonialsApi.create(form);
        toast.success('Testimonial created');
      }
      setModalOpen(false);
      fetchTestimonials();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to save testimonial');
    } finally {
      setSaving(false);
    }
  };

  const togglePublish = async (t) => {
    try {
      await testimonialsApi.update(t._id, { published: !t.published });
      setTestimonials((prev) => prev.map((x) => (x._id === t._id ? { ...x, published: !x.published } : x)));
    } catch {
      toast.error('Failed to update testimonial');
    }
  };

  const removeTestimonial = async (id) => {
    if (!confirm('Delete this testimonial?')) return;
    try {
      await testimonialsApi.remove(id);
      setTestimonials((prev) => prev.filter((t) => t._id !== id));
      toast.success('Testimonial deleted');
    } catch {
      toast.error('Failed to delete testimonial');
    }
  };

  return (
    <>
      <SEO title="Manage Testimonials | Nova Hardscapes Admin" />
      <div className="flex items-center justify-between">
        <h1 className="font-heading text-2xl font-bold text-nova-text">Testimonials</h1>
        <button onClick={openCreate} className="btn-primary focus-ring">
          <Plus size={16} /> Add Testimonial
        </button>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {loading && <p className="text-nova-text-secondary">Loading...</p>}
        {!loading && testimonials.length === 0 && <p className="text-nova-text-secondary">No testimonials yet.</p>}
        {testimonials.map((t) => (
          <div key={t._id} className="rounded-xl border border-nova-border bg-nova-card p-5">
            <div className="flex items-center justify-between">
              <div className="flex gap-0.5">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} size={13} className="fill-nova-gold text-nova-gold" />
                ))}
              </div>
              <button
                onClick={() => togglePublish(t)}
                className={`rounded-full px-2 py-0.5 text-xs ${t.published ? 'bg-green-500/15 text-green-300' : 'bg-white/10 text-nova-text-secondary'}`}
              >
                {t.published ? 'Published' : 'Draft'}
              </button>
            </div>
            <p className="mt-3 line-clamp-3 text-sm text-nova-text-secondary">"{t.review}"</p>
            <p className="mt-3 text-sm font-semibold text-nova-text">{t.clientName}</p>
            <p className="text-xs text-nova-text-secondary">{t.projectType}</p>
            <div className="mt-3 flex items-center gap-3">
              <button onClick={() => openEdit(t)} className="focus-ring flex items-center gap-1 text-xs text-nova-gold">
                <Pencil size={13} /> Edit
              </button>
              <button onClick={() => removeTestimonial(t._id)} className="focus-ring flex items-center gap-1 text-xs text-red-400">
                <Trash2 size={13} /> Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editing ? 'Edit Testimonial' : 'Add Testimonial'}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-1.5 block text-sm text-nova-text">Client Name</label>
            <input
              required
              value={form.clientName}
              onChange={(e) => setForm({ ...form, clientName: e.target.value })}
              className="focus-ring w-full rounded-lg border border-nova-border bg-nova-bg-secondary px-3 py-2 text-nova-text"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-sm text-nova-text">Review</label>
            <textarea
              required
              rows={4}
              value={form.review}
              onChange={(e) => setForm({ ...form, review: e.target.value })}
              className="focus-ring w-full rounded-lg border border-nova-border bg-nova-bg-secondary px-3 py-2 text-nova-text"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-1.5 block text-sm text-nova-text">Project Type</label>
              <input
                value={form.projectType}
                onChange={(e) => setForm({ ...form, projectType: e.target.value })}
                className="focus-ring w-full rounded-lg border border-nova-border bg-nova-bg-secondary px-3 py-2 text-nova-text"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm text-nova-text">Rating</label>
              <select
                value={form.rating}
                onChange={(e) => setForm({ ...form, rating: Number(e.target.value) })}
                className="focus-ring w-full rounded-lg border border-nova-border bg-nova-bg-secondary px-3 py-2 text-nova-text"
              >
                {[5, 4, 3, 2, 1].map((r) => (
                  <option key={r} value={r}>
                    {r}
                  </option>
                ))}
              </select>
            </div>
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
            {saving ? 'Saving...' : 'Save Testimonial'}
          </button>
        </form>
      </Modal>
    </>
  );
};

export default ManageTestimonials;
