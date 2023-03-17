import { Roles } from '../../slices/auth/types';

export interface ManagerFormValue {
  firstName: string;
  lastName: string;
  middleName: string;
  phone: string;
  username: string;
}

export interface ManagerLoginValue {
  password: string;
  username: string;
}

export interface ManagerUpdateValue {
  firstName: string;
  lastName: string;
  middleName: string;
  phone: string;
}

export interface ManagerChangeRoleValue {
  managerId: number;
  newRole: string;
}

export interface ManagerChangePasswordValue {
  newPassword: string;
  oldPassword: string;
}

export interface Manager {
  id: number;
  firstName: string;
  lastName: string;
  middleName: string;
  phone: string;
  role: Roles;
  dateOfRegister: string;
}
