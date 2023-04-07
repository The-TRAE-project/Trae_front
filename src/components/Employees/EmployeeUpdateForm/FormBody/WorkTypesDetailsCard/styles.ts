import styled from 'styled-components';

export const Group = styled.div`
  min-height: 73px;
  max-width: 400px;
  ${({ theme }) => theme.mixins.center};
  flex-wrap: wrap;
  gap: 20px;
  padding: 10px 12px;
  background: var(--gray-shadow);
  border-radius: var(--border-radius);
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
