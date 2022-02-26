// const progress = document.getElementById('progress')
// const prev = document.getElementById('prev')
// const next = document.getElementById('next')
// const circles = document.querySelectorAll('.circle')

// let currentActive = 1

// next.addEventListener('click', () => {
//   currentActive++

//   if (currentActive > circles.length) {
//     currentActive = circles.length
//   }

//   update()
// })

// prev.addEventListener('click', () => {
//   currentActive--

//   if (currentActive < 1) {
//     currentActive = 1
//   }

//   update()
// })

// function update() {
//   circles.forEach((circle, idx) => {
//     if (idx < currentActive) {
//       circle.classList.add('active')
//     } else {
//       circle.classList.remove('active')
//     }
//   })

//   const actives = document.querySelectorAll('.active')

//   progress.style.width = (actives.length - 1) / (circles.length - 1) * 100 + '%'

//   if (currentActive === 1) {
//     prev.disabled = true
//   } else if (currentActive === circles.length) {
//     next.disabled = true
//   } else {
//     prev.disabled = false
//     next.disabled = false
//   }
// }

/**
 * 目标：移除两个 button，直接点击数字部分，进行进度条的变化；
 * 1.一次只能进一步，即，当 1 点亮的时候，只有 2 能点击；而当 2 点亮，则 1 和 3 可以点击，点击 1 表示后退一步，点击 3 表示前进一步；
 * 2.点亮数字本身不能点击；
 */

const container = document.getElementsByClassName('progress-container')[0];
const progress = document.getElementById('progress');
const circles = document.querySelectorAll('.circle');

container.addEventListener('click', (e) => {
  if (e.target.className.includes('circle') && e.target.className.includes('light')) {
    circles.forEach((item, index) => {
      if (item === e.target) {
        update_active(index);
        update_light(index);
      }
    })
  }
});

const update_active = function (n) {
  circles.forEach((item, index) => {
    index <= n ? item.classList.add('active') : item.classList.remove('active');
    progress.style.width = n / (circles.length - 1) * 100 + '%';
  })
};

const update_light = function (n) {
  circles.forEach((item, index) => {
    if (index < (n - 1)) {
      item.classList.remove('light');
    } else if (index === (n - 1)) {
      item.classList.add('light');
    } else if (index === n) {
      item.classList.remove('light');
    } else if (index === (n + 1)) {
      item.classList.add('light');
    } else {
      item.classList.remove('light');
    }
  })
};
