export interface Prospect {
  id: string;
  name: string;
  email: string;
  phone?: string | null;
  company?: string | null;
  createdAt: string;
  updatedAt: string;
}

export type ProspectFormData = Omit<Prospect, 'id' | 'createdAt' | 'updatedAt'>;