import styled from 'styled-components';

type SelectCircleIconProps = {
  $isActive: boolean;
};

export const SelectCircleIcon = styled.span`
  position: relative;
  width: 31px;
  height: 31px;
  ${({ theme }) => theme.mixins.fCenter};
  border: 1.5px solid var(--gray);
  border-radius: 20px;

  &::after {
    content: '';
    display: inline-block;
    width: ${(props: SelectCircleIconProps) => props.$isActive && '19px'};
    height: ${(props: SelectCircleIconProps) => props.$isActive && '19px'};
    border-radius: 50%;
    background: var(--orange);
  }
`;
