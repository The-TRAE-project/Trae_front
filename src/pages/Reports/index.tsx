import SEO from '../../components/SEO';
import PageHeader from '../../components/PageHeader';
import ListItem from '../../components/Reports/ListItem';
import {
  Container,
  ContentStack,
  WrapperGradientGreen,
} from '../../components/styles';

const Reports = () => {
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
          <ContentStack>
            <PageHeader isShowCreateBtn={false} />

            <ListItem />
          </ContentStack>
        </Container>
      </WrapperGradientGreen>
    </>
  );
};

export default Reports;
