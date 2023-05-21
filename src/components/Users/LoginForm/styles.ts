import styled from 'styled-components';
import { createStyles, TextInput } from '@mantine/core';

export const FormWrapper = styled.form`
  --pt: clamp(4.06rem, calc(0.59rem + 4.07vw), 5.63rem);
  --gap: clamp(1.88rem, calc(1.04rem + 0.98vw), 2.25rem);

  ${({ theme }) => theme.mixins.column};
  align-items: flex-start;
  gap: var(--gap);

  @media ${({ theme }) => theme.bp.bpLarge} {
  }

  @media ${({ theme }) => theme.bp.bpXlarge} {
    min-height: calc(100vh - 289px);
    padding: var(--pt) 0px 0px;
  }
`;

export const Input = styled(TextInput)`
  input {
    width: var(--lgn-form-input-wd);
    min-height: var(--lgn-form-input-ht);
    background: var(--white);
    border-radius: var(--border-radius);
    padding: 12px var(--lgn-form-input-pd);
    font-family: var(--font-roboto);
    ${({ theme }) => theme.mixins.fontSize28};
    font-weight: 500;
    color: var(--black);

    &::placeholder {
      font-weight: 400;
      color: var(--white-black);
    }

    &[data-invalid] {
      color: var(--red);
      border-color: var(--red);
    }
  }
`;

export const useInputStyles = createStyles(() => ({
  error: {
    fontFamily: 'var(--font-roboto)',
    maxWidth: 'var(--lgn-form-input-wd)',
    fontSize: 'var(--fs-24-label)',
    fontWeight: 500,
    lineHeight: 'var(--fs-24-label-lh)',
    wordBreak: 'break-word',
    color: 'var(--red)',
    letterSpacing: 'clamp(0.05rem, calc(0.02rem + 0.03vw), 0.06rem)',
  },

  root: {
    minHeight: 'var(--lgn-form-input-ht)',
  },

  wrapper: {
    height: '100%',
  },

  innerInput: {
    height: '100%',
    padding: '12px var(--lgn-form-input-pd)',
    fontFamily: 'var(--font-roboto)',
    fontSize: 'var(--fs-28)',
    lineHeight: 'var(--fs-28-lh)',
    fontWeight: 500,
    color: 'var(--black)',

    '&::placeholder': {
      fontWeight: 400,
      color: 'var(--white-black)',
    },

    '&[data-invalid]': {
      color: 'var(--red)',
    },
  },

  label: {
    fontSize: 'var(--fs-24-label)',
    fontWeight: 400,
    lineHeight: 'var(--fs-24-label-lh)',
    letterSpacing: '0em',
    textAlign: 'left',
    color: 'var(--white)',
    paddingLeft: 'var(--lgn-form-label-pm)',
    marginBottom: 'var(--lgn-form-label-pm)',
  },

  input: {
    width: 'var(--lgn-form-input-wd)',
    minHeight: 'var(--lgn-form-input-ht)',
    background: 'var(--white)',
    borderRadius: 'var(--border-radius)',

    '&[data-invalid]': {
      color: 'var(--red)',
      borderColor: 'var(--red)',
    },
  },

  rightSection: {
    width: 'clamp(3.75rem, calc(2.09rem + 1.95vw), 4.50rem)',

    button: {
      width: 'var(--right-icon-wh)',
      height: 'var(--right-icon-wh)',
      minWidth: 'var(--right-icon-wh)',
      minHeight: 'var(--right-icon-wh)',

      svg: {
        width: 'var(--right-icon-wh)',
        height: 'var(--right-icon-wh)',
      },
    },
  },
}));

export const Button = styled.button`
  --btn-ht: clamp(4.81rem, calc(3.01rem + 2.11vw), 5.63rem);

  width: var(--lgn-form-input-wd);
  height: var(--btn-ht);
  margin-top: 10px;
  ${({ theme }) => theme.mixins.fCenter};
  border: none;
  background: var(--orange);
  border-radius: var(--border-radius);
  font-weight: 500;
  ${({ theme }) => theme.mixins.fontSize30};
  text-align: center;
  color: var(--white);

  &:is(:focus, :hover, :active) {
    outline: none;
  }
`;
