import { ProjectOperation } from '../../apis/project/types';

export interface InitialState {
  projectId: number | null;
  projectStage: ProjectOperation | null;
}
