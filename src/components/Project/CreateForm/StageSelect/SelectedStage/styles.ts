import styled from 'styled-components';

export const Wrapper = styled.p`
  min-height: 51px;
  ${({ theme }) => theme.mixins.center};
  gap: 10px;
  padding: 10px 12px;
  border: 1.5px solid var(--gray);
  border-radius: var(--border-radius);
  font-family: var(--font-roboto);
  ${({ theme }) => theme.mixins.fontSize22};
  font-weight: 400;
  color: var(--white-black);
  white-space: nowrap;
`;
