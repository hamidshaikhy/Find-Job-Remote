import {
  state,
  bookmarksBtnEl,
  jobDetailsEl,
  jobListBookmarksEl,
} from "../common.js";
import renderJobList from "./jobList.js";
const clickHandler = (event) => {
  if (!event.target.className.includes("bookmark")) return;

  if (
    state.bookmarkJobItem.some(
      (bookmark) => bookmark.id === state.activeJobItem.id,
    )
  ) {
    state.bookmarkJobItem = state.bookmarkJobItem.filter(
      (b) => b.id !== state.activeJobItem.id,
    );
  } else {
    state.bookmarkJobItem.push(state.activeJobItem);
  }

  //local storage
  localStorage.setItem(
    "bookMarkJobItems",
    JSON.stringify(state.bookmarkJobItem),
  );

  document
    .querySelector(".job-info__bookmark-icon")
    .classList.toggle("job-info__bookmark-icon--bookmarked");

  renderJobList("search");
};
const mouseEnterHandler = () => {
  bookmarksBtnEl.classList.add("bookmarks-btn--active");
  jobListBookmarksEl.classList.add("job-list--visible");

  renderJobList("bookmarks");
};

const mouseLeaveHandler = () => {
  bookmarksBtnEl.classList.remove("bookmarks-btn--active");
  jobListBookmarksEl.classList.remove("job-list--visible");
};

jobDetailsEl.addEventListener("click", clickHandler);
bookmarksBtnEl.addEventListener("mouseenter", mouseEnterHandler);
bookmarksBtnEl.addEventListener("mouseleave", mouseLeaveHandler);
