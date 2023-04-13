import styled from 'styled-components';

export const Wrapper = styled.header`
  position: fixed;
  width: 100%;
  z-index: 100;

  @media ${({ theme }) => theme.bp.bpXlarge} {
    top: 0px;
  }
`;

export const Navbar = styled.nav`
  width: 100%;
  background-color: var(--white);
  border-radius: 0px 0px 15px 15px;
  overflow: hidden;
`;

export const List = styled.ul`
  ${({ theme }) => theme.mixins.center};
  height: 87px;
  overflow: hidden;
`;
