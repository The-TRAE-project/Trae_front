import mixins from './mixins';

const theme = {
  bp: {
    bpTinyS: `(max-width: 320px)`,
    bpTinyL: `(max-width: 480px)`,
    bpExtraSmall: `(max-width: 576px)`,
    bpSmall: `(max-width: 48em)`, // 768px
    bpMedium: `(max-width: 64em)`, // 1024px
    bpLarge: `(max-width: 85.375em)`, // 1366px
    bpXlarge: `(max-width: 120em)`, // 1920px
    bpXxlarge: `(max-width: 160em)`,
  },

  mixins,
};

export default theme;
