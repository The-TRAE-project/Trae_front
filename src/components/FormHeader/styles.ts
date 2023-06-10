import styled from 'styled-components';

export const DeleteButton = styled.button`
  height: 58px;
  ${({ theme }) => theme.mixins.fCenter};
  font-weight: 400;
  ${({ theme }) => theme.mixins.fontSize24};
  text-align: center;
  color: var(--white);
  padding: 10px 24px;
  background: transparent;
  border: none;
  background-image: url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='15' ry='15' stroke='white' stroke-width='4' stroke-dasharray='14%2c 16' stroke-dashoffset='0' stroke-linecap='square'/%3e%3c/svg%3e");
  border-radius: var(--border-radius);

  &:is(:hover, :active, :focus) {
    outline: none;
  }
`;
