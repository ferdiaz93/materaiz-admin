/**
 * Every path that is used in the application must be added here. This way, if a path changes, it will be changed in one place only.
 */
export const PATHS = {
  path: '',
  'successfully-reset-password': {
    root: '/successfully-reset-password',
  },
  auth: {
    root: '/auth',
    login: '/auth/login',
    forgotPassword: '/auth/forgot-password',
    resetPassword: (id: number | string) => `/auth/reset-password/${id}`,
    newPassword: '/auth/new-password',
    verify: '/auth/verify',
    register: '/auth/register',
  },
  dashboard: {
    root: '/dashboard',
    adminUsers: {
      root: '/dashboard/admin-users',
      list: '/dashboard/admin-users/list',
      create: '/dashboard/admin-users/create',
      edit: (id: number | string) => `/dashboard/admin-users/edit/${id}`,
    },
  },
} as const;

/**
 * Every path that a role can access must be added here. Otherwise, the user will be redirected to the Not allowed page.
 */
export const PATHS_PER_ROLE = [
  {
    role: 'super_admin',
    paths: [
      PATHS.dashboard.root,
      PATHS.dashboard.adminUsers.root,
      PATHS.dashboard.adminUsers.list,
      PATHS.dashboard.adminUsers.create,
      PATHS.dashboard.adminUsers.edit(':id'),
    ],
  },
];
