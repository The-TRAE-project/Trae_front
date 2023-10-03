import { MdOutlineSearch } from 'react-icons/md';
import styled from 'styled-components';

export const InputWrapper = styled.div`
  --wd: clamp(36.25rem, calc(14.83rem + 25.09vw), 44.94rem);
  --ht: clamp(3rem, calc(1.46rem + 1.81vw), 3.63rem);

  position: relative;
  width: var(--wd);
  height: var(--ht);
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
  --fs-32: clamp(1.75rem, calc(1.13rem + 0.72vw), 2rem);

  cursor: pointer;
  font-size: var(--fs-32);
  font-weight: 300;
  color: var(--white);
`;
