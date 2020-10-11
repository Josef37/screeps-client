type User = Partial<{
  _id: string;
  email: string;
  username: string;
  cpu: number;
  password: boolean;
  gcl: number;
  blocked: boolean;
  money: number;
  steam: {};
  powerExperimentations: number;
  powerExperimentationTime: number;
}>;

type SigninFormData = {
  serverUrl: string;
  username: string;
  password: string;
};

type RegisterFormData = SigninFormData & {
  email: string;
};

type AuthState = {
  token?: string;
  user?: User;
  serverUrl?: string;
  error?: string;
  isLoading: boolean;
};

type AuthData = {
  user: User;
  token: string;
  serverUrl: string;
};
