import { createStyles } from '@mantine/core';

export const useMultiSelectStyles = createStyles(() => ({
  dropdown: {
    top: 0,
    width: 400,
    maxHeight: 284,
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

    '&::placeholder': {
      fontSize: 28,
      lineHeight: '33px',
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
    maxWidth: 370,
    maxHeight: 254,
    flexWrap: 'wrap',
    flexFlow: 'wrap !important',
    justifyContent: 'center',
    overflow: 'auto',
    gap: 20,
  },

  item: {
    width: 'auto',
    fontWeight: 400,
    fontSize: 24,
    lineHeight: '28px',
    color: 'var(--white-black)',
    padding: '10px 25px',
    textAlign: 'center',
  },

  value: {
    fontFamily: 'var(--font-roboto)',
    fontWeight: 500,
    fontSize: 24,
    lineHeight: '28px',
    color: 'var(--orange)',
    wordBreak: 'break-word',
    // minWidth: 169,
    minHeight: 53,
    height: 'auto',
    background: 'var(--white)',
    padding: '10px 12px',
    border: '1px solid var(--gray)',
    borderRadius: 'var(--border-radius)',
    gap: 8,

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
  // TODO: DELETE?
  valueOnHover: {
    fontFamily: 'var(--font-roboto)',
    fontWeight: 500,
    fontSize: 28,
    lineHeight: '33px',
    color: 'var(--white-black)',
    wordBreak: 'break-word',
    // minWidth: 169,
    minHeight: 53,
    height: 'auto',
    background: 'var(--white)',
    padding: '10px 12px',
    border: '1px solid var(--gray)',
    borderRadius: 'var(--border-radius)',
    gap: 14,

    button: {
      display: 'none',
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

    '&:hover': {
      button: {
        display: 'block',
      },
    },

    '&:focus': {
      button: {
        display: 'block',
      },
    },
  },
}));
