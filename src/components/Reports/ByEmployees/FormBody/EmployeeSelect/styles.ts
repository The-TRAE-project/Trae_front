import styled from 'styled-components';
import { createStyles } from '@mantine/core';

export const useEmployeeSelectMenuStyles = createStyles(() => ({
  dropdown: {
    width: '100% !important',
    maxHeight: 414,
    padding: '30px 30px 24px',
    background: 'var(--white)',
    boxShadow: '0px 4px 4px var(--black-shadow)',
    borderRadius: 'var(--border-radius)',
    overflow: 'auto',
  },

  item: {
    padding: 0,
  },
}));

export const SelectAllTitle = styled.h6`
  font-family: var(--font-roboto);
  font-weight: 500;
  ${({ theme }) => theme.mixins.fontSize28};
  color: var(--white-black);
`;

export const SelectedEmployee = styled.div`
  ${({ theme }) => theme.mixins.fCenter};
  padding: 8px 14px;
  border: 1px solid var(--gray);
  border-radius: var(--border-radius);

  font-family: var(--font-roboto);
  font-weight: 500;
  ${({ theme }) => theme.mixins.fontSize28};
  color: var(--white-black);
`;
