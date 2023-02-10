//*
//!
//?
//TODO:

//? FUNCOES QUE SERAO EXECUTADAS

import { users, posts, suggestUsers } from "./database.js";

//TODO: FUNCOES REDERENTE AO USUARIO

//? FUNCAO RENDER USER
//* Esta funcao recebe o array final de usuarios  e renderiza os usuarios no local informado no segundo parametro
function renderUsers(usersArray, local) {
  if (local === "suggestUser") {
    const listUsers = document.querySelector(".list__suggest-users");
    listUsers.innerHTML = "";

    usersArray.forEach((user) => {
      const renderUser = creatUser(user, local);
      listUsers.appendChild(renderUser);
    });

    return listUsers;
  }

  if (local === "post") {
    const listUsers = document.querySelector(".list__posts");
    listUsers.innerHTML = "";

    usersArray.forEach((user) => {
      const renderUser = creatUser(user, local);
      listUsers.appendChild(renderUser);
    });
    return listUsers;
  }

  if (local === "newPost") {
    const listUsers = document.querySelector(".box__user--new-post");
    listUsers.innerHTML = "";

    usersArray.forEach((user) => {
      const renderUser = creatUser(user, local);
      listUsers.appendChild(renderUser);
    });
    return listUsers;
  }
}

renderUsers(suggestUsers, "suggestUser");

//? FUNCAO CRIAR USER
//* Esta funcao recebe um usuario e um local e cria os elementos DOM para a funcao render POST
function creatUser(user, local) {
  const imgUser = document.createElement("img");
  const infoUser = document.createElement("div");
  const nameUser = document.createElement("h2");
  const occupationUser = document.createElement("p");

  imgUser.classList.add("user__img");
  infoUser.classList.add("user__info");
  nameUser.classList.add("user__name");
  occupationUser.classList.add("user__occupation");

  imgUser.src = user.img;
  imgUser.alt = user.user;
  nameUser.innerText = user.user;
  occupationUser.innerText = user.stack;

  if (local === "suggestUser") {
    const itemSuggestUser = document.createElement("li");
    const divUser = document.createElement("div");
    const fallowUser = document.createElement("button");

    itemSuggestUser.classList.add("item__suggest-user");
    divUser.classList.add("div__suggest-user");
    fallowUser.dataset.fallowId = user.id;
    fallowUser.setAttribute("id", `button__suggest-users-${user.id}`);
    fallowUser.classList.add("button__suggest-users");
    fallowUser.innerText = "Seguir";

    itemSuggestUser.appendChild(divUser);
    divUser.appendChild(imgUser);
    divUser.appendChild(infoUser);
    infoUser.appendChild(nameUser);
    infoUser.appendChild(occupationUser);
    itemSuggestUser.appendChild(fallowUser);

    fallowUser.addEventListener("click", function (e) {
      e.preventDefault();
      if (fallowUser.innerText === "Seguir") {
        fallowUser.classList.remove("button__following-user");
        fallowUser.classList.add("button__suggest-following");
        fallowUser.innerText = "Seguindo";
      } else {
        fallowUser.classList.remove("button__suggest-following");
        fallowUser.classList.add("button__following-user");
        fallowUser.innerText = "Seguir";
      }
    });

    return itemSuggestUser;
  }
  if (local === "post" || local === "modalPost") {
    const postItemUser = document.createElement("div");
    postItemUser.classList.add("box__user");
    postItemUser.classList.add("box__user--posts");

    postItemUser.appendChild(imgUser);
    postItemUser.appendChild(infoUser);
    infoUser.appendChild(nameUser);
    infoUser.appendChild(occupationUser);

    return postItemUser;
  }
  if (local === "newPost") {
    const itemNewPostUser = document.createElement("div");
    itemNewPostUser.classList.add("container__user");
    itemNewPostUser.classList.add("container__user--new-post");

    itemNewPostUser.appendChild(imgUser);
    itemNewPostUser.appendChild(infoUser);
    infoUser.appendChild(nameUser);
    infoUser.appendChild(occupationUser);

    return itemNewPostUser;
  }
}

//? FUNCAO ENTRADA USER ATRAVES DO LOGIN MODAL
//* Ao clicar no login o usuario insere um nome e sobrenome e envia para esta funcao
//* se o usuario nao for localizado no array users é criado um usuario anonimo novo com uma img avatar
//* seo usuario é localizado o usuario é retornado
//* esta funcao esta sendo chamada na funcao reder user para a secao newpost

