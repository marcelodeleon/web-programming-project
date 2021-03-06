import { html, nothing } from 'https://unpkg.com/lit-html?module';

import { logIn } from '../services/auth.js';
import refresh from '../utils/refresh.js';

let error = null;

const login = () => {
  const loginHandler = async (event) => {
    event.preventDefault();

    const username = event.target.username.value;
    const password = event.target.password.value;

    try {
      await logIn(username, password);
    } catch (err) {
      error = 'Usuario o contraseña no válidos!';
      refresh();
    }
  };

  return html`
    <style>
      .pageContainer {
        text-align: center;
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        justify-content: center;
        align-content: center;
        align-items: center;
      }

      .login-container {
        background-color: #a5a5a5;
        margin-top: 15%;
        align-self: auto;
        padding: 40px;
        border-radius: 15px;
      }

      .login-container input {
        margin: 5px;
        height: 30px;
        width: 300px;
        border: none;
      }

      .login-container button {
        margin-top: 15px;
      }
      .login-container h5 {
        float: left;
      }
    </style>
    <div class="pageContainer">
      <form class="login-container" @submit=${loginHandler}>
        <input type="text" name="username" placeholder="Usuario" />
        <br />
        <input
          type="password"
          name="password"
          placeholder="Contrase&ntilde;a"
        />
        <br />
        ${error ? html`<p class="error">${error}</p>` : nothing}
        <button type="submit">Ingresar</button>
        <br />
        <h5>
          ¿No tienes cuenta? <a href="/register" target="_self">Regístrate!</a>
        </h5>
      </form>
    </div>
  `;
};
export default login;
