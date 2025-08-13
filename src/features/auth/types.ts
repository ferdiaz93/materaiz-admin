// ----------------------------------------------------------------------

export type ActionMapType<M extends { [index: string]: any }> = {
  [Key in keyof M]: M[Key] extends undefined
    ? {
        type: Key;
      }
    : {
        type: Key;
        payload: M[Key];
      };
};

export type Role = 'super_admin' | 'admin';

export type AuthStateType = {
  isAuthenticated: boolean;
  isInitialized: boolean;
  userId: string | number | undefined;
  roles: Role[];
  user: LoggedUser;
};

export type LoggedUser = {
  displayName: string;
  role: string;
  photoURL: string;
  email: string;
};

// ----------------------------------------------------------------------

export type AuthContextType = {
  isAuthenticated: boolean;
  isInitialized: boolean;
  login: (x: { email: string; password: string }) => Promise<any>;
  logout: () => void;
  roles: Role[];
  userId: string | number | undefined;
  isSuperAdmin: () => boolean;
  user: LoggedUser;
  fetchAndSetUserState: () => Promise<void>;
};
