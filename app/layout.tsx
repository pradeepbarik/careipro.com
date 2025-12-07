import dynamic from 'next/dynamic'
import type { Metadata } from 'next';
//import { GoogleTagManager } from '@next/third-parties/google';
import "./globals.scss";
import StoreProvider from "./StoreProvider";
import GlobalComponent from "./components/client-components/global";
import useDeviceInfo from "@/lib/hooks/useDeviceInfo";
const MobileLayout = dynamic(() => import('./components/mobile/layout'));
export const metadata: Metadata = {
  metadataBase: new URL('https://careipro.com'), // Replace with your actual domain
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { device, cookies } = useDeviceInfo();
  return (
    <>
      <StoreProvider cookies={cookies}>
        <html lang="en">
          <head>
            <meta name="google-site-verification" content="GjLSsc0BtdO76sWYmp5iWVMoxZgmpCTgth0CorCfg4k" />
          </head>
          {/* <GoogleTagManager
            gtmId="GTM-555K6X5G"
            dataLayerName="dataLayer"
          /> */}
          <body className="theme_defult">
            <noscript>
              <iframe src="https://www.googletagmanager.com/ns.html?id=GTM-555K6X5G"
                height="0" width="0" style={{ "display": "none", "visibility": "hidden" }}>

              </iframe>
            </noscript>
            {device.type === "mobile" ?
              <MobileLayout>{children}</MobileLayout> :
              <>{children}</>}
          </body>
        </html>
        <GlobalComponent />
      </StoreProvider>
    </>
  );
}
