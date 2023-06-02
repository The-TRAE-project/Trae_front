import { useNavigate } from 'react-router-dom';
import { Group } from '@mantine/core';
import { BsArrowLeft, BsFillHouseFill } from 'react-icons/bs';

import { Paths } from '../../../constants/paths';
import Loader from '../../Loader';
import { DashedOrangeButton, OrangeButton, UnstyledButton } from '../../styles';

interface Props {
  onBack: () => void;
  isReportFormed: boolean;
  isFormBtnLoading: boolean;
  isFormBtnDisabled: boolean;
  onExportToExcel?: () => void;
  isExportToExcelLoading?: boolean;
  isExportToExcelBtnDisabled?: boolean;
  onExportToPDF?: () => void;
  isExportToPDFLoading?: boolean;
  isExportToPDFBtnDisabled?: boolean;
}

const FormHeader = ({
  onBack,
  isReportFormed,
  isFormBtnLoading,
  isFormBtnDisabled,
  onExportToExcel,
  isExportToExcelLoading,
  isExportToExcelBtnDisabled,
  onExportToPDF,
  isExportToPDFLoading,
  isExportToPDFBtnDisabled,
}: Props) => {
  const navigate = useNavigate();

  return (
    <Group position="apart" spacing={100}>
      <Group spacing={42}>
        <UnstyledButton onClick={onBack} type="button">
          <BsArrowLeft size={50} color="var(--orange)" />
        </UnstyledButton>
        <UnstyledButton onClick={() => navigate(Paths.DASHBOARD)} type="button">
          <BsFillHouseFill size={44} color="var(--orange)" />
        </UnstyledButton>
      </Group>

      <Group spacing={40}>
        {isReportFormed && (
          <>
            <DashedOrangeButton
              onClick={onExportToExcel}
              disabled={isExportToExcelLoading || isExportToExcelBtnDisabled}
              type="button"
              $width={258}
            >
              {isExportToExcelLoading ? (
                <Loader size={35} />
              ) : (
                <span>Экспорт в Excel</span>
              )}
            </DashedOrangeButton>
            <DashedOrangeButton
              onClick={onExportToPDF}
              disabled={isExportToPDFLoading || isExportToPDFBtnDisabled}
              type="button"
              $width={258}
            >
              {isExportToPDFLoading ? (
                <Loader size={35} />
              ) : (
                <span>Экспорт в PDF</span>
              )}
            </DashedOrangeButton>
          </>
        )}

        <OrangeButton type="submit" disabled={isFormBtnDisabled} $width={220}>
          {isFormBtnLoading ? <Loader size={35} /> : <span>Сформировать</span>}
        </OrangeButton>
      </Group>
    </Group>
  );
};

export default FormHeader;
