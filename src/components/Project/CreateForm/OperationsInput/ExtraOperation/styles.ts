import { createStyles } from '@mantine/core';
import styled from 'styled-components';
import { AiOutlinePlusCircle } from 'react-icons/ai';

export const ExtraOperationButton = styled.button`
  ${({ theme }) => theme.mixins.center};
  gap: 11px;
  border: none;
  background: none;

  font-weight: 400;
  ${({ theme }) => theme.mixins.fontSize22};
  color: var(--white-black);
  padding: 0;
`;

export const useInputStyles = createStyles(() => ({
  label: {
    fontSize: 20,
    fontWeight: 400,
    lineHeight: '23px',
    color: 'var(--white-black)',
    paddingLeft: 12,
    marginBottom: 8,
  },

  input: {
    width: '100%',
    minWidth: 277,
    maxWidth: 277,
    height: 40,
    minHeight: 40,
    padding: '8px 12px 9px',
    border: '1.5px solid var(--gray)',
    borderRadius: 'var(--border-radius)',
    fontFamily: 'var(--font-roboto)',
    fontSize: 20,
    fontWeight: 400,
    lineHeight: '23px',
    color: 'var(--black)',
  },

  error: {
    maxWidth: 277,
    fontFamily: 'var(--font-roboto)',
    fontSize: 20,
    fontWeight: 500,
    lineHeight: '18px',
    color: 'var(--red)',
  },

  rightSection: {
    right: 5,
    transform: 'rotate(180deg)',
  },
}));

export const Plus = styled(AiOutlinePlusCircle)`
  color: var(--green);
`;
