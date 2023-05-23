import { Box, createStyles, Group, Stack } from '@mantine/core';
import styled, { css } from 'styled-components';

import bg from '../../assets/bg.svg';

export const Container = styled.div`
  margin: 0 auto;
  @media ${({ theme }) => theme.bp.bpLarge} {
    width: 1140px;
  }

  @media ${({ theme }) => theme.bp.bpXlarge} {
    width: 1280px;
  }
`;

export const WrapperWithBgImage = styled.section`
  background-image: url(${bg});
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  min-height: 100vh;

  @media ${({ theme }) => theme.bp.bpLarge} {
    padding: 95px 0 40px;
  }

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

export const TopContainer = styled(Container)`
  display: flex;
  justify-content: space-between;

  @media ${({ theme }) => theme.bp.bpLarge} {
    min-height: calc(100vh - 135px);
    align-items: center;
  }

  @media ${({ theme }) => theme.bp.bpXlarge} {
    min-height: calc(100vh - 289px);
    align-items: flex-start;
  }
`;

export const TraeLogoImageWrapper = styled(Box)`
  --wd: clamp(25rem, calc(14.18rem + 12.68vw), 29.88rem);
  --ht: clamp(30rem, calc(20.43rem + 11.22vw), 34.31rem);

  @media ${({ theme }) => theme.bp.bpLarge} {
    height: var(--ht);
    width: var(--wd);
  }

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

  @media ${({ theme }) => theme.bp.bpLarge} {
    padding: 100px 0 50px;
  }

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

  @media ${({ theme }) => theme.bp.bpLarge} {
    padding: 108px 0 40px;
  }

  @media (min-width: 1500px) {
    padding: 115px 0 45px;
  }

  @media (min-width: 1600px) {
    padding: 120px 0 55px;
  }

  @media (min-width: 1750px) {
    padding: 130px 0 65px;
  }

  @media (min-width: 1850px) {
    padding: 140px 0 75px;
  }

  @media ${({ theme }) => theme.bp.bpXlarge} {
    padding: 148px 0 80px;
  }
`;

type UnstyledButtonProps = {
  $isHomeIcon?: boolean;
  $isFilterIcon?: boolean;
};

export const UnstyledButton = styled.button`
  background: none;
  border: none;
  padding: 0;
  margin: 0;
  ${({ theme }) => theme.mixins.fCenter};

  &:is(:focus, :focus-within) {
    outline: none;
  }

  ${(props: UnstyledButtonProps) =>
    props.$isHomeIcon &&
    css`
      --home-i-wd: clamp(2.38rem, calc(1.45rem + 1.08vw), 2.75rem);
      --home-i-ht: clamp(2.38rem, calc(1.45rem + 1.08vw), 2.75rem);

      svg {
        width: var(--home-i-wd);
        height: var(--home-i-ht);
      }
    `}

  ${(props: UnstyledButtonProps) =>
    props.$isFilterIcon &&
    css`
      --filter-i-wd: clamp(2.25rem, calc(1.63rem + 0.72vw), 2.5rem);
      --filter-i-ht: clamp(2.31rem, calc(1.7rem + 0.72vw), 2.56rem);

      svg {
        width: var(--filter-i-wd);
        height: var(--filter-i-ht);
      }
    `}
`;

type OrangeButtonProps = {
  $width?: number;
};

export const OrangeButton = styled.button`
  --ht: clamp(3rem, calc(1.46rem + 1.81vw), 3.63rem);
  --prl: clamp(1.13rem, calc(0.2rem + 1.08vw), 1.5rem);
  --ptb: clamp(0.63rem, calc(-0.15rem + 0.9vw), 0.94rem);
  --gap-12: clamp(0.5rem, calc(-0.12rem + 0.72vw), 0.75rem);

  width: ${(props: OrangeButtonProps) => props.$width && `${props.$width}px`};
  height: var(--ht);
  padding: var(--ptb) var(--prl);
  background: var(--orange);
  border: none;
  border-radius: var(--border-radius);
  ${({ theme }) => theme.mixins.fCenter};
  gap: var(--gap-12);
  font-weight: 400;
  ${({ theme }) => theme.mixins.fontSize24};
  color: var(--white);

  &:is(:focus, :focus-within) {
    outline: none;
  }
`;

export const useFilterMenuStyles = createStyles(() => ({
  dropdown: {
    left: '0px !important',
    width: '324px !important',
    maxWidth: 324,
    maxHeight: 450,
    border: 'none',
    background: 'var(--white)',
    padding: 'var(--menu-ptb) var(--menu-plr)',
    boxShadow: '0px 4px 4px var(--black-shadow)',
    borderRadius: 'var(--border-radius)',
  },

  label: {
    padding: 0,
    fontWeight: 600,
    fontSize: 'var(--fs-24)',
    lineHeight: 'var(--fs-24-lh)',
    color: 'var(--white-black)',
    marginTop: 'clamp(0.06rem, calc(0.93rem + -0.72vw), 0.31rem)',
    marginBottom: 'clamp(0.31rem, calc(-0.46rem + 0.90vw), 0.63rem)',
  },

  item: {
    padding:
      'clamp(0.31rem, calc(-0.30rem + 0.72vw), 0.56rem) 0 clamp(0.31rem, calc(-0.30rem + 0.72vw), 0.56rem)',
    fontWeight: 400,
    fontSize: 'var(--fs-24)',
    lineHeight: 'var(--fs-24-lh)',
  },
}));

type FilterMenuItemTitleProps = {
  $active?: boolean;
};

export const FilterMenuItemGroup = styled(Group)`
  --gap-12: clamp(0.5rem, calc(-0.12rem + 0.72vw), 0.75rem);

  gap: var(--gap-12);
