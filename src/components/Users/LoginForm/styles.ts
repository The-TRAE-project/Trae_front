import styled from 'styled-components';
import { createStyles, TextInput } from '@mantine/core';

export const FormWrapper = styled.form`
  ${({ theme }) => theme.mixins.column};
  align-items: flex-start;
  gap: 40px;
`;

export const Input = styled(TextInput)`
  input {
    width: 400px;
    height: 90px;
    background: var(--white);
    border-radius: var(--border-radius);
    padding: 28px 50px 29px;
    font-family: var(--font-roboto);
    ${({ theme }) => theme.mixins.fontSize28};
    font-weight: 400;
    color: var(--black);

    &::placeholder {
      font-weight: 400;
      color: var(--white-black);
    }
  }
`;

export const useInputStyles = createStyles(() => ({
  error: {
    maxWidth: 400,
    fontSize: 28,
    lineHeight: '33px',
    wordBreak: 'break-all',
  },

  root: {
    minHeight: 90,
  },

  wrapper: {
    height: '100%',
  },

  innerInput: {
    height: '100%',
    padding: '28px 50px 29px',
    fontFamily: 'var(--font-roboto)',
    fontSize: 28,
    lineHeight: '33px',
    fontWeight: 400,
    color: 'var(--black)',

    '&::placeholder': {
      fontWeight: 400,
      color: 'var(--white-black)',
    },
  },

  label: {
    fontSize: 24,
    fontWeight: 400,
    lineHeight: '28px',
    letterSpacing: '0em',
    textAlign: 'left',
    color: 'var(--white)',
    paddingLeft: 13,
    marginBottom: 13,
  },

  input: {
    width: 400,
    height: 90,
    background: 'var(--white)',
    borderRadius: 'var(--border-radius)',
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

export const Button = styled.button`
  width: 400px;
  height: 90px;
  margin-top: 10px;
  ${({ theme }) => theme.mixins.fCenter};
  border: none;
  background: var(--orange);
  border-radius: var(--border-radius);
  font-weight: 500;
  ${({ theme }) => theme.mixins.fontSize30};
  text-align: center;
  color: var(--white);

  &:is(:focus) {
    outline: none;
  }
`;
