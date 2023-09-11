//*
//!
//?
//TODO:

//? FUNCOES QUE SERAO EXECUTADAS

import { posts, suggestUsers } from "./database.js";
import { renderUsers, renderFinalPost } from "./render.js";

renderUsers(suggestUsers, "suggestUser");

renderFinalPost(posts, "post");

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

postText.addEventListener("keydown", (event) => {
  const value = event.currentTarget.value;
  postButton.disabled = false;

  if (value === "") {
    postButton.disabled = true;
  }
});
