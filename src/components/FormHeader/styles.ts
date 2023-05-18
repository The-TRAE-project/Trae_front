import styled from 'styled-components';

export const DeleteButton = styled.button`
  height: 58px;
  ${({ theme }) => theme.mixins.fCenter};
  font-weight: 400;
  ${({ theme }) => theme.mixins.fontSize24};
  text-align: center;
  color: var(--white);
  padding: 10px 24px;
  border: 2px dashed var(--white);
  border-radius: var(--border-radius);
  background: transparent;

  &:is(:hover, :active, :focus) {
    outline: none;
  }
`;
