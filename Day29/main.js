const BASE_URL = "https://dummyjson.com";
const app = {
  _query: {
    order: "desc",
    limit: 10,
    page: 1,
  },
  _timeoutId: null,
  init() {
    this.getUsers();
    this.search();
    this.sort();
    this.paginate();
    this.detailBlog();
    this.deleteBlog();
    this.addBlog();
    this.updateBlog();
  },
  async getUsers() {
    try {
      //Add loading
      this.renderLoading();
      const skip = (this._query.page - 1) * this._query.limit;
      let url = `${BASE_URL}/posts?sortBy=id&order=${this._query.order}&limit=${this._query.limit}&skip=${skip}`;
      if (this._query.q) {
        url = `${BASE_URL}/posts/search?q=${this._query.q}&sortBy=id&order=${this._query.order}&limit=${this._query.limit}&skip=${skip}`;
      }
      const response = await fetch(url, {
        cache: "no-cache",
      });
      if (!response.ok) {
        throw new Error("Failed to fetch /posts");
      }
      const data = await response.json();
      const pageNumber = Math.ceil(data.total / this._query.limit);
      this.renderPosts(data.posts);
      this.renderPaginate(pageNumber);
    } catch (error) {
      //Add error
      this.renderError(error.message);
    } finally {
      //Remove loading
      this.renderLoading(false);
    }
  },
  renderPaginate(pageNumber) {
    const paginateEl = document.querySelector(".js-paginate");
    paginateEl.innerHTML = "";
    for (let page = 1; page <= pageNumber; page++) {
      const active = this._query.page === page ? "bg-green-600" : "";
      paginateEl.innerHTML += `<button class="border border-gray-300 px-4 py-2 ${active}">${page}</button>`;
    }
  },
  renderLoading(status = true) {
    const loadingEl = document.querySelector(".js-loading");
    loadingEl.innerHTML = status
      ? `<span class="block text-3xl text-center">Loading...</span>`
      : "";
  },
  renderError(message) {
    const postListEl = document.querySelector(".js-post-list");
    postListEl.innerHTML = `<span class="block text-3xl text-center">${message}</span>`;
  },
  renderPosts(posts) {
    const postListEl = document.querySelector(".js-post-list");
    postListEl.innerHTML = posts
      .map(
        (post) => `<div class="list my-3 border border-gray-300 p-5" data-id="${post.id}">
          <h2 class="post-title text-2xl font-medium mb-3">
            ${this.sanitizeText(post.title)}
          </h2>
          <p class="post-body">
            ${this.sanitizeText(post.body)}
          </p>
          <div class="flex justify-between mt-3">
            <button
              class="detail cursor-pointer border border-gray-300 py-2 px-5 hover:bg-green-600 rounded-full" data-id = "${
                post.id
              }"
            >
              Xem chi tiết
            </button>
            <div class="flex gap-2">
              <span class="update cursor-pointer" data-id = "${
                post.id
              }">Sửa</span>
              <span class="delete text-red-600 cursor-pointer" data-id = "${
                post.id
              }">Xóa</span>
            </div>
          </div>
        </div>`
      )
      .join("");
  },
  sanitizeText(text) {
    return text.replaceAll("<", "&lt;").replaceAll(">", "&gt;");
  },
  search() {
    const inputEl = document.querySelector(".js-search");
    inputEl.addEventListener("input", (e) => {
      if (this._timeoutId) {
        clearTimeout(this._timeoutId);
      }
      this._timeoutId = setTimeout(() => {
        const keyword = e.target.value;
        this._query.q = keyword;
        this._query.page = 1;
        this.getUsers();
      }, 500);
    });
  },
  debounce(callback, timeout = 500) {
    let id;
    return (...args) => {
      //args --> mảng
      if (id) {
        clearTimeout(id);
      }
      id = setTimeout(() => {
        callback.apply(null, args);
      }, timeout);
    };
  },
  sort() {
    const btnList = document.querySelectorAll(".js-sort button");
    btnList.forEach((btn) => {
      btn.addEventListener("click", () => {
        const sortValue = btn.dataset.sort;
        const btnActive = document.querySelector(".js-sort .btn-active");
        if (btnActive) {
          btnActive.classList.remove("btn-active");
        }
        btn.classList.add("btn-active");
        this._query.order = sortValue;
        this.getUsers();
      });
    });
  },
  paginate() {
    const paginateEl = document.querySelector(".js-paginate");
    paginateEl.addEventListener("click", (e) => {
      const page = +e.target.innerText;
      this._query.page = page;
      window.scroll({
        top: 0,
        behavior: "smooth",
      });
      this.getUsers();
    });
  },

  // Xem chi tiết
  detailBlog() {
    const closeEl = document.querySelector(".close");
    const modal = document.querySelector(".modal");
    const overlay = document.querySelector(".overlay");
    const modalTitle = document.querySelector(".modal-title");
    const modalBody = document.querySelector(".modal-body");

    closeEl.classList.add("hidden");

    document
      .querySelector(".js-post-list")
      .addEventListener("click", async (e) => {
        if (e.target.classList.contains("detail")) {
          const postId = e.target.dataset.id;

          closeEl.classList.remove("hidden");
          overlay.classList.remove("hidden");

          modal.classList.remove("hidden");

          modalTitle.innerText = "Loading...";
          modalBody.innerHTML = "";
          // this.renderLoading();

          try {
            const res = await fetch(`${BASE_URL}/posts/${postId}`);
            if (!res.ok) {
              throw new Error("Lỗi kết nối");
            }

            const data = await res.json();

            modalTitle.innerHTML = `
                <h2 class="text-lg font-medium">${data.title}</h2>
            `;
            modalBody.innerHTML = `
                <p class = "text-sm text-gray-700 leading-relaxed">${data.body}</p>
                <p class="text-sm">Views: ${data.views}</p>
            `;
          } catch (error) {
            this.renderError(error.message);
          } finally {
            this.renderLoading(false);
          }
        }
      });
    // Đóng modal
    function closeModal() {
      overlay.classList.add("hidden");
      closeEl.classList.add("hidden");
      modal.classList.add("hidden");
    }
    // Nhấn icon đóng modal
    closeEl.addEventListener("click", closeModal);
    // Nhấn overlay đóng modal
    overlay.addEventListener("click", closeModal);
  },

  deleteBlog() {
    document
      .querySelector(".js-post-list")
      .addEventListener("click", async (e) => {
        if (e.target.classList.contains("delete")) {
          const postId = e.target.dataset.id;
          const confirmDelete = confirm("Bạn chắc có muốn xóa");
          if (!confirmDelete) return;

          try {
            const res = await fetch(`${BASE_URL}/posts/${postId}`, {
              method: "DELETE",
            });
            if (!res.ok) {
              throw new Error("Lỗi rồi");
            }
            const list = e.target.closest(".list");
            if (list) {
              list.remove();
            }
            alert("Xóa thành công");
          } catch (error) {
            this.renderError(error.message);
            alert("Xóa thất bại");
          }
        }
      });
  },

  // Add
  addBlog() {
    const addBtn = document.querySelector(".add-blog");
    const closeEl = document.querySelector(".close");
    const modal = document.querySelector(".modal");
    const overlay = document.querySelector(".overlay");
    const modalTitle = document.querySelector(".modal-title");
    const modalBody = document.querySelector(".modal-body");

    const closeModal = () => {
      closeEl.classList.add("hidden");
      overlay.classList.add("hidden");
      modal.classList.add("hidden");
    };

    const openModal = () => {
      closeEl.classList.remove("hidden");
      overlay.classList.remove("hidden");
      modal.classList.remove("hidden");
    };

    closeEl.addEventListener("click", closeModal);
    overlay.addEventListener("click", closeModal);

    addBtn.addEventListener("click", () => {
      openModal();

      // Render Form
      modalTitle.innerHTML = `
            <h2 class="text-2xl mb-3">Thêm mới blog</h2>
            <input type="text" class="js-title border border-gray-400 p-1 w-full" placeholder="Nhập tiêu đề">
        `;

      modalBody.innerHTML = `
            <textarea class="js-content border border-gray-400 p-1 w-full mb-2" rows="4" placeholder="Nhập nội dung"></textarea>
            <button class="btn-submit border border-gray-400 p-2 bg-blue-500 text-white rounded-lg hover:bg-green-500 cursor-pointer w-full">Thêm mới</button>
        `;

      const btnSubmit = document.querySelector(".btn-submit");

      btnSubmit.addEventListener("click", async () => {
        const titleEl = document.querySelector(".js-title");
        const contentEl = document.querySelector(".js-content");

        const title = titleEl.value.trim();
        const bodyText = contentEl.value.trim();

        // Validate
        if (!title || !bodyText) {
          alert("Vui lòng nhập đầy đủ tiêu đề và nội dung!");
          return;
        }
        btnSubmit.innerText = "Đang xử lý...";
        btnSubmit.disabled = true;
        btnSubmit.classList.add("bg-gray-400");

        try {
          const res = await fetch(`${BASE_URL}/posts/add`, {
            method: "POST",
            headers: {
              "Content-type": "application/json",
            },
            body: JSON.stringify({
              title: title,
              body: bodyText,
              userId: 5, 
            }),
          });

          if (!res.ok) throw new Error(`Lỗi HTTP: ${res.status}`);

          
          const data = await res.json();
          const postListEl = document.querySelector(".js-post-list");
          postListEl.innerHTML =
            `<div class="list my-3 border border-gray-300 p-5">
              <h2 class="text-2xl font-medium mb-3">${data.title}</h2>
              <p>${data.body}</p>
              <div class="flex justify-between mt-3">
            <button
              class="detail cursor-pointer border border-gray-300 py-2 px-5 hover:bg-green-600 rounded-full" data-id = "${data.id}"
            >
              Xem chi tiết
            </button>
            <div class="flex gap-2">
              <span class="cursor-pointer" data-id = "${data.id}">Sửa</span>
              <span class="delete text-red-600 cursor-pointer" data-id = "${data.id}">Xóa</span>
            </div>
          </div>
              </div>` + postListEl.innerHTML;
          alert("Thêm mới thành công!");
          closeModal();
        } catch (error) {
          console.error(error);
          alert("Có lỗi xảy ra: " + error.message);
      
          btnSubmit.innerText = "Thêm mới";
          btnSubmit.disabled = false;
          btnSubmit.classList.remove("bg-gray-400");
        }
      });
    });
  },

  updateBlog() {
    const closeEl = document.querySelector(".close");
    const modal = document.querySelector(".modal");
    const overlay = document.querySelector(".overlay");

    const modalTitle = document.querySelector(".modal-title");
    const modalBody = document.querySelector(".modal-body");

    const closeModal = () => {
      closeEl.classList.add("hidden");
      overlay.classList.add("hidden");
      modal.classList.add("hidden");
    };

    const openModal = () => {
      closeEl.classList.remove("hidden");
      overlay.classList.remove("hidden");
      modal.classList.remove("hidden");
    };

    closeEl.addEventListener("click", closeModal);
    overlay.addEventListener("click", closeModal);

    document
      .querySelector(".js-post-list")
      .addEventListener("click", async (e) => {
        if (!e.target.classList.contains("update")) return;

        const id = e.target.dataset.id;

        // Fetch bài viết gốc
        const res = await fetch(`${BASE_URL}/posts/${id}`);
        const post = await res.json();

        modalTitle.innerHTML = `<h2 class="text-2xl mb-3">Sửa blog</h2>`;
        modalBody.innerHTML = `
          <input type="text" class="js-title border p-2 w-full mb-2" value="${post.title}">
          <textarea class="js-content border p-2 w-full mb-2" rows="4">${post.body}</textarea>
          <button class="btn-submit bg-blue-500 text-white p-2 rounded w-full cursor-pointer">Cập nhật</button>
        `;

        openModal();

        const btnSubmit = modalBody.querySelector(".btn-submit");

        btnSubmit.onclick = async () => {
          const newTitle = document.querySelector(".js-title").value.trim();
          const newBody = document.querySelector(".js-content").value.trim();

          if (!newTitle || !newBody) {
            alert("Vui lòng nhập đủ thông tin!");
            return;
          }

          btnSubmit.innerText = "Đang cập nhật...";
          btnSubmit.disabled = true;

          const res = await fetch(`${BASE_URL}/posts/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ title: newTitle, body: newBody }),
          });

          const updated = await res.json();

          // câp nhật dữ liệu vào danh sách
          const itemEl = document.querySelector(`.list[data-id="${id}"]`);
          if (itemEl) {
            itemEl.querySelector(".post-title").innerText = newTitle;
            itemEl.querySelector(".post-body").innerText = newBody;
          }
          alert("Cập nhật thành công!");
          closeModal();
        };
      });
  },
};

app.init();

//keyword -> call api -> render
//debounce -> Nhận vào 1 hàm và trả về 1 hàm
//a --> setTimeout -> id = 1
//clearTimeout(1)
//b --> setTimeout -> id = 2
//clearTimeout(2)
//c --> setTimeout -> id = 3

// const func1 = (a, b, c) => {
// }
// const dbFn = debounce(func1);
// dbFn(1,2,3) //a, b, c
//Closure

//Phân trang
// - Backend --> giới hạn (Mỗi trang 10 bản ghi)
// - BackEnd --> nhận params là page hoặc offset, skip

//1
//2
//3
//4
//5
//6
//7

//limit = 3, skip = 0 --> 1,2,3 --> page = 1
//limit = 3, skip = 3 --> 4,5,6 --> page = 2
//limit = 3, skip = 6 --> 7 --> page = 3

//Convert page -> skip
// skip = (page - 1) * limit

//Upload file
//Authentication, Authorization
