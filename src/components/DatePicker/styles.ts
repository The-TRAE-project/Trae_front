import { createStyles } from '@mantine/core';

export const useDateInputStyles = createStyles(() => ({
  input: {
    minHeight: 73,
    height: 73,
    background: 'var(--white)',
    border: 'none',
    borderRadius: 'var(--border-radius)',
    padding: '20px 12px',
    fontFamily: 'var(--font-roboto)',
    fontWeight: 500,
    fontSize: 28,
    lineHeight: '33px',
    color: 'var(--white-black)',

    '&::focus': {
      outline: 'none',
    },
  },

  label: {
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
    wordBreak: 'break-all',
  },

  wrapper: {
    borderRadius: 40,

    '.mantine-Popover-dropdown': {
      borderRadius: 40,
    },
  },

  calendar: {
    borderRadius: 40,
  },

  calendarHeaderControl: {
    width: '2.25rem',
    height: '2.25rem',
    minWidth: 25,
    minHeight: 25,
    color: 'var(--orange)',

    svg: {
      width: 25,
      height: 25,
    },
  },

  calendarHeaderLevel: {
    color: 'var(--orange)',
    fontFamily: 'var(--font-roboto)',
    fontWeight: 500,
    fontSize: 20,
    lineHeight: '23px',
  },

  weekday: {
    fontFamily: 'var(--font-roboto)',
    fontWeight: 400,
    fontSize: 20,
    lineHeight: '23px',
    color: 'var(--secondary-black)',
  },

  day: {
    fontFamily: 'var(--font-roboto)',
    fontWeight: 400,
    fontSize: 18,
    lineHeight: '21px',
    color: 'var(--dark-purple)',

    '&[data-weekend]': {
      color: 'var(--orange)',
    },

    '&[data-selected]': {
      background: 'var(--orange)',
      color: 'var(--white)',
      borderRadius: 8,
    },
  },

  rightSection: {
    width: '4.5rem',

    button: {
      width: 35,
      height: 35,
      minWidth: 35,
      minHeight: 35,

      svg: {
        width: 35,
        height: 35,
      },
    },
  },
}));
