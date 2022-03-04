const animateBox = document.getElementsByClassName('animate')[0];
const syntxBox = document.getElementsByClassName('syntx_content')[0];
const btns = document.getElementsByClassName('btns')[0];

// 全局创建 style，作为动画容器，
// 每次创建动画，更新 style 内容即可
const style = document.createElement("style");
style.textContent = '';
document.getElementsByTagName("head")[0].appendChild(style);

/**********************************
 *         动画，样式              *
 **********************************/

// 创建 动画单元 和 语法单元 元素
const createEle = function () {
  let num = Math.floor(Math.random() * 10);
  const animateItem = document.createElement('li');
  animateItem.className = 'animate_item';
  animateItem.innerText = '' + num;

  const syntxItem = document.createElement('code');
  syntxItem.innerText = 'queue.enqueue(' + num + ')';

  activatedAnima(animateItem, syntxItem);

  return [animateItem, syntxItem];
}

const activatedAnima = function (animateItem, syntxItem) {
  // aniamte-item 进入动画
  animateItem.style.animation = 'anima-in 2s ease-out';
  let aniKeyframes = `@keyframes ${'anima-in'}{
    from { transform: translate(0, -${360 - animateQueue.size() * 40}px); }
    to { transform: translate(0, 0); } }`;

  // syntx-item 进入动画
  syntxItem.style.animation = 'syntx-show 2s ease-out';
  let asybKeyframes = `@keyframes ${'syntx-show'}{
    from { opacity: 0; }
    to { opacity: 1; } }`;

  style.textContent = aniKeyframes + asybKeyframes;
}

const unactivetedAnima = function (animateItem, syntxItem) {
  // aniamte-item 离开动画
  animateItem.style.animation = 'anima-out 1s ease-in';
  let aniKeyframes = `@keyframes ${'anima-out'}{
    from { transform: translate(0, 0); }
    to { transform: translate(0, ${animateQueue.size() * 40}px); } }`;

  // syntx-item 离开动画
  syntxItem.style.animation = 'syntx-hidden 1s ease-in';
  let asybKeyframes = `@keyframes ${'syntx-hidden'}{
    from { opacity: 1; }
    to { opacity: 0; } }`;

  style.textContent = aniKeyframes + asybKeyframes;
}


/**********************************
 *           事件                 *
 **********************************/
const Queue = (function () {
  const items = new WeakMap();

  class Queue {
    constructor() {
      items.set(this, []);
    }

    enqueue(ele) {
      let q = items.get(this);
      q.push(ele);
    }

    dequeue() {
      let q = items.get(this);
      return q.shift();
    }

    front() {
      let q = items.get(this);
      return q[0] ? q[0].innerText : null;
    }

    isEmpty() {
      let q = items.get(this);
      return q.length === 0;
    }

    size() {
      let q = items.get(this);
      return q.length;
    }

    clear() {
      items.set(this, []);
    }

    print() {
      let q = items.get(this);
      let str = '';
      q.forEach(item => str += item.innerText + '\n');
      alert(str || null);
    }
  }

  return Queue;
})();


let animateQueue = new Queue();
let syntxQueue = new Queue();

const eventEnqueue = function () {
  console.log('-- enqueue --');
  let size = animateQueue.size();
  if (size > 7) {
    alert('队列已满, 若要继续添加, 请先清空');
    return;
  }

  let [ani, syn] = createEle();
  animateQueue.enqueue(ani);
  syntxQueue.enqueue(syn);

  // 视图更新
  animateBox.appendChild(ani);
  syntxBox.appendChild(syn)
}

const eventDequeue = function () {
  console.log('-- dequeue --');
  let size = animateQueue.size();
  if (size === 0) {
    alert('栈内没有元素');
    return;
  }

  let animateItem = animateQueue.dequeue();
  let syntxItem = syntxQueue.dequeue();

  // 先处理动画
  unactivetedAnima(animateItem, syntxItem);

  let timer = setTimeout(() => {
    // 再视图更新
    animateBox.removeChild(animateItem);
    syntxBox.removeChild(syntxItem);
    clearTimeout(timer);
  }, 1000);
}

const eventFront = function () {
  console.log('-- front --');
  alert(animateQueue.front() || null);
}

const eventIsEmpty = function () {
  console.log('-- isEmpty --');
  alert(animateQueue.isEmpty());
}

const eventSize = function () {
  console.log('-- size --');
  alert(animateQueue.size());
}

const eventClear = function () {
  console.log('-- clear --');
  animateQueue.clear();
  syntxQueue.clear();

  let oldAnimateList = animateBox.children;
  [...oldAnimateList].forEach(item => animateBox.removeChild(item));

  let oldSyntxList = syntxBox.children;
  [...oldSyntxList].forEach(item => syntxBox.removeChild(item));
}

const eventPrint = function () {
  console.log('-- print --');
  animateQueue.print();
}

const eventObj = {
  'enqueue': eventEnqueue,
  'dequeue': eventDequeue,
  'front': eventFront,
  'isEmpty': eventIsEmpty,
  'size': eventSize,
  'clear': eventClear,
  'print': eventPrint,
  'list': ['enqueue', 'dequeue', 'front', 'isEmpty', 'size', 'clear', 'print'],
  'has': function (s) {
    return eventObj.list.includes(s);
  }
}

btns.addEventListener('click', (e) => {
  if (eventObj.has(e.target.className)) {
    eventObj[e.target.className]();
  }
})
