const trackEl = document.querySelector(".track");
const btnLeft = document.querySelector(".btn-left");
const btnRight = document.querySelector(".btn-right");
const dots = document.querySelectorAll(".list-item");

function getActiveSlide() {
  return document.querySelector(".slide.active");
}

function slideShow(activeSlide) {
  const slides = activeSlide.parentElement.children;

  let index = Array.from(slides).indexOf(activeSlide);

  trackEl.style.transform = `translateX(-${index * 100}%)`;

  dots.forEach((dot) => dot.classList.remove("active"));
  dots[index].classList.add("active");
}

slideShow(getActiveSlide());


btnRight.addEventListener("click", () => {
  let activeSlide = getActiveSlide();
  let nextSlide = activeSlide.nextElementSibling;

  if (!nextSlide) {
    nextSlide = activeSlide.parentElement.children[0];
  }

  activeSlide.classList.remove("active");
  nextSlide.classList.add("active");
  slideShow(nextSlide);
});


btnLeft.addEventListener("click", () => {
  let activeSlide = getActiveSlide();
  let prevSlide = activeSlide.previousElementSibling;

  if (!prevSlide) {
    const slides = activeSlide.parentElement.children;
    prevSlide = slides[slides.length - 1];
  }

  activeSlide.classList.remove("active");
  prevSlide.classList.add("active");
  slideShow(prevSlide);
});


dots.forEach((dot, index) => {
  dot.addEventListener("click", () => {

    const activeSlide = getActiveSlide();
    activeSlide.classList.remove("active");

    const targetSlide = trackEl.children[index];
    targetSlide.classList.add("active");
    
    slideShow(targetSlide);
  });
});
