import {
  Project,
  UpdateProjectFormValues,
} from '../../../../store/apis/project/types';

export const compareValues = (
  values: Omit<UpdateProjectFormValues, 'projectId'>,
  project: Project
) => {
  const findDifference = {
    projectId: project.id,
    projectNumber:
      project.number === values.projectNumber ? null : values.projectNumber,
    projectName:
      project.name === values.projectName ? null : values.projectName,
    customer: project.customer === values.customer ? null : values.customer,
    commentary:
      project.comment === values.commentary ? null : values.commentary,
  };
  // eslint-disable-next-line consistent-return
  return findDifference;
};
