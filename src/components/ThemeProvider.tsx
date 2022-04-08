import { ThemeProvider as ColorThemeProvider } from 'next-themes'

import { useAtom } from 'jotai'
import { storedReaderMode } from 'store'

export const ThemeProvider: React.FC = ({ children }) => {
  const [readerMode] = useAtom(storedReaderMode)

  return (
    <ColorThemeProvider attribute="class">
      <div className={readerMode == 'serif' ? 'font-serif' : 'font-sans'}>
        {children}
      </div>
    </ColorThemeProvider>
  )
}
