import { useState, useMemo } from 'react';
import { useProspects } from '../hooks/useProspects';
import ProspectList from '../components/ProspectList';
import ProspectForm from '../components/ProspectForm';
import Modal from '../components/ui/Modal';
import Button from '../components/ui/Button';
import Spinner from '../components/ui/Spinner';
import EmptyState from '../components/ui/EmptyState';
import { Prospect, ProspectFormData } from '../types';
import { FiPlus, FiSearch } from 'react-icons/fi';
import { useDebounce } from '../hooks/useDebounce';

const ProspectsPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [prospectToEdit, setProspectToEdit] = useState<Prospect | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  const { prospects, isLoading, addProspect, updateProspect, deleteProspect } = useProspects(debouncedSearchTerm);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleAddClick = () => {
    setProspectToEdit(null);
    setIsModalOpen(true);
  };

  const handleEditClick = (prospect: Prospect) => {
    setProspectToEdit(prospect);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setProspectToEdit(null);
  };

  const handleSubmit = async (data: ProspectFormData) => {
    setIsSubmitting(true);
    try {
      if (prospectToEdit) {
        await updateProspect(prospectToEdit.id, data);
      } else {
        await addProspect(data);
      }
      handleCloseModal();
    } catch (error) {
      console.error('Submission failed:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this prospect?')) {
      deleteProspect(id);
    }
  };

  const hasProspects = useMemo(() => prospects.length > 0, [prospects]);

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
          Prospects Dashboard
        </h1>
        <div className="flex items-center gap-4 w-full md:w-auto">
          <div className="relative w-full md:w-64">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search prospects..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-400 focus:border-transparent transition"
            />
          </div>
          <Button onClick={handleAddClick} icon={FiPlus}>
            Add New
          </Button>
        </div>
      </div>

      {isLoading && <Spinner />}
      {!isLoading && !hasProspects && <EmptyState onAddProspect={handleAddClick} />}
      {!isLoading && hasProspects && (
        <ProspectList prospects={prospects} onEdit={handleEditClick} onDelete={handleDelete} />
      )}

      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <ProspectForm
          prospectToEdit={prospectToEdit}
          onSubmit={handleSubmit}
          onCancel={handleCloseModal}
          isLoading={isSubmitting}
        />
      </Modal>
    </div>
  );
};

export default ProspectsPage;