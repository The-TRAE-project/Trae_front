import { createStyles } from '@mantine/core';
import styled from 'styled-components';

export const useUserFilterStyles = createStyles(() => ({
  dropdown: {
    left: '320px !important',
    maxWidth: 306,
    maxHeight: 420,
    border: 'none',
    background: 'var(--white)',
    padding: '24px 30px',
    boxShadow: '0px 4px 4px var(--black-shadow)',
    borderRadius: 'var(--border-radius)',
  },

  label: {
    padding: 0,
    fontWeight: 600,
    fontSize: 24,
    lineHeight: '28px',
    color: 'var(--white-black)',
  },

  item: {
    padding: '9px 10px 9px 34px',
    fontWeight: 400,
    fontSize: 24,
    lineHeight: '28px',
  },
}));

type MenuItemTitleProps = {
  $active?: boolean;
};

export const MenuItemTitle = styled.p<MenuItemTitleProps>`
  color: ${(props) => (props.$active ? 'var(--orange)' : 'var(--white-black)')};
  transition: var(--transition);
`;
