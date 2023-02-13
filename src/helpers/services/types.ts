export interface ProjectStage {
  id: string;
  projectId: string;
  stage: string;
  isComplete: boolean;
  isTodo: boolean;
  isNext?: boolean;
  employee?: string;
}

export interface Project {
  id: string;
  projectNumber: number;
  itemName: string;
  employee: string;
  status: string;
  isInWork: boolean;
  stages: ProjectStage[];
}

export interface Employee {
  id: string;
  name: string;
}
