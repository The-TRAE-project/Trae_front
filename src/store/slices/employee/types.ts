export interface InitialState {
  isLoggedIn: boolean;
  employee: Employee;
  isLoading: 'idle' | 'pending';
  error: any;
}

export interface Employee {
  id: number;
  firstName: string;
  lastName: string;
}
