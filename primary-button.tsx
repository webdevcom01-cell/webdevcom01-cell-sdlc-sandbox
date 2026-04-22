import React, { ButtonHTMLAttributes, useRef } from "react";
import { tokens } from "./design-tokens";

/**
 * Material 3 Expressive PrimaryButton Props
 */
export interface PrimaryButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "onClick" | "disabled"> {
  /**
   * Button text label
   */
  label: string;
  /**
   * Callback for button press
   */
  onClick: () => void;
  /**
   * Disables the button
   */
  disabled?: boolean;
  /**
   * Shows a loading spinner
   */
  loading?: boolean;
  /**
   * Button size (defaults to "md")
   */
  size?: "sm" | "md" | "lg";
  /**
   * Button visual style (defaults to "primary")
   */
  variant?: "primary" | "secondary" | "ghost";
}

/**
 * Spinner for loading state (uses currentColor)
 */
const Spinner: React.FC = () => (
  <span
    aria-hidden="true"
    className="
      animate-spin
      flex-shrink-0
      w-[1.25em] h-[1.25em]
      text-[inherit]
      "
  >
    <svg
      className="block w-full h-full"
      viewBox="0 0 24 24"
      focusable="false"
      aria-hidden="true"
      role="presentation"
    >
      <circle
        className="opacity-20"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="2"
        fill="none"
      />
      <path
        d="M22 12a10 10 0 0 1-10 10"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  </span>
);

/**
 * Button size class map
 */
const sizeClassMap = {
  sm: {
    minHeight: tokens.component.primaryButton.height.sm,
    minWidth: tokens.component.primaryButton.minWidth,
    px: tokens.component.primaryButton.padding.smX,
    py: tokens.component.primaryButton.padding.smY,
    font: tokens.component.primaryButton.label.fontSize.sm,
    gap: tokens.component.primaryButton.icon.gap.sm,
    radius: tokens.component.primaryButton.shape.rounded,
  },
  md: {
    minHeight: tokens.component.primaryButton.height.md,
    minWidth: tokens.component.primaryButton.minWidth,
    px: tokens.component.primaryButton.padding.mdX,
    py: tokens.component.primaryButton.padding.mdY,
    font: tokens.component.primaryButton.label.fontSize.md,
    gap: tokens.component.primaryButton.icon.gap.md,
    radius: tokens.component.primaryButton.shape.rounded,
  },
  lg: {
    minHeight: tokens.component.primaryButton.height.lg,
    minWidth: tokens.component.primaryButton.minWidth,
    px: tokens.component.primaryButton.padding.lgX,
    py: tokens.component.primaryButton.padding.lgY,
    font: tokens.component.primaryButton.label.fontSize.lg,
    gap: tokens.component.primaryButton.icon.gap.lg,
    radius: tokens.component.primaryButton.shape.rounded,
  },
};

/**
 * Variant class map, using Tailwind and tokens
 */
function getVariantClasses(
  variant: "primary" | "secondary" | "ghost"
): string {
  switch (variant) {
    case "primary":
      return [
        // Light
        `bg-[${tokens.component.primaryButton.container.color.primary.light}]`,
        `text-[${tokens.component.primaryButton.label.color.primary.light}]`,
        // Dark
        `dark:bg-[${tokens.component.primaryButton.container.color.primary.dark}]`,
        `dark:text-[${tokens.component.primaryButton.label.color.primary.dark}]`,
        // Shadow
        tokens.component.primaryButton.elevation.light
          ? `shadow-[${tokens.component.primaryButton.elevation.light}]`
          : "",
        `dark:shadow-[${tokens.component.primaryButton.elevation.dark}]`,
        // No border
        "border-none",
        // State layer
        "hover:bg-[var(--primary-hover,rgba(103,80,164,0.92))]",
        "dark:hover:bg-[var(--primary-hover-dark,rgba(208,188,255,0.12))]",
        "focus-visible:ring-2 focus-visible:ring-[var(--primary-focus,#6750A4)] focus-visible:ring-offset-2 dark:focus-visible:ring-[var(--primary-focus-dark,#D0BCFF)]",
      ].join(" ");
    case "secondary":
      return [
        `bg-[${tokens.component.primaryButton.container.color.secondary.light}]`,
        `text-[${tokens.component.primaryButton.label.color.secondary.light}]`,
        `dark:bg-[${tokens.component.primaryButton.container.color.secondary.dark}]`,
        `dark:text-[${tokens.component.primaryButton.label.color.secondary.dark}]`,
        `border border-[${tokens.component.primaryButton.outline.color.secondary.light}]`,
        `dark:border-[${tokens.component.primaryButton.outline.color.secondary.dark}]`,
        tokens.component.primaryButton.elevation.light
          ? `shadow-[${tokens.component.primaryButton.elevation.light}]`
          : "",
        `dark:shadow-[${tokens.component.primaryButton.elevation.dark}]`,
        "hover:bg-[var(--secondary-hover,rgba(103,80,164,0.08))]",
        "dark:hover:bg-[var(--secondary-hover-dark,rgba(208,188,255,0.08))]",
        "focus-visible:ring-2 focus-visible:ring-[var(--secondary-focus,#625B71)] focus-visible:ring-offset-2 dark:focus-visible:ring-[var(--secondary-focus-dark,#EADDFF)]",
      ].join(" ");
    case "ghost":
      return [
        "bg-transparent",
        `text-[${tokens.component.primaryButton.label.color.ghost.light}]`,
        `dark:text-[${tokens.component.primaryButton.label.color.ghost.dark}]`,
        "hover:bg-[var(--ghost-hover,rgba(103,80,164,0.08))]",
        "dark:hover:bg-[var(--ghost-hover-dark,rgba(208,188,255,0.12))]",
        "focus-visible:ring-2 focus-visible:ring-[var(--ghost-focus,#6750A4)] focus-visible:ring-offset-2 dark:focus-visible:ring-[var(--ghost-focus-dark,#D0BCFF)]",
        "border-none",
      ].join(" ");
    default:
      return "";
  }
}

