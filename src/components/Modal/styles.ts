import { createStyles } from '@mantine/core';

export const useModalStyles = createStyles(() => ({
  close: {
    color: '#2A302B',
    opacity: 0.9,
    height: 30,
    width: 30,
    fontSize: 30,
    padding: 0,

    svg: {
      width: 30,
      height: 30,
    },
  },

  modal: {
    position: 'relative',
    padding: '30px !important',
    background: '#FFFFFF',
    boxShadow: '0px 6px 9px rgba(0, 0, 0, 0.25)',
    borderRadius: 10,
    height: 555,
  },

  header: {
    marginBottom: 4,
  },

  title: {
    fontFamily: 'Roboto, san-serif',
    fontStyle: 'normal',
    fontWeight: 500,
    fontSize: 48,
    lineHeight: '56px',
    color: '#2A302B',
    opacity: 0.9,
  },

  body: {
    height: '90%',
  },
}));
