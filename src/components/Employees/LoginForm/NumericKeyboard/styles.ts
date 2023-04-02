import styled from 'styled-components';

type WrapperProps = {
  isOpen: boolean;
};

export const Wrapper = styled.div`
  position: absolute;
  top: 120px;
  right: 0;
  left: 0;
  margin: 0 auto;
  display: ${(props: WrapperProps) => (props.isOpen ? 'block' : 'none')};
  width: 288px;
  height: 376px;
  opacity: ${(props: WrapperProps) => (props.isOpen ? '1' : '0')};
  transform: ${(props: WrapperProps) =>
    props.isOpen ? 'translateY(0%)' : 'translateY(100%)'};
  border: 2px solid var(--white);
  border-radius: var(--border-radius);
  padding: 15px 16px 17px;
  transition: opacity 0.4s linear 0.2s, transform 0.4s linear 0.2s;
`;

export const FlexContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin: 0 -4px;
`;

export const KeyboardBtn = styled.button`
  width: 80px;
  height: 80px;
  border: none;
  border-radius: var(--border-radius);
  background: var(--light-green2);
  ${({ theme }) => theme.mixins.fCenter};

  font-family: var(--font-roboto);
  font-weight: 500;
  ${({ theme }) => theme.mixins.fontSize32};
  color: var(--white);

  &:last-child {
    grid-column-start: 2;
    width: 168px;
    grid-column-end: 3;
  }
`;
