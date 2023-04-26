import styled from 'styled-components';

export const Title = styled.p`
  font-family: var(--font-roboto);
  ${({ theme }) => theme.mixins.fontSize40};
  font-weight: 500;
  color: var(--white-black);
  text-align: center;
`;

export const Button = styled.button`
  padding: 14px 32px;
  background: linear-gradient(
    97.03deg,
    var(--green) 7.5%,
    var(--gradient-green3) 94.35%
  );
  border: none;
  border-radius: 10px;

  font-family: var(--font-roboto);
  ${({ theme }) => theme.mixins.fontSize28};
  font-weight: 500;
  text-align: center;
  color: var(--white);

  &:is(:focus, :focus-within, :active) {
    outline: none;
  }
`;
