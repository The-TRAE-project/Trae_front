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
