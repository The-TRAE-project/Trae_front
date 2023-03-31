import styled from 'styled-components';

export const Wrapper = styled.div`
  position: relative;
  width: 463px;
  margin-bottom: 180px;
`;

export const GroupForm = styled.form`
  position: relative;
  ${({ theme }) => theme.mixins.center};
  width: 100%;
  height: 100%;

  .maskedInput {
    position: absolute;
    left: 0;
    z-index: 1;
    height: 88px;
    width: 220px;
    padding: 27px 30px 28px;
    border: none;
    border-radius: 15px 0 0 15px;

    font-weight: 400;
    ${({ theme }) => theme.mixins.fontSize28};
    text-align: center;
    color: var(--white-black);
  }
`;

export const Button = styled.button`
  position: absolute;
  right: 0;
  z-index: 2;
  height: 88px;
  width: 253px;
  width: 253px;
  padding: 25px 30px 28px;
  background: var(--orange);
  border: none;
  border-radius: var(--border-radius);

  font-weight: 500;
  ${({ theme }) => theme.mixins.fontSize30};
  text-align: center;
  color: var(--white);

  &:disabled {
    cursor: not-allowed;
  }
`;
