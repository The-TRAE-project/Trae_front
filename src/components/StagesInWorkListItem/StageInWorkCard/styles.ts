import styled from 'styled-components';

export const Wrapper = styled.div`
  position: relative;
  width: 1117px;
  ${({ theme }) => theme.mixins.center};
  background: var(--white);
  border-radius: var(--border-radius);
  padding: 25px 15px 24px 58px;
`;

export const ProjectNumber = styled.p`
  ${({ theme }) => theme.mixins.orangeCircle};
  position: absolute;
  top: 21px;
  left: -51px;
`;

export const Customer = styled.p`
  min-width: 283px;
  font-weight: 600;
  ${({ theme }) => theme.mixins.fontSize30};
  color: var(--white-black);
`;

export const ProjectOperation = styled.p`
  min-width: 316px;
  font-weight: 600;
  ${({ theme }) => theme.mixins.fontSize30};
  text-align: center;
  color: var(--orange);
`;

export const Furniture = styled.p`
  min-width: 209px;
  font-weight: 400;
  ${({ theme }) => theme.mixins.fontSize28};
  text-align: center;
  color: var(--black);
`;

export const FinishButton = styled.button`
  width: 222px;
  height: 77px;
  ${({ theme }) => theme.mixins.fCenter};
  padding: 20px 30px 22px;
  background: linear-gradient(
    97.03deg,
    var(--green) 7.5%,
    var(--gradient-green3) 94.35%
  );
  border: none;
  border-radius: var(--border-radius);

  font-weight: 600;
  ${({ theme }) => theme.mixins.fontSize30};
  color: var(--white);
`;
