import { createStyles } from '@mantine/core';
import styled from 'styled-components';

export const MenuItemStack = styled.div`
  ${({ theme }) => theme.mixins.column};
  padding-left: 38px;
`;

export const useMenuStyles = createStyles(() => ({
  dropdown: {
    left: '0px !important',
    width: '366px !important',
    maxWidth: 366,
    maxHeight: 450,
    border: 'none',
    background: 'var(--white)',
    padding: 'var(--menu-ptb) var(--menu-plr)',
    boxShadow: '0px 4px 4px var(--black-shadow)',
    borderRadius: 'var(--border-radius)',
  },
}));

export const useCircleCheckboxStyles = createStyles(() => ({
  circleInput: {
    width: 'var(--checkbox-wd-th)',
    height: 'var(--checkbox-wd-th)',
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
    width: 'var(--checkbox-wd-th)',
    height: 'var(--checkbox-wd-th)',
  },

  circleIcon: {
    width: 'var(--checkbox-i-wd-ht)',
    height: 'var(--checkbox-i-wd-ht)',
    color: 'var(--orange) !important',
  },
}));
