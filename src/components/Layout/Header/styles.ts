import styled from 'styled-components';

export const Wrapper = styled.header`
  position: fixed;
  width: 100%;
  z-index: 100;

  @media ${({ theme }) => theme.bp.bpLarge} {
    top: 0px;
  }
`;

export const Navbar = styled.nav`
  width: 100%;
  background-color: var(--white);
  border-radius: 0px 0px 15px 15px;
  overflow: hidden;
  filter: drop-shadow(0px 4px 4px var(--black-shadow));
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
