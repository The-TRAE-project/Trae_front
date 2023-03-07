import { LoaderWrapper } from './styles';

interface Props {
  size: number;
  color?: string;
  isAbsoluteCentered?: boolean;
}

const Loader = ({ size, color = '--white', isAbsoluteCentered }: Props) => {
  return (
    <LoaderWrapper
      size={size}
      strokeWidth={2}
      color={`var(${color})`}
      isAbsoluteCentered={isAbsoluteCentered}
    />
  );
};

export default Loader;
