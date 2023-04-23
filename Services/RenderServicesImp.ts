import { RenderServices } from "./RenderServices.js";
import { User } from "../user.js";
import {
  USERS_TO_LOAD,
  USERS_PER_PAGE,
  MAIN_HTML,
} from "../Constant/constant.js";

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
        text-decoration: none;
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
        <a href = "${user.fullName}.html" class="ver-mas">Ver más</a>
      </div>`;
    }
    html += "</div>";
    return html;
  }

  private addPagination(pages: number, current: number): string {
    let hmlt = `<ul class="pagination">`;

    if (current > 0) {
      hmlt += `<li><a href="${MAIN_HTML}${current - 1}.html">«</a></li>`;
    }

    for (let i = 0; i < pages; i++) {
      if (i == current) {
        hmlt += `<li><a class="active" href="${MAIN_HTML}${i}.html">${i}</a></li>`;
      } else {
        hmlt += `<li><a href="${MAIN_HTML}${i}.html">${i}</a></li>`;
      }
    }

    if (current < pages - 1) {
      hmlt += `<li><a href="${MAIN_HTML}${current + 1}.html">»</a></li>`;
    }

    hmlt += "</ul>";

    return hmlt;
  }

  public renderUsers(users: Array<User>): Array<string> {
    const pages: number = Math.ceil(USERS_TO_LOAD / USERS_PER_PAGE);
    const allHtmlPages: Array<string> = [];
    let htmlPage: string = "";
    let from: number = 0;
    let until: number = USERS_PER_PAGE;

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

      from = until + 1;
      until =
        until + USERS_PER_PAGE <= users.length - 1
          ? until + USERS_PER_PAGE
          : users.length - 1;
    }

    return allHtmlPages;
  }

  private renderUserDetailHead(title: string): string {
    return `<head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${title}</title>
      <link
      rel="stylesheet"
      href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css"/>
    <script src="https://unpkg.com/leaflet@1.7.1/dist/leaflet.js"></script>
    <style>
      :root {
        font-family: sans-serif;
        font-size: large;
      }

      html,
      body {
        height: 100%;
      }

      body {
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .contenedor {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: center;
      }

      .user {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 0.4rem;
        background-image: linear-gradient(to bottom, #1d9dec, #bfdcec);
        color: white;
        width: 20%;
        min-width: 20rem;
        height: 49rem;
      }

      .user .titulo_de_seccion {
        display: flex;
        flex-wrap: wrap;
        height: 2rem;
        margin-bottom: 1rem;
      }

      .user .details {
        margin-top: 0.5rem;
        margin-bottom: 0.5rem;
        margin-left: 0.5rem;
      }

      .user .icono {
        width: 2rem;
        height: 2rem;
        margin-top: 0rem;
        margin-right: 0.7rem;
        margin-left: 0;
      }

      .user img {
        width: 7rem;
        height: 7rem;
        margin-top: 4rem;
        margin-right: 0.7rem;
        margin-left: 0.7rem;
      }

      .user .name {
        font-weight: bold;
        font-size: xx-large;
        margin-top: 1rem;
      }

      .user .title {
        font-weight: bold;
        margin-top: 0.5rem;
        margin-bottom: 0.5rem;
      }

      .user .data {
        font-family: monospace;
        margin-top: 0.5rem;
        margin-bottom: 0.5rem;
      }

      .user .seccion {
        font-family: monospace;
        font-size: small;
        font-style: italic;
        margin-bottom: 0.5rem;
      }

      .mapContenedor {
        display: flex;
        flex-direction: column;
        padding: 0.4rem;
      }
      .mapContenedor #mapid {
        width: 40rem;
        height: 48.7rem;
      }

      .linea {
        border: none;
        border-top: 1px solid #000000;
        height: 0;
      }
    </style>
  </head>`;
  }

  private rendeUserDetailBody(user: User): string {
    const html = `<div class="contenedor">
    <div class="user">
      <img src="${user.picture} />
      <div class="details">
        <div class="name">${user.fullName}</div>
      </div>
      <div class="details">
        <div class="titulo_de_seccion">
          <img class="icono" src="./img/contacto.png" />
          <div class="title">Acerca</div>
        </div>
        <hr class="linea" />
        <div class="seccion">Informacion de contacto</div>
        <div class="title">Email:</div>
        <div class="data">
          <a
            style="text-decoration: none"
            ref="mailto:${user.email}">${user.email}</a>
        </div>
        <div class="title">Celular:</div>
        <div class="data">${user.cell}</div>

        <div class="titulo_de_seccion">
          <img class="icono" src="./img/localizacion.png" />
          <div class="title">Localizacion</div>
        </div>
        <hr class="linea" />

        <div class="seccion">Residencia</div>
        <div class="title">Calle:</div>
        <div class="data">${user.location.street}</div>
        <div class="title">Ciudad:</div>
        <div class="data">${user.location.city}</div>
        <div class="title">Estado:</div>
        <div class="data">${user.location.state}</div>
        <div class="title">Pais:</div>
        <div class="data">${user.location.country}</div>
        <div class="title">Codigo Postal:</div>
        <div class="data">${user.location.postcode}</div>
      </div>
    </div>
    <div class="mapContenedor">
      <div class="tile">Donde vive Susie Douglas:</div>
      <div id="mapid"></div>
    </div>
  </div>
  <script>
    const mapa = L.map("mapid").setView([${user.location.coordinates.latitude}, ${user.location.coordinates.longitude}], 13);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 18,
      tileSize: 512,
      zoomOffset: -1,
      subdomains: "abc",
    }).addTo(mapa);
  </script>
`;
   
    return html;
  }


  public renderUsersDetails(users: Array<User>): Array<string> {

    const allHtmlPages: Array<string> = users.map((user: User) => {
      let htmlPage: string = "";
      htmlPage = `<html>
        ${this.renderUserDetailHead(`Detalles de contacto: ${user.fullName}`)}
        <body>
          ${this.rendeUserDetailBody(user)}
        </body>
      </html>`;

      return htmlPage;
    });
    

    return allHtmlPages;
  }
}
