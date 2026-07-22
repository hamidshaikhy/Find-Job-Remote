import {
  jobListSearchEl,
  jobDetailsContentEl,
  spinnerJobDetailsEl,
  BASE_API_URL,
  state,
  ITEM_SIZE_PER_PAGE,
  jobListBookmarksEl,
} from "../common.js";
import renderSpinner from "./spinner.js";
import renderError from "./Error.js";

const renderJobList = (whichJobList = "search") => {
  const jobListEl =
    whichJobList === "search" ? jobListSearchEl : jobListBookmarksEl;
  jobListEl.innerHTML = "";

  let jobItems;
  if (whichJobList === "search") {
    jobItems = state.searchJobItems.slice(
      state.currentPage * ITEM_SIZE_PER_PAGE - ITEM_SIZE_PER_PAGE,
      state.currentPage * ITEM_SIZE_PER_PAGE,
    );
  } else {
    jobItems = state.bookmarkJobItem;
  }

  jobItems.forEach((jobItem) => {
    const jobItemHtml = `
            <li class="job-item">
                        <a class="job-item__link" href="${jobItem.id}">
                            <div class="job-item__badge">${jobItem.badgeLetters}</div>
                            <div class="job-item__middle">
                                <h3 class="third-heading">${jobItem.title}</h3>
                                <p class="job-item__company">${jobItem.company}</p>
                                <div class="job-item__extras">
                                    <p class="job-item__extra"><i class="fa-solid fa-clock job-item__extra-icon"></i>${jobItem.duration}</p>
                                    <p class="job-item__extra"><i class="fa-solid fa-money-bill job-item__extra-icon"></i>${jobItem.salary}</p>
                                    <p class="job-item__extra"><i class="fa-solid fa-location-dot job-item__extra-icon"></i>${jobItem.location}</p>
                                </div>
                            </div>
                            <div class="job-item__right">
                                <i class="fa-solid fa-bookmark job-item__bookmark-icon ${state.bookmarkJobItem.some((b) => b.id === jobItem.id) ? "job-item__bookmark-icon--bookmarked" : ""}"></i>
                                <time class="job-item__time">${jobItem.daysAgo}d</time>
                            </div>
                        </a>
                    </li>
            `;
    jobListEl.insertAdjacentHTML("beforeend", jobItemHtml);
  });
};

const clickHandler = async (event) => {
  event.preventDefault();
  const jobItemEl = event.target.closest(".job-item");

  document.querySelector(".job-item--active") &&
    document
      .querySelector(".job-item--active")
      .classList.remove("job-item--active");

  jobItemEl.classList.add("job-item--active");

  jobDetailsContentEl.innerHTML = "";
  spinnerJobDetailsEl.classList.add("spinner--visible");
  const jobId = jobItemEl.children[0].getAttribute("href");
  history.pushState(null, "", `/#${jobId}`);

  let jobItem;
  try {
    const response = await fetch(`${BASE_API_URL}/jobs/${jobId}`);
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.description);
    }
    jobItem = data.jobItem;
    state.activeJobItem = jobItem;
    renderSpinner("jobList");
  } catch (error) {
    renderSpinner("jobList");
  }

  const detail = `
        
<img src="${jobItem.coverImgURL}" alt="#" class="job-details__cover-img">

<a class="apply-btn" href="${jobItem.companyURL}" target="_blank">Apply <i class="fa-solid fa-square-arrow-up-right apply-btn__icon"></i></a>

<section class="job-info">
    <div class="job-info__left">
        <div class="job-info__badge">${jobItem.badgeLetters}</div>
        <div class="job-info__below-badge">
            <time class="job-info__time">${jobItem.daysAgo}</time>
            <button class="job-info__bookmark-btn">
                <i class="fa-solid fa-bookmark job-info__bookmark-icon"></i>
            </button>
        </div>
    </div>
    <div class="job-info__right">
        <h2 class="second-heading">${jobItem.title}</h2>
        <p class="job-info__company">${jobItem.company}</p>
        <p class="job-info__description">${jobItem.description}</p>
        <div class="job-info__extras">
            <p class="job-info__extra"><i class="fa-solid fa-clock job-info__extra-icon"></i>${jobItem.duration}</p>
            <p class="job-info__extra"><i class="fa-solid fa-money-bill job-info__extra-icon"></i>${jobItem.salary}</p>
            <p class="job-info__extra"><i class="fa-solid fa-location-dot job-info__extra-icon"></i>${jobItem.location}</p>
        </div>
    </div>
</section>

<div class="job-details__other">
    <section class="qualifications">
        <div class="qualifications__left">
            <h4 class="fourth-heading">Qualifications</h4>
            <p class="qualifications__sub-text">Other qualifications may apply</p>
        </div>
        <ul class="qualifications__list">
        ${jobItem.qualifications.map((qu) => `<li class="qualifications__item">${qu}</li>`).join("")}
        </ul>
    </section>

    <section class="reviews">
        <div class="reviews__left">
            <h4 class="fourth-heading">Company reviews</h4>
            <p class="reviews__sub-text">Recent things people are saying</p>
        </div>
        <ul class="reviews__list">
          ${jobItem.qualifications.map((re) => `<li class="reviews__item">${re}</li>`).join("")}
            
        </ul>
    </section>
</div>

<footer class="job-details__footer">
    <p class="job-details__footer-text">If possible, please reference that you found the job on <span class="u-bold">rmtDev</span>, we would really appreciate it!</p>
</footer>
        `;
  jobDetailsContentEl.innerHTML = detail;
};

jobListSearchEl.addEventListener("click", clickHandler);
jobListBookmarksEl.addEventListener("click", clickHandler);

export default renderJobList;
