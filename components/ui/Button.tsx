'use client';

import type { ButtonHTMLAttributes, ReactNode } from 'react';

type Variant = 'primary' | 'secondary' | 'danger' | 'ghost';
type Size = 'sm' | 'md' | 'lg';

const base =
  'inline-flex items-center justify-center gap-2 font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400/60 disabled:cursor-not-allowed disabled:opacity-50';

const variants: Record<Variant, string> = {
  primary: 'bg-green-600 text-white hover:bg-green-700',
  secondary: 'bg-white/10 text-white hover:bg-white/20',
  danger: 'bg-red-700 text-white hover:bg-red-800',
  ghost: 'text-white/70 hover:bg-white/10 hover:text-white',
};

const sizes: Record<Size, string> = {
  sm: 'h-8 px-3 text-xs rounded-lg',
  md: 'h-10 px-4 text-sm rounded-lg',
  lg: 'h-11 px-6 text-sm rounded-lg',
};

const iconSizes: Record<Size, string> = {
  sm: 'h-8 w-8 rounded-full',
  md: 'h-10 w-10 rounded-full',
  lg: 'h-13 w-13 rounded-full',
};

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  size?: Size;
};

export function Button({
  variant = 'primary',
  size = 'md',
  className = '',
  type = 'button',
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    />
  );
}

type IconButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  label: string;
  icon: ReactNode;
  variant?: Variant;
  size?: Size;
};

export function IconButton({
  label,
  icon,
  variant = 'primary',
  size = 'md',
  className = '',
  type = 'button',
  ...props
}: IconButtonProps) {
  return (
    <button
      type={type}
      aria-label={label}
      title={label}
      className={`${base} ${variants[variant]} ${iconSizes[size]} ${className}`}
      {...props}
    >
      {icon}
    </button>
  );
}
