import mixins from './mixins';

const theme = {
  bp: {
    bpTinyS: `(min-width: 320px)`,
    bpTinyL: `(min-width: 480px)`,
    bpExtraSmall: `(min-width: 576px)`,
    bpSmall: `(min-width: 48em)`, // 768px
    bpMedium: `(min-width: 64em)`, // 1024px
    bpLarge: `(min-width: 85.375em)`, // 1366px
    bpXlarge: `(min-width: 120em)`, // 1920px
    bpXxlarge: `(min-width: 160em)`,
  },

  mixins,
};

export default theme;
