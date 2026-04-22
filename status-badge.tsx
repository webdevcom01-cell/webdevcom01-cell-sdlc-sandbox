import React from "react";
import tokens from "./design-tokens";

/**
 * Supported status variants for the StatusBadge.
 */
export type StatusBadgeVariant = "success" | "warning" | "error";

/**
 * Props for the StatusBadge component.
 */
export interface StatusBadgeProps {
  /**
   * Badge text to display inside the badge.
   */
  label: string;

  /**
   * Badge style variant.
   * @default "success"
   */
  variant: StatusBadgeVariant;

  /**
   * Additional class name for the badge.
   */
  className?: string;

  /**
   * Optionally provide an id for aria-labelledby usage.
   */
  id?: string;
}

/**
 * Tailwind class maps for badge color variants using tokens.
 */
const variantClassMap: Record<
  StatusBadgeVariant,
  {
    base: string;
    dark: string;
    text: string;
    darkText: string;
  }
> = {
  success: {
    base: "bg-[#388E3C]",
    dark: "dark:bg-[#388E3C]",
    text: "text-[#FFFFFF]",
    darkText: "dark:text-[#FFFFFF]",
  },
  warning: {
    base: "bg-[#FBC02D]",
    dark: "dark:bg-[#FBC02D]",
    text: "text-[#1C1B1F]",
    darkText: "dark:text-[#1C1B1F]",
  },
  error: {
    base: "bg-[#D32F2F]",
    dark: "dark:bg-[#D32F2F]",
    text: "text-[#FFFFFF]",
    darkText: "dark:text-[#FFFFFF]",
  },
};

/**
 * Shadow class maps for light/dark mode using tokens.
 */
const shadowMap = {
  light: "shadow-[0px_1px_2px_0px_rgba(60,64,67,0.15)]",
  dark: "dark:shadow-[0px_1px_2px_0px_rgba(0,0,0,0.40)]",
};

/**
 * StatusBadge component — Material 3 Expressive, WCAG 2.1 AA, Calm UI, 2026 standards.
 */
export const StatusBadge: React.FC<StatusBadgeProps> = ({
  label,
  variant,
  className = "",
  id,
}) => {
  // Tokens
  const borderRadius = "rounded-full"; // 999px from tokens
  const fontFamily = "font-[system-ui,sans-serif]"; // custom font token
  const fontWeight = "font-medium"; // 500
  const fontSize = "text-[0.875rem]"; // 14px
  const lineHeight = "leading-[1.25rem]"; // 20px
  const letterSpacing = "tracking-[0.01em]";
  const uppercase = "uppercase";
  const px = "px-[12px]"; // tokens.sys.spacing.badge.px
  const py = "py-[2px]"; // tokens.sys.spacing.badge.py
  const minW = "min-w-[44px]";
  const minH = "min-h-[44px]";
  const transition = "transition-all duration-200 ease-[cubic-bezier(0.2,0,0,1)]"; // tokens
  const focusRing =
    "focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#388E3C]/80 dark:focus-visible:ring-[#388E3C]/80 focus:outline-none";

  const baseClasses = [
    "inline-flex",
    "items-center",
    "justify-center",
    "select-none",
    "align-middle",
    borderRadius,
    fontWeight,
    fontSize,
    lineHeight,
    letterSpacing,
    uppercase,
    fontFamily,
    px,
    py,
    minW,
    minH,
    transition,
    shadowMap.light,
    shadowMap.dark,
    focusRing,
  ].join(" ");

  const variantClasses = [
    variantClassMap[variant].base,
    variantClassMap[variant].dark,
    variantClassMap[variant].text,
    variantClassMap[variant].darkText,
  ].join(" ");

  // a11y: role="status", aria-live="polite"
  // aria-labelledby only if id is present

  return (
    <span
      id={id}
      tabIndex={0}
      role="status"
      aria-live="polite"
      aria-label={label}
      className={`${baseClasses} ${variantClasses} ${className}`}
      data-variant={variant}
    >
      <span className="w-full text-center">{label}</span>
    </span>
  );
};

export default StatusBadge;
