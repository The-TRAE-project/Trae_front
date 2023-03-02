import styled from 'styled-components';

export const Wrapper = styled.div`
  min-height: 240px;
  position: relative;
  padding: 57px 20px 13px;
  background-color: var(--secondary-white);
  ${({ theme }) => theme.mixins.column};
  align-items: center;
  gap: 0.9rem;
  border-radius: 15px;
  box-shadow: 0px 4px 6px var(black-shadow);
  text-align: center;
`;

export const ProjectNumber = styled.p`
  ${({ theme }) => theme.mixins.orangeCircle};
  position: absolute;
  top: -16%;
  left: 0;
  right: 0;
  margin: 0 auto;
`;

export const Customer = styled.p`
  font-weight: 400;
  color: var(--black);
  ${({ theme }) => theme.mixins.fontSize30};
`;

export const ProjectName = styled.p`
  font-weight: 600;
  color: var(--black);
  ${({ theme }) => theme.mixins.fontSize30};
  width: 182px;
  text-align: center;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`;

export const ProjectOperationName = styled.button`
  font-weight: 600;
  ${({ theme }) => theme.mixins.fontSize30};
  color: var(--green);
  background: none;
  border: none;

  &:is(:hover, :active, :focus) {
    outline: none;
  }
`;
