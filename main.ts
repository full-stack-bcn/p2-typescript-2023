import { writeFile } from "fs/promises";
import { UserServices } from "./Services/UserServices.js";
import { UserServicesImp } from "./Services/UserServicesImp.js";
import { RenderServices } from "./Services/RenderServices.js";
import { RenderServicesImp } from "./Services/RenderServicesImp.js";
import {USERS_TO_LOAD} from "./Constant/constant.js"



const userService: UserServices = new UserServicesImp();
const users = await userService.loadUsers(USERS_TO_LOAD);
const renderServices: RenderServices = new RenderServicesImp();
const html = await renderServices.render(users);
await writeFile('users.html', html);
