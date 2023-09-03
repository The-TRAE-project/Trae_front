import { ProjectOperation } from '../../apis/project/types';

export interface InitialState {
  projectStage: ProjectOperation | null;
}
