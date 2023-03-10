export interface InitialState {
  isLoggedIn: boolean;
  employee: Employee | null;
  isLoading: 'idle' | 'pending';
  isError: boolean;
  error: Error | any;
  isModalOpen: boolean;
}

export interface Employee {
  id: number;
  firstName: string;
  lastName: string;
  onShift: boolean;
}

export interface Error {
  error: string;
  path?: string;
  status: number | string;
}
