const formEl = document.querySelectorAll("form .box");
const passwordEl = document.querySelector('input[name="Password"]');
const btnEl = document.querySelector("button");

let form = null;

formEl.forEach((item) => {
  const inputEl = item.querySelector("input");

  if (!inputEl) return;

  inputEl.addEventListener("input", () => {
    isValidInput(inputEl);
  });
});

btnEl.addEventListener("click", (e) => {
  e.preventDefault();
  let isValid = true;

  formEl.forEach((item) => {
    const inputEl = item.querySelector("input");
    if (!inputEl) return;

    form = inputEl.closest("form");
    const vaild = isValidInput(inputEl);
    if (!vaild) isValid = false;
  });

  if (isValid) {
    form.submit();
  }
});

function isValidInput(inputEl) {
  const name = inputEl.name;
  const value = inputEl.value.trim();
  const group = inputEl.closest(".box");
  const errorEl = group.querySelector(".error");
  const errMgs = group.querySelector("span");
  const completeEl = group.querySelector(".complete");
  const passwordEl = document.querySelector('input[name="Password"]');

  if (value === "") {
    errMgs.textContent = `${inputName(name)} cannot be blank`;
    showError(inputEl, errorEl, completeEl);
    return false;
  }

  if (name === "Email" && !isValidEmail(value)) {
    errMgs.textContent = "Please enter vaild address";
    showError(inputEl, errorEl, completeEl);
    return false;
  }

  if (name.toLowerCase() === "password-confirm") {
    if (value != passwordEl.value.trim()) {
      errMgs.textContent = "Password does not match";
      showError(inputEl, errorEl, completeEl);
      return false;
    }
  }
  errMgs.textContent = "";
  showComplete(inputEl, errorEl, completeEl);
  return true;
}

function showComplete(inputEl, errorEl, completeEl) {
  errorEl.classList.add("hidden");
  completeEl.classList.remove("hidden");
  inputEl.classList.remove("border-red-500");
}
function showError(inputEl, errorEl, completeEl) {
  errorEl.classList.remove("hidden");
  completeEl.classList.add("hidden");
  inputEl.classList.add("border-red-500");
}
function inputName(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
