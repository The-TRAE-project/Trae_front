export interface InitialState {
  user: User | null;
  isLoading: 'idle' | 'pending';
  isLoggedIn: boolean;
  accessToken: string | null;
  refreshToken: string | null;
}

export interface User {
  id: 1;
  firstName: string;
  middleName: string;
  lastName: string;
  phone: number;
  role: Roles;
  dateOfRegister: Date;
}

export enum Roles {
  manager = 'Manager',
  admin = 'Admin',
}

export interface LoginFormValue {
  username: string;
  password: string;
}

export interface TokenValue {
  accessToken: string;
  refreshToken: string;
}
