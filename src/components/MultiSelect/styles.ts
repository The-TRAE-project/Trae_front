import { createStyles } from '@mantine/core';
// TODO: better handling of focus and dropdown position
export const useMultiSelectStyles = createStyles(() => ({
  dropdown: {
    width: 357,
    maxHeight: 284,
    background: 'var(--white)',
    border: 'none',
    borderRadius: '15px',
    padding: '15px 15px !important',
    position: 'relative',
    top: '15px !important',
    left: '0px !important',
  },

  input: {
    minHeight: 73,
    height: 'auto',
    background: 'var(--white)',
    borderRadius: 'var(--border-radius)',
    padding: '10px 12px',

    '&:focus-within': {
      borderRadius: '15px',
      border: 'none',
      outline: 'none',
    },

    '&::placeholder': {
      fontSize: 28,
      lineHeight: '33px',
    },
  },

  inputLabel: {
    order: 2,
    fontWeight: 400,
    fontSize: 24,
    lineHeight: '28px',
    color: 'var(--white)',
    marginBottom: 13,
    paddingLeft: 14,
  },

  wrapper: {
    order: 3,
  },

  root: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
  },

  error: {
    order: 1,

    position: 'relative',
    right: '0px',
    alignSelf: 'end',

    width: 'fit-content',
    minHeight: '35px',
    padding: '8px 10px',

    backgroundColor: 'var(--white)',
    borderRadius: '15px',
    fontFamily: 'var(--font-roboto)',
    fontSize: 24,
    fontWeight: 500,
    lineHeight: '26px',
    wordBreak: 'break-word',
    color: 'var(--red)',
    letterSpacing: '1px',

    '&::after': {
      content: `url("data:image/svg+xml,%3Csvg width='25' height='9' viewBox='0 0 25 9' fill='none' xmlns='http://www.w3.org/2000/svg' %3E%3Cpath d='M11 9C9 3 2.83333 0.5 0 0H24.5L11 9Z' fill='white' /%3E%3C/svg%3E")`,
      position: 'absolute',
      bottom: '-14px',
      left: '30%',
    },
  },
  itemsWrapper: {
    maxWidth: 370,
    maxHeight: 254,
    flexWrap: 'wrap',
    flexFlow: 'wrap !important',
    justifyContent: 'center',
    overflow: 'auto',
    gap: 20,

    /* width */
    '::-webkit-scrollbar': {
      width: 2,
    },

    /* Track */
    '::-webkit-scrollbar-track': {
      background: 'transparent',
    },

    /* Handle */
    '::-webkit-scrollbar-thumb': {
      background: '#888',
    },
  },

  item: {
    width: 'auto',
    fontWeight: 400,
    fontSize: 24,
    lineHeight: '28px',
    color: 'var(--white-black)',
    padding: '10px 20px',
    textAlign: 'center',
  },

  value: {
    fontFamily: 'var(--font-roboto)',
    fontWeight: 500,
    fontSize: 24,
    lineHeight: '28px',
    color: 'var(--orange)',
    wordBreak: 'break-word',
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
}));
