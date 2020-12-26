import { ReactDOM, ReactElement } from 'react'

interface IdleDeadline {
  timeRemaining(): DOMHighResTimeStamp
  readonly didTimeout: boolean
}

interface Fiber {
  dom: HTMLElement
  props: any
  type?: keyof HTMLElementTagNameMap | 'TEXT'
  return?: Fiber
  children?: Fiber[]
  firstChild?: Fiber
  sibling?: Fiber
}

let nextUnitOfWork: Fiber = null
let workInProgressRoot: Fiber = null;

const workLoop = (task: IdleDeadline) => {
  while (nextUnitOfWork && task.timeRemaining() > 1) {
    nextUnitOfWork = performUnitWork(nextUnitOfWork)
  }

  // when all fiber tasks is done, run commitRoot to enable render in one shot
  if(!nextUnitOfWork && workInProgressRoot) {
    commitRoot();
  }

  window.requestIdleCallback(workLoop)
}

const commitRoot = () => {
  commitRootImpl(workInProgressRoot.firstChild)
  workInProgressRoot = null
}

const commitRootImpl = (fiber: Fiber) => {
  if (!fiber) {
    return;
  }
  const parent = fiber.return.dom
  parent.appendChild(fiber.dom)
  commitRootImpl(fiber.firstChild)
  commitRootImpl(fiber.sibling)
}

const render = (vDom: Fiber, container: HTMLElement) => {
  workInProgressRoot = {
    dom: container,
    props: {
      children: [vDom]
    }
  }
  nextUnitOfWork = workInProgressRoot

  let dom: any
  if (typeof vDom !== 'object') {
    dom = document.createTextNode(vDom)
  } else {
    dom = document.createElement(vDom.type)
  }
  if (vDom.props) {
    Object.keys(vDom.props)
      .filter((key) => key !== 'children')
      .forEach((item) => {
        dom[item] = vDom.props[item]
      })
  }
  if (vDom.props && vDom.props.children) {
    if (typeof vDom.props.children === 'object') {
      vDom.props.children.forEach((child: Fiber) => render(child, dom))
    } else {
      render(vDom.props.children, dom)
    }
  }
  container.appendChild(dom)
}
const performUnitWork = (fiber: Fiber): Fiber => {
  if (!fiber.dom) {
    fiber.dom = createDom(fiber)
  }
  if (fiber.return) {
    fiber.return.dom.appendChild(fiber.dom)
  }

  const elements = fiber.children
  let prevSibling: Fiber = null

  if (elements && elements.length > 0) {
    elements.forEach((element, index) => {
      const newFiber: Fiber = {
        type: element.type,
        props: element.props,
        return: fiber,
        dom: null,
      }

      if (index == 0) {
        fiber.firstChild = newFiber
      } else {
        prevSibling.sibling = newFiber
      }
      prevSibling = newFiber
    })
  }
  if (fiber.firstChild) {
    return fiber.firstChild
  }

  let nextFiber = fiber
  while (nextFiber) {
    if (nextFiber.sibling) {
      return nextFiber.sibling
    }
    nextFiber = nextFiber.return
  }
}

const createDom = (vDom: Fiber) => {
  let dom: any

  if (vDom.type === 'TEXT') {
    dom = document.createTextNode(vDom.props.nodeValue)
  } else {
    dom = document.createElement(vDom.type)
  }

  if (vDom.props) {
    Object.keys(vDom.props)
      .filter((key) => key !== 'children')
      .forEach((item) => {
        if (item.indexOf('on') == 0) {
          dom.addEventListener(
            item.substr(2).toLowerCase(),
            vDom.props[item],
            false
          )
        } else {
          dom[item] = vDom.props[item]
        }
      })
  }
  return dom
}

export {
  render
}
