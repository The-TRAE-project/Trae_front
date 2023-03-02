import { LoaderWrapper } from './styles';

interface Props {
  size: number;
  color?: string;
}

const Loader = ({ size, color = 'var(--white)' }: Props) => {
  return <LoaderWrapper size={size} strokeWidth={2} color={color} />;
};

export default Loader;
