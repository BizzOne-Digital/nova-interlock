import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { Phone, Trash2, Search } from 'lucide-react';
import { leadsApi } from '../api/endpoints';
import SEO from '../components/common/SEO';
import Modal from '../components/admin/Modal';

const STATUS_OPTIONS = ['New', 'Contacted', 'Quoted', 'Won', 'Lost'];
const statusColors = {
  New: 'bg-blue-500/15 text-blue-300',
  Contacted: 'bg-yellow-500/15 text-yellow-300',
  Quoted: 'bg-purple-500/15 text-purple-300',
  Won: 'bg-green-500/15 text-green-300',
  Lost: 'bg-red-500/15 text-red-300',
};

const ManageLeads = () => {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [selected, setSelected] = useState(null);
  const [note, setNote] = useState('');

  const fetchLeads = async () => {
    setLoading(true);
    try {
      const res = await leadsApi.getAll({ search: search || undefined, status: statusFilter || undefined });
      setLeads(res.data.data);
    } catch {
      toast.error('Failed to load leads');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [statusFilter]);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchLeads();
  };

  const updateStatus = async (id, status) => {
    try {
      await leadsApi.update(id, { status });
      setLeads((prev) => prev.map((l) => (l._id === id ? { ...l, status } : l)));
      toast.success('Status updated');
    } catch {
      toast.error('Failed to update status');
    }
  };

  const addNote = async () => {
    if (!note.trim() || !selected) return;
    try {
      const res = await leadsApi.update(selected._id, { note });
      setSelected(res.data.data);
      setLeads((prev) => prev.map((l) => (l._id === selected._id ? res.data.data : l)));
      setNote('');
      toast.success('Note added');
    } catch {
      toast.error('Failed to add note');
    }
  };

  const removeLead = async (id) => {
    if (!confirm('Delete this lead? This cannot be undone.')) return;
    try {
      await leadsApi.remove(id);
      setLeads((prev) => prev.filter((l) => l._id !== id));
      toast.success('Lead deleted');
    } catch {
      toast.error('Failed to delete lead');
    }
  };

  return (
    <>
      <SEO title="Manage Leads | Nova Hardscapes Admin" />
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="font-heading text-2xl font-bold text-nova-text">Leads</h1>
      </div>

      <form onSubmit={handleSearch} className="mt-5 flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-nova-text-secondary" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, phone or email"
            className="focus-ring w-full rounded-lg border border-nova-border bg-nova-bg-secondary py-2.5 pl-9 pr-4 text-nova-text"
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="focus-ring rounded-lg border border-nova-border bg-nova-bg-secondary px-4 py-2.5 text-nova-text"
        >
          <option value="">All Statuses</option>
          {STATUS_OPTIONS.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
        <button type="submit" className="btn-outline focus-ring">
          Search
        </button>
      </form>

      <div className="mt-6 overflow-x-auto rounded-xl border border-nova-border bg-nova-card">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-nova-border text-xs uppercase tracking-wide text-nova-text-secondary">
              <th className="px-5 py-3">Name</th>
              <th className="px-5 py-3">Phone</th>
              <th className="px-5 py-3">Service</th>
              <th className="px-5 py-3">Date</th>
              <th className="px-5 py-3">Status</th>
              <th className="px-5 py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {loading && (
              <tr>
                <td colSpan={6} className="px-5 py-6 text-center text-nova-text-secondary">
                  Loading...
                </td>
              </tr>
            )}
            {!loading && leads.length === 0 && (
              <tr>
                <td colSpan={6} className="px-5 py-6 text-center text-nova-text-secondary">
                  No leads found.
                </td>
              </tr>
            )}
            {leads.map((lead) => (
              <tr key={lead._id} className="border-b border-white/5">
                <td className="px-5 py-3">
                  <button onClick={() => setSelected(lead)} className="focus-ring text-nova-text hover:text-nova-gold">
                    {lead.fullName}
                  </button>
                </td>
                <td className="px-5 py-3 text-nova-text-secondary">{lead.phone}</td>
                <td className="px-5 py-3 text-nova-text-secondary">{lead.service}</td>
                <td className="px-5 py-3 text-nova-text-secondary">{new Date(lead.createdAt).toLocaleDateString()}</td>
                <td className="px-5 py-3">
                  <select
                    value={lead.status}
                    onChange={(e) => updateStatus(lead._id, e.target.value)}
                    className={`focus-ring rounded-full border-0 px-2.5 py-1 text-xs font-medium ${statusColors[lead.status]}`}
                  >
                    {STATUS_OPTIONS.map((s) => (
                      <option key={s} value={s} className="bg-nova-bg-secondary text-nova-text">
                        {s}
                      </option>
                    ))}
                  </select>
                </td>
                <td className="px-5 py-3">
                  <div className="flex items-center gap-3">
                    <a href={`tel:${lead.phone}`} className="focus-ring flex items-center gap-1 text-nova-gold">
                      <Phone size={14} /> Call
                    </a>
                    <button onClick={() => removeLead(lead._id)} className="focus-ring text-red-400 hover:text-red-300">
                      <Trash2 size={14} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal open={!!selected} onClose={() => setSelected(null)} title={selected?.fullName} wide>
        {selected && (
          <div className="space-y-3 text-sm">
            <p><span className="text-nova-text-secondary">Phone:</span> {selected.phone}</p>
            <p><span className="text-nova-text-secondary">Email:</span> {selected.email || 'N/A'}</p>
            <p><span className="text-nova-text-secondary">Address:</span> {selected.address || 'N/A'}</p>
            <p><span className="text-nova-text-secondary">Service:</span> {selected.service}</p>
            <p><span className="text-nova-text-secondary">Preferred Contact:</span> {selected.preferredContactMethod} — {selected.preferredContactTime || 'N/A'}</p>
            <p><span className="text-nova-text-secondary">Message:</span> {selected.message || 'N/A'}</p>

            <div className="border-t border-nova-border pt-4">
              <h3 className="mb-2 text-sm font-semibold text-nova-text">Internal Notes</h3>
              <div className="max-h-32 space-y-2 overflow-y-auto">
                {selected.notes?.length === 0 && <p className="text-nova-text-secondary">No notes yet.</p>}
                {selected.notes?.map((n, i) => (
                  <p key={i} className="rounded bg-nova-bg-secondary p-2 text-nova-text-secondary">
                    {n.text} <span className="text-xs">— {new Date(n.createdAt).toLocaleString()}</span>
                  </p>
                ))}
              </div>
              <div className="mt-3 flex gap-2">
                <input
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="Add an internal note"
                  className="focus-ring flex-1 rounded-lg border border-nova-border bg-nova-bg-secondary px-3 py-2 text-nova-text"
                />
                <button onClick={addNote} className="btn-outline focus-ring">
                  Add
                </button>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </>
  );
};

export default ManageLeads;
