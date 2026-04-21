import React, { ReactNode, KeyboardEvent, useRef, useState } from "react";
import tokens from "./design-tokens";

/**
 * Material 3 Expressive DashboardCard component.
 */
export interface DashboardCardProps {
  /**
   * Main heading of the card.
   */
  title: string;
  /**
   * Secondary text under the title.
   */
  subtitle?: string;
  /**
   * Content to display inside the card.
   */
  content: ReactNode;
  /**
   * URL of the image to display at the top of the card.
   */
  imageUrl?: string;
  /**
   * Click handler for the card.
   */
  onClick?: () => void;
  /**
   * Visual style of the card.
   * - `elevated`: shadowed surface
   * - `filled`: filled surface
   * - `outlined`: outlined surface
   */
  variant?: "elevated" | "filled" | "outlined";
  /**
   * Whether to show a loading state.
   */
  loading?: boolean;
}

/**
 * DashboardCard: Material 3 Expressive production-ready card for dashboard content.
 */
export const DashboardCard: React.FC<DashboardCardProps> = ({
  title,
  subtitle,
  content,
  imageUrl,
  onClick,
  variant = "elevated",
  loading = false,
}) => {
  // State for focus-visible handling
  const [focusVisible, setFocusVisible] = useState(false);
  const [hovered, setHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  // Interactive & accessibility
  const isInteractive = !!onClick;
  const isDisabled = loading;

  // IDs for aria-labeling
  const titleId = `dashboard-card-title-${Math.random().toString(36).slice(2, 10)}`;
  const subtitleId = `dashboard-card-subtitle-${Math.random().toString(36).slice(2, 10)}`;

  // Variant classes
  let baseBg = "bg-[var(--ds-surface)] dark:bg-[var(--ds-surface-dark)]";
  let baseShadow = "shadow-none";
  let baseBorder = "border-0";
  let baseOutline = "";
  if (variant === "elevated") {
    baseBg = "bg-[var(--ds-surface)] dark:bg-[var(--ds-surface-dark)]";
    baseShadow = "shadow-[var(--ds-elevation-1)] dark:shadow-[var(--ds-elevation-1-dark)]";
    if (hovered && !isDisabled) baseShadow = "shadow-[var(--ds-elevation-2)] dark:shadow-[var(--ds-elevation-2-dark)]";
    if (focusVisible) baseOutline = "ring-2 ring-[var(--ds-primary)] ring-offset-2";
  } else if (variant === "filled") {
    baseBg = "bg-[var(--ds-surface-variant)] dark:bg-[var(--ds-surface-variant-dark)]";
    baseShadow = "shadow-none";
    if (focusVisible) baseOutline = "ring-2 ring-[var(--ds-primary)] ring-offset-2";
  } else if (variant === "outlined") {
    baseBg = "bg-[var(--ds-surface)] dark:bg-[var(--ds-surface-dark)]";
    baseBorder = "border border-[var(--ds-outline)] dark:border-[var(--ds-outline-dark)]";
    if (focusVisible) baseBorder = "border-2 border-[var(--ds-primary)] dark:border-[var(--ds-primary-dark)]";
  }

  // Loading state
  const loadingBg = "bg-[var(--ds-loading)] dark:bg-[var(--ds-loading-dark)]";
  const opacity = loading ? "opacity-70" : "opacity-100";
  const pointerClass = isInteractive && !isDisabled ? "cursor-pointer" : "cursor-default";
  const disableEvents = isDisabled ? "pointer-events-none" : "";

  // Focus styles (never outline-none)
  const focusClasses =
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ds-primary)] focus-visible:ring-offset-2";

  // Touch target
  const touchTarget = "min-w-[44px] min-h-[44px]";

  // Typography
  const fontTitle = "font-semibold text-lg leading-tight truncate";
  const fontSubtitle = "font-normal text-base opacity-70 leading-tight truncate";
  const fontContent = "font-normal text-base leading-normal";

  // Padding and radius
  const padding = "px-[var(--ds-spacing-lg)] py-[var(--ds-spacing-lg)]";
  const radius = "rounded-[var(--ds-radius)]";

  // Responsive
  const responsive = "sm:p-[var(--ds-spacing-lg)] md:p-[var(--ds-spacing-xl)]";

  // Transition
  const transition = "transition-[box-shadow,background,border,color] duration-[var(--ds-transition)] ease-[var(--ds-easing)]";

  // Image
  const imageRadius = "rounded-t-[var(--ds-radius)]";
  const imageMargin = "mb-[var(--ds-spacing-md)]";
  const imageClass = `w-full object-cover ${imageRadius} ${imageMargin} max-h-48 sm:max-h-56 md:max-h-64`;

  // SKELETONS
  const skeletonBase = "animate-pulse rounded bg-[var(--ds-loading)] dark:bg-[var(--ds-loading-dark)]";
  const skeletonTitle = "w-32 h-5 mb-1 " + skeletonBase;
  const skeletonSubtitle = "w-20 h-4 mb-2 " + skeletonBase;
  const skeletonContent = "w-full h-12 mt-1 " + skeletonBase;

  // ARIA
  const ariaRole = isInteractive ? "button" : undefined;
  const ariaLabelledBy = subtitle
    ? `${titleId} ${subtitleId}`
    : titleId;
  const ariaDisabled = isDisabled ? true : undefined;
  const ariaBusy = loading ? true : undefined;

  // Keyboard handlers
  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (!isInteractive || isDisabled) return;
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onClick && onClick();
    }
    if (e.key === "Escape") {
      (e.currentTarget as HTMLElement).blur();
    }
  };

  const handleFocus = (e: React.FocusEvent<HTMLDivElement>) => {
    if (e.target === cardRef.current) setFocusVisible(true);
  };
  const handleBlur = () => setFocusVisible(false);

  // DESIGN TOKENS (CSS custom properties)
  // These should be set at the application's root, but we set them here for demo completeness
  // In production, these would be injected via the global CSS or with tailwind.config.js theme tokens
  const vars = {
    "--ds-surface": tokens.color.surface,
    "--ds-surface-dark": tokens.color.surfaceDark,
    "--ds-surface-variant": tokens.color.surfaceVariant,
    "--ds-surface-variant-dark": tokens.color.surfaceVariantDark,
    "--ds-outline": tokens.color.outline,
    "--ds-outline-dark": tokens.color.outlineDark,
    "--ds-primary": tokens.color.primary,
    "--ds-primary-dark": tokens.color.primaryDark,
    "--ds-loading": tokens.color.loading,
    "--ds-loading-dark": tokens.color.loadingDark,
    "--ds-elevation-1": tokens.shadow.elevated,
    "--ds-elevation-1-dark": tokens.shadow.elevatedDark,
    "--ds-elevation-2": tokens.shadow.hover,
    "--ds-elevation-2-dark": tokens.shadow.hoverDark,
    "--ds-spacing-lg": tokens.spacing.lg,
    "--ds-spacing-xl": tokens.spacing.xl,
    "--ds-radius": tokens.radius.lg,
    "--ds-transition": tokens.transition.standard,
    "--ds-easing": tokens.transition.easing,
  } as React.CSSProperties;

  return (
    <div
      ref={cardRef}
      tabIndex={isInteractive && !isDisabled ? 0 : undefined}
      role={ariaRole}
      aria-labelledby={ariaLabelledBy}
      aria-disabled={ariaDisabled}
      aria-busy={ariaBusy}
      aria-live={loading ? "polite" : undefined}
      onClick={isInteractive && !isDisabled ? onClick : undefined}
      onKeyDown={handleKeyDown}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={[
        "relative flex flex-col",
        baseBg,
        baseBorder,
        baseShadow,
        baseOutline,
        opacity,
        pointerClass,
        disableEvents,
        padding,
        responsive,
        radius,
        transition,
        focusClasses,
        touchTarget,
        "gap-[var(--ds-spacing-md)]",
        "font-sans",
        "select-none",
        "outline-none",
        "w-full",
        "min-w-0",
        "min-h-0",
      ].join(" ")}
      style={vars}
      data-variant={variant}
      data-state={loading ? "loading" : focusVisible ? "focus" : hovered ? "hover" : "default"}
    >
      {imageUrl && !loading && (
        <img
          src={imageUrl}
          alt=""
          className={imageClass}
          draggable={false}
        />
      )}

      <div className="flex flex-col gap-[var(--ds-spacing-xs)]">
        <div
          id={titleId}
          className={fontTitle + " text-[var(--ds-on-surface)] dark:text-[var(--ds-on-surface-dark)]"}
        >
          {loading ? <span className={skeletonTitle} /> : title}
        </div>
        {subtitle && (
          <div
            id={subtitleId}
            className={fontSubtitle + " text-[var(--ds-on-surface)] dark:text-[var(--ds-on-surface-dark)]"}
          >
            {loading ? <span className={skeletonSubtitle} /> : subtitle}
          </div>
        )}
      </div>
      <div
        className={fontContent + " text-[var(--ds-on-surface)] dark:text-[var(--ds-on-surface-dark)] flex-1"}
      >
        {loading ? <span className={skeletonContent} /> : content}
      </div>
      {/* Focus ring (visible only if focusVisible) */}
      <span
        aria-hidden="true"
        className={[
          "pointer-events-none absolute inset-0 rounded-[var(--ds-radius)] transition-[box-shadow] duration-[var(--ds-transition)]",
          focusVisible ? "ring-2 ring-[var(--ds-primary)] ring-offset-2" : "",
        ].join(" ")}
      />
    </div>
  );
};

export default DashboardCard;
