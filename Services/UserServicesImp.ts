import { UserServices } from "./UserServices.js";
import { User } from "../user.js";
import { USER_API_URL} from "../Constant/constant.js"

export class UserServicesImp implements UserServices {
  constructor() {}

  public loadUsers = async (n: number) => {
    const response = await fetch(`${USER_API_URL}${n}`);
    const { results } = (await response.json()) as { results: any[] };
    const users: Array<User> = [];
    for (const { gender, name, location, login, email, picture,cell } of results) {
      users.push(new User(gender, name, location, login, email, picture,cell));
    }
    return users;
  };
}
