import styled from 'styled-components';

export const Wrapper = styled.button`
  min-height: 240px;
  position: relative;
  padding: 57px 20px 13px;
  background-color: var(--secondary-white);
  ${({ theme }) => theme.mixins.column};
  align-items: center;
  gap: 0.9rem;
  border: none;
  border-radius: 15px;
  box-shadow: 0px 4px 6px var(black-shadow);
  text-align: center;

  &:is(:hover, :active, :focus) {
    outline: none;
  }
`;

export const ProjectOperationName = styled.p`
  font-weight: 600;
  ${({ theme }) => theme.mixins.fontSize30};
  color: var(--green);
`;
