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

const submitHandler = async (event) => {
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

  try {
    const response = await fetch(`${BASE_API_URL}/jobs?search=${searchText}`);
    const data = await response.json();

    if(!response.ok){
      throw new Error(data.description);
    }

    //get jobitems
    const { jobItems } = data;

    //clear spinner
    renderSpinner("search");

    numberEl.textContent = jobItems.length;

    renderJobList(jobItems);
  } catch (error) {
      renderSpinner("search");
      renderError(error.userError);
  }

};
searchFormEl.addEventListener("submit", submitHandler);
