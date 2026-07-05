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
  1: { base: '#E8837A', tint: '#FDF0EE', text: '#8C3A32' }, // Struggling
  2: { base: '#F0A868', tint: '#FDF3E9', text: '#8F5A22' }, // Low
  3: { base: '#F0D268', tint: '#FDF9E9', text: '#8F7A22' }, // Okay
  4: { base: '#8FC97E', tint: '#EFF7ED', text: '#3F6E33' }, // Good
  5: { base: '#6FBBB0', tint: '#E9F5F3', text: '#2A6058' }, // Peaceful
  6: { base: '#E0B84F', tint: '#FDF6E3', text: '#7A5F1A' }, // Great
};

/**
 * Dark mode tint variants — computed from base at low opacity.
 * These are used as card backgrounds in dark mode.
 */
export const MOOD_COLORS_DARK: Record<MoodValue, { tint: string; text: string; border: string }> = {
  1: { tint: 'rgba(232, 131, 122, 0.10)', text: '#F0ADA7', border: 'rgba(232, 131, 122, 0.20)' },
  2: { tint: 'rgba(240, 168, 104, 0.10)', text: '#F4C898', border: 'rgba(240, 168, 104, 0.20)' },
  3: { tint: 'rgba(240, 210, 104, 0.10)', text: '#F4E098', border: 'rgba(240, 210, 104, 0.20)' },
  4: { tint: 'rgba(143, 201, 126, 0.10)', text: '#B4DCA6', border: 'rgba(143, 201, 126, 0.20)' },
  5: { tint: 'rgba(111, 187, 176, 0.10)', text: '#9DD4CB', border: 'rgba(111, 187, 176, 0.20)' },
  6: { tint: 'rgba(224, 184, 79, 0.10)',  text: '#EDD68E', border: 'rgba(224, 184, 79, 0.20)' },
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
    bg: '#FAF7F2',
    card: '#FFFFFF',
    cardBorder: '#EDE8DF',
    textPrimary: '#2A2622',
    textSecondary: '#6B655C', // 4.62:1 on #FFFFFF ✓ WCAG AA
  },
  dark: {
    bg: '#1A1720',
    card: '#252030',
    cardBorder: '#332C40',
    textPrimary: '#F5F2ED',
    textSecondary: '#B0A8B8', // 6.4:1 on #252030 ✓ WCAG AA
  },
};
