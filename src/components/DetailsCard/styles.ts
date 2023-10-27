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
  border-radius: var(--border-radius);
  background: var(--green-disabled);
  padding: 20px 12px;
  font-family: var(--font-roboto);
  font-weight: 400;
  ${({ theme }) => theme.mixins.fontSize28};
  color: var(--white);

  border: solid 2px transparent;
  background-clip: padding-box;
  position: relative;

  &:before {
    content: '';
    position: absolute;
    inset: 0px;
    z-index: -1;
    margin: -2px;
    border-radius: inherit;
    background: linear-gradient(
      to right,
      var(--black-gradient),
      var(--white-gradient)
    );
  }
`;
