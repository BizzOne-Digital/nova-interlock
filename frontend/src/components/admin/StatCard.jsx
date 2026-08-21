const StatCard = ({ label, value, icon: Icon }) => (
  <div className="rounded-xl border border-nova-border bg-nova-card p-5">
    <div className="flex items-center justify-between">
      <p className="text-xs uppercase tracking-wide text-nova-text-secondary">{label}</p>
      {Icon && <Icon size={18} className="text-nova-gold" />}
    </div>
    <p className="mt-2 font-heading text-2xl font-bold text-nova-text">{value}</p>
  </div>
);

export default StatCard;
