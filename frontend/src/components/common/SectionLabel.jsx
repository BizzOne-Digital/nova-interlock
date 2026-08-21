const SectionLabel = ({ children, align = 'center' }) => (
  <p className={`label-uppercase ${align === 'center' ? 'text-center' : ''} mb-3`}>{children}</p>
);

export default SectionLabel;
