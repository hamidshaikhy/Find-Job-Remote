import {
  state,
  paginationBtnBackEl,
  paginationBtnNextEl,
  paginationEl,
  paginationNumberNextEl,
  paginationNumberBackEl,
  ITEM_SIZE_PER_PAGE,
} from "../common.js";
import renderJobList from "./jobList.js";

const renderPagingBtn = () => {
  if (state.currentPage >= 2) {
    paginationBtnBackEl.classList.remove("pagination__button--hidden");
  } else {
    paginationBtnBackEl.classList.add("pagination__button--hidden");
  }

  if (
    state.searchJobItems.length - state.currentPage * ITEM_SIZE_PER_PAGE <=
    0
  ) {
    paginationBtnNextEl.classList.add("pagination__button--hidden");
  } else {
    paginationBtnNextEl.classList.remove("pagination__button--hidden");
  }

  paginationNumberNextEl.textContent = state.currentPage + 1;
  paginationNumberBackEl.textContent = state.currentPage - 1;

  paginationBtnBackEl.blur();
  paginationBtnNextEl.blur();
};
const pagingHandler = (event) => {
  const clickedButton = event.target.closest(".pagination__button");

  if (!clickedButton) return;
  const nextPage = clickedButton.className.includes("--next") ? true : false;
  nextPage ? state.currentPage++ : state.currentPage--;
  renderJobList();
  renderPagingBtn();
};
paginationEl.addEventListener("click", pagingHandler);

export default renderPagingBtn;
