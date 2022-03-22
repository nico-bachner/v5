import { useState, useLayoutEffect } from 'react'

export const useScrollPosition = () => {
  const [position, setScrollPosition] = useState<{ x: number; y: number }>({
    x: typeof window != 'undefined' ? window.pageXOffset : 0,
    y: typeof window != 'undefined' ? window.pageYOffset : 0,
  })

  const [request, setRequest] = useState<number | null>(null)

  useLayoutEffect(() => {
    const handleScroll = () => {
      if (!request) {
        setRequest(
          window.requestAnimationFrame(() => {
            setScrollPosition({
              x: window.pageXOffset,
              y: window.pageYOffset,
            })

            setRequest(null)
          })
        )
      }
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [request])

  return position
}
