import { Prospect } from '../types';
import ProspectItem from './ProspectItem';
import { AnimatePresence } from 'framer-motion';

interface ProspectListProps {
  prospects: Prospect[];
  onEdit: (prospect: Prospect) => void;
  onDelete: (id: string) => void;
}

const ProspectList = ({ prospects, onEdit, onDelete }: ProspectListProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <AnimatePresence>
        {prospects.map((prospect) => (
          <ProspectItem
            key={prospect.id}
            prospect={prospect}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </AnimatePresence>
    </div>
  );
};

export default ProspectList;