import { useEffect, useState } from 'react'

export function useCounter() {
  const [count, setCount] = useState(0)

  useEffect(() => {
    const id = setInterval(() => setCount((count) => count + 1), 1000)
    return () => clearInterval(id)
  }, [])

  return count
}
