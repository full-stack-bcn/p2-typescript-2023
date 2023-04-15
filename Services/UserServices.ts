import { User } from "../user.js";
export interface UserServices{
    loadUsers(n: number): Promise<User[]>;
};