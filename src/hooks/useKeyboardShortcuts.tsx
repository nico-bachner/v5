import { useEffect } from 'react'

export const useKeyboardShortcuts = (
  shortcuts: { shortcut?: string; action?: () => void }[]
) => {
  useEffect(() => {
    const handleKeydown = (event: KeyboardEvent) => {
      shortcuts.forEach(({ shortcut, action }) => {
        const keys = shortcut?.split('+')

        if (
          keys &&
          event.ctrlKey == keys.includes('ctrl') &&
          event.altKey == keys.includes('alt') &&
          event.metaKey == keys.includes('cmd') &&
          event.key == keys.pop() &&
          action
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
