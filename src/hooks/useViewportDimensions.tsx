import { useState, useLayoutEffect } from 'react'

export const useViewportDimensions = () => {
  const [viewportDimensions, setViewportDimensions] = useState<
    [number, number]
  >([
    typeof window != 'undefined' ? window.innerWidth : 0,
    typeof window != 'undefined' ? window.innerHeight : 0,
  ])

  useLayoutEffect(() => {
    const handleResize = () => {
      setViewportDimensions([window.innerWidth, window.innerHeight])
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return viewportDimensions
}
