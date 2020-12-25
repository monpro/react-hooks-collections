// simplify version of createElement

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


render(App,
  document.getElementById('container')
);
