import "../styles/globals.css";

import Inspect from "inspx";
import { Nav } from "components/Nav";

import type { AppProps } from "next/app";

const App: React.VFC<AppProps> = ({ Component, pageProps }) => (
  <Inspect>
    <Nav />
    <Component {...pageProps} />
  </Inspect>
);

export default App;
