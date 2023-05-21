import { createStyles } from '@mantine/core';
import styled from 'styled-components';

export const MenuItemStack = styled.div`
  ${({ theme }) => theme.mixins.column};
  padding-left: 38px;
`;

export const useMenuStyles = createStyles(() => ({
  dropdown: {
    left: '320px !important',
    width: '366px !important',
    maxWidth: 366,
    maxHeight: 450,
    border: 'none',
    background: 'var(--white)',
    padding: '24px 30px',
    boxShadow: '0px 4px 4px var(--black-shadow)',
    borderRadius: 'var(--border-radius)',
  },
}));

export const useCircleCheckboxStyles = createStyles(() => ({
  circleInput: {
    width: 31,
    height: 31,
    borderRadius: '100%',
    border: '1.5px solid var(--gray)',
    padding: 6,

    '&:checked': {
      borderColor: 'var(--gray)',
      backgroundColor: 'var(--white)',
    },

    '&:checked +.___ref-icon': {
      borderRadius: '50%',
      backgroundColor: 'var(--orange)',
    },
  },

  circleInner: {
    width: 31,
    height: 31,
  },

  circleIcon: {
    width: 19,
    height: 19,
    color: 'var(--orange) !important',
  },
}));
