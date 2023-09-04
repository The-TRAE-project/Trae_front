import SEO from '../../components/SEO';
import { ByDeadlines } from '../../components/Reports/ByDeadlines';
import { Container, WrapperGradientGreen } from '../../components/styles';

const ReportsByDeadlines = () => {
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
          <ByDeadlines />
        </Container>
      </WrapperGradientGreen>
    </>
  );
};

export default ReportsByDeadlines;
