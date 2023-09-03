import SEO from '../../components/SEO';
import ByEmployees from '../../components/Reports/ByEmployees';
import { Container, WrapperGradientGreen } from '../../components/styles';

const ReportsByEmployees = () => {
  return (
    <>
      <SEO
        title="TRAE | Отчеты по сотрудникам"
        description="Страница отчетов по сотрудникам."
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
