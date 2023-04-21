import ProjectListItem from '../../components/ProjectsListItem';
import SEO from '../../components/SEO';
import { Container, WrapperGradientGreen } from '../../components/styles';

const Dashboard = () => {
  return (
    <>
      <SEO
        title="TRAE | Главная"
        description="Главная страница."
        name="TRAE"
        type="application"
      />
      <WrapperGradientGreen>
        <Container>
          <ProjectListItem />
        </Container>
      </WrapperGradientGreen>
    </>
  );
};

export default Dashboard;
