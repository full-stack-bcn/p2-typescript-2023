import { writeFile } from "fs/promises";
import { PrintServices } from "./PrintServices.js";
import { User } from "../user.js";

export class PrintServicesImp implements PrintServices {
  constructor() {}
  public async printPages(pages: Array<string>, baseNamePage: string) {
    for (let i = 0; i < pages.length; i++) {
      const page = pages[i];
      await writeFile(`${baseNamePage}.html`, page);
    }
  }

  public async printUsersDetails(users: Array<User>, pages: Array<string>) {
    for (let i = 0; i < pages.length; i++) {
      await writeFile(`users_details/${users[i].fullName}.html`, pages[i]);
    }
  }
}