import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { Plus, Trash2 } from 'lucide-react';
import { galleryApi } from '../api/endpoints';
import SEO from '../components/common/SEO';
import Modal from '../components/admin/Modal';

const ManageGallery = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState({ title: '', category: '', published: true });
  const [file, setFile] = useState(null);
  const [saving, setSaving] = useState(false);

  const fetchImages = async () => {
    setLoading(true);
    try {
      const res = await galleryApi.getAll({ all: true });
      setImages(res.data.data);
    } catch {
      toast.error('Failed to load gallery');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      toast.error('Please select an image');
      return;
    }
    setSaving(true);
    const formData = new FormData();
    Object.entries(form).forEach(([key, value]) => formData.append(key, value));
    formData.append('image', file);

    try {
      await galleryApi.create(formData);
      toast.success('Image uploaded');
      setModalOpen(false);
      setForm({ title: '', category: '', published: true });
      setFile(null);
      fetchImages();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to upload image');
    } finally {
      setSaving(false);
    }
  };

  const removeImage = async (id) => {
    if (!confirm('Delete this image?')) return;
    try {
      await galleryApi.remove(id);
      setImages((prev) => prev.filter((img) => img._id !== id));
      toast.success('Image deleted');
    } catch {
      toast.error('Failed to delete image');
    }
  };

  return (
    <>
      <SEO title="Manage Gallery | Nova Hardscapes Admin" />
      <div className="flex items-center justify-between">
        <h1 className="font-heading text-2xl font-bold text-nova-text">Gallery</h1>
        <button onClick={() => setModalOpen(true)} className="btn-primary focus-ring">
          <Plus size={16} /> Upload Image
        </button>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {loading && <p className="text-nova-text-secondary">Loading...</p>}
        {!loading && images.length === 0 && <p className="text-nova-text-secondary">No images yet.</p>}
        {images.map((img) => (
          <div key={img._id} className="group relative overflow-hidden rounded-xl border border-nova-border">
            <img src={img.image.url} alt={img.title || 'Gallery image'} className="aspect-square w-full object-cover" />
            <button
              onClick={() => removeImage(img._id)}
              className="focus-ring absolute right-2 top-2 rounded-full bg-nova-bg/80 p-1.5 text-red-400 opacity-0 transition-opacity group-hover:opacity-100"
            >
              <Trash2 size={14} />
            </button>
          </div>
        ))}
      </div>

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title="Upload Gallery Image">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-1.5 block text-sm text-nova-text">Title</label>
            <input
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className="focus-ring w-full rounded-lg border border-nova-border bg-nova-bg-secondary px-3 py-2 text-nova-text"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-sm text-nova-text">Category</label>
            <input
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
              className="focus-ring w-full rounded-lg border border-nova-border bg-nova-bg-secondary px-3 py-2 text-nova-text"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-sm text-nova-text">Image</label>
            <input required type="file" accept="image/*" onChange={(e) => setFile(e.target.files[0])} className="text-sm text-nova-text-secondary" />
          </div>
          <button type="submit" disabled={saving} className="btn-primary focus-ring w-full justify-center disabled:opacity-60">
            {saving ? 'Uploading...' : 'Upload'}
          </button>
        </form>
      </Modal>
    </>
  );
};

export default ManageGallery;
