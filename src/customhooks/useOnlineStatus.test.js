import { renderHook, act } from '@testing-library/react'
import { useOnlineStatus } from './useOnlineStatus'

describe('useOnlineStatus', () => {
  it('should return true initially', () => {
    const { result } = renderHook(() => useOnlineStatus())
    expect(result.current).toBeTruthy()
  })

  it('should update status to false when window goes offline', () => {
    const { result } = renderHook(() => useOnlineStatus())

    act(() => {
      window.dispatchEvent(new Event('offline'))
    })

    expect(result.current).toBe(false)
  })

  it('should update status to true when window goes online', () => {
    const { result } = renderHook(() => useOnlineStatus())

    // First, simulate going offline
    act(() => {
      window.dispatchEvent(new Event('offline'))
    })
    expect(result.current).toBe(false)

    // Then, simulate going back online
    act(() => {
      window.dispatchEvent(new Event('online'))
    })
    expect(result.current).toBe(true)
  })
})
