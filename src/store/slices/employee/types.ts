import { WorkType } from '../../apis/workTypes/types';

export interface InitialState {
  isLoggedIn: boolean;
  employee: Employee | null;
  isLoading: 'idle' | 'pending';
  isModalOpen: boolean;
  employeeToEdit: EmployeeToEdit | null;
  projectNumber: number | null;
  timer: number;
}

export interface Employee {
  id: number;
  firstName: string;
  lastName: string;
  onShift: boolean;
}

export interface EmployeeToEdit {
  id: number;
  firstName: string;
  lastName: string;
  middleName: string;
  isActive: true;
  phone: string;
  pinCode: number;
  types: WorkType[];
  dateOfDismissal: Date;
  dateOfEmployment: Date;
}
