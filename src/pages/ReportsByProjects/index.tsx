import SEO from '../../components/SEO';
import ByProjects from '../../components/Reports/ByProjects';
import { Container, WrapperGradientGreen } from '../../components/styles';

const ReportsByProjects = () => {
  return (
    <>
      <SEO
        title="TRAE | Отчеты по проектам"
        description="Страница отчетов по проектам."
        name="TRAE"
        type="application"
      />
      <WrapperGradientGreen>
        <Container>
          <ByProjects />
        </Container>
      </WrapperGradientGreen>
    </>
  );
};

export default ReportsByProjects;
