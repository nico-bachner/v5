import '../styles/globals.css'

import Inspect from 'inspx'
import { ThemeProvider } from 'components/ThemeProvider'
import { Analytics } from 'components/Analytics'
import { Nav } from 'components/Nav'
import { CommandMenu } from 'components/CommandMenu'

import { useEffect } from 'react'
import { useAtom } from 'jotai'
import { storedLoaded } from 'store'

import type { AppProps } from 'next/app'

const App: React.VFC<AppProps> = ({ Component, pageProps }) => {
  const [loaded, setLoaded] = useAtom(storedLoaded)

  useEffect(() => {
    if (!loaded) {
      setLoaded(true)
    }
  }, [loaded, setLoaded])

  return (
    <Inspect>
      <ThemeProvider>
        <Analytics />
        <Nav />
        <Component {...pageProps} />
        <CommandMenu />
      </ThemeProvider>
    </Inspect>
  )
}

export default App
