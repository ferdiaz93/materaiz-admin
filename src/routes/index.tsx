import { createHashRouter, Navigate, Outlet, RouteObject } from 'react-router-dom';
// auth
import AuthGuard from '../features/auth/AuthGuard';
import GuestGuard from '../features/auth/GuestGuard';
// layouts
import CompactLayout from '../layouts/compact';
import DashboardLayout from '../layouts/dashboard';
// config
import { PATH_AFTER_LOGIN } from '../config';

import App from 'src/App';

import { ElementType, lazy, Suspense } from 'react';
import LoadingScreen from 'src/components/loading-screen';
import { LoadingSpinner } from 'src/components/loading-spinner';
import RoleBasedGuard from 'src/features/auth/RoleBasedGuard';
import ErrorPage from 'src/pages/ErrorPage';
import NotAllowedPage from 'src/pages/NotAllowedPage';

/**
 * This will show a full screen spinner while the component is loading.
 * It is meant to we used for pages
 */
const withLoadingScreen = (Component: ElementType) => (props: any) =>
  (
    <Suspense fallback={<LoadingScreen />}>
      <Component {...props} />
    </Suspense>
  );

/**
 * This will show a spinner while the component is loading
 * It is meant to we used for components where you do not want to block the whole page
 */
const withLoadingSpinner = (Component: ElementType) => (props: any) =>
  (
    <Suspense fallback={<LoadingSpinner />}>
      <Component {...props} />
    </Suspense>
  );

async function importOrReload(importPromise: Promise<any>) {
  try {
    return await importPromise;
  } catch (e) {
    if (e.message.includes('dynamically imported module')) {
      window.location.reload();
    }
  }
}

const lazyWithReload = (factory: () => Promise<{ default: ElementType }>) =>
  lazy(() => importOrReload(factory()));

const LazyPage404 = withLoadingScreen(lazyWithReload(() => import('../pages/Page404')));
const LazyLoginPage = withLoadingScreen(
  lazyWithReload(() => import('src/features/auth/login/LoginPage'))
);
const LazyRegisterPage = withLoadingScreen(
  lazyWithReload(() => import('src/features/auth/register/RegisterPage'))
);
const LazyForgotPasswordPage = withLoadingScreen(
  lazyWithReload(() => import('src/features/auth/forgot-password/ForgotPasswordPage'))
);
const LazyNewPasswordPage = withLoadingScreen(
  lazyWithReload(() => import('src/features/auth/new-password/NewPasswordPage'))
);
const LazyVerifyCodePage = withLoadingScreen(
  lazyWithReload(() => import('src/features/auth/verify-code/VerifyCodePage'))
);
const LazyAdminUsersListPage = withLoadingSpinner(
  lazy(() => import('src/features/admin-user-crud/AdminUserListPage'))
);
const LazyAdminUsersCreatePage = withLoadingSpinner(
  lazyWithReload(() => import('src/features/admin-user-crud/AdminUserCreatePage'))
);
const LazyAdminUsersEditPage = withLoadingSpinner(
  lazyWithReload(() => import('src/features/admin-user-crud/AdminUserEditPage'))
);
const LazyResetPasswordPage = withLoadingSpinner(
  lazy(() => import('src/features/auth/reset-password/ResetPasswordPage'))
);
const LazySuccessfullyResetPasswordPage = withLoadingSpinner(
  lazy(() => import('src/features/auth/reset-password/SuccessfullyResetPasswordPage'))
);

const ROUTES: RouteObject[] = [
  {
    path: '/',
    element: <App />,
    children: [
      { element: <Navigate to={PATH_AFTER_LOGIN} replace />, index: true },
      { path: 'successfully-reset-password', element: <LazySuccessfullyResetPasswordPage /> },
      {
        path: 'auth',
        element: (
          <GuestGuard>
            <Outlet />
          </GuestGuard>
        ),
        children: [
          {
            path: 'login',
            element: <LazyLoginPage />,
            errorElement: <ErrorPage />,
          },
          {
            path: 'register',
            element: <LazyRegisterPage />,
          },
          {
            element: <CompactLayout />,
            children: [
              { path: 'forgot-password', element: <LazyForgotPasswordPage /> },
              { path: 'reset-password/:id', element: <LazyResetPasswordPage /> },
              { path: 'new-password', element: <LazyNewPasswordPage /> },
              { path: 'verify', element: <LazyVerifyCodePage /> },
            ],
          },
          { element: <Navigate to="login" replace />, index: true },
        ],
      },

      {
        path: 'dashboard',
        errorElement: <ErrorPage />,
        element: (
          <AuthGuard>
            <RoleBasedGuard>
              <DashboardLayout />
            </RoleBasedGuard>
          </AuthGuard>
        ),
        children: [
          { element: <Navigate to={PATH_AFTER_LOGIN} replace />, index: true },
          {
            path: 'admin-users',
            children: [
              { element: <Navigate to="/dashboard/admin-users/list" replace />, index: true },
              { path: 'list', element: <LazyAdminUsersListPage /> },
              { path: 'create', element: <LazyAdminUsersCreatePage /> },
              { path: 'edit/:id', element: <LazyAdminUsersEditPage /> },
            ],
          },
        ],
      },
      {
        element: <CompactLayout />,
        children: [
          { path: '404', element: <LazyPage404 /> },
          { path: 'not-allowed', element: <NotAllowedPage /> },
        ],
      },
      { path: '*', element: <Navigate to="/404" replace /> },
    ],
  },
];

export const router = createHashRouter(ROUTES);
