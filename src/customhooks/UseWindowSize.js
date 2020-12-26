import React, { useState, useEffect } from 'react'

const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState({
    width: null,
    height: null,
  })

  useEffect(() => {
    const handleResize = () =>
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      })

    window.addEventListener('resize', handleResize)
    handleResize()
    return () => window.removeEventListener('resize', handleResize)
  }, [])
  return windowSize
}

const Test = () => {
  const windowSize = useWindowSize()
  console.log(windowSize)
  return (
    <div>
      {windowSize.width}px
      {windowSize.height}px
    </div>
  )
}

export default Test
