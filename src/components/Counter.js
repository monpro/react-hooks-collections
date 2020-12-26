import React, { useState } from 'react'
import usePrevious from '../customhooks/UsePrevious'

const Counter = () => {
  const [count, setCount] = useState(0)
  const prevCount = usePrevious(count)

  return (
    <div>
      <h1>
        Now: {count}, before: {prevCount}
      </h1>
      <button onClick={() => setCount((count) => count + 1)}>add</button>
    </div>
  )
}

export default Counter
