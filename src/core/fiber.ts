
interface IdleDeadline {
  timeRemaining(): DOMHighResTimeStamp;
  readonly didTimeout: boolean;
}

interface Fiber {
  dom: HTMLElement;
  props: any;
  type: keyof HTMLElementTagNameMap | 'TEXT';
}

let nextUnitOfWork: Fiber = null;

const workLoop = (task: IdleDeadline) => {
  while (nextUnitOfWork && task.timeRemaining() > 1) {
    nextUnitOfWork = performUnitWork(nextUnitOfWork)
  }
  window.requestIdleCallback(workLoop)
};


const performUnitWork = (fiber: Fiber): Fiber => {
  if (!fiber.dom) {
    fiber.dom = createDom(fiber)
  }
  return null
};

const createDom = (vDom: Fiber) => {
  let dom: any;

  if (vDom.type === 'TEXT') {
    dom = document.createTextNode(vDom.props.nodeValue)
  } else {
    dom = document.createElement(vDom.type)
  }

  if(vDom.props) {
    Object.keys(vDom.props)
      .filter(key => key !== 'children')
      .forEach(item => {
        if (item.indexOf('on') == 0) {
          dom.addEventListener(item.substr(2).toLowerCase(), vDom.props[item], false)
        } else {
          dom[item] = vDom.props[item];
        }
      })
  }
  return dom;
};
