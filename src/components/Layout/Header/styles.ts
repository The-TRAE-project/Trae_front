import styled from 'styled-components';

export const Wrapper = styled.header`
  position: fixed;
  width: 100vw;
  z-index: 199;

  @media ${({ theme }) => theme.bp.bpLarge} {
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
  overflow: hidden;

  @media ${({ theme }) => theme.bp.bpLarge} {
    height: 70px;
  }

  @media (min-width: 1500px) {
    height: 72px;
  }

  @media (min-width: 1600px) {
    height: 74px;
  }

  @media (min-width: 1700px) {
    height: 78px;
  }

  @media (min-width: 1800px) {
    height: 80px;
  }

  @media (min-width: 1850px) {
    height: 84px;
  }

  @media ${({ theme }) => theme.bp.bpXlarge} {
    height: 87px;
  }
`;
