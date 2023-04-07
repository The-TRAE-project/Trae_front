import styled from 'styled-components';

export const Text = styled.p`
  min-height: 73px;
  background: var(--gray-shadow);
  border-radius: var(--border-radius);
  backdrop-filter: blur(40px);
  padding: 20px 12px;
  font-family: var(--font-roboto);
  font-weight: 400;
  ${({ theme }) => theme.mixins.fontSize28};
  color: var(--white);
`;
