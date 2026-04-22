import React, { ReactNode, KeyboardEvent, useRef } from 'react';
import { 
  borderRadiusLg, 
  elevation3, 
  elevation4, 
  elevation0, 
  outline,
  surface,
  surfaceContainerHighest,
  surfaceVariantAlpha80,
  stateHoverOverlay,
  primary,
  onSurface,
  onSurfaceVariant,
  spacing6,
  spacing4,
  typescaleTitleMediumSize,
  typescaleTitleMediumWeight,
  typescaleTitleMediumFamily,
  typescaleTitleMediumLineHeight,
  typescaleBodySmallSize,
  typescaleBodySmallWeight,
  typescaleBodySmallFamily,
  typescaleBodySmallLineHeight,
  typescaleBodyMediumSize,
  typescaleBodyMediumWeight,
  typescaleBodyMediumFamily,
  typescaleBodyMediumLineHeight,
  transitionsStandard
} from './design-tokens';

/**
 * Props for DashboardCard component.
 */
export interface DashboardCardProps {
  /**
   * Primary heading displayed on the card.
   */
  title: string;
  /**
   * Secondary text displayed beneath the title.
   */
  subtitle?: string;
  /**
   * Content or children to render inside the card.
   */
  content: ReactNode;
  /**
   * Optional image displayed at the top or side of the card.
   */
  imageUrl?: string;
  /**
   * Callback fired when the card is clicked.
   */
  onClick?: () => void;
  /**
   * Visual style of the card, aligning to Material 3 variants.
   */
  variant?: 'elevated' | 'filled' | 'outlined';
  /**
   * Displays a loading state overlay when true.
   */
  loading?: boolean;
}

const variantCardClass: Record<'elevated' | 'filled' | 'outlined', string> = {
  elevated: `bg-[${surface}] shadow-[${elevation3}] border-0`,
  filled: `bg-[${surfaceContainerHighest}] shadow-[${elevation0}] border-0`,
  outlined: `bg-[${surface}] shadow-[${elevation0}] border border-[${outline}]`
};

const variantCardClassDark: Record<'elevated' | 'filled' | 'outlined', string> = {
  elevated: `dark:bg-[${surface}] dark:shadow-[${elevation3}] dark:border-0`,
  filled: `dark:bg-[${surfaceContainerHighest}] dark:shadow-[${elevation0}] dark:border-0`,
  outlined: `dark:bg-[${surface}] dark:shadow-[${elevation0}] dark:border dark:border-[${outline}]`
};

const hoverClass: Record<'elevated' | 'filled' | 'outlined', string> = {
  elevated: `hover:bg-[${stateHoverOverlay}] hover:shadow-[${elevation4}]`,
  filled: `hover:bg-[${stateHoverOverlay}]`,
  outlined: `hover:bg-[${stateHoverOverlay}]`
};

const hoverClassDark: Record<'elevated' | 'filled' | 'outlined', string> = {
  elevated: `dark:hover:bg-[${stateHoverOverlay}] dark:hover:shadow-[${elevation4}]`,
  filled: `dark:hover:bg-[${stateHoverOverlay}]`,
  outlined: `dark:hover:bg-[${stateHoverOverlay}]`
};

const focusRingClass = `focus-visible:ring-2 focus-visible:ring-[${primary}] focus-visible:z-10`;

const titleClass = `
  text-[${typescaleTitleMediumSize}]
  font-[${typescaleTitleMediumWeight}]
  font-[${typescaleTitleMediumFamily}]
  leading-[${typescaleTitleMediumLineHeight}]
  text-[${onSurface}]
  truncate
  dark:text-[${onSurface}]
`;

const subtitleClass = `
  text-[${typescaleBodySmallSize}]
  font-[${typescaleBodySmallWeight}]
  font-[${typescaleBodySmallFamily}]
  leading-[${typescaleBodySmallLineHeight}]
  text-[${onSurfaceVariant}]
  truncate
  dark:text-[${onSurfaceVariant}]
`;

const contentClass = `
  text-[${typescaleBodyMediumSize}]
  font-[${typescaleBodyMediumWeight}]
  font-[${typescaleBodyMediumFamily}]
  leading-[${typescaleBodyMediumLineHeight}]
  text-[${onSurface}]
  flex-1 min-h-0
  dark:text-[${onSurface}]
`;

