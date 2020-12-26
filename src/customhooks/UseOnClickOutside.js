import React, { useState, useEffect, useRef, useCallback } from 'react'

const Test = () => {
  const ref = useRef()
  const [modelOpen, setModelOpen] = useState(false)
  useOnClickOutside(
    ref,
    useCallback(() => setModelOpen(false))
  )
  return (
    <div>
      {modelOpen ? (
        <div ref={ref}>click outside of me to close</div>
      ) : (
        <button onClick={() => setModelOpen(true)}>Open Model</button>
      )}
    </div>
  )
}

const useOnClickOutside = (ref, handler) => {
  useEffect(() => {
    console.log('running')
    const listener = (event) => {
      if (!ref.current || ref.current.contains(event.target)) {
        return
      }
      handler(event)
    }
    document.addEventListener('mousedown', listener)
    document.addEventListener('touchstart', listener)

    return () => {
      document.removeEventListener('mousedown', listener)
      document.removeEventListener('touchstart', listener)
    }
  }, [ref, handler])
}

export default Test
