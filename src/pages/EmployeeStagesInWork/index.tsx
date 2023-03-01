import SEO from '../../components/SEO';
import StagesInWorkListItem from '../../components/StagesInWorkListItem';
import { Container, WrapperBgGreen } from '../../components/styles';

const EmployeeStagesInWork = () => {
  return (
    <>
      <SEO
        title="TRAE | Этапы в работе"
        description="Страница этапов  в работе."
        name="TRAE"
        type="application"
      />
      <WrapperBgGreen>
        <Container>
          <StagesInWorkListItem />
        </Container>
      </WrapperBgGreen>
    </>
  );
};

export default EmployeeStagesInWork;
