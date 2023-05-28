import { createStyles } from '@mantine/core';

export const useEmployeeSelectMenuStyles = createStyles(() => ({
  dropdown: {
    width: '100% !important',
    padding: '30px 30px 24px',
    background: 'var(--white)',
    boxShadow: '0px 4px 4px var(--black-shadow)',
    borderRadius: 'var(--border-radius)',
  },

  item: {
    padding: 0,
  },
}));
