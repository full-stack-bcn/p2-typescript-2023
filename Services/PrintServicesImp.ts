import { writeFile } from "fs/promises";
import { PrintServices } from "./PrintServices.js";
import {MAIN_HTML} from "../Constant/constant.js"

export class PrintServicesImp implements PrintServices {
  constructor() {}
  public async printPages(pages: Array<string>) {
    let i: number = 0;

     for (let i = 0; i < pages.length; i++) {
        const page = pages[i];
        await writeFile(`${MAIN_HTML}${i}.html`, page);
     }
  }
}
