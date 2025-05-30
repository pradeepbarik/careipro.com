import type { Metadata } from "next";
import dynamic from 'next/dynamic'
import "./globals.scss";
import StoreProvider from "./StoreProvider";
import GlobalComponent from "./components/client-components/global";
import useDeviceInfo from "@/lib/hooks/useDeviceInfo";
const MobileLayout = dynamic(() => import('./components/mobile/layout'));
export default function RootLayout({
  children,
  searchParams
}: Readonly<{
  children: React.ReactNode;
  searchParams:any,
}>) {
  const { device,cookies } = useDeviceInfo();
  return (
    <>
      <StoreProvider cookies={cookies}>
        <html lang="en">
          <body className="theme_defult">
          {device.type === "mobile"? 
            <MobileLayout>{children}</MobileLayout>:
            <>{children}</>}
          </body>
        </html>
        <GlobalComponent />
      </StoreProvider>
    </>
  );
}
