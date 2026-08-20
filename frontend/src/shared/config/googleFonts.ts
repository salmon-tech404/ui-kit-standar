export interface GoogleFontItem {
  name: string;
  category: 'Sans-serif' | 'Serif' | 'Monospace' | 'Display';
  weights: number[];
  popular?: boolean;
}

export const GOOGLE_FONTS_CATALOG: GoogleFontItem[] = [
  // =========================================================================
  // 1. SANS-SERIF (Modern, Clean, SaaS, High Readability)
  // =========================================================================
  { name: 'Plus Jakarta Sans', category: 'Sans-serif', weights: [400, 500, 600, 700, 800], popular: true },
  { name: 'Inter', category: 'Sans-serif', weights: [400, 500, 600, 700], popular: true },
  { name: 'Be Vietnam Pro', category: 'Sans-serif', weights: [400, 500, 600, 700, 800], popular: true },
  { name: 'Poppins', category: 'Sans-serif', weights: [400, 500, 600, 700, 800], popular: true },
  { name: 'Montserrat', category: 'Sans-serif', weights: [400, 500, 600, 700, 800], popular: true },
  { name: 'Roboto', category: 'Sans-serif', weights: [400, 500, 700], popular: true },
  { name: 'Open Sans', category: 'Sans-serif', weights: [400, 500, 600, 700], popular: true },
  { name: 'Nunito', category: 'Sans-serif', weights: [400, 600, 700, 800] },
  { name: 'Raleway', category: 'Sans-serif', weights: [400, 500, 600, 700, 800] },
  { name: 'Work Sans', category: 'Sans-serif', weights: [400, 500, 600, 700] },
  { name: 'DM Sans', category: 'Sans-serif', weights: [400, 500, 700], popular: true },
  { name: 'Outfit', category: 'Sans-serif', weights: [400, 500, 600, 700, 800], popular: true },
  { name: 'Rubik', category: 'Sans-serif', weights: [400, 500, 600, 700, 800] },
  { name: 'Manrope', category: 'Sans-serif', weights: [400, 500, 600, 700, 800], popular: true },
  { name: 'Figtree', category: 'Sans-serif', weights: [400, 500, 600, 700, 800], popular: true },
  { name: 'Cabinet Grotesk', category: 'Sans-serif', weights: [400, 500, 700, 800], popular: true },
  { name: 'Geist', category: 'Sans-serif', weights: [400, 500, 600, 700], popular: true },
  { name: 'Urbanist', category: 'Sans-serif', weights: [400, 500, 600, 700, 800] },
  { name: 'Space Grotesk', category: 'Sans-serif', weights: [400, 500, 600, 700], popular: true },
  { name: 'Lexend', category: 'Sans-serif', weights: [400, 500, 600, 700] },
  { name: 'Public Sans', category: 'Sans-serif', weights: [400, 500, 600, 700] },
  { name: 'Instrument Sans', category: 'Sans-serif', weights: [400, 500, 600, 700] },
  { name: 'Sora', category: 'Sans-serif', weights: [400, 600, 700, 800] },
  { name: 'Mulish', category: 'Sans-serif', weights: [400, 600, 700, 800] },
  { name: 'Cabin', category: 'Sans-serif', weights: [400, 500, 600, 700] },
  { name: 'Karla', category: 'Sans-serif', weights: [400, 500, 700] },
  { name: 'Albert Sans', category: 'Sans-serif', weights: [400, 500, 600, 700] },

  // =========================================================================
  // 2. SERIF (Editorial, Luxury, Trust, Academic)
  // =========================================================================
  { name: 'Playfair Display', category: 'Serif', weights: [400, 600, 700, 800], popular: true },
  { name: 'Merriweather', category: 'Serif', weights: [400, 700], popular: true },
  { name: 'Lora', category: 'Serif', weights: [400, 500, 600, 700], popular: true },
  { name: 'Cormorant Garamond', category: 'Serif', weights: [400, 600, 700], popular: true },
  { name: 'Cinzel', category: 'Serif', weights: [400, 600, 700, 800] },
  { name: 'Prata', category: 'Serif', weights: [400] },
  { name: 'Bodoni Moda', category: 'Serif', weights: [400, 600, 700, 800] },
  { name: 'EB Garamond', category: 'Serif', weights: [400, 500, 600, 700] },
  { name: 'Bitter', category: 'Serif', weights: [400, 600, 700] },
  { name: 'Newsreader', category: 'Serif', weights: [400, 500, 600, 700] },
  { name: 'Spectral', category: 'Serif', weights: [400, 600, 700] },
  { name: 'Fraunces', category: 'Serif', weights: [400, 600, 700, 800] },
  { name: 'Noto Serif', category: 'Serif', weights: [400, 600, 700] },
  { name: 'Libre Baskerville', category: 'Serif', weights: [400, 700] },

  // =========================================================================
  // 3. MONOSPACE (Code, Tech, Developer, Terminal)
  // =========================================================================
  { name: 'JetBrains Mono', category: 'Monospace', weights: [400, 500, 600, 700, 800], popular: true },
  { name: 'Fira Code', category: 'Monospace', weights: [400, 500, 600, 700], popular: true },
  { name: 'Roboto Mono', category: 'Monospace', weights: [400, 500, 600, 700], popular: true },
  { name: 'Space Mono', category: 'Monospace', weights: [400, 700] },
  { name: 'Source Code Pro', category: 'Monospace', weights: [400, 500, 600, 700] },
  { name: 'IBM Plex Mono', category: 'Monospace', weights: [400, 500, 600, 700], popular: true },
  { name: 'Inconsolata', category: 'Monospace', weights: [400, 600, 700] },
  { name: 'Geist Mono', category: 'Monospace', weights: [400, 500, 600, 700] },
  { name: 'Fira Mono', category: 'Monospace', weights: [400, 500, 700] },
  { name: 'Ubuntu Mono', category: 'Monospace', weights: [400, 700] },
  { name: 'Share Tech Mono', category: 'Monospace', weights: [400] },

  // =========================================================================
  // 4. DISPLAY / NEO-BRUTALIST (Impact, Posters, Bold Headlines)
  // =========================================================================
  { name: 'Syne', category: 'Display', weights: [600, 700, 800], popular: true },
  { name: 'Bebas Neue', category: 'Display', weights: [400], popular: true },
  { name: 'Anton', category: 'Display', weights: [400] },
  { name: 'Oswald', category: 'Display', weights: [500, 600, 700], popular: true },
  { name: 'Archivo Black', category: 'Display', weights: [400] },
  { name: 'Righteous', category: 'Display', weights: [400] },
  { name: 'Unbounded', category: 'Display', weights: [600, 700, 800, 900], popular: true },
  { name: 'Bricolage Grotesque', category: 'Display', weights: [600, 700, 800], popular: true },
  { name: 'Chakra Petch', category: 'Display', weights: [500, 600, 700] },
  { name: 'Russo One', category: 'Display', weights: [400] },
  { name: 'Clash Display', category: 'Display', weights: [600, 700] },
];
