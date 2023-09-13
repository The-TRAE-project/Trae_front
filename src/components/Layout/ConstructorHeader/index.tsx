import { BsPersonLinesFill } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import { Paths } from '../../../constants/paths';
import { FlexContainer, UserProfileButton, Wrapper } from './styles';
import { Container } from '../../styles';

export function ConstructorHeader() {
  const navigate = useNavigate();

  return (
    <Wrapper>
      <Container>
        <FlexContainer>
          <UserProfileButton
            type="button"
            onClick={() => navigate(Paths.CONSTRUCTOR_PERSONAL_CABINET)}
          >
            <BsPersonLinesFill />
          </UserProfileButton>
        </FlexContainer>
      </Container>
    </Wrapper>
  );
}
