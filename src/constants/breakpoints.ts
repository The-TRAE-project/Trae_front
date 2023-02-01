export const breakpoints = {
  bpSmall: '48em', // 768px
  bpMedium: '64em', // 1024px
  bpLarge: '85.375em', // 1366px
  bpXlarge: '120em', // 1920px
  bpXxlarge: '160em',
};

export const mediaQueries = {
  mqSmall: `(min-width: ${breakpoints.bpSmall})`,
  mqMedium: `(min-width: ${breakpoints.bpMedium})`,
  mqLarge: `(min-width: ${breakpoints.bpLarge})`,
  mqXlarge: `(min-width: ${breakpoints.bpXlarge})`,
  mqXxlarge: `(min-width: ${breakpoints.bpXxlarge})`,
  mqRetina: '(-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi)',
};

export const fonts = {
  baseFontSize: '1em',
  baseLineHeight: 1.5,
};
