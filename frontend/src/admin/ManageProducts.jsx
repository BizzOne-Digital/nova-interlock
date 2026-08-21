import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import { productsApi } from '../api/endpoints';
import SEO from '../components/common/SEO';
import Modal from '../components/admin/Modal';

const CATEGORIES = [
  'Interlock Pavers',
  'Patio Stones',
  'Retaining Wall Blocks',
  'Steps & Coping',
  'River Rock',
  'Decorative Stone',
  'Landscape Materials',
];

const emptyForm = {
  name: '',
  category: CATEGORIES[0],
  description: '',
  colors: '',
  style: '',
  manufacturer: '',
  featured: false,
  published: true,
};

const ManageProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [files, setFiles] = useState(null);
  const [saving, setSaving] = useState(false);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await productsApi.getAll({ all: true });
      setProducts(res.data.data);
    } catch {
      toast.error('Failed to load products');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const openCreate = () => {
    setEditing(null);
    setForm(emptyForm);
    setFiles(null);
    setModalOpen(true);
  };

  const openEdit = (product) => {
    setEditing(product);
    setForm({
      name: product.name,
      category: product.category,
      description: product.description || '',
      colors: (product.colors || []).join(', '),
      style: product.style || '',
      manufacturer: product.manufacturer || '',
      featured: product.featured,
      published: product.published,
    });
    setFiles(null);
    setModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    const formData = new FormData();
    Object.entries(form).forEach(([key, value]) => formData.append(key, value));
    if (files) Array.from(files).forEach((f) => formData.append('images', f));

    try {
      if (editing) {
        await productsApi.update(editing._id, formData);
        toast.success('Product updated');
      } else {
        await productsApi.create(formData);
        toast.success('Product created');
      }
      setModalOpen(false);
      fetchProducts();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to save product');
    } finally {
      setSaving(false);
    }
  };

  const removeProduct = async (id) => {
    if (!confirm('Delete this product?')) return;
    try {
      await productsApi.remove(id);
      setProducts((prev) => prev.filter((p) => p._id !== id));
      toast.success('Product deleted');
    } catch {
      toast.error('Failed to delete product');
    }
  };

  return (
    <>
      <SEO title="Manage Products | Nova Hardscapes Admin" />
      <div className="flex items-center justify-between">
        <h1 className="font-heading text-2xl font-bold text-nova-text">Products / Materials</h1>
        <button onClick={openCreate} className="btn-primary focus-ring">
          <Plus size={16} /> Add Product
        </button>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {loading && <p className="text-nova-text-secondary">Loading...</p>}
        {!loading && products.length === 0 && <p className="text-nova-text-secondary">No products yet.</p>}
        {products.map((product) => (
          <div key={product._id} className="overflow-hidden rounded-xl border border-nova-border bg-nova-card">
            {product.images?.[0]?.url && (
              <img src={product.images[0].url} alt={product.name} className="h-32 w-full object-cover" />
            )}
            <div className="p-4">
              <p className="label-uppercase text-left">{product.category}</p>
              <h3 className="mt-1 font-heading text-sm font-semibold text-nova-text">{product.name}</h3>
              <div className="mt-3 flex items-center gap-3">
                <button onClick={() => openEdit(product)} className="focus-ring flex items-center gap-1 text-xs text-nova-gold">
                  <Pencil size={13} /> Edit
                </button>
                <button onClick={() => removeProduct(product._id)} className="focus-ring flex items-center gap-1 text-xs text-red-400">
                  <Trash2 size={13} /> Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editing ? 'Edit Product' : 'Add Product'} wide>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-1.5 block text-sm text-nova-text">Name</label>
              <input
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="focus-ring w-full rounded-lg border border-nova-border bg-nova-bg-secondary px-3 py-2 text-nova-text"
              />
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

          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="mb-1.5 block text-sm text-nova-text">Colors (comma separated)</label>
              <input
                value={form.colors}
                onChange={(e) => setForm({ ...form, colors: e.target.value })}
                className="focus-ring w-full rounded-lg border border-nova-border bg-nova-bg-secondary px-3 py-2 text-nova-text"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm text-nova-text">Style</label>
              <input
                value={form.style}
                onChange={(e) => setForm({ ...form, style: e.target.value })}
                className="focus-ring w-full rounded-lg border border-nova-border bg-nova-bg-secondary px-3 py-2 text-nova-text"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm text-nova-text">Manufacturer</label>
              <input
                value={form.manufacturer}
                onChange={(e) => setForm({ ...form, manufacturer: e.target.value })}
                className="focus-ring w-full rounded-lg border border-nova-border bg-nova-bg-secondary px-3 py-2 text-nova-text"
              />
            </div>
          </div>

          <div>
            <label className="mb-1.5 block text-sm text-nova-text">Images (multiple)</label>
            <input type="file" accept="image/*" multiple onChange={(e) => setFiles(e.target.files)} className="text-sm text-nova-text-secondary" />
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
            {saving ? 'Saving...' : 'Save Product'}
          </button>
        </form>
      </Modal>
    </>
  );
};

export default ManageProducts;
