import { RenderServices } from "./RenderServices.js";
import { User } from "../user.js";

export class RenderServicesImp implements RenderServices {
  constructor() {}

  private head(title: string): string {
    return `<head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${title}</title>
      <style>
        body {
          margin: 0;
          padding: 0;
        }
        .user {
          font-family: sans-serif;
          display: flex;
          flex-direction: row;
          align-items: center;
          padding: .4rem;
          border-bottom: 1px solid #ddd;
        }
        .user img {
          width: 3rem;
          height: 3rem;
          border-radius: 50%;
          margin-right: 0.7rem;
        }
        .user .name {
          font-weight: bold;
        }
        .user .email {
          font-family: monospace;
        }
      </style>
    </head>`;
  };

  private renderUsers (users: Array<User>):string {
    let html = "";
    for (const user of users) {
      html += `<div class="user">
        <img src="${user.picture.medium}" />
        <div class="data">
          <div class="name">${user.fullName}</div>
          <div class="email">${user.email}</div>
        </div>
      </div>`;
    }
    return html;
  }
  
  public render(users: Array<User>):string {
    return `
  <html>
    ${this.head("User List")}
    <body>
      ${this.renderUsers(users)}
    </body>
  </html>`;
  };
}