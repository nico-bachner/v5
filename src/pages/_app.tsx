import '../styles/globals.css'

import Inspect from 'inspx'
import { ThemeProvider } from 'next-themes'
import { Nav } from 'components/Nav'
import { CommandMenu } from 'components/CommandMenu'

import type { AppProps } from 'next/app'
import Script from 'next/script'

const App: React.VFC<AppProps> = ({ Component, pageProps }) => {
  return (
    <Inspect>
      <ThemeProvider attribute="class">
        <Script async data-api="/_hive" src="/bee.js" />
        <Nav />
        <Component {...pageProps} />
        <CommandMenu />
      </ThemeProvider>
    </Inspect>
  )
}

export default App
