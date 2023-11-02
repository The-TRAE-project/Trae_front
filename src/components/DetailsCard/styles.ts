import styled from 'styled-components';

export const Stack = styled.div`
  max-height: 114px;
  ${({ theme }) => theme.mixins.column};
  gap: 13px;
`;

export const Label = styled.p`
  font-weight: 400;
  ${({ theme }) => theme.mixins.fontSize24};
  color: var(--white);
  padding-left: 14px;
`;

export const Text = styled.p`
  min-height: 73px;
  ${({ theme }) => theme.mixins.center};

  padding: 20px 12px;
  font-family: var(--font-roboto);
  font-weight: 400;
  ${({ theme }) => theme.mixins.fontSize28};
  color: var(--white);

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
