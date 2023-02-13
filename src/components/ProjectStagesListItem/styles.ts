import styled from 'styled-components';
import { fColumn } from '../../helpers/cssFragments';

export const Wrapper = styled.div`
  padding-top: 60px;
  ${fColumn};
  gap: 54px;
`;

export const Stack = styled.div`
  ${fColumn};
  gap: 142px;
`;

export const FlexContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0 70px;
`;
