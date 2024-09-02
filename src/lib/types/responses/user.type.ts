export interface IUserResponse {
  id: number;
  username: string;
  email: string;
  provider: string;
  confirme: boolean;
  blocked: boolean;
  createdAt: string;
  updatedAt: string;
  role: {
    id: 1;
    name: string;
    description: string;
    type: string;
    createdAt: string;
    updatedAt: string;
  };
}
