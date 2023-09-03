import { createStyles, Group as MantineGroup } from '@mantine/core';
import styled from 'styled-components';

export const Group = styled(MantineGroup)`
  --gap-12: clamp(0.5rem, calc(-0.12rem + 0.72vw), 0.75rem);

  gap: var(--gap-12);
`;

type TitleProps = {
  $active?: boolean;
};

export const Title = styled.p<TitleProps>`
  max-width: 266px;
  font-weight: ${(props) => (props.$active ? 500 : 400)};
  color: ${(props) => (props.$active ? 'var(--orange)' : 'var(--white-black)')};
  word-break: break-word;
  transition: var(--transition);
`;

export const useSquareCheckboxStyles = createStyles(() => ({
  squareInput: {
    width: 'var(--checkbox-wd-th)',
    height: 'var(--checkbox-wd-th)',
    border: '1.5px solid var(--gray)',
    borderRadius: '4px',

    '&:checked': {
      backgroundColor: 'var(--white)',
      borderColor: 'var(--gray)',
    },
  },

  inner: {
    width: 'var(--checkbox-wd-th)',
    height: 'var(--checkbox-wd-th)',
  },

  icon: {
    width: 'var(--checkbox-i-wd-ht)',
    height: 'var(--checkbox-i-wd-ht)',
    color: 'var(--orange) !important',
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
}));
