import { User } from "../user.js";
export interface RenderServices{
    renderUsers(User: Array<User>): Array<string> ;
    renderUsersDetails(user: Array<User>): Array<string> ;
};