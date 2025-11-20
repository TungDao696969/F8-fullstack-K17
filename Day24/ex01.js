const inputEl = document.querySelector("input");
const btnEl = document.querySelector("button");
const taskContainer = document.querySelector(".taskContainer");
const errorEl = document.querySelector("span");

btnEl.addEventListener("click", (e) => {
  e.preventDefault();
  const inputvalue = inputEl.value.trim();

  if (!inputvalue) {
    errorEl.textContent = "Bạn chưa điền gì";
    return;
  }
  errorEl.textContent = "";

  const taskEl = document.createElement("div");
  taskEl.className =
    "taskItem mt-2 flex justify-between bg-purple-400 rounded-sm p-2 items-center p-2";

  const pEl = document.createElement("p");
  pEl.className = "text-white";
  pEl.textContent = inputvalue;

  const actions = document.createElement("div");
  const editBtn = document.createElement("i");
  editBtn.className = "fa-solid fa-pen text-white cursor-pointer update mr-2";
  const deleteBtn = document.createElement("i");
  deleteBtn.className = "fa-solid fa-trash text-white cursor-pointer delete";

  // Xóa
  deleteBtn.addEventListener("click", () => {
    taskEl.remove();
  });

  // Sửa
  editBtn.addEventListener("click", () => {
    taskEl.style.display = "none";
    pEl.style.display = "none";
    actions.style.display = "none";

    const editBox = document.createElement("div");
    editBox.className = "mt-2 flex";

    const editInput = document.createElement("input");
    editInput.className =
      "text-white bg-[#141428] p-2 border border-purple-400 rounded-l outline-none";
    editInput.value = pEl.textContent;

    const updateBtn = document.createElement("button");
    updateBtn.textContent = "Update";
    updateBtn.className = "bg-purple-500 text-white px-3 py-1 rounded-r";

    updateBtn.addEventListener("click", () => {
      pEl.textContent = editInput.value.trim() || pEl.textContent;
      pEl.style.display = "block";
      actions.style.display = "block";
      taskEl.style.display = "flex";
      editBox.remove();
    });

    editBox.appendChild(editInput);
    editBox.appendChild(updateBtn);

    taskEl.after(editBox);
    editInput.focus();
  });

  actions.appendChild(editBtn);
  actions.appendChild(deleteBtn);

  taskEl.appendChild(pEl);
  taskEl.appendChild(actions);

  taskContainer.appendChild(taskEl);

  inputEl.value = "";
});

inputEl.addEventListener("input", () => {
  errorEl.textContent = "";
});
