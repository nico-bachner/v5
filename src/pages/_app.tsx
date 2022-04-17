import '../styles/globals.css'

import Inspect from 'inspx'
import { ThemeProvider } from 'components/ThemeProvider'
import { Analytics } from 'components/Analytics'
import { Nav } from 'components/Nav'
import { CommandMenu } from 'components/CommandMenu'

import type { AppProps } from 'next/app'

const App: React.VFC<AppProps> = ({ Component, pageProps }) => (
  <Inspect>
    <ThemeProvider>
      <Analytics />
      <Nav />
      <Component {...pageProps} />
      <CommandMenu />
    </ThemeProvider>
  </Inspect>
)

export default App
