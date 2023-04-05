import styled from 'styled-components';
import { Box, createStyles } from '@mantine/core';

import bg from '../../assets/bg.svg';

export const Container = styled.div`
  margin: 0 auto;
  @media ${({ theme }) => theme.bp.bpXlarge} {
    max-width: calc(100vw - 640px);
  }
`;

export const WrapperWithBgImage = styled.section`
  background-image: url(${bg});
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  min-height: 100vh;

  @media ${({ theme }) => theme.bp.bpXlarge} {
    padding: 185px 0 104px;
  }
`;

export const ApartContainer = styled(Container)`
  ${({ theme }) => theme.mixins.apart};

  @media ${({ theme }) => theme.bp.bpXlarge} {
    min-height: calc(100vh - 289px);
  }
`;

export const TraeLogoImageWrapper = styled(Box)`
  @media ${({ theme }) => theme.bp.bpXlarge} {
    height: 549px;
    width: 478px;
  }
`;

export const WrapperBgGreen = styled.section`
  min-height: 100vh;
  background: linear-gradient(
    264.53deg,
    var(--gradient-green1) 2.46%,
    var(--gradient-green2) 70.65%
  );

  @media ${({ theme }) => theme.bp.bpXlarge} {
    padding: 185px 0 104px;
  }
`;

export const WrapperBgWhite = styled(WrapperWithBgImage)`
  background: var(--white2);
`;

export const WrapperGradientGreen = styled.section`
  min-height: 100vh;
  background: linear-gradient(
    264.53deg,
    var(--gradient-green1) 2.46%,
    var(--gradient-green2) 70.65%
  );

  @media ${({ theme }) => theme.bp.bpXlarge} {
    padding: 148px 0 80px;
  }
`;

export const UnstyledButton = styled.button`
  background: none;
  border: none;
  ${({ theme }) => theme.mixins.fCenter};

  &:is(:focus, :focus-within) {
    outline: none;
  }
`;

type OrangeButtonProps = {
  $width?: number;
};

export const OrangeButton = styled.button`
  width: ${(props: OrangeButtonProps) => props.$width && `${props.$width}px`};
  height: 58px;
  padding: 15px 24px;
  background: var(--orange);
  border: none;
  border-radius: var(--border-radius);
  ${({ theme }) => theme.mixins.fCenter};
  gap: 12px;
  font-weight: 400;
  ${({ theme }) => theme.mixins.fontSize24};
  color: var(--white);

  &:is(:focus, :focus-within) {
    outline: none;
  }
`;

export const useFilterMenuStyles = createStyles(() => ({
  dropdown: {
    left: '320px !important',
    maxWidth: 306,
    maxHeight: 420,
    border: 'none',
    background: 'var(--white)',
    padding: '24px 30px',
    boxShadow: '0px 4px 4px var(--black-shadow)',
    borderRadius: 'var(--border-radius)',
  },

  label: {
    padding: 0,
    fontWeight: 600,
    fontSize: 24,
    lineHeight: '28px',
    color: 'var(--white-black)',
  },

  item: {
    padding: '9px 10px 9px 34px',
    fontWeight: 400,
    fontSize: 24,
    lineHeight: '28px',
  },
}));

type FilterMenuItemTitleProps = {
  $active?: boolean;
};

export const FilterMenuItemTitle = styled.p<FilterMenuItemTitleProps>`
  color: ${(props) => (props.$active ? 'var(--orange)' : 'var(--white-black)')};
  transition: var(--transition);
`;

export const BgWhiteCard = styled.div`
  position: relative;
  ${({ theme }) => theme.mixins.fCenter};
  padding: 22px 30px;
  width: 620px;
  height: 79px;
  background: var(--white);
  border-radius: var(--border-radius);
`;

export const BgWhiteCardLinkBtn = styled.button`
  background: none;
  border: none;
  font-weight: 600;
  ${({ theme }) => theme.mixins.fontSize30};
  color: var(--white-black);

  &:is(:focus, :focus-within) {
    outline: none;
  }
`;

export const InformModalText = styled.p`
  font-family: var(--font-roboto);
  font-weight: 400;
  ${({ theme }) => theme.mixins.fontSize28}
  text-align: center;
  color: var(--white-black);
`;
