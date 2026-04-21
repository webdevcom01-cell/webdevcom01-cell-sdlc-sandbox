import React from 'react';

export interface PrimaryButtonProps {
  /** Button's visible label */
  label: string;
  /** Click handler */
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  /** Disabled state */
  disabled?: boolean;
  /** Show loading spinner */
  loading?: boolean;
  /** Button size */
  size?: 'sm' | 'md' | 'lg';
  /** Button visual variant */
  variant?: 'primary' | 'secondary' | 'ghost';
}

const SIZE_MAP = {
  sm: {
    height: 36,
    fontSize: 14,
    padding: '0 16px',
    spinner: 16,
  },
  md: {
    height: 44,
    fontSize: 16,
    padding: '0 20px',
    spinner: 18,
  },
  lg: {
    height: 52,
    fontSize: 18,
    padding: '0 24px',
    spinner: 20,
  },
};

const VARIANT_MAP = {
  primary: (disabled: boolean) => ({
    background: disabled ? '#EADDFF' : '#6750A4',
    color: disabled ? '#A09EA4' : '#fff',
    border: 'none',
    boxShadow: disabled ? 'none' : '0px 1px 2px #6750A440',
  }),
  secondary: (disabled: boolean) => ({
    background: disabled ? '#F3EDF7' : '#fff',
    color: disabled ? '#A09EA4' : '#6750A4',
    border: `1px solid ${disabled ? '#E7E0EC' : '#79747E'}`,
    boxShadow: 'none',
  }),
  ghost: (disabled: boolean) => ({
    background: 'transparent',
    color: disabled ? '#A09EA4' : '#6750A4',
    border: 'none',
    boxShadow: 'none',
  }),
};

const Spinner = ({ size = 18 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    aria-hidden="true"
    focusable="false"
    style={{ display: 'inline-block', verticalAlign: 'middle' }}
    role="status"
  >
    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" opacity="0.2" />
    <path
      d="M22 12a10 10 0 0 1-10 10"
      fill="none"
      stroke="currentColor"
      strokeWidth="4"
    >
      <animateTransform
        attributeName="transform"
        type="rotate"
        from="0 12 12"
        to="360 12 12"
        dur="1s"
        repeatCount="indefinite"
      />
    </path>
  </svg>
);

export const PrimaryButton: React.FC<PrimaryButtonProps> = ({
  label,
  onClick,
  disabled = false,
  loading = false,
  size = 'md',
  variant = 'primary',
}) => {
  const sizeStyles = SIZE_MAP[size];
  const variantStyles = VARIANT_MAP[variant](disabled || loading);

  return (
    <button
      type="button"
      style={{
        ...sizeStyles,
        ...variantStyles,
        borderRadius: 100,
        cursor: disabled || loading ? 'not-allowed' : 'pointer',
        fontWeight: 500,
        outline: 'none',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        transition: 'background 0.2s, color 0.2s, box-shadow 0.2s',
        opacity: disabled ? 0.4 : 1,
      }}
      onClick={disabled || loading ? undefined : onClick}
      disabled={disabled}
      aria-disabled={disabled || loading}
      aria-busy={loading}
      role="button"
    >
      {loading && (
        <span style={{ marginRight: 8, display: 'flex', alignItems: 'center' }}>
          <Spinner size={sizeStyles.spinner} />
        </span>
      )}
      {label}
    </button>
  );
};

export default PrimaryButton;