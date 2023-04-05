import styled, { css } from 'styled-components';

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
  index?: number;
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
  &:nth-child(4),
  &:nth-child(5) {
    &::after {
      right: -24px;
      display: ${(props: ActiveItemProps) =>
        props.hideBorder ? 'none' : 'block'};
    }
  }

  ${(props: ActiveItemProps) =>
    props.index
      ? css`
          &:nth-child(${(prop: ActiveItemProps) => prop.index}) {
            &::after {
              display: none;
            }
          }
        `
      : css`
          &::after {
            display: block;
          }
        `}

  &:nth-child(${(props: ActiveItemProps) => props.index}) {
    &::after {
      display: none;
    }
  }
`;

export const Button = styled.button`
  height: 88px;
  ${({ theme }) => theme.mixins.fCenter};
  padding: 25px 34px 28px;
  border: none;
  border-radius: ${(props: ActiveItemProps) =>
    props.active ? '0px 0px 15px 15px' : '0'};
  background-color: ${(props: ActiveItemProps) =>
    props.active ? 'var(--orange)' : 'var(--white)'};
  font-weight: 600;
  ${({ theme }) => theme.mixins.fontSize30};
  color: ${(props: ActiveItemProps) =>
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
