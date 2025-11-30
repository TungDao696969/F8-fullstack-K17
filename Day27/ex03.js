function retry(fn, times) {
  // Viết code ở đây
  return new Promise ((resolve, reject) => {
    function result (sum) {
        fn().then((data) => {
            resolve (data);
        }).catch ((err) => {
            if (sum === 0) {
                reject (err);
            }else {
                result (sum - 1);
            }
        });
    }
    result(times);
  });
}
let failingPromise = () => {
  return new Promise((resolve, reject) => {
    Math.random() > 0.7 ? resolve("Thành công") : reject("Thất bại");
  });
};
retry(failingPromise, 3).then(console.log).catch(console.error);

