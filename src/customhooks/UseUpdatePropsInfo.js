import { useState, useEffect, useRef } from 'react';
import * as React from "react";

const useUpdatePropsInfo = (name, props) => {

  const previousProps = useRef();
  useEffect(() => {
    if(previousProps.current) {
      const keys = Object.keys({...previousProps.current, ...props});
      const updatedProps = {};

      keys.forEach(key => {
        if(previousProps.current[key] !== props[key]) {
          updatedProps[key] = {
            origin: previousProps.current[key],
            changedTo: props[key]
          }
        }
      });
      console.log(updatedProps);
      if(Object.keys(updatedProps).length !== 0) {
        console.log('[updated-info]', name, updatedProps)
      }
    }
    previousProps.current = props;
  });
};

/**
 *  This example is used to illustrate the func of useUpdatePropsInfo hooks
 *
 *

const Counter = React.memo(props => {
  // so we put useUpdateInfo here
  // to know which props has changed through console!
  useUpdatePropsInfo('Counter', props);
  return <div style={props.style}>{props.count}</div>;
});

function TestUseUpdatePropsInfo() {
  const [count, setCount] = useState(0);

  // every time the count is changed
  // this object will rerender
  const redundantStyle = {
    fontSize: '12rem',
    color: 'blue'
  };

  return (
    <div>
      <div className="counter">
        <Counter count={count} style={redundantStyle} />
        <button onClick={() => setCount(count + 1)}>Increment</button>
      </div>
    </div>
  );
}

export default TestUseUpdatePropsInfo;
**/
