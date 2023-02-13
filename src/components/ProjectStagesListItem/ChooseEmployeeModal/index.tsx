import { useEffect, useState } from 'react';

import { divisorByChunk } from '../../../helpers/divisorByChunk';
import { useSlider } from '../../../helpers/hooks/useSlider';
import { ProjectServices } from '../../../helpers/services/projectServices';
import { Employee } from '../../../helpers/services/types';
import ControlButtons from '../../ControlButtons';
import Modal from '../../Modal';
import ConfirmModal from './ConfirmModal';
import {
  EmployeeCard,
  FlexContainer,
  SliderStack,
  Stack,
  TimerStack,
  Title,
} from './styles';
import Timer from './Timer';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}
const ChooseEmployeeModal = ({ isOpen, onClose }: Props) => {
  const [employees, setEmployees] = useState<Employee[][]>([]);
  const [candidate, setCandidate] = useState<Employee>();
  const [isConfirm, setIsConfirm] = useState<boolean>(false);

  const { quantity, current, slideIndex, prevSlide, nextSlide } =
    useSlider(employees);

  useEffect(() => {
    const getEmployees = async () => {
      const response = await ProjectServices.getEmployees();
      const divideBy7 = divisorByChunk(response, 7);
      setEmployees(divideBy7);
    };

    getEmployees();
  }, []);

  const handleOpenConfirmModal = (value: Employee) => {
    setCandidate(value);
    setIsConfirm(true);
    onClose();
  };

  const handleCloseConfirmModal = () => setIsConfirm(false);

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <Stack>
          <Title>Выберите сотрудника</Title>
          <SliderStack>
            <FlexContainer>
              {employees
                ? employees[slideIndex]?.map((employee) => (
                    <EmployeeCard
                      onClick={() => handleOpenConfirmModal(employee)}
                      key={employee.id}
                    >
                      {employee.name}
                    </EmployeeCard>
                  ))
                : null}
            </FlexContainer>
            <TimerStack>
              <ControlButtons
                current={current}
                quantity={quantity}
                prevSlide={prevSlide}
                nextSlide={nextSlide}
              />
              <Timer isStart={isOpen} onStop={onClose} />
            </TimerStack>
          </SliderStack>
        </Stack>
      </Modal>
      <ConfirmModal
        isOpen={isConfirm}
        onClose={handleCloseConfirmModal}
        candidate={candidate?.name as string}
      />
    </>
  );
};

export default ChooseEmployeeModal;
