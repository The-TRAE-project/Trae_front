import { Group as MantineGroup } from '@mantine/core';
import styled from 'styled-components';

import { OrangeButton } from '../styles';

export const Wrapper = styled(MantineGroup)`
  position: relative;
  justify-content: space-between;
`;

export const IconsGroup = styled(MantineGroup)`
  --gap-40: clamp(1.88rem, calc(0.33rem + 1.81vw), 2.5rem);

  gap: var(--gap-40);
`;

export const Button = styled(OrangeButton)`
  --svg-wd: clamp(1.25rem, calc(-0.29rem + 1.81vw), 1.88rem);
  --svg-ht: clamp(1.25rem, calc(-0.29rem + 1.81vw), 1.88rem);

  svg {
    width: var(--svg-wd);
    height: var(--svg-ht);
  }
`;
