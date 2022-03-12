import { useState, useLayoutEffect } from 'react'

export const useScrollPosition = () => {
  const [position, setScrollPosition] = useState<[number, number]>([
    typeof window != 'undefined' ? window.pageXOffset : 0,
    typeof window != 'undefined' ? window.pageYOffset : 0,
  ])

  const [request, setRequest] = useState<number | null>(null)

  useLayoutEffect(() => {
    const handleScroll = () => {
      if (!request) {
        setRequest(
          window.requestAnimationFrame(() => {
            setScrollPosition([window.pageXOffset, window.pageYOffset])

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
