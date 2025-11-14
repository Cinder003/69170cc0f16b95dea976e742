import { forwardRef, InputHTMLAttributes } from 'react';
import { cn } from '../../utils/cn';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  icon?: React.ElementType;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, label, error, icon: Icon, ...props }, ref) => {
    const id = props.id || label.toLowerCase().replace(/\s/g, '-');
    return (
      <div className="relative">
        <label htmlFor={id} className="block mb-2 text-sm font-medium text-gray-700">
          {label}
        </label>
        <div className="relative">
          {Icon && (
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <Icon className="h-5 w-5 text-gray-400" />
            </div>
          )}
          <input
            type={type}
            id={id}
            className={cn(
              'block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 shadow-sm transition-colors duration-200 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-500',
              Icon ? 'pl-10' : 'pl-4',
              error ? 'border-red-500 focus:ring-red-500' : 'focus:ring-purple-500',
              className
            )}
            ref={ref}
            {...props}
          />
        </div>
        {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;