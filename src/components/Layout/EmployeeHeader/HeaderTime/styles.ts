import styled from 'styled-components';

type DisplayProps = {
  $isWhiteBlack: boolean;
};

export const DisplayGroup = styled.div`
  display: flex;
  align-items: baseline;
  gap: 40px;
`;

export const DisplayTime = styled.p`
  font-family: var(--font-roboto);
  font-weight: 500;
  font-size: 54px;
  line-height: 63px;
  color: ${(props: DisplayProps) =>
    props.$isWhiteBlack ? 'var(--white-black)' : 'var(--white)'};
  opacity: 0.9;
`;

export const UserName = styled.p`
  font-weight: 600;
  font-size: 30px;
  line-height: 63px;
  text-align: center;
  color: ${(props: DisplayProps) =>
    props.$isWhiteBlack ? 'var(--white-black)' : 'var(--white)'};
  opacity: 0.9;
`;
