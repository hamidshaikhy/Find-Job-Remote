import {
  jobListSearchEl,
  searchInputEl,
  searchFormEl,
  spinnerSearchEl,
  numberEl,
  BASE_API_URL,
} from "../common.js";
import renderError from "./Error.js";
import renderSpinner from "./spinner.js";
import renderJobList from "./jobList.js";

const submitHandler = (event) => {
  event.preventDefault();

  jobListSearchEl.innerHTML = "";
  // GET INPUT SEARCH TEXT
  const searchText = searchInputEl.value;
  //VALIDATE
  const forbiddenPattern = /[0-9]/;
  const patternMatch = forbiddenPattern.test(searchText);
  if (patternMatch) {
    renderError("your search may not contain numbers");
    return;
  }

  searchInputEl.blur();

  renderSpinner("search");

  //fetch('data.json');
  fetch(`${BASE_API_URL}/jobs?search=${searchText}`)
    .then((Response) => {
      if (!Response.ok) {
        console.log("something went wrong");
      }

      return Response.json();
    })
    .then((data) => {
      //job item
      const { jobItems } = data;
      numberEl.textContent = jobItems.length;
      renderSpinner("search");

      renderJobList(jobItems);
    })
    .catch((error) => console.log(error));
};
searchFormEl.addEventListener("submit", submitHandler);
