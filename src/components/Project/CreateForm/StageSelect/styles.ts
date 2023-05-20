import styled from 'styled-components';

export const ActiveCircle = styled.span`
  display: inline-block;
  width: 31px;
  height: 31px;
  ${({ theme }) => theme.mixins.fCenter};
  font-family: var(--font-roboto);
  font-weight: 400;
  font-size: 20px;
  line-height: 23px;
  color: var(--white);
  background: var(--orange);
  border-radius: 20px;
`;

type NotActiveCircleProps = {
  $isActive?: boolean;
};

export const NotActiveCircle = styled.span`
  display: inline-block;
  width: 31px;
  height: 31px;
  border: 1.5px solid
    ${(props: NotActiveCircleProps) =>
      props.$isActive ? 'var(--orange)' : 'var(--gray)'};
  border-radius: 20px;
  background: ${(props: NotActiveCircleProps) =>
    props.$isActive ? 'var(--orange)' : 'var(--white)'};
`;
