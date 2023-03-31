import styled from 'styled-components';

export const Wrapper = styled.div`
  ${({ theme }) => theme.mixins.fCenter};
  padding: 22px 30px;
  width: 620px;
  height: 79px;
  background: var(--white);
  border-radius: var(--border-radius);
`;

export const LinkBtn = styled.button`
  background: none;
  border: none;
  font-weight: 600;
  ${({ theme }) => theme.mixins.fontSize30};
  color: var(--white-black);

  &:is(:focus, :focus-within) {
    outline: none;
  }
`;
