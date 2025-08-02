import type { Role } from './userRoles';

export interface User {
  firstName: string;
  lastName: string;
  username: string;
  phoneNumber: string;
  password: string;
  email: string;
  role: Role;
  createdAt: Date;
  profileImage: string;
}
