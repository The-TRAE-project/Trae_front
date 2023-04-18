import { Group as MantineGroup } from '@mantine/core';
import styled from 'styled-components';

export const Wrapper = styled.header`
  position: fixed;
  width: 100%;
  z-index: 100;

  @media ${({ theme }) => theme.bp.bpXlarge} {
    padding: 40px;
    top: 36px;
  }
`;

export const FlexContainer = styled(MantineGroup)`
  position: relative;
`;
