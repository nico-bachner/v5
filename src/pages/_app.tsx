import '../styles/globals.css'

import Script from 'next/script'
import Inspect from 'inspx'
import { ThemeProvider } from 'next-themes'
import { Nav } from 'components/Nav'
import { CommandMenu } from 'components/CommandMenu/CommandMenu'

import type { AppProps } from 'next/app'

const App: React.VFC<AppProps> = ({ Component, pageProps }) => {
  return (
    <Inspect>
      <ThemeProvider attribute="class">
        {process.env.VERCEL_ENV == 'production' ? (
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
