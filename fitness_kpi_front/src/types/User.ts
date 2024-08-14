export interface User {
  id: number;
  name: string;
  email: string;
}

export interface RegisterCredentials {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface UserState {
  user: User | null;
}

export interface RootState {
  user: UserState;
}
