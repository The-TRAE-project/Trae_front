import Loader from '../Loader';
import { Wrapper } from './styles';

const FullPageLoader = () => {
  return (
    <Wrapper>
      <Loader size={80} isAbsoluteCentered />
    </Wrapper>
  );
};

export default FullPageLoader;
