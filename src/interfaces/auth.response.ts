import type { User } from "./user.interface";

//Login, Register, CheckStatus
export interface AuthResponse {
  user: User;
  token: string;
}
