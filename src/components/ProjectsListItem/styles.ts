import styled from 'styled-components';

export const Wrapper = styled.div`
  margin-top: 105px;
  ${({ theme }) => theme.mixins.fCenter};
  flex-wrap: wrap;
  column-gap: 40px;
  row-gap: 85px;
`;
