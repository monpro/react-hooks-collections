import React, { useState, useLayoutEffect } from 'react'

const useLockBodyScroll = () => {
  useLayoutEffect(() => {
    const originalStyle = window.getComputedStyle(document.body).overflow
    document.body.style.overflow = 'hidden'
    // enable scrolling when component unmount
    return () => (document.body.style.overflow = originalStyle)
  }, []) // ensures effect is only run on mount and unmount
}

const Test = () => {
  const [modelOpen, setModelOpen] = useState(false)

  return (
    <div>
      <button onClick={() => setModelOpen(true)}>Show Modal</button>
      <Content />
      {modelOpen && (
        <Model
          title="Try scrolling"
          content="actually you cannot"
          onClose={() => setModelOpen(false)}
        />
      )}
    </div>
  )
}

const Model = ({ title, content, onClose }) => {
  // lock the scroll when this component is mounting
  useLockBodyScroll()
  return (
    <div onClick={onClose}>
      <h2>{title}</h2>
      <p>{content}</p>
    </div>
  )
}

const Content = () => {
  const terms = [
    'stars',
    'birds',
    'puppy',
    'nature',
    'snow',
    'cafe',
    'hipster',
    'startup',
    'salad',
    'funny',
  ]

  const images = terms.map((term) => (
    <img src={`https://source.unsplash.com/random/800x200?${term}`} alt="" />
  ))
  return <div className="images">{images}</div>
}

export default Test
