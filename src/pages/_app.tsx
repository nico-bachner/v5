import '../styles/globals.css'

import Script from 'next/script'
import Inspect from 'inspx'
import { ThemeProvider } from 'next-themes'
import { Nav } from 'components/Nav'
import { CommandMenu } from 'components/CommandMenu/CommandMenu'

import { useAtom } from 'jotai'
import { storedLoaded } from 'store'

import type { AppProps } from 'next/app'
import { useEffect } from 'react'

const App: React.VFC<AppProps> = ({ Component, pageProps }) => {
  const [loaded, setLoaded] = useAtom(storedLoaded)

  useEffect(() => {
    if (!loaded) {
      setLoaded(true)
    }
  }, [loaded, setLoaded])

  return (
    <Inspect>
      <ThemeProvider attribute="class">
        {typeof window != 'undefined' &&
        window.location.href.includes('https://nicobachner.com') ? (
          <Script src="/bee.js" data-api="/_hive" strategy="afterInteractive" />
        ) : null}
        <Nav />
        <Component {...pageProps} />
        <CommandMenu />
      </ThemeProvider>
    </Inspect>
  )
}

export default App
