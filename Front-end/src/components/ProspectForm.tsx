import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Prospect, ProspectFormData } from '../types';
import Input from './ui/Input';
import Button from './ui/Button';
import { FiUser, FiMail, FiPhone, FiBriefcase, FiSave, FiX } from 'react-icons/fi';
import { useEffect } from 'react';

const prospectSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().optional(),
  company: z.string().optional(),
});

interface ProspectFormProps {
  prospectToEdit?: Prospect | null;
  onSubmit: (data: ProspectFormData) => void;
  onCancel: () => void;
  isLoading: boolean;
}

const ProspectForm = ({ prospectToEdit, onSubmit, onCancel, isLoading }: ProspectFormProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProspectFormData>({
    resolver: zodResolver(prospectSchema),
    defaultValues: prospectToEdit || { name: '', email: '', phone: '', company: '' },
  });

  useEffect(() => {
    if (prospectToEdit) {
      reset(prospectToEdit);
    } else {
      reset({ name: '', email: '', phone: '', company: '' });
    }
  }, [prospectToEdit, reset]);

  const isEditing = !!prospectToEdit;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
        {isEditing ? 'Edit Prospect' : 'Add New Prospect'}
      </h2>
      <Input
        id="name"
        label="Full Name"
        icon={FiUser}
        error={errors.name?.message}
        {...register('name')}
        placeholder="e.g., Jane Doe"
      />
      <Input
        id="email"
        label="Email Address"
        type="email"
        icon={FiMail}
        error={errors.email?.message}
        {...register('email')}
        placeholder="e.g., jane.doe@company.com"
      />
      <Input
        id="phone"
        label="Phone Number"
        type="tel"
        icon={FiPhone}
        error={errors.phone?.message}
        {...register('phone')}
        placeholder="e.g., (123) 456-7890"
      />
      <Input
        id="company"
        label="Company"
        icon={FiBriefcase}
        error={errors.company?.message}
        {...register('company')}
        placeholder="e.g., Innovate Corp."
      />
      <div className="flex justify-end space-x-4 pt-4">
        <Button type="button" variant="secondary" onClick={onCancel} icon={FiX}>
          Cancel
        </Button>
        <Button type="submit" isLoading={isLoading} icon={FiSave}>
          {isEditing ? 'Save Changes' : 'Add Prospect'}
        </Button>
      </div>
    </form>
  );
};

export default ProspectForm;