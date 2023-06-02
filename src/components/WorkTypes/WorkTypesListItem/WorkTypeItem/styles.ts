import styled from 'styled-components';

export const BgWhiteCard = styled.div`
  position: relative;
  ${({ theme }) => theme.mixins.fCenter};
  padding: var(--bg-white-card-ptb) var(--bg-white-card-plr);
  width: 100%;
  height: var(--bg-white-card-ht);
  background: var(--white);
  border-radius: var(--border-radius);
`;

export const Title = styled.p`
  font-weight: 600;
  ${({ theme }) => theme.mixins.fontSize30};
  color: var(--white-black);
`;

export const EditButton = styled.button`
  --svg-wd: clamp(1.25rem, calc(0.63rem + 0.72vw), 1.5rem);
  --svg-ht: clamp(1.25rem, calc(0.63rem + 0.72vw), 1.5rem);

  position: absolute;
  top: 0;
  bottom: 0;
  margin-inline: auto;
  right: 28px;
  font-size: 24px;
  border: none;
  background: none;
  color: var(--orange);

  &:is(:focus, :focus-within) {
    outline: none;
  }

  svg {
    width: var(--svg-wd);
    height: var(--svg-ht);
  }
`;
