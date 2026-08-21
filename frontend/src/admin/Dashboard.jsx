import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Users, UserPlus, Hammer, FolderKanban, Image, Package, MessageSquareQuote, Phone } from 'lucide-react';
import { dashboardApi } from '../api/endpoints';
import StatCard from '../components/admin/StatCard';
import SEO from '../components/common/SEO';

const statusColors = {
  New: 'bg-blue-500/15 text-blue-300',
  Contacted: 'bg-yellow-500/15 text-yellow-300',
  Quoted: 'bg-purple-500/15 text-purple-300',
  Won: 'bg-green-500/15 text-green-300',
  Lost: 'bg-red-500/15 text-red-300',
};

const Dashboard = () => {
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    dashboardApi
      .getSummary()
      .then((res) => setSummary(res.data.data))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="text-nova-text-secondary">Loading dashboard...</p>;

  return (
    <>
      <SEO title="Admin Dashboard | Nova Hardscapes" />
      <h1 className="font-heading text-2xl font-bold text-nova-text">Dashboard</h1>
      <p className="mt-1 text-sm text-nova-text-secondary">Overview of leads and site content.</p>

      <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        <StatCard label="Total Leads" value={summary?.totalLeads ?? 0} icon={Users} />
        <StatCard label="New Leads" value={summary?.newLeads ?? 0} icon={UserPlus} />
        <StatCard label="Projects" value={summary?.projects ?? 0} icon={FolderKanban} />
        <StatCard label="Services" value={summary?.services ?? 0} icon={Hammer} />
        <StatCard label="Gallery Images" value={summary?.galleryImages ?? 0} icon={Image} />
        <StatCard label="Products" value={summary?.products ?? 0} icon={Package} />
        <StatCard label="Testimonials" value={summary?.testimonials ?? 0} icon={MessageSquareQuote} />
      </div>

      <div className="mt-8 rounded-xl border border-nova-border bg-nova-card">
        <div className="flex items-center justify-between border-b border-nova-border p-5">
          <h2 className="font-heading text-base font-semibold text-nova-text">Recent Consultation Requests</h2>
          <Link to="/admin/leads" className="focus-ring text-sm text-nova-gold">
            View all
          </Link>
        </div>
        <div className="overflow-x-auto">
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
              {summary?.recentLeads?.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-5 py-6 text-center text-nova-text-secondary">
                    No consultation requests yet.
                  </td>
                </tr>
              )}
              {summary?.recentLeads?.map((lead) => (
                <tr key={lead._id} className="border-b border-white/5">
                  <td className="px-5 py-3 text-nova-text">{lead.fullName}</td>
                  <td className="px-5 py-3 text-nova-text-secondary">{lead.phone}</td>
                  <td className="px-5 py-3 text-nova-text-secondary">{lead.service}</td>
                  <td className="px-5 py-3 text-nova-text-secondary">
                    {new Date(lead.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-5 py-3">
                    <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${statusColors[lead.status]}`}>
                      {lead.status}
                    </span>
                  </td>
                  <td className="px-5 py-3">
                    <a href={`tel:${lead.phone}`} className="focus-ring flex items-center gap-1 text-nova-gold">
                      <Phone size={14} /> Call
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
