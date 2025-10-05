import dynamic from "next/dynamic";
import useDeviceInfo from "@/lib/hooks/useDeviceInfo";
const ArticlesMobile = dynamic(() => import("./mobile"));
const ArticlesHome = () => {
    const { device } = useDeviceInfo();
    if (device.type === "mobile") {
        return <ArticlesMobile />
    }
    return <div>Articles Home</div>
}
export default ArticlesHome;