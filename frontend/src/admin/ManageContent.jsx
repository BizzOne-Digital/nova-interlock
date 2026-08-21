import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { contentApi } from '../api/endpoints';
import SEO from '../components/common/SEO';

const ManageContent = () => {
  const [stats, setStats] = useState({ projectsCompleted: '', yearsExperience: '', customerFocused: '', servingArea: '' });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    contentApi
      .getStatistics()
      .then((res) => setStats(res.data.data))
      .catch(() => toast.error('Failed to load content'))
      .finally(() => setLoading(false));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await contentApi.updateStatistics(stats);
      toast.success('Statistics updated');
    } catch {
      toast.error('Failed to update statistics');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p className="text-nova-text-secondary">Loading...</p>;

  return (
    <>
      <SEO title="Manage Content | Nova Hardscapes Admin" />
      <h1 className="font-heading text-2xl font-bold text-nova-text">Site Content</h1>
      <p className="mt-1 text-sm text-nova-text-secondary">
        Update the homepage statistics strip. Values reflect current, editable claims — keep them accurate.
      </p>

      <form onSubmit={handleSubmit} className="mt-6 max-w-xl space-y-4 rounded-xl border border-nova-border bg-nova-card p-6">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="mb-1.5 block text-sm text-nova-text">Projects Completed</label>
            <input
              value={stats.projectsCompleted}
              onChange={(e) => setStats({ ...stats, projectsCompleted: e.target.value })}
              className="focus-ring w-full rounded-lg border border-nova-border bg-nova-bg-secondary px-3 py-2 text-nova-text"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-sm text-nova-text">Years Experience</label>
            <input
              value={stats.yearsExperience}
              onChange={(e) => setStats({ ...stats, yearsExperience: e.target.value })}
              className="focus-ring w-full rounded-lg border border-nova-border bg-nova-bg-secondary px-3 py-2 text-nova-text"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-sm text-nova-text">Customer Focused</label>
            <input
              value={stats.customerFocused}
              onChange={(e) => setStats({ ...stats, customerFocused: e.target.value })}
              className="focus-ring w-full rounded-lg border border-nova-border bg-nova-bg-secondary px-3 py-2 text-nova-text"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-sm text-nova-text">Serving Area</label>
            <input
              value={stats.servingArea}
              onChange={(e) => setStats({ ...stats, servingArea: e.target.value })}
              className="focus-ring w-full rounded-lg border border-nova-border bg-nova-bg-secondary px-3 py-2 text-nova-text"
            />
          </div>
        </div>
        <button type="submit" disabled={saving} className="btn-primary focus-ring disabled:opacity-60">
          {saving ? 'Saving...' : 'Save Changes'}
        </button>
      </form>
    </>
  );
};

export default ManageContent;
