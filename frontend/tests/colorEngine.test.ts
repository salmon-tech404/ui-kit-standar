import { describe, it, expect } from 'vitest';
import { ColorEngine } from '../src/utils/colorEngine';

describe('ColorEngine Precision & WCAG Evaluator', () => {
  it('should convert HEX to HSL and back with 100% fidelity', () => {
    const hex = '#6366F1';
    const hsl = ColorEngine.hexToHsl(hex);
    const backToHex = ColorEngine.hslToHex(hsl.h, hsl.s, hsl.l);

    expect(backToHex.toUpperCase()).toBe(hex.toUpperCase());
  });

  it('should generate 11 distinct shades with monotonically decreasing lightness', () => {
    const shades = ColorEngine.generateShades('#6366F1');
    const keys = Object.keys(shades);

    expect(keys.length).toBe(11);
    expect(shades['50']).toBeDefined();
    expect(shades['950']).toBeDefined();

    const lum50 = ColorEngine.getLuminance(shades['50']);
    const lum500 = ColorEngine.getLuminance(shades['500']);
    const lum950 = ColorEngine.getLuminance(shades['950']);

    expect(lum50).toBeGreaterThan(lum500);
    expect(lum500).toBeGreaterThan(lum950);
  });

  it('should evaluate WCAG 2.1 contrast ratio accurately against white background', () => {
    // Black text on white background must be 21:1
    const ratio = ColorEngine.getContrastRatio('#000000', '#FFFFFF');
    expect(ratio).toBeCloseTo(21, 0);

    const a11y = ColorEngine.evaluateA11y(ratio);
    expect(a11y.passAA).toBe(true);
    expect(a11y.passAAA).toBe(true);
  });
});
