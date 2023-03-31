import { createStyles } from '@mantine/core';
import styled from 'styled-components';

export const Wrapper = styled.div`
  position: relative;
  min-height: calc(100vh - 336px);
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 40px;
`;

export const useTextInputStyles = createStyles(() => ({
  label: {
    fontWeight: 400,
    fontSize: 24,
    lineHeight: '28px',
    color: 'var(--white)',
    marginBottom: 13,
    paddingLeft: 14,
  },

  input: {
    minHeight: 73,
    height: 73,
    background: 'var(--gray-shadow)',
    border: 'none',
    borderRadius: 'var(--border-radius)',
    backdropFilter: 'blur(40px)',
    padding: '20px 12px',
    fontFamily: 'var(--font-roboto)',
    fontWeight: 400,
    fontSize: 28,
    lineHeight: '33px',
    color: 'var(--white)',

    '&::focus': {
      outline: 'none',
    },
  },

  error: {
    fontSize: 24,
    lineHeight: '26px',
    wordBreak: 'break-all',
  },
}));

export const useSelectStyles = createStyles(() => ({
  selectInput: {
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

export const ResetPasswordButton = styled.button`
  grid-column-start: 3;
  ${({ theme }) => theme.mixins.fCenter};
  padding: 22.5px;
  min-height: 73px;
  max-height: 73px;
  background: var(--orange);
  border: 2px dashed var(--white);
  border-radius: var(--border-radius);
  font-weight: 400;
  ${({ theme }) => theme.mixins.fontSize24};
  color: var(--white);

  &:is(:focus, :focus-within) {
    outline: none;
  }
`;

export const SelectWrapper = styled.div`
  position: relative;
`;
