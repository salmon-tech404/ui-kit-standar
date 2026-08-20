import { GOOGLE_FONTS_CATALOG } from '../config/googleFonts';

const loadedFontsSet = new Set<string>();

/**
 * Dynamically loads a Google Font by injecting a stylesheet link tag into document head.
 */
export function loadGoogleFont(fontFamily: string): void {
  if (!fontFamily || typeof document === 'undefined') return;

  const cleanName = fontFamily.trim().replace(/^['"]|['"]$/g, '');
  if (loadedFontsSet.has(cleanName)) return;

  // Find font weights in catalog or default to standard weights
  const catalogItem = GOOGLE_FONTS_CATALOG.find(
    (f) => f.name.toLowerCase() === cleanName.toLowerCase()
  );

  const weights = catalogItem?.weights || [400, 500, 600, 700, 800];
  const weightStr = weights.join(';');
  const encodedName = encodeURIComponent(cleanName).replace(/%20/g, '+');

  const linkId = `gfont-${cleanName.toLowerCase().replace(/[^a-z0-9]/g, '-')}`;
  if (document.getElementById(linkId)) {
    loadedFontsSet.add(cleanName);
    return;
  }

  const link = document.createElement('link');
  link.id = linkId;
  link.rel = 'stylesheet';
  link.href = `https://fonts.googleapis.com/css2?family=${encodedName}:wght@${weightStr}&display=swap`;

  document.head.appendChild(link);
  loadedFontsSet.add(cleanName);
}

/**
 * Preloads all currently active foundation typography fonts (Heading, Body, Mono).
 */
export function loadActiveFoundationFonts(fonts: {
  fontHeading?: string;
  fontBody?: string;
  fontMono?: string;
}): void {
  if (fonts.fontHeading) loadGoogleFont(fonts.fontHeading);
  if (fonts.fontBody) loadGoogleFont(fonts.fontBody);
  if (fonts.fontMono) loadGoogleFont(fonts.fontMono);
}
