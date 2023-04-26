import styled from 'styled-components';

export const Wrapper = styled.div`
  position: relative;
  padding: 75px 70px;
  background: var(--white);
  box-shadow: 0px 4px 6px var(--black-shadow);
  border-radius: var(--border-radius);
`;

export const ProjectNumber = styled.p`
  position: absolute;
  top: -40px;
  height: 82px;
  width: 80px;
  ${({ theme }) => theme.mixins.fCenter};
  border-radius: 50%;
  outline: 7px solid var(--gradient-green2);
  background: var(--orange);

  font-family: var(--font-roboto);
  font-weight: 500;
  ${({ theme }) => theme.mixins.fontSize28};
  color: var(--white);
`;
