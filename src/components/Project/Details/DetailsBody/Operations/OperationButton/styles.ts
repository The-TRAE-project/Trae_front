import styled from 'styled-components';

export const Button = styled.button`
  font-weight: 400;
  ${({ theme }) => theme.mixins.fontSize22};
  color: var(--white-black);
  padding: 12px 14px;
  background: transparent;
  border: 1px solid var(--gray);
  border-radius: var(--border-radius);
  text-overflow: ellipsis;
  overflow-x: hidden;
  max-width: 80%;
  width: fit-content;

  &.isEnded {
    font-weight: 500;
    color: var(--white);
    background: var(--light-green);
    border-color: var(--light-green);
  }

  &.inWork {
    font-weight: 500;
    color: var(--white);
    background: var(--orange);
    border-color: var(--orange);
  }

  &.readyToAcceptance {
    font-weight: 500;
    color: var(--green);
    border-color: var(--green);
    border-width: 3px;
  }
`;
