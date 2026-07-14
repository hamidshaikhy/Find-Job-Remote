import { errorEl, errorTextEl } from "../common.js";

const renderError = (message = "something went wrong") => {
  errorTextEl.textContent = message;
  errorEl.classList.add("error--visible");
  setTimeout(() => {
    errorEl.classList.remove("error--visible");
  }, 3000);
};

export default renderError;
