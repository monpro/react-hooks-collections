interface IdleDeadline {
  timeRemaining(): DOMHighResTimeStamp;
  readonly didTimeout: boolean;
}

interface Fiber {

}

let nextUnitOfWork: Fiber = null;

const workLoop = (task: IdleDeadline) => {
  while (nextUnitOfWork && task.timeRemaining() > 1) {
    nextUnitOfWork = performUnitWork(nextUnitOfWork)
  }
  window.requestIdleCallback(workLoop)
};


const performUnitWork = (fiber: Fiber): Fiber => {
  return null
};
