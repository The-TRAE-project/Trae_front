import ListItem from '../../components/Dashboard/ListItem';
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
          <ListItem />
        </Container>
      </WrapperGradientGreen>
    </>
  );
};

export default Dashboard;
