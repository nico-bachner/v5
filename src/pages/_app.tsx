import '../styles/globals.css'

import Inspect from 'inspx'
import { Nav } from 'components/Nav'
import { CommandMenu } from 'components/CommandMenu'

import type { AppProps } from 'next/app'

const App: React.VFC<AppProps> = ({ Component, pageProps }) => {
  return (
    <Inspect>
      <Nav />
      <Component {...pageProps} />
      <CommandMenu />
    </Inspect>
  )
}

export default App
