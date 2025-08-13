import { useMutation } from '@tanstack/react-query';
import { User } from 'src/models/User';
import { httpClient } from 'src/utils/httpClient';

type IUpdatePassword = {
  code: string;
  email: string;
  password: string;
  confirmPassword: string;
};

type IVerifyCode = {
  code: string;
};

type IResetPassword = {
  password: string;
  password_confirmation: string;
  email: string;
  token: string;
};

type IForgotPassword = {
  email: string;
};

type IRegister = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
};
export class AuthRepository {
  login = (x: { email: string; password: string }) => httpClient.post<string>('admin/login', x);

  getLoggedUser = () => httpClient.get<User>('admin/users/me');

  updatePassword = (args: IUpdatePassword) =>
    new Promise((res) => {
      setTimeout(() => res('OK'), 4000);
    });

  verifyCode = (args: IVerifyCode) =>
    new Promise((res) => {
      setTimeout(() => res('OK'), 4000);
    });

  forgotPassword = (args: IForgotPassword) => httpClient.post('admin/forgot-password', args);

  resetPassword = (args: IResetPassword) => httpClient.post('admin/reset-password', args);

  register = (args: IRegister) =>
    new Promise((res) => {
      setTimeout(() => res('OK'), 4000);
    });
}

const repo = new AuthRepository();

export const useLoginMutation = () => useMutation({ mutationFn: repo.login });
export const useUpdatePasswordMutation = () => useMutation({ mutationFn: repo.updatePassword });
export const useVerifyCodeMutation = () => useMutation({ mutationFn: repo.verifyCode });
export const useForgotPasswordMutation = () => useMutation({ mutationFn: repo.forgotPassword });
export const useResetPasswordMutation = () => useMutation({ mutationFn: repo.resetPassword });
export const useRegisterMutation = () => useMutation({ mutationFn: repo.register });
