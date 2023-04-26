import styled from 'styled-components';

export const Button = styled.button`
  font-weight: 400;
  ${({ theme }) => theme.mixins.fontSize22};
  color: var(--white-black);
  padding: 12px 14px;
  background: transparent;
  border: 1px solid var(--gray);
  border-radius: var(--border-radius);

  &.isEnded {
    background: var(--light-green);
    border-color: var(--light-green);
  }

  &.inWork {
    background: var(--orange);
    border-color: var(--orange);
  }
`;
