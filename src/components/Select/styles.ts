import { createStyles } from '@mantine/core';
import styled from 'styled-components';

export const Wrapper = styled.div`
  position: relative;
`;

export const useSelectStyles = createStyles(() => ({
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

  rightSection: {
    pointerEvents: 'none',
    right: 20,
  },

  dropdown: {
    width: 245,
    maxWidth: 245,
    left: '0px !important',
    right: '0px !important',
    borderRadius: 'var(--border-radius)',
    boxShadow: '0px 4px 4px var(--black-shadow)',
    marginLeft: 'auto',
  },

  item: {
    fontWeight: 400,
    fontSize: 24,
    lineHeight: '28px',
    textAlign: 'center',
    padding: '8px 0',

    '&[data-selected]': {
      '&, &:hover': {
        backgroundColor: 'var(--white)',
        color: 'var(--orange)',
      },
    },
  },
}));
