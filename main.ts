import { UserServices } from "./Services/UserServices.js";
import { UserServicesImp } from "./Services/UserServicesImp.js";
import { RenderServices } from "./Services/RenderServices.js";
import { RenderServicesImp } from "./Services/RenderServicesImp.js";
import { USERS_TO_LOAD, MAIN_HTML} from "./Constant/constant.js";
import { PrintServices } from "./Services/PrintServices.js";
import { PrintServicesImp } from "./Services/PrintServicesImp.js";

const userService: UserServices = new UserServicesImp();
const renderServices: RenderServices = new RenderServicesImp();
const printServices: PrintServices = new PrintServicesImp();

const users = await userService.getUsers(USERS_TO_LOAD);
const htmlUser = await renderServices.renderUsers(users);
const htmlUserDetails = await renderServices.renderUsersDetails(users);


await printServices.printPages(htmlUser, MAIN_HTML);
await printServices.printPages(htmlUserDetails, MAIN_HTML);