import { creatUser, creatPost } from "./creat.js";

//TODO: FUNCOES REDERENTE AO USUARIO

//? FUNCAO RENDER USER
//* Esta funcao recebe o array final de usuarios  e renderiza os usuarios no local informado no segundo parametro
export function renderUsers(usersArray, local) {
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

//TODO: FUNCOES REFERENTE AOS POSTS

//? FUNCAO RENDER FINAL POST
//* Nesta funcao recebemos  o render o return user e  o render user para cada elemento do array
//*  Nesta funcao vamos renderizar um post completo  na tela com user e comentario
//* Esta funcao sera feita a partir array resultande da funcao creatNewObjectPost
export function renderFinalPost(array, local) {
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
