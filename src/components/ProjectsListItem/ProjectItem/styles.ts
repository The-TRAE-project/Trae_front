import styled from 'styled-components';

export const Wrapper = styled.div`
  position: relative;
  min-width: 400px;
  ${({ theme }) => theme.mixins.fCenter};
  padding: 52px 4px 54px;
  background: var(--gray-shadow);
  backdrop-filter: blur(40px);
  border-radius: var(--border-radius);
`;

export const Title = styled.p`
  max-width: 370px;
  text-align: center;
  font-weight: 500;
  ${({ theme }) => theme.mixins.fontSize40};
  color: var(--white);
`;

export const Quantity = styled.p`
  position: absolute;
  top: -35px;
  left: 20px;
  font-family: var(--font-roboto);
  font-weight: 400;
  font-size: 60px;
  line-height: 70px;
  color: var(--white2);
`;
