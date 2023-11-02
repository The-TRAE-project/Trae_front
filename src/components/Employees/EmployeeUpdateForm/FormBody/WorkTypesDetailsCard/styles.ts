import styled from 'styled-components';

export const GroupWrapper = styled.div`
  background-color: var(--white-20);
  border-radius: var(--border-radius);
  position: relative;

  &:before {
    content: '';
    position: absolute;
    inset: 0px;
    z-index: -1;
    padding: 2px;
    border-radius: inherit;
    background: linear-gradient(
      to right,
      var(--black-gradient),
      var(--white-gradient)
    );

    -webkit-mask: linear-gradient(#fff 0 0) content-box,
      linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;

    mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    mask-composite: exclude;
  }
`;

export const Group = styled.div`
  max-width: 400px;
  ${({ theme }) => theme.mixins.center};
  flex-wrap: wrap;
  gap: 20px;
  padding: 10px 12px;
`;

export const WorkTypeCard = styled.p`
  min-width: 129px;
  min-height: 53px;
  border: 1px solid var(--white);
  border-radius: var(--border-radius);
  font-family: var(--font-roboto);
  font-weight: 500;
  ${({ theme }) => theme.mixins.fontSize24};
  color: var(--white);
  padding: 0 14px;
  ${({ theme }) => theme.mixins.fCenter};
`;
