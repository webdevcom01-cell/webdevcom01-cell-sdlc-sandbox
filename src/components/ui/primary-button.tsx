'use client';
import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

const buttonVariants = cva(
  'inline-flex items-center justify-center font-medium rounded-xl transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary-600 dark:focus-visible:ring-primary-400 focus-visible:ring-offset-background disabled:opacity-50 disabled:pointer-events-none select-none',
  {
    variants: {
      variant: {
        primary:
          'bg-primary-600 hover:bg-primary-500 active:bg-primary-700 text-white shadow-md dark:bg-primary-400 dark:hover:bg-primary-300 dark:active:bg-primary-500',
        secondary:
          'bg-secondary-700 hover:bg-secondary-600 active:bg-secondary-800 text-white shadow dark:bg-secondary-300 dark:text-black dark:hover:bg-secondary-200 dark:active:bg-secondary-400',
        ghost:
          'bg-transparent hover:bg-primary-100 active:bg-primary-200 text-primary-700 dark:text-primary-300 dark:hover:bg-primary-900 dark:active:bg-primary-800 shadow-none',
      },
      size: {
        sm: 'px-3 py-1.5 text-sm min-h-8',
        md: 'px-4 py-2 text-base min-h-10',
        lg: 'px-6 py-3 text-lg min-h-12',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
);

export interface PrimaryButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  label: string;
  loading?: boolean;
}

export const PrimaryButton = React.forwardRef<HTMLButtonElement, PrimaryButtonProps>(
  function PrimaryButton(
    { label, onClick, disabled, loading = false, size, variant, className, ...props },
    ref
  ) {
    return (
      <button
        ref={ref}
        type={props.type || 'button'}
        className={cn(
          buttonVariants({ variant, size }),
          loading && 'relative text-transparent pointer-events-none',
          className
        )}
        onClick={onClick}
        disabled={disabled || loading}
        aria-busy={loading}
        aria-disabled={disabled || loading}
        {...props}
      >
        <span className={cn('flex items-center gap-2', loading && 'invisible')}>{label}</span>
        {loading && (
          <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <Loader2 className="animate-spin w-5 h-5 text-inherit" aria-hidden="true" />
          </span>
        )}
      </button>
    );
  }
);
PrimaryButton.displayName = 'PrimaryButton';
