import React from 'react';
import { TSectionBanner } from "@/lib/types/home-page";
import Link from "next/link";
import EnquiryBanner from "./enquiry-banner";
const SectionBanners = ({ banners }: { banners: Array<TSectionBanner> }) => {
    return (
        <>
            <div className="flex justify-center gap-2 px-2 overflow-auto">
                {banners.map((banner, index) => (
                    <div key={`banner-${index}`} style={{ ...banner.display_style }}>
                        {banner.send_enquiry ? <React.Fragment>
                            <EnquiryBanner banner={banner} />
                        </React.Fragment> : banner.redirection_url ?
                            <>
                                <Link href={banner.redirection_url} >
                                    <img key={index} src={banner.img_url} alt={banner.alt_text} className="flex rounded-md shrink-0 basis-0" style={{ height: "100%", width: "100%" }} />
                                </Link>
                            </> :
                            <img key={index} src={banner.img_url} alt={banner.alt_text} className="flex rounded-md shrink-0 basis-0" style={{ height: "100%", width: "100%" }} />
                        }
                    </div>
                ))}
            </div>

        </>
    );
};
export default SectionBanners;