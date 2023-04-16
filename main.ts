import { writeFile } from "fs/promises";
import { render } from "./render.ts";
import { UserServices } from "./Services/UserServices.js";
import { UserServicesImp } from "./Services/UserServicesImp.js";
import { RenderServices } from "./Services/RenderServices.js";
import { RenderServicesImp } from "./Services/RenderServicesImp.js";



const userService: UserServices = new UserServicesImp();
const users = await userService.loadUsers(100);
const renderServices: RenderServices = new RenderServicesImp();
const html = await renderServices.render(users);
await writeFile('users.html', html);
