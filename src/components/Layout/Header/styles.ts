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

type ActiveItemProps = {
  active: boolean;
  hideBorder?: boolean;
};

export const Item = styled.li`
  position: relative;

  &::after,
  &::before {
    content: '';
    position: absolute;
    top: 40px;
    display: none;
    width: 52px;
    border: 1px solid var(--orange);
    transform: rotate(90deg);
    transition: var(--transition);
    opacity: ${(props: ActiveItemProps) => (props.active ? '0' : '1')};
  }

  &:nth-child(1),
  &:nth-child(2),
  &:nth-child(3),
  &:nth-child(4) {
    &::after {
      right: -24px;
      display: ${(props: ActiveItemProps) =>
        props.hideBorder ? 'none' : 'block'};
    }
  }
`;

export const Button = styled.button`
  width: 280px;
  height: 88px;
  ${({ theme }) => theme.mixins.fCenter};
  padding: 22.5px 0 25.5px;
  border: none;
  border-radius: ${(props: ActiveItemProps) =>
    props.active ? '0px 0px 15px 15px' : '0'};
  background-color: ${(props: ActiveItemProps) =>
    props.active ? 'var(--orange)' : 'var(--white)'};
  font-weight: 600;
  font-size: 34px;
  line-height: 40px;
  color: ${(props: ActiveItemProps) =>
    props.active ? 'var(--white)' : 'var(--white-black)'};
  transition: var(--transition);
`;

export const UserProfileButton = styled.button`
  width: 163px;
  height: 88px;
  ${({ theme }) => theme.mixins.fCenter};
  background: none;
  border: none;
`;
