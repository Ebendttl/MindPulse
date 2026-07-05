import { MoodValue } from "@/types";

/**
 * Central design token system for MindPulse.
 * All mood-related colors, surface colors, and brand tokens live here.
 * Every component references this — no hardcoded color values elsewhere.
 */

export interface MoodColorToken {
  base: string;  // Primary mood color (chart points, selected card bg, history accent)
  tint: string;  // Light background tint (unselected card bg, history card bg)
  text: string;  // High-contrast text on tint background (WCAG AA compliant)
}

export const MOOD_COLORS: Record<MoodValue, MoodColorToken> = {
  1: { base: '#E8837A', tint: '#FFF0EE', text: '#8C3A32' }, // Struggling
  2: { base: '#F0A868', tint: '#FFF3E9', text: '#8F5A22' }, // Low
  3: { base: '#F0D268', tint: '#FFF9E9', text: '#8F7A22' }, // Okay
  4: { base: '#8FC97E', tint: '#EFF8ED', text: '#3F6E33' }, // Good
  5: { base: '#6FBBB0', tint: '#E9F6F3', text: '#2A6058' }, // Peaceful
  6: { base: '#E0B84F', tint: '#FFF6E3', text: '#7A5F1A' }, // Great
};

/**
 * Dark mode tint variants — computed from base at low opacity.
 * These are used as card backgrounds in dark mode.
 */
export const MOOD_COLORS_DARK: Record<MoodValue, { tint: string; text: string; border: string }> = {
  1: { tint: 'rgba(232, 131, 122, 0.12)', text: '#F2B3AD', border: 'rgba(232, 131, 122, 0.25)' },
  2: { tint: 'rgba(240, 168, 104, 0.12)', text: '#F6CD9E', border: 'rgba(240, 168, 104, 0.25)' },
  3: { tint: 'rgba(240, 210, 104, 0.12)', text: '#F6E49E', border: 'rgba(240, 210, 104, 0.25)' },
  4: { tint: 'rgba(143, 201, 126, 0.12)', text: '#C1E3B5', border: 'rgba(143, 201, 126, 0.25)' },
  5: { tint: 'rgba(111, 187, 176, 0.12)', text: '#AAE0D7', border: 'rgba(111, 187, 176, 0.25)' },
  6: { tint: 'rgba(224, 184, 79, 0.12)',  text: '#F2DF9F', border: 'rgba(224, 184, 79, 0.25)' },
};

/** Brand / primary color tokens */
export const BRAND = {
  primary: '#6C63FF',
  primaryEnd: '#4ECDC4',
  /** CSS gradient string for logo text */
  gradient: 'linear-gradient(135deg, #6C63FF, #4ECDC4)',
};

/** Surface color tokens */
export const SURFACE = {
  light: {
    bg: '#FCFBF9',
    card: '#FFFFFF',
    cardBorder: '#EDE6DA',
    textPrimary: '#1E1B24',
    textSecondary: '#756F80',
  },
  dark: {
    bg: '#0D0B14',
    card: '#1C192B',
    cardBorder: '#2C2842',
    textPrimary: '#F5F2ED',
    textSecondary: '#9B94A8',
  },
};
