import React, { useEffect, useState } from 'react'

const useScript = (src) => {
  const [status, setStatus] = useState(src ? 'loading' : 'idle')

  useEffect(() => {
    if (!src) {
      setStatus('idle')
      return
    }

    // to check whether this script has been added
    let script = document.querySelector(`scripts[src='${src}']`)

    if (!script) {
      script = document.createElement('script')
      script.src = src
      script.async = true
      script.setAttribute('data-status', 'loading')

      document.body.appendChild(script)

      // store status in attribute on script
      const setAttributeFromEvent = (event) => {
        script.setAttribute(
          'data-status',
          event.type === 'load' ? 'ready' : 'error'
        )
      }
      script.addEventListener('load', setAttributeFromEvent)
      script.addEventListener('error', setAttributeFromEvent)
    } else {
      setStatus(script.getAttribute('data-status'))
    }

    const setStateFromEvent = (event) => {
      setStatus(event.type === 'load' ? 'ready' : 'error')
    }
    script.addEventListener('load', setStateFromEvent)
    script.addEventListener('error', setStateFromEvent)

    return () => {
      if (script) {
        script.removeEventListener('load', setStateFromEvent)
        script.removeEventListener('error', setStateFromEvent)
      }
    }
  }, [src])
  return status
}

const Test = () => {
  const status = useScript(
    'https://pm28k14qlj.codesandbox.io/test-external-script.js'
  )
  return <div>{status}</div>
}

export default Test
