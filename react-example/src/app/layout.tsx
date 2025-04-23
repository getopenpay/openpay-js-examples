import { FC } from 'react';
import './globals.css';
import Script from 'next/script';

interface RootLayoutProps {
  children: React.ReactNode;
}

const RootLayout: FC<RootLayoutProps> = ({ children }) => {
  return (
    <html lang="en">
      <head>
        <title>OpenPay React Example</title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link rel="stylesheet" href="https://checkoutshopper-test.cdn.adyen.com/checkoutshopper/sdk/6.9.0/adyen.css" crossOrigin="anonymous" integrity="sha384-Qy8fmdXhmf9H2Pgbmr7b0UkpeSvi7n3RFhpoZXYQPGpKIn9SH+0fT4905fsSA8Am" />

        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap" rel="stylesheet"></link>
      </head>
      <body>
        {children}

        <Script src="https://js.stripe.com/v3/" />
        <Script src="https://checkoutshopper-test.cdn.adyen.com/checkoutshopper/sdk/6.9.0/adyen.js" crossOrigin="anonymous" async={true} integrity="sha384-VB3SxkD+sTFJL36cbTToRDKrdvAJWmdf7t42zY4Z7wU9BdqvRjNtAof2qTQjPa/n" />
      </body>
    </html>
  );
};

export default RootLayout;
