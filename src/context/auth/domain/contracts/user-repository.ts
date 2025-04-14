import { User } from "../class/user";

export interface UserRepository {
  findByUsername(username: string): Promise<User | null>;
  createUser(username: string, hashedPassword: string): Promise<void>;
}