import { WorkType } from '../workTypes/types';

export interface Project {
  id: number;
  projectName: string;
  number: number;
  customer: string;
  availableOperationName: string;
}

export interface StageInWork {
  customerLastName: string;
  operationId: number;
  operationName: string;
  projectId: number;
  projectName: string;
  projectNumber: number;
}

export interface ProjectStage {
  id: number;
  name: string;
  readyToAcceptance: boolean;
  isEnded: boolean;
  inWork: boolean;
  employeeFirstName: null | string;
  employeeLastName: null | string;
}

export interface ReceiveProjectStageValue {
  employeeId: number;
  operationId: number;
}

export interface EmployeeFormValue {
  firstName: string;
  lastName: string;
  middleName: string;
  phone: string;
  typesId: number[];
}

export interface Employee {
  firstName: string;
  lastName: string;
  middleName: string;
  id: number;
  isActive: true;
  phone: string;
  pinCode: number;
  types: WorkType[];
  dateOfRegister: Date;
  dateOfEmployment: Date;
}
