const SkeletonCard = ({ imageHeight = 'h-40' }) => (
  <div className="overflow-hidden rounded-xl border border-nova-border bg-nova-card">
    <div className={`${imageHeight} w-full animate-pulse bg-white/5`} />
    <div className="space-y-2 p-5">
      <div className="h-4 w-3/4 animate-pulse rounded bg-white/10" />
      <div className="h-3 w-full animate-pulse rounded bg-white/5" />
      <div className="h-3 w-5/6 animate-pulse rounded bg-white/5" />
    </div>
  </div>
);

export default SkeletonCard;
