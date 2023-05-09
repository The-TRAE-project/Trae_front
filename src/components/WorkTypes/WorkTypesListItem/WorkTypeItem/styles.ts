import styled from 'styled-components';

export const BgWhiteCard = styled.div`
  position: relative;
  ${({ theme }) => theme.mixins.fCenter};
  padding: 22px 30px;
  width: 620px;
  height: 79px;
  background: var(--white);
  border-radius: var(--border-radius);
`;

export const Title = styled.p`
  font-weight: 600;
  ${({ theme }) => theme.mixins.fontSize30};
  color: var(--white-black);
`;

export const EditButton = styled.button`
  position: absolute;
  top: 27px;
  right: 28px;
  font-size: 24px;
  border: none;
  background: none;
  color: var(--orange);

  &:is(:focus, :focus-within) {
    outline: none;
  }
`;
