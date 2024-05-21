import { renderHook, act } from '@testing-library/react'
import { useCounter } from './useCounter'

describe('useCounter', () => {
  beforeEach(() => {
    jest.useFakeTimers()
  })
  it('should start at 0', () => {
    const { result } = renderHook(() => useCounter())
    expect(result.current).toBe(0)
  })

  it('after 1000 mills, count value should be 1', () => {
    const { result } = renderHook(() => useCounter())
    act(() => jest.advanceTimersByTime(1000))
    expect(result.current).toBe(1)
  })

  it('after 1000 and 4000 mills, count value should be 5', () => {
    const { result } = renderHook(() => useCounter())
    act(() => jest.advanceTimersByTime(1000))
    act(() => jest.advanceTimersByTime(4000))
    expect(result.current).toBe(5)
  })
})
