const BASE_URL = `https://dummyjson.com`;

const detail = document.querySelector(".detail");
const overlay = document.querySelector(".overlay");
const iconClose = document.querySelector(".close");
const modal = document.querySelector(".modal");
const modalTitle = document.querySelector(".modal-title");
const modalBody = document.querySelector(".modal-body");
const blogNew = document.querySelector(".blog-new");
const blogOld = document.querySelector(".blog-old");
const inputSearch = document.querySelector(".input-search");
const ulEl = document.querySelector(".list");

const renderList = (blogs) => {
  // console.log(blogs);

  ulEl.innerHTML = "";

  blogs.forEach((blog) => {
    const liEl = document.createElement("li");
    liEl.classList.add("border", "border-[#ebebeb]", "pb-2", "mb-2", "p-2");

    liEl.innerHTML = `
            <h2 class="text-lg font-medium">${blog.title}</h2>
            <p>${blog.body}</p>
            
            <div class="action flex justify-between mt-2">
            <div>
              <button class="detail border border-[#ebebeb] pl-2 pr-2 rounded-[15px] hover:bg-green-400 hover:text-white cursor-pointer" data-id="${blog.id}">Xem chi tiết</button>
            </div>
            <div class="gap-[5px]">
              <button class="cursor-pointer">Sửa</button>
              <button class="text-red-600 cursor-pointer">Xóa</button>
            </div>
          </div>
        `;
    ulEl.appendChild(liEl);
  });
};

const getListBlog = async (orderType) => {
  try {
    const res = await fetch(`${BASE_URL}/posts?sortBy=id&order=${orderType}`);
    const data = await res.json();
    renderList(data.posts);
  } catch (error) {
    console.error("Lỗi tải danh sách");
  }
};

const updateButton = (orderType) => {
  if (orderType === "desc") {
    blogNew.classList.add("active2");
    blogOld.classList.remove("active2");
  } else {
    blogOld.classList.add("active2");
    blogNew.classList.remove("active2");
  }
};
// Sự kiện sắp xếp
blogNew.addEventListener("click", () => {
  updateButton("desc");
  getListBlog("desc"); // Mới nhất: mới nhất
});

blogOld.addEventListener("click", () => {
  updateButton("asc");
  getListBlog("asc"); // Cũ nhất: nhỏ nhất
});

getListBlog("desc");

// Xem chi tiết
document.querySelector(".close").classList.add("hidden");

document.querySelector(".list").addEventListener("click", async (e) => {
  if (e.target.classList.contains("detail")) {
    const postId = e.target.dataset.id;

    iconClose.classList.remove("hidden");
    overlay.classList.remove("hidden");

    modal.classList.remove("hidden");

    modalTitle.innerText = "Loading...";
    modalBody.innerHTML = "";
    try {
      const res = await fetch(`${BASE_URL}/posts/${postId}`);
      if (!res.ok) {
        throw new Error("Lỗi kết nối");
      }

      const post = await res.json();

      modalTitle.innerHTML = `
        <h2 class="text-lg font-medium">${post.title}</h2>
      `;
      modalBody.innerHTML = `
        <p class = "text-sm text-gray-700 leading-relaxed">${post.body}</p>
        <p class="text-sm">Views: ${post.views}</p>
      `;
    } catch (error) {
      modalTitle.innerText = "Lỗi";
      modalBody.innerHTML = `<p class="text-red-500">Không thể tải nội dung bài viết này.</p>`;
    }
  }
});
// Đóng modal
function closeModal() {
  overlay.classList.add("hidden");
  iconClose.classList.add("hidden");
  modal.classList.add("hidden");
}
// Nhấn icon đóng modal
iconClose.addEventListener("click", closeModal);
// Nhấn overlay đóng modal
overlay.addEventListener("click", closeModal);

// Tìm kiếm
const searchBlog = async (keyword) => {
  try {
    ulEl.innerHTML = `<div class="text-center p-5"><i class="fa-solid fa-spinner fa-spin text-2xl"></i> Đang tìm kiếm...</div>`;

    const res = await fetch(`${BASE_URL}/posts/search?q=${keyword}`);
    const data = await res.json();

    if (data.posts.length > 0) {
      renderList(data.posts);
    } else {
      ulEl.innerHTML = `<p class="text-center text-gray-500 mt-4 mb-3">Không tìm thấy bài viết nào cho từ khóa: "<b>${keyword}</b>"</p>`;
    }
  } catch (error) {
    console.error("Lỗi tìm kiếm", error);
    ulEl.innerHTML = `<p class="text-red-500 text-center">Đã xảy ra lỗi khi tìm kiếm.</p>`;
  }
};

let searchTimeout = null;

inputSearch.addEventListener("input", (e) => {
  const keyword = e.target.value.trim();

  if (searchTimeout) {
    clearTimeout(searchTimeout);
  }

  searchTimeout = setTimeout(() => {
    if (keyword === "") {
      getListBlog("desc");
    } else {
      searchBlog(keyword);
    }
  }, 500);
});