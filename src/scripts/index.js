import { users, posts, suggestUsers } from "./database.js";

//*
//!
//?
//TODO:

//? FUNCOES QUE SERAO EXECUTADAS

//TODO: FUNCAO RENDER USER
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
    const listUsers = document.querySelector(".container__new-post");
    listUsers.innerHTML = "";

    usersArray.forEach((user) => {
      const renderUser = creatUser(user, local);
      listUsers.appendChild(renderUser);
    });
    return listUsers;
  }
}

/* renderUsers(suggestUsers, "suggestUser"); */
/* renderUsers(posts, "post"); */
/* renderUsers(returnUser("Aline"), "newPost"); */
//TODO: FUNCAO CRIAR USER
//* Esta funcao recebe um usuario e um local e cria os elementos DOM para a funcao render POST
function creatUser(user, local) {
  const imgUser = document.createElement("img");
  const nameUser = document.createElement("h2");
  const occupationUser = document.createElement("p");

  imgUser.classList.add("user__img");
  nameUser.classList.add("user__name");
  occupationUser.classList.add("user__occupation");

  imgUser.src = user.img;
  imgUser.alt = user.user;
  nameUser.innerText = user.user;
  occupationUser.innerText = user.stack;

  if (local === "suggestUser") {
    const itemSuggestUser = document.createElement("li");
    const fallowUser = document.createElement("button");
    itemSuggestUser.classList.add("item__suggest-user");
    fallowUser.classList.add("button__suggest-users");
    fallowUser.innerText = "Seguir";

    itemSuggestUser.appendChild(imgUser);
    itemSuggestUser.appendChild(nameUser);
    itemSuggestUser.appendChild(occupationUser);
    itemSuggestUser.appendChild(fallowUser);

    return itemSuggestUser;
  }
  if (local === "post") {
    const postItemUser = document.createElement("div");
    postItemUser.classList.add("box__user");
    postItemUser.classList.add("box__user--posts");

    postItemUser.appendChild(imgUser);
    postItemUser.appendChild(nameUser);
    postItemUser.appendChild(occupationUser);

    return postItemUser;
  }
  if (local === "newPost") {
    const itemNewPostUser = document.createElement("div");
    itemNewPostUser.classList.add("box__user");
    itemNewPostUser.classList.add("box__user--new-post");

    itemNewPostUser.appendChild(imgUser);
    itemNewPostUser.appendChild(nameUser);
    itemNewPostUser.appendChild(occupationUser);

    return itemNewPostUser;
  }
}

//TODO: FUNCAO ENTRADA USER
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
    console.log(users);
    renderUsers(suggestUsers);
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
      img: "https://media1.giphy.com/media/GonbhXpreMkV7SLbdG/giphy.gifuser1.svg",
    },
  ];

  suggestUsers.push(anonymousUser);
  renderUsers(anonymousUser, "newPost");
  console.log(suggestUsers);
  console.log(anonymousUser);
  //* aqui criar um info que ele nao pode seguir os usuarios
  return anonymousUser;
}

//TODO: FUNCAO RENDER POST
//*  Nesta funcao vamos renderizar um post na tela  com o ser
//* Esta funcao sera feita a partir do posts final

//TODO: FUNCAO NOVO POST
//* Esta funcao insere um post dentro do array posts

//TODO: FUNCAO USUARIOS COM POST
//* Esta funcao retorna um array com os usuarios que fizem post para ser usada na renderizacao de posts na pagina
function userWithPosts(postsArray) {
  const userWithPosts = [];
  for (let i = 0; i < users.length; i++) {
    let user = users[i];
    for (let j = 0; j < postsArray.length; j++) {
      let post = posts[j];
      if (user.user === post.user) {
        userWithPosts.push(user);
      }
    }
  }
  return userWithPosts;
}

//TODO: FUNCAO CRIAR POST
//* Esta funcao recebe o array final e cria os elementos DOM para a funcao render
function creatPost(post) {
  const itemComment = document.createElement("div");
  const titleComment = document.createElement("h3");
  const textComment = document.createElement("p");
  const boxModalandLikeComment = document.createElement("span");
  const buttonModalComment = document.createElement("button");
  const iconLikeComment = document.createElement("img");
  const countLikeComment = document.createElement("p");

  itemComment.classList.add("box__comment");
  itemComment.classList.add("box__comment--posts");
  titleComment.classList.add("post__title");
  textComment.classList.add("post__commentar");
  boxModalandLikeComment.classList.add("box__modal-and-like");
  buttonModalComment.classList.add("button__open-post");
  iconLikeComment.classList.add("icon__post");
  countLikeComment.classList.add("count__liked-post");

  titleComment.innerText = post.title;
  textComment.innerText = post.text;
  buttonModalComment.innerText = "Abrir Post";
  iconLikeComment.src = post.text; //! baixar biblioteca de icones
  countLikeComment.innerText = post.likes;

  itemComment.appendChild(titleComment);
  itemComment.appendChild(textComment);
  itemComment.appendChild(boxModalandLikeComment);
  boxModalandLikeComment.appendChild(buttonModalComment);
  boxModalandLikeComment.appendChild(iconLikeComment);
  boxModalandLikeComment.appendChild(countLikeComment);

  return itemComment;
}

//TODO: ELEMENTOS FIXOS DO HTML

//* HEADER; MAIN; SECTION NEWPOST; SECTION POSTS; ASIDE SUGGEST USERS; FOOTER */

function standartString(userName) {
  let standart = userName
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/ /g, "")
    .trim();

  return standart;
}
