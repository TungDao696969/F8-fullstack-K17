const posts = [
  {
    id: 1,
    title: "JavaScript cơ bản",
    tags: ["js", "basic"],
    comments: [
      { user: "An", text: "Hay quá!" },
      { user: "Bình", text: "Rất dễ hiểu" },
    ],
  },
  {
    id: 2,
    title: "Học React không khó",
    tags: ["react", "js"],
    comments: [{ user: "Chi", text: "Cảm ơn chia sẻ" }, { user: "An", text: "Rất hay" }],
  },
];
// In ra tất cả title kèm số lượng comments của từng bài viết.
for (const key in posts) {
  console.log("title: ", posts[key].title);
  console.log("comments: ", posts[key].comments);
}

// Tạo mảng mới chứa tất cả tags (không trùng lặp).
const result = posts
  .map((post) => post.tags)
  .flat()
  .filter((acc, cur, index) => index.indexOf(acc) === cur);
console.log(result);

// Tìm tất cả các bình luận của user "An".
const isPrime = posts.flatMap((index) => index.comments).filter((item) => 
    item.user === "An"
)
console.log("Tất cả bình luận của An là: ", isPrime);

