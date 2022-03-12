import '../styles/globals.css'

import Inspect from 'inspx'
import { ThemeProvider } from 'next-themes'
import { Nav } from 'components/Nav'
import { CommandMenu } from 'components/CommandMenu'

import type { AppProps } from 'next/app'

const App: React.VFC<AppProps> = ({ Component, pageProps }) => {
  return (
    <Inspect>
      <ThemeProvider attribute="class">
        <Nav />
        <Component {...pageProps} />
        <CommandMenu />
      </ThemeProvider>
    </Inspect>
  )
}

export default App
