import styled from 'styled-components';

export const Item = styled.div`
  position: relative;
  min-height: 110px;
  ${({ theme }) => theme.mixins.apart};
  gap: 17px;
  border-radius: var(--border-radius);
  background: var(--white);
  padding: 8px 12px;
`;

export const ItemTitle = styled.p`
  max-width: 340px;
  font-family: var(--font-roboto);
  font-weight: 500;
  ${({ theme }) => theme.mixins.fontSize24};
  color: var(--white-black);
  word-break: break-word;
`;

export const ItemPriorityWrapper = styled.div`
  position: relative;
  height: 100%;
`;

export const ItemPriority = styled.p`
  position: absolute;
  top: 0;
  left: 0;
  ${({ theme }) => theme.mixins.column};
  align-items: flex-end;
  font-family: var(--font-roboto);
  font-weight: 500;
  ${({ theme }) => theme.mixins.fontSize32};
  color: var(--orange);

  &::after {
    content: '';
    display: inline-block;
    width: 55px;
    border: 2px solid var(--gray2);
  }
`;

export const DeleteButton = styled.button`
  color: var(--green);
  border: none;
  background: transparent;

  svg {
    width: 26px;
    height: 24px;
  }

  &:is(:hover, :active, :focus) {
    outline: none;
  }
`;
