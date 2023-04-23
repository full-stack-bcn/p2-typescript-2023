import { User } from "../user.js";

export interface PrintServices {
  printPages(pages: Array<string>, baseNamePage:string): void;
  printUsersDetails(users: Array<User>, pages: Array<string>) :void;
}