const imageClass = `
  w-full
  h-[112px]
  rounded-[${borderRadiusLg}]
  object-cover
  mb-[${spacing4}]
  dark:w-full dark:h-[112px] dark:rounded-[${borderRadiusLg}]
`;

const cardBaseClass = `
  relative
  flex flex-col min-w-0
  transition-all
  outline-none
  p-[${spacing6}]
  gap-[${spacing4}]
  rounded-[${borderRadiusLg}]
  font-sans
  min-h-[44px]
  min-w-[44px]
  duration-200
  ease-[cubic-bezier(0.2,0,0,1)]
  focus-visible:outline-none
  select-none
  dark:font-sans
`;

const loadingOverlayClass = `
  absolute inset-0 flex items-center justify-center
  bg-[${surfaceVariantAlpha80}]
  dark:bg-[${surfaceVariantAlpha80}]
  rounded-[${borderRadiusLg}]
  transition-all
  z-10
`;

export const DashboardCard: React.FC<DashboardCardProps> = ({
  title,
  subtitle,
  content,
  imageUrl,
  onClick,
  variant = 'elevated',
  loading = false,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);

  // Interactive when onClick & not loading
  const isInteractive = !!onClick && !loading;

  // Accessibility
  const ariaLabelledById = `dashboard-card-title-${Math.random().toString(36).slice(2, 8)}`;

  // Keyboard interaction handlers
  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (!isInteractive) return;
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onClick && onClick();
    }
    if (e.key === 'Escape') {
      cardRef.current?.blur();
    }
  };

  // Disabled pointer events when loading
  const pointerEventsClass = loading ? 'pointer-events-none opacity-70' : '';

  // Compose variant classes
  const variantClass = `${variantCardClass[variant]} ${variantCardClassDark[variant]}`;
  const hoverVariantClass = isInteractive ? `${hoverClass[variant]} ${hoverClassDark[variant]}` : '';
  const transitionClass = `transition-[box-shadow,background,border] ${transitionsStandard}`;

  return (
    <div
      ref={cardRef}
      tabIndex={isInteractive ? 0 : -1}
      role={isInteractive ? 'button' : undefined}
      aria-labelledby={ariaLabelledById}
      aria-disabled={loading}
      aria-busy={loading}
      aria-live={loading ? 'polite' : undefined}
      onClick={!loading && onClick ? onClick : undefined}
      onKeyDown={handleKeyDown}
      className={[
        cardBaseClass,
        variantClass,
        pointerEventsClass,
        hoverVariantClass,
        focusRingClass,
        transitionClass,
        isInteractive ? 'cursor-pointer' : 'cursor-default',
        'group'
      ].join(' ')}
      data-variant={variant}
      data-loading={loading ? 'true' : undefined}
    >
      {imageUrl && (
        <img
          src={imageUrl}
          alt=""
          aria-hidden="true"
          draggable={false}
          className={imageClass}
        />
      )}
      <div>
        <div
          id={ariaLabelledById}
          className={titleClass}
          title={title}
        >
          {title}
        </div>
        {subtitle && (
          <div
            className={subtitleClass}
            title={subtitle}
          >
            {subtitle}
          </div>
        )}
      </div>
      <div className={contentClass}>
        {content}
      </div>
      {loading && (
        <div
          className={loadingOverlayClass}
          aria-hidden="true"
        >
          <svg
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="none"
            aria-hidden="true"
            className="block"
          >
            <circle
              cx="16"
              cy="16"
              r="12"
              stroke={primary}
              strokeWidth="4"
              opacity="0.2"
            />
            <circle
              cx="16"
              cy="16"
              r="12"
              stroke={primary}
              strokeWidth="4"
              strokeDasharray="18 32"
              strokeLinecap="round"
              className="animate-[dashboard-card-spinner_1s_linear_infinite]"
              style={{ transformOrigin: '50% 50%' } as React.CSSProperties}
            />
            <style>
              {`@keyframes dashboard-card-spinner { 100% { transform: rotate(360deg); } }`}
            </style>
          </svg>
        </div>
      )}
    </div>
  );
};

export default DashboardCard;
