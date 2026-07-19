import {
  sortingBtnRecentEl,
  sortingBtnRelevantEl,
  sortingEl,
  state,
} from "../common.js";
import renderJobList from "./jobList.js";
const clickHandler = (event) => {
  const clickButtonEl = event.target.closest(".sorting__button");
  if (!clickButtonEl) return;

  const recent = clickButtonEl.className.includes("--recent") ? true : false;

  if (recent) {
    sortingBtnRecentEl.classList.add("sorting__button--active");
    sortingBtnRelevantEl.classList.remove("sorting__button--active");
  } else {
    sortingBtnRecentEl.classList.remove("sorting__button--active");
    sortingBtnRelevantEl.classList.add("sorting__button--active");
  }

  if (recent) {
    state.searchJobItems.sort((a, b) => {
      return a.daysAgo - b.daysAgo;
    });
  } else {
    state.searchJobItems.sort((a, b) => {
      return a.relevanceScore - b.relevanceScore;
    });
  }
  renderJobList();
};
sortingEl.addEventListener("click", clickHandler);
