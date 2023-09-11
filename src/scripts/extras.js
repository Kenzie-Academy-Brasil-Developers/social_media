import { users } from "./database.js";
import { renderUsers } from "./render.js";

//? FUNCAO ENTRADA USER ATRAVES DO LOGIN MODAL
//* Ao clicar no login o usuario insere um nome e sobrenome e envia para esta funcao
//* se o usuario nao for localizado no array users é criado um usuario anonimo novo com uma img avatar
//* seo usuario é localizado o usuario é retornado
//* esta funcao esta sendo chamada na funcao reder user para a secao newpost

export function returnUser(inputUser) {
  const normalizeFindUser = standartString(inputUser);
  const existentUser = users.filter(
    (user) => standartString(user.user) === normalizeFindUser
  );
  if (existentUser.length > 0) {
    renderUsers(existentUser, "newPost");
    return existentUser;
  } else {
    return creatAnonymousUser(inputUser);
  }
}

export function creatAnonymousUser(userName) {
  alert(
    `Olá ${userName} Voce está logado como usuário anonimo, para ter acesso envie email para roger@kenzie-academy.com.br`
  );
  const anonymousUser = [
    {
      id: 99,
      user: "Usuário Anonimo",
      stack: "Futuro Desenvolvedor",
      img: "https://i.stack.imgur.com/0jHxz.jpg",
    },
  ];

  renderUsers(anonymousUser, "newPost");

  //* aqui criar um info que ele nao pode seguir os usuarios
  return anonymousUser;
}

//* este console log é apenas para o usuário nao ficar me branco

returnUser("Carla Maria");

//? EXTRA -  FUNCAO RENDER USUARIO LOGADO
//* esta funcao renderiza o usuario que realizou o login ou um usuário anonimo
export function renderlogedUser(e) {
  e.preventDefault();
  const userLoged = document.querySelector("#input__identify-user").value;
  returnUser(userLoged);
  document.querySelector(".modal__form--login").reset();
}

//? EXTRA -  FUNCAO MODAL DE LOGIN
//* esta funcao abre ou fecha o modal de login
export function handleModalLogin() {
  const openModalLogin = document.querySelector(".header__button--modal");
  const modalController = document.querySelector(".modal__controller-login");

  openModalLogin.addEventListener("click", () => {
    modalController.showModal();
  });

  closeModalLogin();
}

handleModalLogin();

export function closeModalLogin() {
  const closeModalLogin = document.querySelector(".button__identify-user");
  const modalController = document.querySelector(".modal__controller-login");

  closeModalLogin.addEventListener("click", () => {
    modalController.close();
  });

  closeModalLogin.addEventListener("click", renderlogedUser);
}

//TODO: FUNCOES NECESSARIAS

export function standartString(userName) {
  let standart = userName
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/ /g, "")
    .trim();

  return standart;
}