function returnUser(inputUser) {
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

function creatAnonymousUser(userName) {
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

console.log(returnUser("Carla Maria"));

//? EXTRA -  FUNCAO RENDER USUARIO LOGADO
//* esta funcao renderiza o usuario que realizou o login ou um usuário anonimo
function renderlogedUser(e) {
  e.preventDefault();
  const userLoged = document.querySelector("#input__identify-user").value;
  returnUser(userLoged);
  document.querySelector(".modal__form--login").reset();
}

//? EXTRA -  FUNCAO MODAL DE LOGIN
//* esta funcao abre ou fecha o modal de login
function handleModalLogin() {
  const openModalLogin = document.querySelector(".header__button--modal");
  const modalController = document.querySelector(".modal__controller-login");

  openModalLogin.addEventListener("click", () => {
    modalController.showModal();
  });

  closeModalLogin();
}

handleModalLogin();

function closeModalLogin() {
  const closeModalLogin = document.querySelector(".button__identify-user");
  const modalController = document.querySelector(".modal__controller-login");

  closeModalLogin.addEventListener("click", () => {
    modalController.close();
  });

  closeModalLogin.addEventListener("click", renderlogedUser);
}

//TODO: FUNCOES REFERENTE AOS POSTS

//? FUNCAO RENDER FINAL POST
//* Nesta funcao recebemos  o render o return user e  o render user para cada elemento do array
//*  Nesta funcao vamos renderizar um post completo  na tela com user e comentario
//* Esta funcao sera feita a partir array resultande da funcao creatNewObjectPost
function renderFinalPost(array, local) {
  const allPosts = document.querySelector(".list__posts");
  if (local === "post") {
    allPosts.innerHTML = "";
  }
  const modalPostUser = document.querySelector(".box__modal--user");
  const modalPostCommentar = document.querySelector(".box__modal--comment");

  array.forEach((user) => {
    const renderUser = creatUser(user, "post");
    const renderPost = creatPost(user, "post");
    if (local === "post") {
      const itemUser = document.createElement("li");
      itemUser.classList.add("item__user");
      itemUser.setAttribute("id", `item__user-${user.id}`);
      allPosts.appendChild(itemUser);
      itemUser.appendChild(renderUser);
      itemUser.appendChild(renderPost);
    }
    if (local === "modalPost") {
      const renderModalUser = creatUser(user, "modalPost");
      const renderModalPost = creatPost(user, "modalPost");
      modalPostUser.appendChild(renderModalUser);
      modalPostCommentar.appendChild(renderModalPost);
    }
  });

  return allPosts;
}
renderFinalPost(posts, "post");

//? FUNCAO ARRAY COM NOVO POST
//* Esta funcao cria um novo elemento post e insere dentro do array posts

function creatNewObjectPost(event) {
  event.preventDefault();
  const imgUserPost = document.querySelector(".user__img");
  const propietyimg = imgUserPost.src;
  const userNamePost = document.querySelector(".user__name");
  const propietyName = userNamePost.innerText;
  const occupationUserPost = document.querySelector(".user__occupation");
  const propietyOccupation = occupationUserPost.innerText;
  const titleValue = document.querySelector(".input__title");
  const propietyTitle = titleValue.value;

  const textValue = document.querySelector(".input__commentar");
  const propietyText = textValue.value;

  if (propietyText === "" || propietyTitle === "") {
    alert("Favor conferir se o titulo e o texto estao preenchidos");
    document.querySelector("#form__new-post").reset();
    return titleValue;
  }
  if (propietyText !== "" && propietyTitle !== "") {
    const newPost = {
      id: posts.length + 1,
      title: propietyTitle,
      text: propietyText,
      user: propietyName,
      stack: propietyOccupation,
      img: propietyimg,
      likes: 0,
    };

    posts.push(newPost);
    posts.reverse();
    renderFinalPost(posts, "post");
    document.querySelector("#form__new-post").reset();
  }

  return posts;
}

const newPost = document.querySelector(".button__new-post");

newPost.addEventListener("click", creatNewObjectPost);

//? FUNCAO CRIAR POST

//* Esta funcao recebe o array final e cria os elementos DOM para a funcao render
function creatPost(post, local) {
  if (local === "post") {
    const itemComment = document.createElement("div");
    const titleComment = document.createElement("h3");
    const textComment = document.createElement("p");
    const boxModalandLikeComment = document.createElement("span");
    const buttonModalComment = document.createElement("button");
    const iconLikeComment = document.createElement("i");
    const countLikeComment = document.createElement("p");

    itemComment.classList.add("box__comment");
    itemComment.classList.add("box__comment--posts");
    titleComment.classList.add("post__title");
    textComment.classList.add("post__commentar");
    boxModalandLikeComment.classList.add("box__modal-and-like");
    buttonModalComment.classList.add("button__open-post");
    buttonModalComment.setAttribute("id", `button__open-post-${post.id}`);
    iconLikeComment.setAttribute("class", "fa-solid fa-heart");
    countLikeComment.classList.add("count__liked-post");

    buttonModalComment.setAttribute("id", `button__open-post--${post.id}`);
    countLikeComment.setAttribute("id", `count__liked-post--${post.id}`);

    titleComment.innerText = post.title;
    textComment.innerText = `${post.text.substring(0, 150)}...`;
    buttonModalComment.dataset.postId = post.id;
    iconLikeComment.dataset.likeId = post.id;
    buttonModalComment.innerText = "Abrir Post";
    countLikeComment.innerText = post.likes;

    itemComment.appendChild(titleComment);
    itemComment.appendChild(textComment);
    itemComment.appendChild(boxModalandLikeComment);
    boxModalandLikeComment.appendChild(buttonModalComment);
    boxModalandLikeComment.appendChild(iconLikeComment);
    boxModalandLikeComment.appendChild(countLikeComment);

    //! EVENTO QUE ABRE O MODAL ATRAVÉS DO BOTAO CRIADO

    buttonModalComment.addEventListener("click", renderModal);

    //! EVENTO QUE ADICIONA LIKES EM UM POST
    iconLikeComment.addEventListener("click", function (e) {
      e.preventDefault();
      const likeId = e.target.dataset.likeId;
      console.log(likeId);
      const post = posts.find((post) => post.id === parseInt(likeId));
      post.likes++;
      console.log(posts);
      document.getElementById(
        `count__liked-post--${post.id}`
      ).innerText = `${post.likes}`;
    });

    return itemComment;
  }
  if (local === "modalPost") {
    const itemComment = document.createElement("div");
    const titleComment = document.createElement("h3");
    const textComment = document.createElement("p");

    itemComment.classList.add("box__comment");
    itemComment.classList.add("box__comment--posts");
    titleComment.classList.add("post__title");
    textComment.classList.add("post__commentar");

    titleComment.innerText = post.title;
    textComment.innerText = post.text;

    itemComment.appendChild(titleComment);
    itemComment.appendChild(textComment);

    return itemComment;
  }
}
function renderModal(e) {
  e.preventDefault();
  const postId = e.target.dataset.postId;
  const post = posts.filter((post) => post.id === parseInt(postId));
  const modal = document.querySelector(".modal__controller-open-post");
  renderFinalPost(post, "modalPost");
  modal.showModal();

  closeModalPost();
}
//TODO: FUNCOES NECESSARIAS

function standartString(userName) {
  let standart = userName
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/ /g, "")
    .trim();

  return standart;
}

function closeModalPost() {
  const closeModalPost = document.querySelector(".button__close-post");
  const modalController = document.querySelector(
    ".modal__controller-open-post"
  );

  closeModalPost.addEventListener("click", () => {
    const modalPostUser = document.querySelector(".box__modal--user");
    const modalPostCommentar = document.querySelector(".box__modal--comment");
    modalPostUser.innerHTML = "";
    modalPostCommentar.innerHTML = "";
    modalController.close();
  });

  modalController.addEventListener("keydown", () => {
    const modalPostUser = document.querySelector(".box__modal--user");
    const modalPostCommentar = document.querySelector(".box__modal--comment");
    modalPostUser.innerHTML = "";
    modalPostCommentar.innerHTML = "";
  });
}

//! FUNCAO ALTERA BOTAO POSTAR

const postButton = document.querySelector(".button__new-post");
const postTitle = document.querySelector(".input__title");
const postText = document.querySelector(".input__commentar");

postTitle.addEventListener("keypress", (event) => {
  const value = event.currentTarget.value;
  postButton.disabled = false;

  if (value === "") {
    postButton.disabled = true;
  }
});

postText.addEventListener("keypress", (event) => {
  const value = event.currentTarget.value;
  postButton.disabled = false;

  if (value === "") {
    postButton.disabled = true;
  }
});
