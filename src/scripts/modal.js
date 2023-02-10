import { posts } from "./database.js";
import { renderFinalPost } from "./render.js";

export function renderModal(e) {
  e.preventDefault();
  const postId = e.target.dataset.postId;
  const post = posts.filter((post) => post.id === parseInt(postId));
  const modal = document.querySelector(".modal__controller-open-post");
  renderFinalPost(post, "modalPost");
  modal.showModal();

  closeModalPost();
}

export function closeModalPost() {
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
