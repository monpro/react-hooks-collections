// simplify version of createElement

// function createElement<K extends keyof HTMLElementTagNameMap>(type: K, props: React.HTMLProps<K>, ...children: React.ReactElement[]) {
//   return {
//     type,
//     props: {
//       ...props,
//       children
//     }
//   }
// }
//

import React from 'react';
function createElement(type, props, ...children) {
  return {
    type,
    props: {
      ...props,
      children
    }
  }
}

function render(vDom, container) {
  let dom;
  if (typeof vDom !== 'object') {
    dom = document.createTextNode(vDom)
  } else {
    dom = document.createElement(vDom.type)
  }
  if (vDom.props) {
    Object.keys(vDom.props)
      .filter(key => key !== 'children')
      .forEach(item => {
        dom[item] = vDom.props[item]
      })
  }

  if (vDom.props && vDom.props.children) {
    if (typeof vDom.props.children === 'object') {
      vDom.props.children.forEach(child => render(child, dom))
    } else {
      render(vDom.props.children, dom)
    }
  }
  container.appendChild(dom);
  console.log(container)
}

const App = (
  <div>
    <h1 id="title">
      text h1
    </h1>
    <h2>
      text h2
      <h3>
        text h3
        <h4>
          text h4
        </h4>
      </h3>
    </h2>
  </div>
);

render(App,
  document.getElementById('container')
);
