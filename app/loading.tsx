import useDeviceInfo from "@/lib/hooks/useDeviceInfo";
import PageSkeleton from "./components/mobile/page-loader";
import PageSkeletonDesktop from "./components/desktop/page-loader";

/* What fills the page area while the next route is being fetched. Reading the device here is free:
   the root layout already reads the same headers, so every route is dynamic either way. */
export default function Loading() {
  const { device } = useDeviceInfo();
  return device.type === "mobile" ? <PageSkeleton /> : <PageSkeletonDesktop />;
}
