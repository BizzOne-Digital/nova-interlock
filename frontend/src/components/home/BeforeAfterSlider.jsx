import { useRef, useState, useCallback } from 'react';
import { ChevronsLeftRight } from 'lucide-react';

const BeforeAfterSlider = ({ beforeSrc, afterSrc, beforeLabel = 'Before', afterLabel = 'After' }) => {
  const containerRef = useRef(null);
  const [position, setPosition] = useState(50);
  const dragging = useRef(false);

  const updatePosition = useCallback((clientX) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const pct = ((clientX - rect.left) / rect.width) * 100;
    setPosition(Math.min(100, Math.max(0, pct)));
  }, []);

  const handleMove = (e) => {
    if (!dragging.current) return;
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    updatePosition(clientX);
  };

  const startDrag = () => {
    dragging.current = true;
  };
  const endDrag = () => {
    dragging.current = false;
  };

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowLeft') setPosition((p) => Math.max(0, p - 5));
    if (e.key === 'ArrowRight') setPosition((p) => Math.min(100, p + 5));
  };

  return (
    <div
      ref={containerRef}
      className="relative aspect-[4/3] w-full select-none overflow-hidden rounded-xl gold-border"
      onMouseMove={handleMove}
      onMouseUp={endDrag}
      onMouseLeave={endDrag}
      onTouchMove={handleMove}
      onTouchEnd={endDrag}
    >
      <img src={afterSrc} alt={afterLabel} className="absolute inset-0 h-full w-full object-cover" loading="lazy" />
      <div className="absolute inset-0 overflow-hidden" style={{ width: `${position}%` }}>
        <img
          src={beforeSrc}
          alt={beforeLabel}
          className="h-full object-cover"
          style={{ width: `${10000 / Math.max(position, 1)}%`, maxWidth: 'none' }}
          loading="lazy"
        />
      </div>

      <span className="absolute left-3 top-3 rounded-md bg-nova-bg/80 px-2.5 py-1 text-xs font-semibold uppercase tracking-wide text-nova-text-secondary">
        {beforeLabel}
      </span>
      <span className="absolute right-3 top-3 rounded-md bg-nova-bg/80 px-2.5 py-1 text-xs font-semibold uppercase tracking-wide text-nova-gold">
        {afterLabel}
      </span>

      <div
        className="absolute top-0 h-full w-0.5 cursor-ew-resize bg-nova-gold"
        style={{ left: `${position}%` }}
        onMouseDown={startDrag}
        onTouchStart={startDrag}
        role="slider"
        tabIndex={0}
        aria-label="Before and after comparison slider"
        aria-valuenow={Math.round(position)}
        aria-valuemin={0}
        aria-valuemax={100}
        onKeyDown={handleKeyDown}
      >
        <div className="absolute left-1/2 top-1/2 flex h-9 w-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-nova-gold text-nova-bg shadow-lg">
          <ChevronsLeftRight size={16} />
        </div>
      </div>
    </div>
  );
};

export default BeforeAfterSlider;
