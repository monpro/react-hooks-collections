import { useCallback, useEffect, useRef, useState } from 'react'
import React from 'react'

const defaultOptions = {
  cancelOnUnmount: true,
}

const useTimeOut = (cb, time, options = defaultOptions) => {
  const opts = { ...defaultOptions, ...(options || {}) }
  const timeOut = useRef()
  const callback = useRef(cb)

  const [isCleared, setIsCleared] = useState(false)

  const clear = useCallback(() => {
    if (timeOut.current) {
      clearTimeout(timeOut.current)
      setIsCleared(true)
    }
  }, [])

  useEffect(() => {
    if (typeof cb === 'function') {
      callback.current = cb
    }
  }, [cb])

  useEffect(() => {
    if (typeof time === 'number') {
      timeOut.current = setTimeout(() => {
        callback.current()
      }, time)
    }
    return clear
  }, [time])

  useEffect(() => {
    return () => {
      if (opts.cancelOnUnmount) {
        clear()
      }
    }
  })
  return [isCleared, clear]
}

const Test = () => {
  const [isCleared, clear] = useTimeOut(() => console.log('timeout'), 3000)
  return (
    <div>
      {isCleared}
      <button onClick={clear}>click timeout</button>
    </div>
  )
}

export default Test
