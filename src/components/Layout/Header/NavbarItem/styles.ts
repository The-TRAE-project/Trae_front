import styled from 'styled-components';

export const Wrapper = styled.li`
  position: relative;
`;

export const HorizontalDivider = styled.span`
  position: absolute;
  right: -24px;
  display: inline-block;
  height: 2px;
  border: 1px solid var(--orange);
  transform: rotate(90deg);
  transition: var(--transition);
  opacity: 1;

  @media ${({ theme }) => theme.bp.bpLarge} {
    top: 32px;
    width: 50px;
  }

  @media ${({ theme }) => theme.bp.bpXlarge} {
    top: 40px;
    width: 52px;
  }
`;

type ButtonProps = {
  $isActive: boolean;
};

export const Button = styled.button`
  ${({ theme }) => theme.mixins.fCenter};
  border: none;
  border-radius: ${(props: ButtonProps) =>
    props.$isActive ? '0px 0px 15px 15px' : '0'};
  background-color: ${(props: ButtonProps) =>
    props.$isActive ? 'var(--orange)' : 'var(--white)'};
  font-weight: 600;
  color: ${(props: ButtonProps) =>
    props.$isActive ? 'var(--white)' : 'var(--white-black)'};
  transition: var(--transition);

  @media ${({ theme }) => theme.bp.bpLarge} {
    height: 70px;
    font-size: 24px;
    line-height: 27px;
    padding: 16px 38.4px;
  }

  @media (min-width: 1500px) {
    height: 72px;
    font-size: 25px;
    line-height: 28px;
    padding: 16px 35.8px;
  }

  @media (min-width: 1600px) {
    height: 74px;
    font-size: 26px;
    line-height: 29px;
    padding: 16px 33px;
  }

  @media (min-width: 1700px) {
    height: 78px;
    font-size: 27px;
    line-height: 30px;
    padding: 16px 29.5px;
  }

  @media (min-width: 1800px) {
    height: 80px;
    font-size: 28px;
    line-height: 31.5px;
    padding: 16px 26.8px;
  }

  @media (min-width: 1850px) {
    height: 84px;
    font-size: 29px;
    line-height: 33px;
    padding: 16px 24.1px;
  }

  @media ${({ theme }) => theme.bp.bpXlarge} {
    height: 88px;
    padding: 25px 34.5px 28px;
    font-size: 30px;
    line-height: 35px;
  }
`;

export const UserProfileButton = styled.button`
  ${({ theme }) => theme.mixins.fCenter};
  border: none;
  border-radius: ${(props: ButtonProps) =>
    props.$isActive ? '0px 0px 15px 15px' : '0'};
  background-color: ${(props: ButtonProps) =>
    props.$isActive ? 'var(--orange)' : 'var(--white)'};
  transition: var(--transition);

  svg {
    transition: var(--transition);
    color: ${(props: ButtonProps) =>
      props.$isActive ? 'var(--white)' : 'var(--orange)'};
  }

  @media ${({ theme }) => theme.bp.bpLarge} {
    width: 111px;
    height: 70px;

    svg {
      width: 38px;
      height: 38px;
    }
  }

  @media (min-width: 1500px) {
    height: 72px;
  }

  @media (min-width: 1600px) {
    height: 74px;
  }

  @media (min-width: 1700px) {
    height: 78px;
    width: 120px;
  }

  @media (min-width: 1800px) {
    height: 80px;
  }

  @media (min-width: 1850px) {
    height: 84px;
  }

  @media ${({ theme }) => theme.bp.bpXlarge} {
    width: 130px;
    height: 88px;

    svg {
      width: 48px;
      height: 48px;
    }
  }
`;