/**
 * Disabled classes per variant
 */
function getDisabledClasses(variant: "primary" | "secondary" | "ghost"): string {
  switch (variant) {
    case "primary":
      return [
        `bg-[${tokens.component.primaryButton.container.color.primaryDisabled.light}]`,
        `text-[${tokens.component.primaryButton.label.color.primaryDisabled.light}]`,
        `dark:bg-[${tokens.component.primaryButton.container.color.primaryDisabled.dark}]`,
        `dark:text-[${tokens.component.primaryButton.label.color.primaryDisabled.dark}]`,
        "opacity-[0.38]",
        "pointer-events-none",
        "cursor-not-allowed",
      ].join(" ");
    case "secondary":
      return [
        `bg-[${tokens.component.primaryButton.container.color.secondaryDisabled.light}]`,
        `text-[${tokens.component.primaryButton.label.color.secondaryDisabled.light}]`,
        `border border-[${tokens.component.primaryButton.outline.color.secondaryDisabled.light}]`,
        `dark:bg-[${tokens.component.primaryButton.container.color.secondaryDisabled.dark}]`,
        `dark:text-[${tokens.component.primaryButton.label.color.secondaryDisabled.dark}]`,
        `dark:border-[${tokens.component.primaryButton.outline.color.secondaryDisabled.dark}]`,
        "opacity-[0.38]",
        "pointer-events-none",
        "cursor-not-allowed",
      ].join(" ");
    case "ghost":
      return [
        "bg-transparent",
        `text-[${tokens.component.primaryButton.label.color.ghostDisabled.light}]`,
        `dark:text-[${tokens.component.primaryButton.label.color.ghostDisabled.dark}]`,
        "opacity-[0.38]",
        "pointer-events-none",
        "cursor-not-allowed",
      ].join(" ");
    default:
      return "";
  }
}

/**
 * Main PrimaryButton component
 */
export const PrimaryButton: React.FC<PrimaryButtonProps> = ({
  label,
  onClick,
  disabled = false,
  loading = false,
  size = "md",
  variant = "primary",
  ...rest
}) => {
  const btnRef = useRef<HTMLButtonElement>(null);

  // Compose size classes from tokens
  const sizeTokens = sizeClassMap[size];
  // Responsive: min-h and min-w always 44px (touch target)
  const sizeClasses = [
    "inline-flex items-center justify-center select-none",
    `min-h-[44px] min-w-[44px]`, // Always ensure minimum touch targets
    `h-[${sizeTokens.minHeight}] min-w-[${sizeTokens.minWidth}]`,
    `px-[${sizeTokens.px}] py-[${sizeTokens.py}]`,
    `text-[${sizeTokens.font}] font-[${tokens.component.primaryButton.label.fontWeight}]`,
    "uppercase tracking-[.02em]",
    `rounded-[${sizeTokens.radius}]`,
    `gap-[${sizeTokens.gap}]`,
    `transition-[background,box-shadow,border,color] duration-[${tokens.transitions.standard}] ease-in-out`,
    "outline-none",
    "focus-visible:z-10",
  ].join(" ");

  // Main color/variant classes
  const variantClasses = disabled
    ? getDisabledClasses(variant)
    : getVariantClasses(variant);

  // Loading disables interaction and triggers ARIA
  const isDisabled = disabled || loading;

  // ARIA attributes
  const ariaLabelledBy = rest["aria-labelledby"];
  const ariaLabel = rest["aria-label"] || label;

  // Keyboard events: activate on Enter/Space, dismiss on Escape
  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (isDisabled) return;
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onClick();
    }
    if (e.key === "Escape") {
      if (btnRef.current) btnRef.current.blur();
    }
    if (rest.onKeyDown) rest.onKeyDown(e);
  };

  return (
    <button
      ref={btnRef}
      type="button"
      role="button"
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledBy}
      aria-disabled={isDisabled}
      aria-busy={loading}
      tabIndex={isDisabled ? -1 : 0}
      className={`${sizeClasses} ${variantClasses}`}
      disabled={isDisabled}
      onClick={isDisabled ? undefined : onClick}
      onKeyDown={handleKeyDown}
      data-variant={variant}
      data-size={size}
      {...rest}
    >
      <span className="flex items-center w-full justify-center">
        {loading && (
          <span
            aria-live="polite"
            aria-atomic="true"
            className={`mr-[${sizeTokens.gap}] flex items-center`}
          >
            <Spinner />
          </span>
        )}
        <span
          className="truncate"
          id={ariaLabelledBy ? undefined : `button-label-${label.replace(/\s+/g, "-")}`}
        >
          {label}
        </span>
      </span>
    </button>
  );
};

export default PrimaryButton;
