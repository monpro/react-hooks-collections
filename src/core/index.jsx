// simplify version of createElement

import React from 'react'
import { render } from './fiber'
function createElement(type, props, ...children) {
  return {
    type,
    props: {
      ...props,
      children,
    },
  }
}

const App = (
  <div>
    <h1 id="title">text h1</h1>
    <h2>
      text h2
      <h3>
        text h3
        <h4>text h4</h4>
      </h3>
    </h2>
  </div>
)

render(App, document.getElementById('container'))
