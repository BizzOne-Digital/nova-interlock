import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Modal = ({ open, onClose, title, children, wide }) => (
  <AnimatePresence>
    {open && (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, y: 16, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 16, scale: 0.98 }}
          onClick={(e) => e.stopPropagation()}
          className={`max-h-[90vh] w-full overflow-y-auto rounded-xl border border-nova-border bg-nova-bg-secondary p-6 ${
            wide ? 'max-w-2xl' : 'max-w-lg'
          }`}
        >
          <div className="mb-5 flex items-center justify-between">
            <h2 className="font-heading text-lg font-semibold text-nova-text">{title}</h2>
            <button onClick={onClose} className="focus-ring text-nova-text-secondary hover:text-nova-text">
              <X size={20} />
            </button>
          </div>
          {children}
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
);

export default Modal;
