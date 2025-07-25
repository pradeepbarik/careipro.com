import { TSectionBanner } from "@/lib/types/home-page";

const SectionBanners = ({ banners }: { banners: Array<TSectionBanner> }) => {
    return (
        <div className="flex justify-center gap-2 px-2 overflow-auto">
            {banners.map((banner, index) => (
                <img key={index} src={banner.img_url} alt={banner.alt_text} className="flex rounded-md shrink-0 basis-0" style={banner.display_style} />
            ))}
        </div>
    );
};
export default SectionBanners;