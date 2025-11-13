const watchHistory = [
  { userId: 1, videoId: "A1", duration: 10 },
  { userId: 2, videoId: "B1", duration: 15 },
  { userId: 1, videoId: "A1", duration: 20 },
  { userId: 3, videoId: "C1", duration: 30 },
  { userId: 2, videoId: "B1", duration: 5 },
  { userId: 1, videoId: "A2", duration: 25 },
  { userId: 3, videoId: "C1", duration: 15 },
];
// Tính tổng thời gian xem của từng video.
const result = watchHistory.reduce((acc, item) => {
    if (!acc[item.videoId]) {
        acc[item.videoId] = {video: item.videoId, duration: item.duration}
    }else {
        acc[item.videoId].duration += item.duration;
    }

    return acc;

}, {});
const resultA = Object.values(result)
console.log(resultA);


// Tìm video được xem nhiều nhất (dựa trên tổng thời gian).
const sum = resultA.reduce((acc, index) => {
    return index.duration > acc.duration ? index : acc;
});
console.log("Video được xem nhiều nhất là: ", sum);

// Nhóm lịch sử xem theo userId, trong đó mỗi userId sẽ chứa danh sách các video mà họ đã xem và tổng thời gian xem mỗi video.
const resultC = watchHistory.reduce((acc, index) => {
    if (!acc[index.userId]) {
        acc[index.userId] = {userId: index.userId, videoId: index.videoId, total: index.duration }
    }else {
        acc[index.userId].total += index.duration;
    }
    return acc;
}, {});
const a = Object.values(resultC);
console.log(a);
