export interface HslColor {
  h: number;
  s: number;
  l: number;
}

export interface WCAGEvaluation {
  ratio: number;
  formattedRatio: string;
  passAA: boolean;
  passAAA: boolean;
  passAALarge: boolean;
}

export class ColorEngine {
  public static hexToRgb(hex: string): { r: number; g: number; b: number } {
    let clean = hex.replace(/^#/, '');
    if (clean.length === 3) {
      clean = clean.split('').map(c => c + c).join('');
    }
    const num = parseInt(clean, 16) || 0;
    return {
      r: (num >> 16) & 255,
      g: (num >> 8) & 255,
      b: num & 255,
    };
  }

  public static rgbToHex(r: number, g: number, b: number): string {
    const toHex = (c: number) => {
      const hex = Math.round(Math.max(0, Math.min(255, c))).toString(16);
      return hex.length === 1 ? '0' + hex : hex;
    };
    return `#${toHex(r)}${toHex(g)}${toHex(b)}`.toUpperCase();
  }

  public static hexToHsl(hex: string): HslColor {
    const { r, g, b } = this.hexToRgb(hex);
    const rNorm = r / 255;
    const gNorm = g / 255;
    const bNorm = b / 255;

    const max = Math.max(rNorm, gNorm, bNorm);
    const min = Math.min(rNorm, gNorm, bNorm);
    let h = 0;
    let s = 0;
    const l = (max + min) / 2;

    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case rNorm: h = (gNorm - bNorm) / d + (gNorm < bNorm ? 6 : 0); break;
        case gNorm: h = (bNorm - rNorm) / d + 2; break;
        case bNorm: h = (rNorm - gNorm) / d + 4; break;
      }
      h /= 6;
    }

    return {
      h: Math.round(h * 360),
      s: Math.round(s * 100),
      l: Math.round(l * 100),
    };
  }

  public static hexToHsv(hex: string): { h: number; s: number; v: number } {
    const { r, g, b } = this.hexToRgb(hex);
    const rN = r / 255;
    const gN = g / 255;
    const bN = b / 255;
    const max = Math.max(rN, gN, bN);
    const min = Math.min(rN, gN, bN);
    const d = max - min;
    let h = 0;
    const s = max === 0 ? 0 : d / max;
    const v = max;

    if (max !== min) {
      switch (max) {
        case rN: h = (gN - bN) / d + (gN < bN ? 6 : 0); break;
        case gN: h = (bN - rN) / d + 2; break;
        case bN: h = (rN - gN) / d + 4; break;
      }
      h /= 6;
    }

    return {
      h: Math.round(h * 360),
      s: Math.round(s * 100),
      v: Math.round(v * 100),
    };
  }

  public static hsvToHex(h: number, s: number, v: number): string {
    s = s / 100;
    v = v / 100;
    const c = v * s;
    const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
    const m = v - c;
    let r = 0, g = 0, b = 0;

    if (0 <= h && h < 60) { r = c; g = x; b = 0; }
    else if (60 <= h && h < 120) { r = x; g = c; b = 0; }
    else if (120 <= h && h < 180) { r = 0; g = c; b = x; }
    else if (180 <= h && h < 240) { r = 0; g = x; b = c; }
    else if (240 <= h && h < 300) { r = x; g = 0; b = c; }
    else if (300 <= h && h <= 360) { r = c; g = 0; b = x; }

    return this.rgbToHex((r + m) * 255, (g + m) * 255, (b + m) * 255);
  }

  public static hslToHex(h: number, s: number, l: number): string {
    h = h / 360;
    s = s / 100;
    l = l / 100;

    let r: number, g: number, b: number;
    if (s === 0) {
      r = g = b = l;
    } else {
      const hue2rgb = (p: number, q: number, t: number) => {
        if (t < 0) t += 1;
        if (t > 1) t -= 1;
        if (t < 1 / 6) return p + (q - p) * 6 * t;
        if (t < 1 / 2) return q;
        if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
        return p;
      };

      const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      const p = 2 * l - q;
      r = hue2rgb(p, q, h + 1 / 3);
      g = hue2rgb(p, q, h);
      b = hue2rgb(p, q, h - 1 / 3);
    }

    return this.rgbToHex(r * 255, g * 255, b * 255);
  }

  /**
   * Generates 11 calibrated shades from 50 to 950.
   */
  public static generateShades(baseHex: string): Record<string, string> {
    const { h, s } = this.hexToHsl(baseHex);
    const stops = [
      { name: '50',  l: 96, sOffset: -10 },
      { name: '100', l: 91, sOffset: -5 },
      { name: '200', l: 83, sOffset: 0 },
      { name: '300', l: 72, sOffset: 0 },
      { name: '400', l: 60, sOffset: 0 },
      { name: '500', l: 50, sOffset: 0 },
      { name: '600', l: 40, sOffset: 2 },
      { name: '700', l: 31, sOffset: 4 },
      { name: '800', l: 22, sOffset: 6 },
      { name: '900', l: 15, sOffset: 8 },
      { name: '950', l: 9,  sOffset: 10 },
    ];

    const result: Record<string, string> = {};
    stops.forEach(stop => {
      const adjustedSat = Math.max(5, Math.min(100, s + stop.sOffset));
      result[stop.name] = this.hslToHex(h, adjustedSat, stop.l);
    });

    return result;
  }

  public static getLuminance(hex: string): number {
    const { r, g, b } = this.hexToRgb(hex);
    const a = [r, g, b].map(v => {
      v /= 255;
      return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
    });
    return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
  }

  public static getContrastRatio(hex1: string, hex2: string): number {
    const lum1 = this.getLuminance(hex1);
    const lum2 = this.getLuminance(hex2);
    const brightest = Math.max(lum1, lum2);
    const darkest = Math.min(lum1, lum2);
    const ratio = (brightest + 0.05) / (darkest + 0.05);
    return Math.round(ratio * 100) / 100;
  }

  public static evaluateA11y(contrastRatio: number): WCAGEvaluation {
    return {
      ratio: contrastRatio,
      formattedRatio: `${contrastRatio}:1`,
      passAA: contrastRatio >= 4.5,
      passAAA: contrastRatio >= 7.0,
      passAALarge: contrastRatio >= 3.0,
    };
  }
}
