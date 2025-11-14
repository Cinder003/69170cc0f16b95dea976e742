import { create } from 'zustand';
import {
  getProspects,
  createProspect,
  updateProspect,
  deleteProspect,
} from '../api/prospects';
import { Prospect, ProspectFormData } from '../types';

interface ProspectState {
  prospects: Prospect[];
  isLoading: boolean;
  error: string | null;
  fetchProspects: (searchTerm?: string) => Promise<void>;
  addProspect: (prospectData: ProspectFormData) => Promise<void>;
  editProspect: (id: string, prospectData: Partial<ProspectFormData>) => Promise<void>;
  removeProspect: (id: string) => Promise<void>;
}

export const useProspectStore = create<ProspectState>((set) => ({
  prospects: [],
  isLoading: false,
  error: null,
  fetchProspects: async (searchTerm = '') => {
    set({ isLoading: true, error: null });
    try {
      const prospects = await getProspects(searchTerm);
      set({ prospects, isLoading: false });
    } catch (error) {
      set({ error: 'Failed to fetch prospects', isLoading: false });
    }
  },
  addProspect: async (prospectData) => {
    const newProspect = await createProspect(prospectData);
    set((state) => ({
      prospects: [newProspect, ...state.prospects],
    }));
  },
  editProspect: async (id, prospectData) => {
    const updatedProspect = await updateProspect(id, prospectData);
    set((state) => ({
      prospects: state.prospects.map((p) => (p.id === id ? updatedProspect : p)),
    }));
  },
  removeProspect: async (id) => {
    await deleteProspect(id);
    set((state) => ({
      prospects: state.prospects.filter((p) => p.id !== id),
    }));
  },
}));