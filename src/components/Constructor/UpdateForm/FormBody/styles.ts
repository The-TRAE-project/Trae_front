import styled from 'styled-components';

export const Wrapper = styled.div`
  position: relative;
  min-height: calc(100vh - 336px);
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 40px;
`;

export const ResetPasswordButton = styled.button`
  grid-column-start: 3;
  ${({ theme }) => theme.mixins.fCenter};
  padding: 22.5px;
  min-height: 73px;
  max-height: 73px;
  background: var(--orange);
  border: 2px dashed var(--white);
  border-radius: var(--border-radius);
  font-weight: 400;
  ${({ theme }) => theme.mixins.fontSize24};
  color: var(--white);

  &:is(:focus, :focus-within) {
    outline: none;
  }
`;
