import styled from 'styled-components';

export const Wrapper = styled.div`
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
  height: 82px;
  width: 80px;
  font-family: var(--font-roboto);
  font-weight: 500;
  ${({ theme }) => theme.mixins.fontSize28};
  color: var(--white);
  position: absolute;
  top: -16%;
  left: 0;
  right: 0;
  margin: 0 auto;
  ${({ theme }) => theme.mixins.fCenter};
  background-color: var(--orange);
  outline: 7px solid var(--green);
  border-radius: 50%;
`;

export const Employee = styled.p`
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

export const ProjectStatus = styled.button`
  font-weight: 600;
  ${({ theme }) => theme.mixins.fontSize30};
  color: var(--orange);
  background: none;
  border: none;

  &:is(:hover, :active, :focus) {
    outline: none;
  }

  &:disabled {
    cursor: not-allowed;
    color: var(--green);
  }
`;
