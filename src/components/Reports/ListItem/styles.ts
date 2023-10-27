import styled from 'styled-components';

export const LinkBtn = styled.button`
  min-height: 187px;
  ${({ theme }) => theme.mixins.fCenter};
  font-weight: 600;
  ${({ theme }) => theme.mixins.fontSize40};
  text-align: center;
  color: var(--orange);
  padding: 70px 82px;
  background: var(--white);
  border: none;
  border-radius: var(--border-radius);
  &:hover {
    box-shadow: var(--box-shadow);
  }
`;
