export const Paths = {
  LOGIN: '/login',
  MAIN: '/',
  DASHBOARD: '/dashboard',
  // Admin Reports paths
  REPORTS: '/reports',
  REPORTS_BY_EMPLOYEES: '/reports/by-employees',
  REPORTS_BY_PROJECTS: '/reports/by-projects',
  REPORTS_BY_DEADLINES: '/reports/by-deadlines',

  REPORTS_BY_PROJECTS_PROJECT_DETAILS:
    '/reports/by-projects/project/:id/details',
  REPORTS_BY_PROJECTS_PROJECT_STAGE: '/reports/by-projects/project/:id/stage',
  REPORTS_BY_PROJECTS_PROJECT_EDIT_GENERAL_INFO:
    '/reports/by-projects/project/:id/editing-general-info',
  REPORTS_BY_PROJECTS_PROJECT_EDIT_END_DATE:
    '/reports/by-projects/project/:id/editing-end-date',
  REPORTS_BY_PROJECTS_PROJECT_DELETE: '/reports/by-projects/project/:id/delete',
  REPORTS_BY_PROJECTS_PROJECT_NEW_STAGE:
    '/reports/by-projects/project/:id/new-stage',
  REPORTS_BY_PROJECTS_PROJECT_INSERT_NEW_STAGE:
    '/reports/by-projects/project/:id/insert-new-stage',
  // Admin Personal Cabinet paths
  PERSONAL_CABINET: '/personal-cabinet',
  PERSONAL_CABINET_EDITING: '/personal-cabinet/editing',
  PERSONAL_CABINET_CHANGE_PASSWORD: '/personal-cabinet/change-password',
  // Admin Project paths
  PROJECTS: '/projects',
  PROJECT_DETAILS: '/project/:id/details',
  PROJECT_STAGE: '/project/:id/stage',
  PROJECT_CREATE: '/project/create',
  PROJECT_EDIT_GENERAL_INFO: '/project/:id/editing-general-info',
  PROJECT_EDIT_END_DATE: '/project/:id/editing-end-date',
  PROJECT_DELETE: '/project/:id/delete',
  PROJECT_NEW_STAGE: '/project/:id/new-stage',
  PROJECT_INSERT_NEW_STAGE: '/project/:id/insert-new-stage',
  // Admin Office paths
  OFFICE: '/office',
  OFFICE_CREATE: '/office/create',
  OFFICE_EDITING: '/office/:id/editing',
  // Admin Employee paths
  EMPLOYEES: '/employees',
  EMPLOYEE_CREATE: '/employee/create',
  EMPLOYEE_EDITING: '/employee/editing',
  // Admin Work Type paths
  WORK_TYPES: '/work-types',
  WORK_TYPE_CREATE: '/work-type/create',
  WORK_TYPE_EDITING: '/work-type/editing',
  // Constructor Role paths
  CONSTRUCTOR_MAIN_PAGE: '/constructor',
  CONSTRUCTOR_CREATE_PROJECT: '/construcor/create-project',
  CONSTRUCTOR_PERSONAL_CABINET: '/construcor/personal-cabinet',
  CONSTRUCTOR_PERSONAL_CABINET_EDITING: '/construcor/personal-cabinet/editing',
  CONSTRUCTOR_PERSONAL_CABINET_CHANGE_PASSWORD:
    '/construcor/personal-cabinet/change-password',

  // Terminal Workshop paths
  EMPLOYEE_LOGIN: '/employee-login',
  EMPLOYEE_MAIN: '/employee-main',
  EMPLOYEE_PROJECTS: '/employee-projects',
  EMPLOYEE_PROJECT_STAGES: '/employee/project/:id/stages',
  EMPLOYEE_STAGES_IN_WORK: '/employee-stages-in-work',
};