`;

export const FilterMenuItemTitle = styled.p<FilterMenuItemTitleProps>`
  max-width: 216px;
  word-break: break-word;
  color: ${(props) => (props.$active ? 'var(--orange)' : 'var(--white-black)')};
  transition: var(--transition);
`;

export const BgWhiteCardLinkBtn = styled.button`
  position: relative;
  width: 100%;
  height: var(--bg-white-card-ht);
  font-weight: 600;
  ${({ theme }) => theme.mixins.fontSize30};
  color: var(--white-black);
  border: none;
  ${({ theme }) => theme.mixins.fCenter};
  padding: var(--bg-white-card-ptb) var(--bg-white-card-plr);
  background: var(--white);
  border-radius: var(--border-radius);

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

export const useCheckboxStyles = createStyles(() => ({
  input: {
    width: 'var(--checkbox-wd-th)',
    height: 'var(--checkbox-wd-th)',
    border: '1.5px solid var(--gray)',
    borderRadius: '4px',

    '&:checked': {
      backgroundColor: 'var(--white)',
      borderColor: 'var(--gray)',
    },
  },

  inner: {
    width: 'var(--checkbox-wd-th)',
    height: 'var(--checkbox-wd-th)',
  },

  icon: {
    width: 'var(--checkbox-i-wd-ht)',
    height: 'var(--checkbox-i-wd-ht)',
    color: 'var(--orange) !important',
  },
}));

export const DashedOrangeButton = styled.button`
  grid-column-start: 3;
  ${({ theme }) => theme.mixins.fCenter};
  max-width: 509px;
  min-height: 73px;
  max-height: 73px;
  background: var(--orange);
  border: 2px dashed var(--white);
  border-radius: var(--border-radius);
  font-weight: 400;
  ${({ theme }) => theme.mixins.fontSize24};
  color: var(--white);
  padding: 22.5px;
  margin-top: 10px;

  &:is(:focus, :focus-within) {
    outline: none;
  }
`;
// TODO:
export const FormWrapper = styled.form`
  ${({ theme }) => theme.mixins.column};
  gap: 3rem;
`;

export const ErrorMessage = styled.p`
  display: block;
  font-family: var(--font-roboto);
  ${({ theme }) => theme.mixins.fontSize24};
  font-weight: 500;
  word-break: break-word;
  color: var(--red);
  letter-spacing: 1px;
  margin-top: -6px;
`;

export const useModalStyles = createStyles(() => ({
  close: {
    color: 'var(--white-black)',
    opacity: 0.9,
    height: 30,
    width: 30,
    fontSize: 30,
    padding: 0,

    svg: {
      width: 30,
      height: 30,
    },
  },

  content: {
    position: 'relative',
    padding: '30px !important',
    background: 'var(--white)',
    boxShadow: '0px 6px 9px var(--black-shadow)',
    borderRadius: 10,
    height: 555,
  },

  header: {
    marginBottom: 4,
  },

  title: {
    fontFamily: 'var(--font-roboto)',
    fontStyle: 'normal',
    fontWeight: 500,
    fontSize: 48,
    lineHeight: '56px',
    color: 'var(--white-black)',
    opacity: 0.9,
  },

  body: {
    padding: '32px 0 !important',
    height: '40.5vh',
  },
}));
// TODO:
export const FormStack = styled.form`
  position: relative;
  min-height: calc(100vh - 336px);
  ${({ theme }) => theme.mixins.column};
  gap: 50px;
`;
// TODO:
export const FormBodyWrapper = styled.div`
  position: relative;
  min-height: calc(100vh - 336px);
`;

export const ProjectCustomer = styled.p`
  font-weight: 400;
  color: var(--black);
  ${({ theme }) => theme.mixins.fontSize30};
  width: 182px;
  text-align: center;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`;

export const ProjectName = styled.p`
  font-weight: 600;
  color: var(--black);
  ${({ theme }) => theme.mixins.fontSize30};
  width: 182px;
  text-align: center;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`;

type ProjectNumberProps = {
  $isEnded?: boolean;
  $isOverdue?: boolean;
};

export const ProjectNumber = styled.p`
  ${({ theme }) => theme.mixins.orangeCircle};
  position: absolute;
  top: -16%;
  left: 0;
  right: 0;
  margin: 0 auto;
  ${(props: ProjectNumberProps) =>
    props.$isEnded &&
    css`
      background-color: var(--light-green2);
    `}

  ${(props: ProjectNumberProps) =>
    props.$isOverdue &&
    css`
      background-color: var(--red2);
    `}
`;

export const TwoColumnGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--gap-40);
`;

export const ThreeColumnGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: var(--gap-40);
`;

export const ListItemWrapper = styled.div`
  position: relative;
  min-height: calc(100vh - 336px);
  ${({ theme }) => theme.mixins.column};
  justify-content: space-between;
  gap: var(--gap-50);
`;

export const ContentStack = styled(Stack)`
  --gap-50: clamp(2.5rem, calc(0.96rem + 1.81vw), 3.13rem);

  gap: var(--gap-50);
`;
