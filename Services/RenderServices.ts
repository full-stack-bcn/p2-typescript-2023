import { User } from "../user.js";
export interface RenderServices{
    render(User: Array<User>): string;
};