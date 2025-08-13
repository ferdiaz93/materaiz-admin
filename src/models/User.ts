import { ColorSchema } from 'src/theme/palette';

export interface User {
  id: number;
  email: string;
  roles: UserRoles[];
}

export type LoginCredentials = {
  email: string;
  password: string;
};

export enum UserRoles {
  SUPERADMIN = 'super_admin',
  ADMIN = 'admin',
  CONTENIDISTA = 'contenidista',
  USER = 'user',
}
export const USER_ROLE_COLORS: Record<UserRoles, ColorSchema> = {
  [UserRoles.USER]: 'primary',
  [UserRoles.ADMIN]: 'secondary',
  [UserRoles.CONTENIDISTA]: 'info',
  [UserRoles.SUPERADMIN]: 'purple',
};

export const ROLES = [
  { value: UserRoles.SUPERADMIN, label: 'Super Administrador' },
  { value: UserRoles.ADMIN, label: 'Admin' },
  { value: UserRoles.CONTENIDISTA, label: 'Contenidista' },
  { value: UserRoles.USER, label: 'Usuario' },
];
