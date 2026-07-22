import { state } from "../common.js";

const storageJobItems = localStorage.getItem("bookMarkJobItems");
if (storageJobItems) {
  state.bookmarkJobItem = JSON.parse(storageJobItems);
}
