import useDeviceInfo from "@/lib/hooks/useDeviceInfo";
import dynamic from "next/dynamic";
const MyFavouritesPageMobile = dynamic(() => import("./mobile"));
const MyFavouritesPage = () => {
    const { device } = useDeviceInfo();
    if (device.type === "mobile") {
        return <MyFavouritesPageMobile />;
    }
    return (
        <div>
            <h1>My Favourites</h1>
            {/* Add your content here */}
        </div>
    );
};
export default MyFavouritesPage;