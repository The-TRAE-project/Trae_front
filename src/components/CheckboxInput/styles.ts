import { createStyles } from '@mantine/core';

export const useCheckboxStyles = createStyles(() => ({
  body: {
    alignItems: 'end',
    height: '100%',
  },

  inner: {
    height: '73px',
  },

  input: {
    width: '73px',
    height: '73px',
    borderRadius: '15px',
    background: 'var(--white)',
    position: 'relative',
    border: 'none',

    ':checked': {
      background: 'var(--white)',
    },
  },
  icon: {
    width: '40px',
    height: '40px',
    margin: '17px',
  },
}));
