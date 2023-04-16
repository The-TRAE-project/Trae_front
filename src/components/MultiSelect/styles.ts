import { createStyles } from '@mantine/core';

export const useMultiSelectStyles = createStyles(() => ({
  dropdown: {
    top: 0,
    width: 400,
    height: 284,
    background: 'var(--white)',
    border: 'none',
    borderRadius: '0px 0px 15px 15px',
    padding: '15px 15px !important',
  },

  input: {
    minHeight: 73,
    height: 'auto',
    background: 'var(--white)',
    borderRadius: 'var(--border-radius)',
    padding: '10px 12px',

    '&:focus': {
      outline: 'none',
    },
  },

  inputLabel: {
    fontWeight: 400,
    fontSize: 24,
    lineHeight: '28px',
    color: 'var(--white)',
    marginBottom: 13,
    paddingLeft: 14,
  },

  error: {
    fontFamily: 'var(--font-roboto)',
    fontSize: 24,
    fontWeight: 500,
    lineHeight: '26px',
    wordBreak: 'break-word',
    color: 'var(--red)',
    letterSpacing: '1px',
  },

  itemsWrapper: {
    height: 254,
    minHeight: 254,
    maxHeight: 254,
    overflowX: 'hidden',
    gap: 20,
  },

  item: {
    fontWeight: 400,
    fontSize: 24,
    lineHeight: '28px',
    color: 'var(--white-black)',
    padding: 10,
    textAlign: 'center',
  },

  value: {
    fontFamily: 'var(--font-roboto)',
    fontWeight: 500,
    fontSize: 24,
    lineHeight: '28px',
    color: 'var(--orange)',
    wordBreak: 'break-word',
    minWidth: 169,
    minHeight: 53,
    height: 'auto',
    background: 'var(--white)',
    padding: '10px 12px',
    border: '1px solid var(--gray)',
    borderRadius: 'var(--border-radius)',
    gap: 14,

    button: {
      width: 25,
      height: 25,
      minWidth: 25,
      minHeight: 25,

      svg: {
        fontSize: 25,
        width: 25,
        height: 25,
        minWidth: 25,
        minHeight: 25,
      },
    },
  },
}));
