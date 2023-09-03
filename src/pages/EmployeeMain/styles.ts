import styled from 'styled-components';

export const DashedButton = styled.button`
  padding: 38px 24px;
  width: 410px;
  height: 123px;
  border: 5px dashed var(--white);
  border-radius: var(--border-radius);
  background: transparent;
  ${({ theme }) => theme.mixins.fCenter};

  font-weight: 500;
  ${({ theme }) => theme.mixins.fontSize40};
  color: var(--white);
`;
