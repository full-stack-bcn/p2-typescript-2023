import { User } from "../user.js";
export interface UserServices{
    getUsers(n: number): Promise<User[]>;
};