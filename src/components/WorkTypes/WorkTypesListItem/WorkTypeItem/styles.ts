import styled from 'styled-components';

export const Title = styled.p`
  font-weight: 600;
  ${({ theme }) => theme.mixins.fontSize30};
  color: var(--white-black);
`;

export const EditButton = styled.button`
  position: absolute;
  top: 27px;
  right: 28px;
  font-size: 24px;
  border: none;
  background: none;
  color: var(--orange);

  &:is(:focus, :focus-within) {
    outline: none;
  }
`;
