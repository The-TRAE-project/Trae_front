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
`;

export const Item = styled.li`
  position: relative;
`;

export const HorizontalDivider = styled.span`
  position: absolute;
  right: -24px;
  top: 40px;
  display: inline-block;
  width: 52px;
  height: 2px;
  border: 1px solid var(--orange);
  transform: rotate(90deg);
  transition: var(--transition);
  opacity: 1;
`;

type ButtonProps = {
  active: boolean;
};

export const Button = styled.button`
  height: 88px;
  ${({ theme }) => theme.mixins.fCenter};
  padding: 25px 34px 28px;
  border: none;
  border-radius: ${(props: ButtonProps) =>
    props.active ? '0px 0px 15px 15px' : '0'};
  background-color: ${(props: ButtonProps) =>
    props.active ? 'var(--orange)' : 'var(--white)'};
  font-weight: 600;
  ${({ theme }) => theme.mixins.fontSize30};
  color: ${(props: ButtonProps) =>
    props.active ? 'var(--white)' : 'var(--white-black)'};
  transition: var(--transition);
`;

export const UserProfileButton = styled.button`
  width: 127px;
  height: 88px;
  ${({ theme }) => theme.mixins.fCenter};
  background: none;
  border: none;
`;
