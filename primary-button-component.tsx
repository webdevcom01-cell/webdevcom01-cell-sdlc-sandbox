import React, { useRef } from "react";
import * as tokens from "./design-tokens";

/**
 * Button props for Material 3 Expressive PrimaryButton.
 */
export interface PrimaryButtonProps {
  /**
   * Button text label (required, visible to users and AT)
   */
  label: string;
  /**
   * Click handler for the button.
   */
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  /**
   * If true, the button is disabled and cannot be interacted with.
   */
  disabled?: boolean;
  /**
   * If true, shows a loading spinner and disables interaction.
   */
  loading?: boolean;
  /**
   * Button size: 'sm' | 'md' | 'lg'. Default is 'md'.
   */
  size?: "sm" | "md" | "lg";
  /**
   * Visual style variant: 'primary' | 'secondary' | 'ghost'. Default is 'primary'.
   */
  variant?: "primary" | "secondary" | "ghost";
  /**
   * Optional id for aria-labelledby scenarios.
   */
  id?: string;
}

const SIZE_MAP = {
  sm: {
    height: "min-h-[44px] h-11", // Tailwind: min-h-44px, h-44px (rounded to 44px)
    px: "px-4", // 16px
    text: "text-base", // 16px
    icon: 16,
    gap: "gap-2",
  },
  md: {
    height: "min-h-[44px] h-12", // 48px, always min 44px
    px: "px-5", // 20px
    text: "text-lg", // 18px
    icon: 18,
    gap: "gap-2.5",
  },
  lg: {
    height: "min-h-[44px] h-[56px]", // 56px, always min 44px
    px: "px-6", // 24px
    text: "text-xl", // 20px
    icon: 20,
    gap: "gap-3",
  },
};

/**
 * Styling map for button variants, referencing only design tokens.
 */
function getVariantClasses(variant: "primary" | "secondary" | "ghost", disabled: boolean, loading: boolean) {
  // Always match dark/light, never hardcode
  const isInactive = disabled || loading;
  switch (variant) {
    case "primary":
      return [
        `bg-[${tokens.sysColorPrimary}] dark:bg-[${tokens.sysColorPrimaryDark}]`,
        `text-[${tokens.sysColorOnPrimary}] dark:text-[${tokens.sysColorOnPrimaryDark}]`,
        "border-0 shadow",
        isInactive
          ? `opacity-40 bg-[${tokens.sysColorPrimaryDisabled}] dark:bg-[${tokens.sysColorPrimaryDisabledDark}] text-[${tokens.sysColorOnPrimaryDisabled}] dark:text-[${tokens.sysColorOnPrimaryDisabledDark}] shadow-none`
          : "",
        "focus-visible:ring-2",
        `focus-visible:ring-[${tokens.sysColorPrimary}] dark:focus-visible:ring-[${tokens.sysColorPrimaryDark}]`,
        "focus-visible:ring-offset-2",
      ].join(" ");
    case "secondary":
      return [
        `bg-[${tokens.sysColorSurface}] dark:bg-[${tokens.sysColorSurfaceDark}]`,
        `text-[${tokens.sysColorPrimary}] dark:text-[${tokens.sysColorPrimaryDark}]`,
        `border border-[${tokens.sysColorOutline}] dark:border-[${tokens.sysColorOutlineDark}]`,
        isInactive
          ? `opacity-40 bg-[${tokens.sysColorSurfaceDisabled}] dark:bg-[${tokens.sysColorSurfaceDisabledDark}] border-[${tokens.sysColorOutlineDisabled}] dark:border-[${tokens.sysColorOutlineDisabledDark}] text-[${tokens.sysColorOnSurfaceDisabled}] dark:text-[${tokens.sysColorOnSurfaceDisabledDark}]`
          : "",
        "shadow-none",
        "focus-visible:ring-2",
        `focus-visible:ring-[${tokens.sysColorPrimary}] dark:focus-visible:ring-[${tokens.sysColorPrimaryDark}]`,
        "focus-visible:ring-offset-2"
      ].join(" ");
    case "ghost":
      return [
        "bg-transparent dark:bg-transparent",
        `text-[${tokens.sysColorPrimary}] dark:text-[${tokens.sysColorPrimaryDark}]`,
        "border-0 shadow-none",
        isInactive
          ? `opacity-40 text-[${tokens.sysColorOnSurfaceDisabled}] dark:text-[${tokens.sysColorOnSurfaceDisabledDark}]`
          : "",
        "focus-visible:ring-2",
        `focus-visible:ring-[${tokens.sysColorPrimary}] dark:focus-visible:ring-[${tokens.sysColorPrimaryDark}]`,
        "focus-visible:ring-offset-2"
      ].join(" ");
    default:
      return "";
  }
}

/**
 * Spinner shown when loading, accessible to screen readers.
 */
const Spinner: React.FC<{ size: number }> = ({ size }) => (
  <svg
    className="animate-spin inline-block"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    aria-hidden="true"
    focusable="false"
    role="status"
  >
    <circle
      className="opacity-30"
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="4"
      fill="none"
    />
    <path
      className="opacity-70"
      fill="none"
      stroke="currentColor"
      strokeWidth="4"
      d="M22 12a10 10 0 0 1-10 10"
    />
  </svg>
);

export const PrimaryButton: React.FC<PrimaryButtonProps> = ({
  label,
  onClick,
  disabled = false,
  loading = false,
  size = "md",
  variant = "primary",
  id,
}) => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const { height, px, text, icon, gap } = SIZE_MAP[size];

  // Keyboard: Enter/Space/Tab/ESC (ESC here does nothing, but pattern shown for extension)
  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (disabled || loading) return;
    if (e.key === "Escape") {
      (e.target as HTMLButtonElement).blur();
    }
    // Enter/Space handled natively by <button>
  };

  return (
    <button
      ref={buttonRef}
      id={id}
      type="button"
      className={[
        "relative select-none outline-none font-medium",
        "inline-flex items-center justify-center w-full",
        height,
        px,
        gap,
        text,
        "rounded-[var(--radius-m3-full)]", // use tokens for full/calm shape
        "transition-all",
        tokens.transitions.standard,
        "overflow-hidden",
        "min-w-[44px]", // Touch target
        getVariantClasses(variant, disabled, loading),
        "disabled:pointer-events-none",
        "focus-visible:z-10",
        "cursor-pointer",
        (disabled || loading) ? "cursor-not-allowed" : "",
      ].join(" ")}
      tabIndex={disabled ? -1 : 0}
      aria-disabled={disabled || loading}
      aria-busy={loading}
      aria-label={label}
      aria-live={loading ? "polite" : undefined}
      disabled={disabled}
      onClick={disabled || loading ? undefined : onClick}
      onKeyDown={handleKeyDown}
      role="button"
    >
      {/* Loading spinner (aria-live updated) */}
      {loading && (
        <span
          className={`mr-2 flex items-center`}
          aria-live="polite"
          aria-label="Loading"
        >
          <Spinner size={icon} />
        </span>
      )}
      <span
        className={`truncate`}
        id={id ? `${id}-label` : undefined}
      >
        {label}
      </span>
    </button>
  );
};

export default PrimaryButton;