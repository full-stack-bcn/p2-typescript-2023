import { UserServices } from "./Services/UserServices.js";
import { UserServicesImp } from "./Services/UserServicesImp.js";
import { RenderServices } from "./Services/RenderServices.js";
import { RenderServicesImp } from "./Services/RenderServicesImp.js";
import { USERS_TO_LOAD } from "./Constant/constant.js";
import { PrintServices } from "./Services/PrintServices.js";
import { PrintServicesImp } from "./Services/PrintServicesImp.js";

const userService: UserServices = new UserServicesImp();
const renderServices: RenderServices = new RenderServicesImp();
const printServices: PrintServices = new PrintServicesImp();

const users = await userService.getUsers(USERS_TO_LOAD);
const html = await renderServices.renderUsers(users);
await printServices.printPages(html);