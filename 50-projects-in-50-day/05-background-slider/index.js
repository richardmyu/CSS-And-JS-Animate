/**
 * 添加键盘监听
 */
const body = document.body;
const slides = document.querySelectorAll('.slide');
const leftBtn = document.getElementById('left');
const rightBtn = document.getElementById('right');

let activeSlide = 0;

const rightActive = function () {
  activeSlide++;

  if (activeSlide > slides.length - 1) {
    activeSlide = 0;
  }

  setBgToBody();
  setActiveSlide();
};

const leftActive = function () {
  activeSlide--;

  if (activeSlide < 0) {
    activeSlide = slides.length - 1;
  }

  setBgToBody();
  setActiveSlide();
}

const setBgToBody = function () {
  body.style.backgroundImage = slides[activeSlide].style.backgroundImage;
};

const setActiveSlide = function () {
  slides.forEach((slide) => slide.classList.remove('active'));
  slides[activeSlide].classList.add('active');
}

setBgToBody()

rightBtn.addEventListener('click', () => {
  rightActive();
});

leftBtn.addEventListener('click', () => {
  leftActive();
})

body.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowRight') {
    rightActive();
  } else if (e.key === 'ArrowLeft') {
    leftActive();
  }
});


