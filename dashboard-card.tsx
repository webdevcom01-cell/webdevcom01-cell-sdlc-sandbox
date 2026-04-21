import React, { ReactNode, MouseEvent, KeyboardEvent, useRef } from "react";
import { twMerge } from "tailwind-merge";
import {
  tokens,
  cardVariants,
  cardBorder,
  cardBg,
  cardShadow,
  cardText,
  cardFocusRing,
  cardLoadingShimmer,
  cardImageBg,
} from "./design-tokens";

/**
 * Card variant options
 */
export type DashboardCardVariant = "elevated" | "filled" | "outlined";

/**
 * DashboardCard Props
 */
export interface DashboardCardProps {
  /** Main heading of the card. */
  title: string;
  /** Secondary text displayed below the title. */
  subtitle?: string;
  /** Primary content area of the card. */
  content: ReactNode;
  /** URL of an optional image displayed at the top of the card. */
  imageUrl?: string;
  /** Callback for card click events. */
  onClick?: (e: MouseEvent<HTMLDivElement>) => void;
  /** Visual style of the card. */
  variant?: DashboardCardVariant;
  /** Whether the card is in a loading state. */
  loading?: boolean;
  /** Whether the card is disabled. */
  disabled?: boolean;
  /** ARIA label for the card if interactive. */
  "aria-label"?: string;
  /** Custom id for aria-labelledby. */
  id?: string;
}

