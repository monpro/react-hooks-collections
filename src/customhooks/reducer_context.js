import React, {useContext, useReducer} from 'react';

const CountContext = React.createContext();


const CountProvider = ({children}) => {
  const contextValue = useReducer(reducer, {count: 0});
  return (
    <CountContext.Provider value={contextValue}>
      {children}
    </CountContext.Provider>
  )
};

const reducer = (state, action) => {
  switch (action.type) {
    case "INCREMENT":
      return {count: state.count + 1};
    case "DECREMENT":
      return {count: state.count - 1};
    default:
      return {count: state.count}
  }
};


const Counter = () => {
  const [countState, dispatchCount] = useContext(CountContext);
  return (
    <div>
      <span>
        Count: {countState.count}
      </span>
      <button onClick={() => dispatchCount({type: "INCREMENT"})}>increase</button>
      <button onClick={() => dispatchCount({type: "DECREMENT"})}>decrease</button>
    </div>
  )
};

const Test = () => (
  <>
    <CountProvider>
      <Counter/>
      <Counter/>
    </CountProvider>
    <CountProvider>
      <Counter/>
      <Counter/>
    </CountProvider>
  </>
);


export default Test;
