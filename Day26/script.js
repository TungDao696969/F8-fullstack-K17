const liEl = document.querySelectorAll("ul li");
const ul = document.querySelector("ul");
const menu = document.querySelector(".btn-active");
const btnDelete = document.querySelector(".btn-delete");
const btnEdit = document.querySelector(".btn-edit");
const overlayEl = document.querySelector(".overlay");
const modelEl = document.querySelector(".model");
const inputEl = document.querySelector("input");
const btnSave = document.querySelector(".btn-save");
liEl.forEach((li) => {
  li.addEventListener("click", (e) => {
    e.stopPropagation();
    const active = ul.querySelector(".active");
    if (active) {
      active.classList.remove("active");
    }
    li.classList.add("active");
  });

  const upEl = li.querySelector(".up");
  upEl.addEventListener("click", (e) => {
    e.stopPropagation();

    // ul.prepend(li);
    const prevEl = li.previousElementSibling;
    if (!prevEl) {
      return;
    }
    ul.insertBefore(li, prevEl);
  });
  upEl.addEventListener("contextmenu", e => e.stopPropagation());

  const downEl = li.querySelector(".down");
  downEl.addEventListener("click", (e) => {
    e.stopPropagation();

    const nextItem = li.nextElementSibling;
    if (!nextItem) {
      return;
    }
    ul.insertBefore(li, nextItem.nextElementSibling);
  });
  downEl.addEventListener("contextmenu", e => e.stopPropagation());

  // Nhấn chuột phải
  li.addEventListener("contextmenu", (e) => {
    // console.log("Click right");
    e.preventDefault();
    menu.style.left = e.clientX + "px";
    menu.style.top = e.clientY + "px";
    menu.style.display = "flex";
    
    // Lấy Li hiện tại
    currentLi = li;
    // Xóa li
    btnDelete.addEventListener("click", (e) => {
      e.stopPropagation();
      li.remove();
      menu.style.display = "none";
    });

    // Sửa li
    btnEdit.addEventListener("click", (e) => {
      e.stopPropagation();
      overlayEl.style.display = "flex";
      modelEl.style.display = "flex";
      inputEl.value = currentLi.childNodes[0].textContent.trim(); // lấy text hiện tại
      menu.style.display = "none";
    });

    btnSave.addEventListener("click", (e) => {
      e.stopPropagation();
      const newName = inputEl.value.trim();
      if (newName === "") return;

      // Cập nhật text của li, giữ nguyên Up/Down
      currentLi.childNodes[0].textContent = newName + " ";

      overlayEl.style.display = "none";
      modelEl.style.display = "none";
    });
  });
});

// chặn click
menu.addEventListener("click", (e) => e.stopPropagation());
modelEl.addEventListener("click", (e) => e.stopPropagation());
inputEl.addEventListener("click", (e) => e.stopPropagation());

document.addEventListener("click", () => {
  const active = ul.querySelector(".active");
  if (active) {
    active.classList.remove("active");
  }

  menu.style.display = "none";
  overlayEl.style.display = "none";
  modelEl.style.display = "none";
});

document.addEventListener("keydown", (e) => {
  if (e.shiftKey && e.altKey) {
    const active = ul.querySelector(".active");
    if (!active) {
      return;
    }
    const cloneEl = active.cloneNode(true);
    if (e.key === "ArrowDown") {
      // console.log("Nhân bản xuống");
      cloneEl.classList.remove("active");
      ul.insertBefore(cloneEl, active.nextElementSibling);
    }
    if (e.key === "ArrowUp") {
      // console.log("Nhân bản lên");
      cloneEl.classList.remove("active");
      ul.insertBefore(cloneEl, active);
    }
  }

  if (e.key === "Escape") {
    // console.log("click esc");
    menu.style.display = "none";

    overlayEl.style.display = "none";
    modelEl.style.display = "none";
  }
});
