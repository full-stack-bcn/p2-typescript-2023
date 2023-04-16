import { RenderServices } from "./RenderServices.js";
import { User } from "../user.js";
import { USERS_TO_LOAD, USERS_PER_PAGE, MAIN_HTML } from "../Constant/constant.js";

export class RenderServicesImp implements RenderServices {
  constructor() {}

  private renderHead(title: string): string {
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

      .user-grid > * {
        width: 250px;
        min-width: 210px;
        max-width: 220px;
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
        max-width: 220px;
        color: white;
      }

      .user .data {
        margin-top: 0.5rem;
        margin-bottom: 0.5rem;
        margin-left: 0.5rem;
      }

      .user img {
        width: 5rem;
        height: 5rem;
        border-radius: 50%;
        margin-right: 0.7rem;
        margin-left: 0.7rem;
        
      }

      .user .name {
        font-weight: bold;
      }

      .user .email {
        font-family: monospace;
      }

      .ver-mas {
        background-color: #1d9dec;
        color: white;
        padding: 0.5rem 1rem;
        border: none;
        border-radius: 0.3rem;
        cursor: pointer;
      }

      .ver-mas:hover {
        background-color: navy;
      }

      ul.pagination {
        display: inline-block;
        padding: 0;
        margin: 0;
        font-family: sans-serif;
      }

      ul.pagination li {
        display: inline;
      }

      ul.pagination li a {
        color: black;
        float: left;
        padding: 8px 16px;
        text-decoration: none;
      }

      ul.pagination li a.active {
        background-color: #4caf50;
        color: white;
      }

      ul.pagination li a:hover:not(.active) {
        background-color: #ddd;
      }
    </style>
    </head>`;
  }

  private rendeBody(users: Array<User>): string {
    let html = '<div class="user-grid">';
    for (const user of users) {
      html += `<div class="user">
      <div class="data">
          <div class="name">${user.fullName}</div>
      </div>
        <img src="${user.picture.medium}" />
        <div class="data">
          <div class="name">Email:</div>
          <div class="email">${user.email}</div>
          <div class="name">Celular:</div>
          <div class="email">${user.cell}</div>
        </div>
        <button class="ver-mas">Ver más</button>
      </div>`;
    }
    html += "</div>";
    return html;
  }

  private addPagination(pages: number, current: number): string {
    let hmlt = `<ul class="pagination">`;

    if (current > 0) {
      hmlt += `<li><a href="index_"${current - 1}>«</a></li>`;
    }

    for (let i = 0; i <= pages; i++) {
      if (i == current) {
        hmlt += `<li><a class="active" href="${MAIN_HTML}${i}.html">${i}</a></li>`;
      } else {
        hmlt += `<li><a href="${MAIN_HTML}${i}.html">${i}</a></li>`;
      }
    }

    if (current < pages) {
      hmlt += `<li><a href="${MAIN_HTML}${current + 1}.html>»</a></li>`;
    }

    hmlt += "</ul>";

    return hmlt;
  }
  
  public renderUsers(users: Array<User>): Array<string> {
    const pages: number = Math.ceil(USERS_TO_LOAD / USERS_PER_PAGE);
    const allHtmlPages: Array<string> = [];
    let htmlPage: string = "";
    let from: number = 0;
    let until: number = 50;

    for (let i: number = 0; i < pages; i++) {
      const sliceOfUsers = users.slice(from, until);
      htmlPage = `<html>
        ${this.renderHead(`User List ${i}`)}
        <body>
          ${this.rendeBody(sliceOfUsers)}
          ${this.addPagination(pages, i)}
        </body>
      </html>`;

      allHtmlPages.push(htmlPage);

      from = until;
      until =
        until + USERS_PER_PAGE <= users.length
          ? until + USERS_PER_PAGE
          : users.length - 1;
    }

    return allHtmlPages;
  }
}
