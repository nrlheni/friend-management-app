import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

import { cn } from '@/utils/cn';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-semibold leading-5.5 ring-offset-primary-light transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-0 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-light hover:bg-primary/90',
        destructive:
          'bg-destructive text-primary-light hover:bg-destructive/90',
        outline:
          'border border-stroke bg-primary-light hover:bg-secondary hover:text-primary-dark',
        secondary: 'bg-secondary text-primary-dark hover:bg-secondary/80',
        ghost: 'hover:bg-secondary hover:text-primary-dark',
        link: 'text-primary underline-offset-4 hover:underline',
        icon: 'rounded-full border-none bg-transparent',
        primitive: 'flex justify-start rounded-none font-normal',
      },
      size: {
        default: 'h-12.5 px-4 py-3.5',
        sm: 'h-8.5 px-2 py-3',
        lg: 'h-14 px-6 py-4',
        icon: 'size-10 shrink-0',
        primitive: '',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        ref={ref}
        className={cn(buttonVariants({ variant, size, className }))}
        {...props}
      />
    );
  },
);
Button.displayName = 'Button';

export { Button, buttonVariants };
