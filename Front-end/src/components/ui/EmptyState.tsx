import { FiUsers } from 'react-icons/fi';
import { motion } from 'framer-motion';

interface EmptyStateProps {
  onAddProspect: () => void;
}

const EmptyState = ({ onAddProspect }: EmptyStateProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="text-center bg-gradient-to-br from-purple-50 via-blue-50 to-white p-12 rounded-2xl border-2 border-dashed border-purple-200"
    >
      <div className="mx-auto flex items-center justify-center h-20 w-20 rounded-full bg-gradient-to-br from-purple-200 to-blue-200">
        <FiUsers className="h-10 w-10 text-purple-600" />
      </div>
      <h3 className="mt-5 text-2xl font-semibold text-gray-800">No prospects found</h3>
      <p className="mt-2 text-base text-gray-500">
        Get started by adding your first prospect.
      </p>
      <div className="mt-6">
        <button
          onClick={onAddProspect}
          type="button"
          className="inline-flex items-center rounded-lg bg-gradient-to-r from-purple-500 to-blue-500 px-5 py-2.5 text-sm font-medium text-white shadow-lg shadow-purple-500/50 transition-transform duration-300 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-purple-300"
        >
          Add Prospect
        </button>
      </div>
    </motion.div>
  );
};

export default EmptyState;