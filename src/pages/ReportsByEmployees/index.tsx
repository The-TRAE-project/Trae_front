import SEO from '../../components/SEO';
import ByEmployees from '../../components/Reports/ByEmployees';
import { Container, WrapperGradientGreen } from '../../components/styles';

const ReportsByEmployees = () => {
  return (
    <>
      <SEO
        title="TRAE | Отчеты"
        description="Страница отчетов."
        name="TRAE"
        type="application"
      />
      <WrapperGradientGreen>
        <Container>
          <ByEmployees />
        </Container>
      </WrapperGradientGreen>
    </>
  );
};

export default ReportsByEmployees;
