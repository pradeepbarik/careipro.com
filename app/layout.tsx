import type { Metadata } from "next";
import dynamic from 'next/dynamic'
import "./globals.scss";
import StoreProvider from "./StoreProvider";
import Auth from "./components/client-components/auth";
import useDeviceInfo from "@/lib/hooks/useDeviceInfo";
const MobileLayout = dynamic(() => import('./components/mobile/layout'));
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { device } = useDeviceInfo();
  return (
    <>
      <StoreProvider>
        <html lang="en">
          <body className="theme_defult">
          {device.type === "mobile"? 
            <MobileLayout>{children}</MobileLayout>:
            <>{children}</>}
          </body>
        </html>
        <Auth />
      </StoreProvider>
    </>
  );
}
