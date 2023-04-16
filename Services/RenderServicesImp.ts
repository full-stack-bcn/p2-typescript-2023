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

      .user-grid {
        justify-items: center;
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 1rem;
      }

      .user {
        font-family: sans-serif;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 0.4rem;
        border-bottom: 1px solid #ddd;
        background-image: linear-gradient(to bottom, #1d9dec, #bfdcec);
      }

      .user .data {
        margin-top: 0.5rem;
        margin-bottom: 0.5rem;
      }

      .user img {
        width: 5rem;
        height: 5rem;
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
    let html = '<div class="user-grid">';
    for (const user of users) {
      html += `<div class="user">
      <div class="data">
          <div class="name">${user.fullName}</div>
      </div>
        <img src="${user.picture.medium}" />
        <div class="data">
          <div class="email">Email:</div>
          <div class="email">${user.email}</div>
          <div class="email">Celular:</div>
          <div class="email">${user.cell}</div>
        </div>
      </div>`;
    }
    html += "</div>";
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