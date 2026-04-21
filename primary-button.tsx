import React, { useRef } from "react";
import clsx from "clsx";
import * as tokens from "./design-tokens";

/**
 * Button sizes.
 */
export type ButtonSize = "sm" | "md" | "lg";

/**
 * Button visual variants.
 */
export type ButtonVariant = "primary" | "secondary" | "ghost";

/**
 * Props for PrimaryButton.
 */
export interface PrimaryButtonProps {
  /** Button text label (required, visible, accessible). */
  label: string;
  /** Click event handler. */
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  /** Disables the button and prevents interaction. */
  disabled?: boolean;
  /** Shows loading indicator (spinner) and prevents interaction. */
  loading?: boolean;
  /** Button size: small, medium, or large. Default is medium. */
  size?: ButtonSize;
  /** Button visual style. Default is primary. */
  variant?: ButtonVariant;
  /** Optional id for aria-labelledby scenarios. */
  id?: string;
  /** Optional extra className for custom styling. */
  className?: string;
  /** Pass-through for button type. */
  type?: "button" | "submit" | "reset";
}

/**
 * Spinner for loading state (uses tokens for color).
 */
const Spinner: React.FC<{ color: string; size: number }> = ({ color, size }) => (
  <svg
    className="animate-spin"
    width={size}
    height={size}
    viewBox="0 0 20 20"
    aria-hidden="true"
    focusable="false"
  >
    <circle
      cx="10"
      cy="10"
      r="7"
      fill="none"
      stroke={color}
      strokeWidth="2"
      strokeDasharray="34"
      strokeDashoffset="10"
      strokeLinecap="round"
    />
  </svg>
);

const sizeTokenMap: Record<ButtonSize, { height: string; px: string; text: string; minWidth: string; spinner: number }> = {
  sm: {
    height: tokens.button.sm.height,
    px: tokens.button.sm.px,
    text: tokens.button.sm.text,
    minWidth: tokens.button.sm.minWidth,
    spinner: tokens.button.sm.spinnerSize,
  },
  md: {
    height: tokens.button.md.height,
    px: tokens.button.md.px,
    text: tokens.button.md.text,
    minWidth: tokens.button.md.minWidth,
    spinner: tokens.button.md.spinnerSize,
  },
  lg: {
    height: tokens.button.lg.height,
    px: tokens.button.lg.px,
    text: tokens.button.lg.text,
    minWidth: tokens.button.lg.minWidth,
    spinner: tokens.button.lg.spinnerSize,
  },
};

const variantTokenMap: Record<
  ButtonVariant,
  {
    bg: string;
    color: string;
    border: string;
    shadow: string;
    hoverBg: string;
    focusBg: string;
    focusRing: string;
    disabledBg: string;
    disabledColor: string;
    darkBg: string;
    darkHoverBg: string;
    darkFocusBg: string;
    darkColor: string;
    darkDisabledBg: string;
    darkDisabledColor: string;
    borderDark: string;
    shadowDark: string;
  }
> = {
  primary: {
    bg: tokens.button.primary.bg,
    color: tokens.button.primary.color,
    border: tokens.button.primary.border,
    shadow: tokens.button.primary.shadow,
    hoverBg: tokens.button.primary.hoverBg,
    focusBg: tokens.button.primary.focusBg,
    focusRing: tokens.button.primary.focusRing,
    disabledBg: tokens.button.primary.disabledBg,
    disabledColor: tokens.button.primary.disabledColor,
    darkBg: tokens.button.primary.darkBg,
    darkHoverBg: tokens.button.primary.darkHoverBg,
    darkFocusBg: tokens.button.primary.darkFocusBg,
    darkColor: tokens.button.primary.darkColor,
    darkDisabledBg: tokens.button.primary.darkDisabledBg,
    darkDisabledColor: tokens.button.primary.darkDisabledColor,
    borderDark: tokens.button.primary.borderDark,
    shadowDark: tokens.button.primary.shadowDark,
  },
  secondary: {
    bg: tokens.button.secondary.bg,
    color: tokens.button.secondary.color,
    border: tokens.button.secondary.border,
    shadow: tokens.button.secondary.shadow,
    hoverBg: tokens.button.secondary.hoverBg,
    focusBg: tokens.button.secondary.focusBg,
    focusRing: tokens.button.secondary.focusRing,
    disabledBg: tokens.button.secondary.disabledBg,
    disabledColor: tokens.button.secondary.disabledColor,
    darkBg: tokens.button.secondary.darkBg,
    darkHoverBg: tokens.button.secondary.darkHoverBg,
    darkFocusBg: tokens.button.secondary.darkFocusBg,
    darkColor: tokens.button.secondary.darkColor,
    darkDisabledBg: tokens.button.secondary.darkDisabledBg,
    darkDisabledColor: tokens.button.secondary.darkDisabledColor,
    borderDark: tokens.button.secondary.borderDark,
    shadowDark: tokens.button.secondary.shadowDark,
  },
  ghost: {
    bg: tokens.button.ghost.bg,
    color: tokens.button.ghost.color,
    border: tokens.button.ghost.border,
    shadow: tokens.button.ghost.shadow,
    hoverBg: tokens.button.ghost.hoverBg,
    focusBg: tokens.button.ghost.focusBg,
    focusRing: tokens.button.ghost.focusRing,
    disabledBg: tokens.button.ghost.disabledBg,
    disabledColor: tokens.button.ghost.disabledColor,
    darkBg: tokens.button.ghost.darkBg,
    darkHoverBg: tokens.button.ghost.darkHoverBg,
    darkFocusBg: tokens.button.ghost.darkFocusBg,
    darkColor: tokens.button.ghost.darkColor,
    darkDisabledBg: tokens.button.ghost.darkDisabledBg,
    darkDisabledColor: tokens.button.ghost.darkDisabledColor,
    borderDark: tokens.button.ghost.borderDark,
    shadowDark: tokens.button.ghost.shadowDark,
  },
};

