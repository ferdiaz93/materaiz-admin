import React, { createContext, ReactNode, useCallback, useEffect, useState } from 'react';
import { AuthRepository, useLoginMutation } from 'src/api/AuthRepository';
import { AuthStateType, AuthContextType, Role } from './types';
import { setAuthorizationHeader } from './utils';

const initialState: AuthStateType = {
  isInitialized: false,
  isAuthenticated: false,
  userId: undefined,
  roles: [],
  user: {
    displayName: '',
    role: '',
    photoURL: '',
    email: '',
  },
};

export const AuthContext = createContext<AuthContextType | null>(null);

type AuthProviderProps = {
  children: React.ReactNode;
};

const userRepo = new AuthRepository();

export function AuthProvider({ children }: AuthProviderProps) {
  const [state, setState] = useState<AuthStateType>(initialState);
  const loginMutation = useLoginMutation();

  const fetchAndSetUserState = async () => {
    try {
      const { data: userData } = await userRepo.getLoggedUser();
      setState((x: AuthStateType) => ({
        ...x,
        isAuthenticated: true,
        userId: userData.id,
        roles: userData.roles as Role[],
        isInitialized: true,
        user: {
          displayName: userData.email,
          role: userData.roles[0],
          photoURL: '',
          email: userData.email,
        },
      }));
    } catch (error) {
      console.error(error);
      logout();
    }
  };

  const initializeState = () =>
    setState((x: AuthStateType) => ({
      ...x,
      isAuthenticated: false,
      userId: undefined,
      roles: [],
      isInitialized: true,
    }));

  const login = async ({ email, password }: { email: string; password: string }) => {
    const { data } = await loginMutation.mutateAsync({ email, password });
    setAuthorizationHeader(data);
    await fetchAndSetUserState();
  };

  const logout = useCallback(async () => {
    setAuthorizationHeader(null);
    initializeState();
  }, []);

  const isSuperAdmin = () => (state.roles ?? []).includes('super_admin');

  const initialize = useCallback(async () => {
    try {
      const accessToken = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : '';
      setAuthorizationHeader(accessToken);
      if (accessToken) {
        fetchAndSetUserState();
      } else {
        initializeState();
      }
    } catch (error) {
      console.error(error);
      initializeState();
    }
  }, []);

  useEffect(() => {
    initialize();
  }, [initialize]);

  return (
    <AuthContext.Provider
      value={{
        ...state,
        login,
        logout,
        isSuperAdmin,
        fetchAndSetUserState,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
