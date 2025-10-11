import dynamic from "next/dynamic";
import useDeviceInfo from "@/lib/hooks/useDeviceInfo";
const ArticlesMobile = dynamic(() => import("./mobile"));
import { Metadata } from "next";
export async function generateMetadata({ searchParams }: { searchParams: any }): Promise<Metadata> {
    return {
        title: `Health Articles for people of ${searchParams.city} - careipro.com`,
        description: `Read the latest health articles, tips, and advice from medical experts on careipro.com.`,
        robots: {
            index: true,
            follow: true,
            googleBot: {
                index: true,    
                follow: true,
            }
        },
        alternates:{
            canonical: `/Read-Articles-for-${searchParams.city}-in-${searchParams.state}` // Relative path will be combined with metadataBase
        }
    }
}
const ArticlesHome = () => {
    const { device } = useDeviceInfo();
    if (device.type === "mobile") {
        return <ArticlesMobile />
    }
    return <div>Articles Home</div>
}
export default ArticlesHome;