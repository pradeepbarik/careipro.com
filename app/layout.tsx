import dynamic from 'next/dynamic'
import type { Metadata } from 'next';
import { GoogleTagManager } from '@next/third-parties/google';
import "./globals.scss";
import StoreProvider from "./StoreProvider";
import GlobalComponent from "./components/client-components/global";
import useDeviceInfo from "@/lib/hooks/useDeviceInfo";
import { userinfo, userSecreateKey } from "@/constants/storage_keys";

/* The signed in visitor's name, for the header. Both cookies have to be there: the secret key is
   what says there is a session, userinfo carries who it belongs to. It is written by the client so
   a malformed value is possible, and a broken cookie must not take the whole layout down. */
const signedInName = (cookies: Record<string, string>) => {
    if (!cookies[userSecreateKey] || !cookies[userinfo]) return "";
    try {
        const user = JSON.parse(cookies[userinfo]);
        return [user?.fn, user?.ln].filter(Boolean).join(" ").trim();
    } catch {
        return "";
    }
};
const MobileLayout = dynamic(() => import('./components/mobile/layout'));
const PageHeader = dynamic(() => import('./components/desktop/header'));
const DesktopFooter = dynamic(() => import('./components/desktop/footer'));
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
            <meta name="google-adsense-account" content="ca-pub-8566205243724241"/>
          </head>
          <GoogleTagManager
            gtmId="GTM-555K6X5G"
            dataLayerName="dataLayer"
          />
          <body className="theme_defult">
            <noscript>
              <iframe src="https://www.googletagmanager.com/ns.html?id=GTM-555K6X5G"
                height="0" width="0" style={{ "display": "none", "visibility": "hidden" }}>

              </iframe>
            </noscript>
            {/* the desktop header lives here rather than in each page so it mounts once and stays
                put across navigations, and so the route loading skeleton replaces only the page
                below it. state and city come from the cookies SetStateCity writes on a city page,
                which is the only thing a layout can read, searchParams never reach one. */}
            {device.type === "mobile" ?
              <MobileLayout>{children}</MobileLayout> :
              <>
                <PageHeader state={cookies.state || ""} city={cookies.city || ""} userName={signedInName(cookies)} />
                {children}
                {/* pages that used to wrap their own band in the footer now render that band at the
                    end of their content, the footer chrome itself only mounts here */}
                <DesktopFooter state={cookies.state || ""} city={cookies.city || ""} />
              </>}
          </body>
        </html>
        <GlobalComponent />
      </StoreProvider>
    </>
  );
}
