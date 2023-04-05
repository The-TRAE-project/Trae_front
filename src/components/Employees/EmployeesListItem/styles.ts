import styled from 'styled-components';
// TODO
export const Wrapper = styled.div`
  ${({ theme }) => theme.mixins.wrapper};
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
`;
