import { MdOutlineSearch } from 'react-icons/md';
import styled from 'styled-components';

export const InputWrapper = styled.div`
  width: 719px;
  height: 58px;
  ${({ theme }) => theme.mixins.apart};
  background: var(--gray-shadow);
  border-radius: var(--border-radius);
  padding: 16px 18px 14px 14px;
`;

export const Input = styled.input`
  width: 100%;
  height: 100%;
  font-weight: 400;
  ${({ theme }) => theme.mixins.fontSize24};
  color: var(--white);
  border: none;
  background: transparent;

  &:is(:hover, :active, :focus) {
    outline: none;
  }

  &::placeholder {
    font-weight: 300;
    color: var(--white-gradient);
  }
`;

export const SearchIcon = styled(MdOutlineSearch)`
  font-size: 32px;
  font-weight: 300;
  color: var(--white);
`;
