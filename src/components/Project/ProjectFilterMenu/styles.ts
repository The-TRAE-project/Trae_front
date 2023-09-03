import styled from 'styled-components';

export const MenuItemStack = styled.div`
  ${({ theme }) => theme.mixins.column};
  padding-left: 35px;
`;
