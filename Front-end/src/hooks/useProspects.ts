import { useEffect } from 'react';
import { useProspectStore } from '../store/prospectStore';
import { Prospect, ProspectFormData } from '../types';
import toast from 'react-hot-toast';

export const useProspects = (searchTerm: string) => {
  const {
    prospects,
    isLoading,
    error,
    fetchProspects,
    addProspect,
    editProspect,
    removeProspect,
  } = useProspectStore();

  useEffect(() => {
    fetchProspects(searchTerm);
  }, [fetchProspects, searchTerm]);

  const handleAddProspect = async (data: ProspectFormData) => {
    try {
      await addProspect(data);
      toast.success('Prospect added successfully!');
    } catch (err) {
      const errorMessage = (err as any)?.response?.data?.message || 'Failed to add prospect.';
      toast.error(errorMessage);
      throw err;
    }
  };

  const handleUpdateProspect = async (id: string, data: Partial<ProspectFormData>) => {
    try {
      await editProspect(id, data);
      toast.success('Prospect updated successfully!');
    } catch (err) {
      const errorMessage = (err as any)?.response?.data?.message || 'Failed to update prospect.';
      toast.error(errorMessage);
      throw err;
    }
  };

  const handleDeleteProspect = async (id: string) => {
    try {
      await removeProspect(id);
      toast.success('Prospect deleted successfully!');
    } catch (err) {
      toast.error('Failed to delete prospect.');
      throw err;
    }
  };

  return {
    prospects,
    isLoading,
    error,
    addProspect: handleAddProspect,
    updateProspect: handleUpdateProspect,
    deleteProspect: handleDeleteProspect,
  };
};