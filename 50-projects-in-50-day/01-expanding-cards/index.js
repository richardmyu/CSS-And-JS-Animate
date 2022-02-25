// const panels = document.querySelectorAll('.panel')

// panels.forEach(panel => {
//   panel.addEventListener('click', () => {
//     removeActiveClasses()
//     panel.classList.add('active')
//   })
// })

// function removeActiveClasses() {
//   panels.forEach(panel => {
//     panel.classList.remove('active')
//   })
// }

/**
 * 1.将监听对象提升至父级元素，以减少内存开销；
 * 2.添加已展开图片再次点击的处理事件（即，点击图片，未展开则展开，其他不展开；若当前图片已展开，则移除展开状态，呈现均分状态，故而将初始状态也设为均分状态）；
 */
const container = document.getElementsByClassName('container')[0];
const panels = [...container.getElementsByClassName('panel')];

container.addEventListener('click', (e) => {
  if (e.target.classList.contains('panel')) {
    if (e.target.classList.contains('active')) {
      e.target.classList.remove('active');
    } else {
      panels.forEach(panel => {
        panel.classList.remove('active');
      });
      e.target.classList.add('active');
    }
  }
})
