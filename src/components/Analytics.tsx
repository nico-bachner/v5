import Script from 'next/script'

export const Analytics: React.VFC = () =>
  typeof window != 'undefined' &&
  window.location.href.includes('https://nicobachner.com') ? (
    <Script src="/bee.js" data-api="/_hive" strategy="afterInteractive" />
  ) : null
