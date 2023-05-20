import { Dispatch, SetStateAction, useEffect } from 'react';

import { ProjectOperation } from '../../../store/apis/project/types';

export function useFilterStages(
  projectStages: ProjectOperation[] | undefined,
  setStages: Dispatch<SetStateAction<ProjectOperation[]>>
) {
  useEffect(() => {
    if (!projectStages) return;

    const filteredList = projectStages.filter(
      (stage) => !stage.inWork && !stage.isEnded && !stage.readyToAcceptance
    );

    setStages(filteredList);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projectStages]);
}
