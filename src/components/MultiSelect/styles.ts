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
    fontSize: 24,
    lineHeight: '26px',
    wordBreak: 'break-word',
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
    fontSize: 28,
    lineHeight: '33px',
    color: 'var(--orange)',

    width: 169,
    height: 53,
    background: 'var(--white)',
    padding: '10px 14px',
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