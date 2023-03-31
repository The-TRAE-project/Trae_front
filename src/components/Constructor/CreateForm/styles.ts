import { createStyles } from '@mantine/core';
import styled from 'styled-components';

export const Form = styled.form`
  ${({ theme }) => theme.mixins.column};
  gap: 3rem;
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

  error: {
    fontSize: 24,
    lineHeight: '26px',
    wordBreak: 'break-all',
  },
}));
