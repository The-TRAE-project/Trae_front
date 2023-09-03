import { createStyles } from '@mantine/core';

export const useMenuStyles = createStyles(() => ({
  dropdown: {
    left: '0px !important',
    width: '369px !important',
    maxWidth: 369,
    maxHeight: 528,
    border: 'none',
    background: 'var(--white)',
    padding: 'var(--menu-ptb) var(--menu-plr)',
    boxShadow: '0px 4px 4px var(--black-shadow)',
    borderRadius: 'var(--border-radius)',
  },

  label: {
    padding: 0,
    fontWeight: 600,
    fontSize: 'var(--fs-24)',
    lineHeight: 'var(--fs-24-lh)',
    color: 'var(--white-black)',
    marginTop: 'clamp(0.06rem, calc(0.93rem + -0.72vw), 0.31rem)',
    marginBottom: 'clamp(0.31rem, calc(-0.46rem + 0.90vw), 0.63rem)',
  },

  item: {
    padding:
      'clamp(0.31rem, calc(-0.30rem + 0.72vw), 0.56rem) 0 clamp(0.31rem, calc(-0.30rem + 0.72vw), 0.56rem)',
    fontSize: 'var(--fs-24)',
    lineHeight: 'var(--fs-24-lh)',
  },
}));
