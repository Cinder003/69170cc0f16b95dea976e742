import { forwardRef, ButtonHTMLAttributes } from 'react';
import { cva, VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';
import { CgSpinner } from 'react-icons/cg';

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-lg px-5 py-2.5 text-sm font-medium transition-all duration-300 focus:outline-none focus:ring-4 disabled:opacity-50 disabled:cursor-not-allowed transform hover:-translate-y-0.5',
  {
    variants: {
      variant: {
        primary:
          'text-white bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 focus:ring-purple-300 shadow-lg shadow-purple-500/50',
        secondary:
          'text-gray-700 bg-white border border-gray-300 hover:bg-gray-100 focus:ring-gray-200',
        danger:
          'text-white bg-gradient-to-r from-red-500 to-rose-500 hover:from-red-600 hover:to-rose-600 focus:ring-red-300 shadow-lg shadow-red-500/50',
      },
    },
    defaultVariants: {
      variant: 'primary',
    },
  }
);

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  isLoading?: boolean;
  icon?: React.ElementType;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, children, isLoading, icon: Icon, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, className }))}
        ref={ref}
        disabled={isLoading}
        {...props}
      >
        {isLoading ? (
          <CgSpinner className="mr-2 h-5 w-5 animate-spin" />
        ) : (
          Icon && <Icon className="mr-2 h-5 w-5" />
        )}
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;