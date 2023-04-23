import styled from 'styled-components';

export const Wrapper = styled.button`
  ${({ theme }) => theme.mixins.center};
  gap: 11px;
  ${({ theme }) => theme.mixins.fontSize22};
  font-weight: 400;
  color: var(--white-black);
  background: none;
  border: none;
  padding: 0;
`;
