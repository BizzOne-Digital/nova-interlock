import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { settingsApi } from '../api/endpoints';
import SEO from '../components/common/SEO';

const Settings = () => {
  const [settings, setSettings] = useState({
    businessName: '',
    phone: '',
    serviceArea: '',
    serviceAreas: [],
    specialOffer: '',
    tagline: '',
  });
  const [areasText, setAreasText] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    settingsApi
      .get()
      .then((res) => {
        setSettings(res.data.data);
        setAreasText((res.data.data.serviceAreas || []).join(', '));
      })
      .catch(() => toast.error('Failed to load settings'))
      .finally(() => setLoading(false));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const payload = {
        ...settings,
        serviceAreas: areasText.split(',').map((a) => a.trim()).filter(Boolean),
      };
      const res = await settingsApi.update(payload);
      setSettings(res.data.data);
      toast.success('Settings updated');
    } catch {
      toast.error('Failed to update settings');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p className="text-nova-text-secondary">Loading...</p>;

  return (
    <>
      <SEO title="Settings | Nova Hardscapes Admin" />
      <h1 className="font-heading text-2xl font-bold text-nova-text">Site Settings</h1>

      <form onSubmit={handleSubmit} className="mt-6 max-w-xl space-y-4 rounded-xl border border-nova-border bg-nova-card p-6">
        <div>
          <label className="mb-1.5 block text-sm text-nova-text">Business Name</label>
          <input
            value={settings.businessName}
            onChange={(e) => setSettings({ ...settings, businessName: e.target.value })}
            className="focus-ring w-full rounded-lg border border-nova-border bg-nova-bg-secondary px-3 py-2 text-nova-text"
          />
        </div>
        <div>
          <label className="mb-1.5 block text-sm text-nova-text">Phone Number</label>
          <input
            value={settings.phone}
            onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
            className="focus-ring w-full rounded-lg border border-nova-border bg-nova-bg-secondary px-3 py-2 text-nova-text"
          />
        </div>
        <div>
          <label className="mb-1.5 block text-sm text-nova-text">Tagline</label>
          <input
            value={settings.tagline}
            onChange={(e) => setSettings({ ...settings, tagline: e.target.value })}
            className="focus-ring w-full rounded-lg border border-nova-border bg-nova-bg-secondary px-3 py-2 text-nova-text"
          />
        </div>
        <div>
          <label className="mb-1.5 block text-sm text-nova-text">Special Offer</label>
          <input
            value={settings.specialOffer}
            onChange={(e) => setSettings({ ...settings, specialOffer: e.target.value })}
            className="focus-ring w-full rounded-lg border border-nova-border bg-nova-bg-secondary px-3 py-2 text-nova-text"
          />
        </div>
        <div>
          <label className="mb-1.5 block text-sm text-nova-text">Service Areas (comma separated)</label>
          <input
            value={areasText}
            onChange={(e) => setAreasText(e.target.value)}
            className="focus-ring w-full rounded-lg border border-nova-border bg-nova-bg-secondary px-3 py-2 text-nova-text"
          />
        </div>
        <button type="submit" disabled={saving} className="btn-primary focus-ring disabled:opacity-60">
          {saving ? 'Saving...' : 'Save Settings'}
        </button>
      </form>
    </>
  );
};

export default Settings;
