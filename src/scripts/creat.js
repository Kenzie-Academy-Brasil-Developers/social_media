import { posts } from "./database.js";
import { renderFinalPost } from "./render.js";
import { renderModal } from "./modal.js";

//? FUNCAO CRIAR USER
//* Esta funcao recebe um usuario e um local e cria os elementos DOM para a funcao render POST
export function creatUser(user, local) {
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

//? FUNCAO ARRAY COM NOVO POST
//* Esta funcao cria um novo elemento post e insere dentro do array posts

export function creatNewObjectPost(event) {
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
export function creatPost(post, local) {
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
