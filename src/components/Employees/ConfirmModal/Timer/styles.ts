import styled from 'styled-components';

export const TimerTitle = styled.p`
  font-family: var(--font-roboto);
  font-weight: 300;
  ${({ theme }) => theme.mixins.fontSize32};
  color: var(--white-black);
  opacity: 0.9;
  text-align: center;
`;