export const DashboardCard: React.FC<DashboardCardProps> = ({
  title,
  subtitle,
  content,
  imageUrl,
  onClick,
  variant = "elevated",
  loading = false,
  disabled = false,
  "aria-label": ariaLabel,
  id,
}) => {
  const interactive = Boolean(onClick) && !disabled;
  const cardId = id || `dashboard-card-${Math.random().toString(36).slice(2)}`;
  const cardTitleId = `${cardId}-title`;
  const cardSubtitleId = `${cardId}-subtitle`;
  const tabIndex = interactive ? 0 : undefined;
  const ariaDisabled = disabled ? true : undefined;
  const ariaBusy = loading ? true : undefined;
  const hasSubtitle = typeof subtitle === "string" && subtitle.length > 0;
  const ariaLabelledBy =
    ariaLabel ||
    (hasSubtitle
      ? `${cardTitleId} ${cardSubtitleId}`
      : cardTitleId);

  const cardRef = useRef<HTMLDivElement>(null);

  // Keyboard accessibility: Enter/Space activate, Escape blur if interactive
  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (!interactive) return;
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onClick && onClick((e as unknown) as MouseEvent<HTMLDivElement>);
    }
    if (e.key === "Escape") {
      (e.target as HTMLDivElement).blur();
    }
  };

  // Touch target enforcement
  const touchTargetClass =
    "min-h-[44px] min-w-[44px]";

  // Card base
  const cardBase = [
    "relative",
    "flex",
    "flex-col",
    "justify-start",
    "w-full",
    "rounded-[--card-radius]",
    "overflow-hidden",
    "transition-all",
    "outline-none",
    "focus-visible:[box-shadow:var(--card-focus-ring)]",
    "focus-visible:z-10",
    "select-none",
    tokens.typography.fontFamily,
    "group",
    "bg-[--card-bg]",
    "dark:bg-[--card-bg-dark]",
    "border-[--card-border]",
    "dark:border-[--card-border-dark]",
    "shadow-[--card-shadow]",
    "dark:shadow-[--card-shadow-dark]",
    "p-[--card-padding]",
    "dark:text-[--card-text]",
    "cursor-pointer",
    "disabled:cursor-not-allowed",
    "aria-disabled:opacity-50",
    "aria-disabled:pointer-events-none",
    touchTargetClass,
    "transition-[box-shadow,background-color,border-color] duration-[--card-transition]",
  ];

  // Non-interactive card
  if (!interactive) {
    cardBase.splice(cardBase.indexOf("cursor-pointer"), 1, "cursor-default");
    cardBase.splice(cardBase.indexOf("focus-visible:[box-shadow:var(--card-focus-ring)]"), 1);
  }

  // Disabled card
  if (disabled) {
    cardBase.push("opacity-60", "pointer-events-none");
  }

  // Loading overlay
  const shimmerOverlay =
    "absolute inset-0 pointer-events-none z-20 overflow-hidden [border-radius:inherit]";

  // Loading shimmer
  const shimmerBar =
    "absolute inset-0 animate-dashboard-card-shimmer bg-[--card-shimmer-gradient]";

  // Responsive image container
  const imageContainer =
    "w-full h-[--card-image-height] bg-[--card-image-bg] dark:bg-[--card-image-bg-dark] flex-shrink-0 rounded-t-[--card-radius] overflow-hidden";

  // Responsive content
  const contentOpacity = loading ? "opacity-40" : "opacity-100";
  const cardContent = [
    "flex flex-col",
    "w-full",
    contentOpacity,
    "transition-opacity duration-[--card-transition]",
  ];

  // Title
  const titleClass =
    "font-semibold text-xl leading-tight mb-1 text-[--card-title] dark:text-[--card-title-dark]";

  // Subtitle
  const subtitleClass =
    "font-normal text-base leading-snug mb-4 text-[--card-subtitle] dark:text-[--card-subtitle-dark]";

  // Content
  const contentClass =
    "font-normal text-base leading-relaxed text-[--card-content] dark:text-[--card-content-dark]";

  // Variant CSS variables
  const variantVars: Record<string, string> = {
    "--card-radius": tokens.radius.xl,
    "--card-padding": tokens.spacing.lg,
    "--card-image-height": tokens.card.imageHeight,
    "--card-transition": tokens.transitions.standard,
    "--card-title": cardText[variant].title,
    "--card-title-dark": cardText[variant].titleDark,
    "--card-subtitle": cardText[variant].subtitle,
    "--card-subtitle-dark": cardText[variant].subtitleDark,
    "--card-content": cardText[variant].content,
    "--card-content-dark": cardText[variant].contentDark,
    "--card-text": cardText[variant].content,
    "--card-bg": cardBg[variant].light,
    "--card-bg-dark": cardBg[variant].dark,
    "--card-border": cardBorder[variant].light,
    "--card-border-dark": cardBorder[variant].dark,
    "--card-shadow": cardShadow[variant].light,
    "--card-shadow-dark": cardShadow[variant].dark,
    "--card-focus-ring": cardFocusRing[variant].light,
    "--card-image-bg": cardImageBg.light,
    "--card-image-bg-dark": cardImageBg.dark,
    "--card-shimmer-gradient": cardLoadingShimmer.gradient,
  };

  // Merge classNames
  const cardClass = twMerge(cardBase);

  return (
    <div
      ref={cardRef}
      id={cardId}
      role={interactive ? "button" : "region"}
      tabIndex={tabIndex}
      aria-busy={ariaBusy}
      aria-disabled={ariaDisabled}
      aria-label={ariaLabel ? ariaLabel : undefined}
      aria-labelledby={!ariaLabel ? ariaLabelledBy : undefined}
      className={cardClass}
      onClick={interactive && !loading ? onClick : undefined}
      onKeyDown={interactive && !loading ? handleKeyDown : undefined}
      style={variantVars}
      data-variant={variant}
      data-loading={loading ? "true" : undefined}
      data-disabled={disabled ? "true" : undefined}
    >
      {imageUrl && !loading && (
        <div className={imageContainer}>
          <img
            src={imageUrl}
            alt=""
            className="object-cover w-full h-full"
            draggable={false}
          />
        </div>
      )}

      <div className={cardContent.join(" ")}>
        <div
          id={cardTitleId}
          className={titleClass}
        >
          {title}
        </div>
        {hasSubtitle && (
          <div
            id={cardSubtitleId}
            className={subtitleClass}
          >
            {subtitle}
          </div>
        )}
        <div className={contentClass} aria-live="polite">
          {content}
        </div>
      </div>

      {loading && (
        <div
          className={shimmerOverlay}
          aria-label="Loading"
          aria-live="polite"
        >
          <div className={shimmerBar}></div>
        </div>
      )}

      <style>
        {`
          @keyframes dashboard-card-shimmer {
            0% { background-position: -200% 0; }
            100% { background-position: 200% 0; }
          }
          .animate-dashboard-card-shimmer {
            background: var(--card-shimmer-gradient);
            background-size: 200% 100%;
            animation: dashboard-card-shimmer 1.2s linear infinite;
          }
        `}
      </style>
    </div>
  );
};

export default DashboardCard;
