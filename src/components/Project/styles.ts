import styled from 'styled-components';

export const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
`;

export const Title = styled.p`
  font-family: var(--font-roboto);
  font-weight: 500;
  ${({ theme }) => theme.mixins.fontSize24};
  color: var(--black);
  text-align: center;
`;

export const Group = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: space-between;
`;

export const Divider = styled.div`
  width: 177px;
  position: absolute;
  top: 118px;
  right: 0;
  left: 0;
  margin: 0 auto;
  border: 2px solid var(--gray2);
  transform: rotate(90deg);
`;

export const DateBadge = styled.p`
  width: 94px;
  height: 43px;
  ${({ theme }) => theme.mixins.fCenter};
  background: var(--orange2);
  border-radius: var(--border-radius);

  font-family: var(--font-roboto);
  font-weight: 400;
  ${({ theme }) => theme.mixins.fontSize20};
  color: var(--white);
`;
