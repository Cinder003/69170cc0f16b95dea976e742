import axios from 'axios';
import { Prospect, ProspectFormData } from '../types';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

export const getProspects = async (searchTerm: string = ''): Promise<Prospect[]> => {
  const response = await api.get('/prospects', { params: { search: searchTerm } });
  return response.data;
};

export const createProspect = async (prospectData: ProspectFormData): Promise<Prospect> => {
  const response = await api.post('/prospects', prospectData);
  return response.data;
};

export const updateProspect = async (id: string, prospectData: Partial<ProspectFormData>): Promise<Prospect> => {
  const response = await api.put(`/prospects/${id}`, prospectData);
  return response.data;
};

export const deleteProspect = async (id: string): Promise<void> => {
  await api.delete(`/prospects/${id}`);
};