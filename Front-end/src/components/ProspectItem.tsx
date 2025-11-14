import { Prospect } from '../types';
import { FiMail, FiPhone, FiBriefcase, FiEdit, FiTrash2 } from 'react-icons/fi';
import { motion } from 'framer-motion';

interface ProspectItemProps {
  prospect: Prospect;
  onEdit: (prospect: Prospect) => void;
  onDelete: (id: string) => void;
}

const ProspectItem = ({ prospect, onEdit, onDelete }: ProspectItemProps) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="bg-gradient-to-br from-white via-purple-50 to-blue-100 p-6 rounded-xl shadow-lg hover:shadow-2xl hover:shadow-purple-200/50 transition-all duration-300 transform hover:-translate-y-1 border border-purple-200"
    >
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-xl font-bold text-gray-800">{prospect.name}</h3>
          {prospect.company && (
            <p className="flex items-center text-sm text-gray-600 mt-1">
              <FiBriefcase className="mr-2 text-purple-500" /> {prospect.company}
            </p>
          )}
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => onEdit(prospect)}
            className="p-2 rounded-full text-blue-500 bg-blue-100 hover:bg-blue-200 transition-colors"
            aria-label={`Edit ${prospect.name}`}
          >
            <FiEdit />
          </button>
          <button
            onClick={() => onDelete(prospect.id)}
            className="p-2 rounded-full text-red-500 bg-red-100 hover:bg-red-200 transition-colors"
            aria-label={`Delete ${prospect.name}`}
          >
            <FiTrash2 />
          </button>
        </div>
      </div>
      <div className="mt-4 space-y-2 text-gray-700">
        <p className="flex items-center">
          <FiMail className="mr-3 text-purple-500" />
          <a href={`mailto:${prospect.email}`} className="hover:text-blue-600 transition-colors">
            {prospect.email}
          </a>
        </p>
        {prospect.phone && (
          <p className="flex items-center">
            <FiPhone className="mr-3 text-purple-500" />
            <span>{prospect.phone}</span>
          </p>
        )}
      </div>
    </motion.div>
  );
};

export default ProspectItem;