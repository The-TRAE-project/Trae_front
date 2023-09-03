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
    position: 'absolute',
    left: '0px !important',
    top: '120px !important',
  },

  item: {
    padding:
      'clamp(0.31rem, calc(-0.30rem + 0.72vw), 0.56rem) 0 clamp(0.31rem, calc(-0.30rem + 0.72vw), 0.56rem)',
    fontWeight: 400,
    fontSize: 'var(--fs-24)',
    lineHeight: 'var(--fs-24-lh)',
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
