import styled from 'styled-components';

export const Wrapper = styled.div`
  ${({ theme }) => theme.mixins.wrapper};
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  column-gap: 42px;
  row-gap: 77px;
`;

export const NotFoundTitle = styled.p`
  ${({ theme }) => theme.mixins.fontSize40};
  font-family: var(--font-roboto);
  font-weight: 500;
  color: var(--white);
  text-align: center;
`;
