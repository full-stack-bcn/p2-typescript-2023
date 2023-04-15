import { writeFile } from "fs/promises";
import { render } from "./render.ts";
import { UserServices } from "./Services/UserServices.js";
import { UserServicesImp } from "./Services/UserServicesImp.js";



const userService: UserServices = new UserServicesImp();
const users = await userService.loadUsers(100);
const html = render(users);
await writeFile('users.html', html);
