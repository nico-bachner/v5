import { useEffect } from 'react'

export const useKeyboardShortcuts = (
  shortcuts: { keys?: string; action: () => void }[]
) => {
  useEffect(() => {
    const handleKeydown = (event: KeyboardEvent) => {
      shortcuts.forEach(({ keys, action }) => {
        if (
          (event.ctrlKey || event.altKey || event.metaKey) &&
          keys?.split('')?.pop()?.toLowerCase() == event.key
        ) {
          event.preventDefault()
          action()
        }
      })
    }

    window.addEventListener('keydown', handleKeydown)

    return () => {
      window.removeEventListener('keydown', handleKeydown)
    }
  }, [shortcuts])
}
