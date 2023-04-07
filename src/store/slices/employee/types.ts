export interface InitialState {
  isLoggedIn: boolean;
  employee: Employee | null;
  isLoading: 'idle' | 'pending';
  isModalOpen: boolean;
  employeeToEdit: any;
}

export interface Employee {
  id: number;
  firstName: string;
  lastName: string;
  onShift: boolean;
}
