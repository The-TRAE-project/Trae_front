import styled from 'styled-components';
import { Box, createStyles } from '@mantine/core';

import bg from '../../assets/bg.svg';

export const Container = styled.div`
  margin: 0 auto;
  @media ${({ theme }) => theme.bp.bpXlarge} {
    max-width: 1280px;
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

export const TopContainer = styled(Container)`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;

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
    width: '324px !important',
    maxWidth: 324,
    maxHeight: 450,
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
    marginBottom: 10,
  },

  item: {
    padding: '9px 0 9px',
    fontWeight: 400,
    fontSize: 24,
    lineHeight: '28px',
  },
}));

type FilterMenuItemTitleProps = {
  $active?: boolean;
};

export const FilterMenuItemTitle = styled.p<FilterMenuItemTitleProps>`
  max-width: 216px;
  word-break: break-word;
  color: ${(props) => (props.$active ? 'var(--orange)' : 'var(--white-black)')};
  transition: var(--transition);
`;

export const BgWhiteCardLinkBtn = styled.button`
  position: relative;
  width: 620px;
  height: 79px;
  font-weight: 600;
  ${({ theme }) => theme.mixins.fontSize30};
  color: var(--white-black);
  border: none;
  ${({ theme }) => theme.mixins.fCenter};
  padding: 22px 30px;
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
    width: 31,
    height: 31,
    border: '1.5px solid var(--gray)',
    borderRadius: '4px',

    '&:checked': {
      backgroundColor: 'var(--white)',
      borderColor: 'var(--gray)',
    },
  },

  inner: {
    width: 31,
    height: 31,
  },

  icon: {
    width: 19,
    height: 19,
    color: 'var(--orange) !important',
  },
}));

export const DashedOrangeButton = styled.button`
  grid-column-start: 3;
  ${({ theme }) => theme.mixins.fCenter};
  padding: 22.5px;
  max-width: 509px;
  min-height: 73px;
  max-height: 73px;
  background: var(--orange);
  border: 2px dashed var(--white);
  border-radius: var(--border-radius);
  font-weight: 400;
  ${({ theme }) => theme.mixins.fontSize24};
  color: var(--white);

  &:is(:focus, :focus-within) {
    outline: none;
  }
`;

export const FormWrapper = styled.form`
  ${({ theme }) => theme.mixins.column};
  gap: 3rem;
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 40px;
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

export const ProjectNumber = styled.p`
  ${({ theme }) => theme.mixins.orangeCircle};
  position: absolute;
  top: -16%;
  left: 0;
  right: 0;
  margin: 0 auto;
`;
