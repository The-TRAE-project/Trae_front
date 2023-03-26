import styled from 'styled-components';

export const InformText = styled.p`
  font-family: var(--font-roboto);
  font-weight: 400;
  ${({ theme }) => theme.mixins.fontSize28}
  text-align: center;
  color: var(--white-black);
`;
