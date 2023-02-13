import { employees, fakeData } from './data';

export const ProjectServices = {
  async getAll() {
    return fakeData;
  },
  async getByProjectId(projectId: string) {
    const project = fakeData.find((item) => item.id === projectId);
    return project;
  },
  async getEmployees() {
    return employees;
  },
};
