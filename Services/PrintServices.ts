import { User } from "../user.js";

export interface PrintServices {
  printPages(pages: Array<string>, baseNamePage:string): void;
  printJson(users: Array<User>) :void;
}
