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

export const TextWrapper = styled.div`
  min-height: 73px;
  padding: 2px;
  border-radius: var(--border-radius);
  background: linear-gradient(
    268.17deg,
    var(--white-gradient) 0%,
    var(--black-gradient) 104.24%
  );
`;

export const Text = styled.p`
  height: 100%;
  ${({ theme }) => theme.mixins.center};
  border-radius: var(--border-radius);
  background: var(--green3);
  backdrop-filter: blur(40px);
  padding: 20px 12px;
  font-family: var(--font-roboto);
  font-weight: 400;
  ${({ theme }) => theme.mixins.fontSize28};
  color: var(--white);
`;
