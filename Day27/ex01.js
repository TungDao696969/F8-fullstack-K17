function fetchUser() {
  return new Promise((resolve) => setTimeout(() => resolve("User Data"), 2000));
}
function fetchPosts() {
  return new Promise((resolve) => setTimeout(() => resolve("Post Data"), 3000));
}
function fetchComments() {
  return new Promise((resolve) =>
    setTimeout(() => resolve("Comment Data"), 1000)
  );
}

// Dùng Promise.all để lấy kết quả từ cả 3 promises.

// Tính tổng thời gian chạy của cả 3 promises.

console.time("Promise.all");

Promise.all([fetchUser(), fetchPosts(), fetchComments()]).then((data) => {
    console.log(data);
    console.timeEnd("Promise.all");
}).catch ((err) => {
  console.log(err);
})
