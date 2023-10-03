import { createStyles } from '@mantine/core';
import styled from 'styled-components';

export const useDateInputStyles = createStyles(() => ({
  root: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',

    '.mantine-Popover-dropdown': {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '24px 20px',
      borderRadius: 'var(--border-radius)',
      boxShadow: '0px 4px 4px var(--black-shadow)',
      position: 'absolute',
      left: '0px !important',
      top: '130px !important',
    },
  },

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

    '&:hover': {
      boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)',
    },

    '&::focus': {
      outline: 'none',
    },

    ':disabled': {
      background: 'var(--gray-shadow)',
      opacity: '1',
      color: 'rgba(0,0,0,0) !important',

      '> span': {
        color: 'inherit',
      },
    },
  },

  label: {
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

  error: {
    order: 1,
    alignSelf: 'end',

    position: 'relative',
    right: '0px',
    width: 'fit-content',

    minHeight: '35px',
    padding: '8px 10px',

    backgroundColor: 'var(--white)',
    borderRadius: '15px',
    fontFamily: 'var(--font-roboto)',
    fontSize: 24,
    fontWeight: 500,
    lineHeight: '26px',
    color: 'var(--red)',
    letterSpacing: '1px',

    '&::after': {
      content: `url("data:image/svg+xml,%3Csvg width='25' height='9' viewBox='0 0 25 9' fill='none' xmlns='http://www.w3.org/2000/svg' %3E%3Cpath d='M11 9C9 3 2.83333 0.5 0 0H24.5L11 9Z' fill='white' /%3E%3C/svg%3E")`,
      position: 'absolute',
      bottom: '-14px',
      left: '30%',
    },
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
    textTransform: 'uppercase',
  },

  day: {
    fontFamily: 'var(--font-roboto)',
    fontWeight: 400,
    fontSize: 18,
    lineHeight: '21px',
    color: 'var(--dark-purple)',

    '&[data-weekend]': {
      fontWeight: 600,
      color: 'var(--orange)',
    },

    '&[data-selected]': {
      background: 'var(--orange)',
      color: 'var(--white)',
      borderRadius: 8,
    },

    '&[data-selected]:hover': {
      background: 'var(--orange)',
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

export const useIndicatorStyles = createStyles(() => ({
  indicator: {
    backgroundColor: 'var(--dark-purple)',
    width: '12px !important',
    height: '2px !important',
    borderRadius: '6px !important',
  },
}));

export const Wrapper = styled.div`
  position: relative;
`;
