const text = document.querySelector(".text");

function view() {
  if (text.style.display === "block") {
    text.style.display = "none";
  } else {
    text.style.display = "block";
  }
}

document.onkeydown = function (event) {
  if (event.key === "Escape") {
    text.style.display = "none";
  }
};

const tabs = document.querySelectorAll(".tab_btn");
const all_content = document.querySelectorAll(".content_tab");
var line = document.querySelector(".line");
var currentButton;

tabs.forEach((tab, index) => {
  tab.addEventListener("click", (e) => {
    tabs.forEach((tab) => {
      tab.classList.remove("active");
    });

    tab.classList.add("active");

    currentButton = e.target;

    line.style.width = e.target.offsetWidth + "px";
    line.style.left = e.target.offsetLeft + "px";

    console.log(e.target.offsetWidth + "px");

    all_content.forEach((content) => {
      content.classList.remove("active");
    });
    all_content[index].classList.add("active");
  });
});

window.addEventListener("resize", () => {
  line.style.width = currentButton.offsetWidth + "px";
  line.style.left = currentButton.offsetLeft + "px";
});

const dropdownItems = document.querySelectorAll("nav ul li");

dropdownItems.forEach((item) => {
  const button = item.querySelector("img");
  const dropdownContent = item.querySelector("p");

  button.addEventListener("click", () => {
    dropdownItems.forEach((dropdown) => {
      if (dropdown !== item && dropdown.classList.contains("active")) {
        dropdown.classList.remove("active");
      }
    });

    item.classList.toggle("active");
  });
});

document.addEventListener("click", function (event) {
  const dropdownItems = document.querySelectorAll("nav ul li");
  const target = event.target;

  let insideDropdown = false;
  dropdownItems.forEach((item) => {
    if (item.contains(target)) {
      insideDropdown = true;
    }
  });

  if (!insideDropdown) {
    dropdownItems.forEach((item) => {
      item.classList.remove("active");
    });
  }
});
