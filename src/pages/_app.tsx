import '../styles/globals.css'

import Inspect from 'inspx'

import type { AppProps } from 'next/app'

const App: React.VFC<AppProps> = ({ Component, pageProps }) => (
  <Inspect>
    <Component {...pageProps} />
  </Inspect>
)

export default App