/**
 * PrimaryButton – Material 3 Expressive, Calm UI, fully accessible, responsive, and themeable.
 */
export const PrimaryButton: React.FC<PrimaryButtonProps> = ({
  label,
  onClick,
  disabled = false,
  loading = false,
  size = "md",
  variant = "primary",
  id,
  className,
  type = "button",
}) => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const isDisabled = disabled || loading;
  const sizeTokens = sizeTokenMap[size];
  const variantTokens = variantTokenMap[variant];

  /**
   * Keyboard interaction: activate with Enter/Space, dismiss focus with Escape.
   */
  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (isDisabled) return;
    if ((e.key === "Enter" || e.key === " ") && onClick) {
      e.preventDefault();
      onClick(e as any);
    }
    if (e.key === "Escape") {
      (buttonRef.current as HTMLButtonElement | null)?.blur();
    }
  };

  return (
    <button
      ref={buttonRef}
      id={id}
      type={type}
      className={clsx(
        // Base + responsive
        "relative inline-flex items-center justify-center select-none font-semibold",
        "transition-all duration-[--tokens-transition-standard]",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[--tokens-button-focus-ring]",
        "rounded-[--tokens-button-corner]",
        "min-h-[44px] min-w-[44px]",
        sizeTokens.height,
        sizeTokens.px,
        sizeTokens.minWidth,
        sizeTokens.text,
        tokens.button.fontFamily,
        tokens.button.letterSpacing,
        tokens.button.lineHeight,
        // Variant backgrounds and coloring (light)
        variantTokens.bg,
        variantTokens.color,
        variantTokens.border,
        variantTokens.shadow,
        // Variant backgrounds and coloring (dark mode)
        "dark:" + variantTokens.darkBg,
        "dark:" + variantTokens.darkColor,
        "dark:" + variantTokens.borderDark,
        "dark:" + variantTokens.shadowDark,
        // Disabled
        isDisabled && [
          variantTokens.disabledBg,
          variantTokens.disabledColor,
          "cursor-not-allowed opacity-[0.38]",
          "dark:" + variantTokens.darkDisabledBg,
          "dark:" + variantTokens.darkDisabledColor,
        ],
        // Loading
        loading && "cursor-wait",
        // Hover/focus states
        !isDisabled &&
          [
            `hover:${variantTokens.hoverBg}`,
            `focus:${variantTokens.focusBg}`,
            `focus-visible:${variantTokens.focusBg}`,
            `dark:hover:${variantTokens.darkHoverBg}`,
            `dark:focus:${variantTokens.darkFocusBg}`,
            `dark:focus-visible:${variantTokens.darkFocusBg}`,
          ],
        className
      )}
      disabled={isDisabled}
      aria-disabled={isDisabled}
      aria-busy={loading}
      aria-label={label}
      aria-live={loading ? "polite" : undefined}
      tabIndex={isDisabled ? -1 : 0}
      role="button"
      onClick={isDisabled ? undefined : onClick}
      onKeyDown={handleKeyDown}
    >
      {/* Visually hidden for a11y, aria-live for loading */}
      <span className="sr-only" aria-live="polite" aria-atomic="true">
        {loading ? `${label} loading` : label}
      </span>
      {/* Visible content */}
      <span
        className={clsx(
          "flex items-center justify-center w-full",
          loading && "text-transparent"
        )}
        aria-hidden={loading ? "true" : undefined}
      >
        {label}
      </span>
      {loading && (
        <span
          className={clsx(
            "absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center pointer-events-none"
          )}
        >
          <Spinner
            color={
              // Use onPrimary color for spinner, fallback to variant text color
              tokens.button.spinnerColor[variant]
            }
            size={sizeTokens.spinner}
          />
        </span>
      )}
    </button>
  );
};

export default PrimaryButton;