import { removeClasses } from "../_functions";

const tabBtns = document.querySelectorAll(".events-btn");
const tabs = document.querySelectorAll(".tab-item");

// Управление состоянием табов в разделе "События"
tabBtns.forEach((btn, i) => {
  btn.addEventListener("click", () => {
    if (!btn.classList.contains("_active")) {
      removeClasses(tabBtns, "_active");
      removeClasses(tabs, "_active");
      btn.classList.add("_active");
      const currentTabs = document.querySelectorAll(
        `.tab-item[data-list="${i + 1}"]`
      );
      //   currentTab.classList.add("_active");

      currentTabs?.forEach((item) => item.classList.add("_active"));
    }
  });
});
