import styled from 'styled-components';
import { UnstyledButton } from '../../styles';

export const Wrapper = styled.div`
  position: relative;
  min-height: calc(100vh - 336px);
  ${({ theme }) => theme.mixins.column};
  gap: 40px;
`;

export const DetailsCard = styled.div`
  position: relative;
  min-height: 167px;
  max-width: 510px;
  background-color: var(--white);
  border-radius: var(--border-radius);
  padding: 24px 20px 27px;
  ${({ theme }) => theme.mixins.column};
  justify-content: space-between;
  align-items: center;
  overflow: hidden;
`;

export const DetailsTitle = styled.p`
  max-width: 311px;
  min-height: 70px;
  font-weight: 600;
  ${({ theme }) => theme.mixins.fontSize30};
  ${({ theme }) => theme.mixins.fCenter};
  text-align: center;
  color: var(--white-black);
`;

export const DetailsText = styled.p`
  font-family: var(--font-roboto);
  font-weight: 400;
  ${({ theme }) => theme.mixins.fontSize26};
  text-align: center;
  color: var(--white-black);
`;

export const EditDetailsButton = styled(UnstyledButton)`
  position: absolute;
  top: 20px;
  right: 20px;

  svg {
    color: var(--orange);
  }
`;
