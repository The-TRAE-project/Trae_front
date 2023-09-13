import { Group as MantineGroup } from '@mantine/core';
import styled from 'styled-components';

export const Wrapper = styled.header`
  position: absolute;
  top: 0px;
  width: 100%;
  z-index: 100;

  @media ${({ theme }) => theme.bp.bpXlarge} {
    padding: 40px;
    top: 36px;
  }
`;

export const FlexContainer = styled(MantineGroup)`
  position: relative;
  display: flex;
  flex-direction: row-reverse;
`;

export const UserProfileButton = styled.button`
  ${({ theme }) => theme.mixins.fCenter};
  border: none;
  background-color: transparent;
  padding: 0;

  svg {
    color: var(--orange);
  }

  @media ${({ theme }) => theme.bp.bpLarge} {
    svg {
      width: 38px;
      height: 38px;
    }
  }

  @media ${({ theme }) => theme.bp.bpXlarge} {
    svg {
      width: 48px;
      height: 48px;
    }
  }
`;
