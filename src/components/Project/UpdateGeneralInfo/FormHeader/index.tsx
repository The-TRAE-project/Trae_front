import { Group, Stack } from '@mantine/core';
import { BsArrowLeft, BsFillHouseFill } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import { Paths } from '../../../../constants/paths';
import { checkForEquality } from '../../../../helpers/checkForEquality';
import {
  Project,
  UpdateProjectFormValues,
} from '../../../../store/apis/project/types';
import InformModal from '../../../InformModal';
import Loader from '../../../Loader';
import { InformModalText, OrangeButton, UnstyledButton } from '../../../styles';

interface Props {
  isOpen: boolean;
  closeModal: () => void;
  updatedProject: UpdateProjectFormValues | undefined;
  currentProject: Project | undefined;
  isGetLoading: boolean;
  isEditLoading: boolean;
  isDisabled: boolean;
}

const FormHeader = ({
  isOpen,
  closeModal,
  updatedProject,
  currentProject,
  isGetLoading,
  isEditLoading,
  isDisabled,
}: Props) => {
  const navigate = useNavigate();

  return (
    <>
      <InformModal
        isOpen={isOpen}
        onClose={closeModal}
        title="Изменения сохранены"
        // TODO:
        backPath={Paths.PROJECT_DETAILS}
      >
        <Stack spacing={20}>
          {!!updatedProject && (
            <>
              {!checkForEquality(
                updatedProject.projectNumber,
                currentProject?.number
              ) && (
                <InformModalText>
                  Номер проекта: <strong>{updatedProject.projectNumber}</strong>
                </InformModalText>
              )}
              {!checkForEquality(
                updatedProject.projectName,
                currentProject?.name
              ) && (
                <InformModalText>
                  Наименование изделия:{' '}
                  <strong>{updatedProject.projectName}</strong>
                </InformModalText>
              )}
              {!checkForEquality(
                updatedProject.customer,
                currentProject?.customer
              ) && (
                <InformModalText>
                  Клиент: <strong>{updatedProject.customer}</strong>
                </InformModalText>
              )}
              {!checkForEquality(
                updatedProject.commentary,
                currentProject?.comment
              ) && (
                <InformModalText>
                  Комментарий: <strong>{updatedProject.commentary}</strong>
                </InformModalText>
              )}
            </>
          )}
        </Stack>
      </InformModal>

      <Group position="apart" spacing={100}>
        <Group spacing={42}>
          <UnstyledButton
            // TODO:
            onClick={() => navigate(-2)}
            type="button"
          >
            <BsArrowLeft size={50} color="var(--orange)" />
          </UnstyledButton>
          <UnstyledButton
            onClick={() => navigate(Paths.DASHBOARD)}
            type="button"
          >
            <BsFillHouseFill size={44} color="var(--orange)" />
          </UnstyledButton>
        </Group>

        <OrangeButton
          disabled={isGetLoading || isEditLoading || isDisabled}
          $width={171}
          type="submit"
        >
          {isEditLoading ? <Loader size={35} /> : <span>Сохранить</span>}
        </OrangeButton>
      </Group>
    </>
  );
};

export default FormHeader;
