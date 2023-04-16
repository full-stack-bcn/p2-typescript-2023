import { writeFile } from "fs/promises";
import { UserServices } from "./Services/UserServices.js";
import { UserServicesImp } from "./Services/UserServicesImp.js";
import { RenderServices } from "./Services/RenderServices.js";
import { RenderServicesImp } from "./Services/RenderServicesImp.js";
import {USERS_TO_LOAD, MAIN_HTML} from "./Constant/constant.js"



const userService: UserServices = new UserServicesImp();
const renderServices: RenderServices = new RenderServicesImp();

const users = await userService.getUsers(USERS_TO_LOAD);
const html = await renderServices.render(users);
await writeFile(MAIN_HTML, html);
