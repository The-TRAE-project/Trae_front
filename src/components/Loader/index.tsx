import { LoaderWrapper } from './styles';

interface Props {
  size: number;
  color?: string;
  isAbsoluteCentered?: boolean;
}

const Loader = ({
  size,
  color = 'var(--white)',
  isAbsoluteCentered = false,
}: Props) => {
  return (
    <LoaderWrapper
      size={size}
      strokeWidth={2}
      color={color}
      isAbsoluteCentered={isAbsoluteCentered}
    />
  );
};

export default Loader;
