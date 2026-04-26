'use client';
import { TclinicDetail } from "@/lib/hooks/useClinics";
import { clinicBannerImage } from "@/lib/image";
import { useState } from "react";
import { AiFillHeart } from "react-icons/ai";
import { BiShare } from "react-icons/bi";
import { MdLocalPharmacy } from "react-icons/md";

// Store Image Banner Section
const StoreImageBannerSection = ({ banners, store_name }: { banners: TclinicDetail["banners"], store_name: string }) => {
    const [activeBanner, setActiveBanner] = useState(banners[0]||{ image: '', device_type: '', redirection_url: '', banner_description: '', upload_time: '' });
    if(banners.length===0){
        return (
            <>
            <div className="bg-white py-4">
                {/* Main Banner */}
                <div className="px-4 mb-3">
                    <div className="w-full h-48 rounded-xl overflow-hidden bg-gradient-to-br from-orange-100 to-amber-100 flex items-center justify-center relative">
                        <div className="flex flex-col items-center gap-2">
                            <MdLocalPharmacy className="text-6xl text-orange-400 opacity-30" />
                            <span className="text-sm text-gray-500">No Banner Available</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="px-4">
                 <div className="flex gap-2 overflow-x-auto pb-2">
                    {[1,2,3].map((banner, index) => (
                        <div 
                            key={index} 
                            className="flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden bg-gradient-to-br from-orange-50 to-amber-50 flex items-center justify-center cursor-pointer hover:ring-2 ring-orange-400 transition-all border border-orange-100"
                        >
                            <MdLocalPharmacy className="text-2xl text-orange-300" />
                        </div>
                    ))}
                 </div>
            </div>
            </>
        )
    }
    return (
        <div className="bg-white py-4">
            {/* Main Banner */}
            <div className="px-4 mb-3">
                <div className="w-full h-48 rounded-xl overflow-hidden bg-gradient-to-br from-orange-100 to-amber-100 flex items-center justify-center relative">
                    {activeBanner.image ? (
                        <img src={clinicBannerImage(activeBanner.image)} alt={store_name + " - " + (activeBanner.banner_description || "Store Banner")} className="w-full h-full object-cover" />
                    ) : (
                        <div className="flex flex-col items-center gap-2">
                            <MdLocalPharmacy className="text-6xl text-orange-400 opacity-30" />
                            <span className="text-sm text-gray-500">No Banner Available</span>
                        </div>
                    )}
                    <button className="absolute top-3 right-3 bg-white rounded-full p-2.5 shadow-lg hover:shadow-xl transition-shadow">
                        <BiShare className="text-lg text-orange-600" />
                    </button>
                    <button className="absolute bottom-3 right-3 bg-white rounded-full p-2.5 shadow-lg hover:shadow-xl transition-shadow">
                        <AiFillHeart className="text-lg text-red-500" />
                    </button>
                </div>
            </div>

            {/* Image Gallery Thumbnails */}
            <div className="px-4">
                <div className="flex gap-2 overflow-x-auto pb-2">
                    {banners.map((banner, index) => (
                        <div 
                            key={index} 
                            className="flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden bg-gradient-to-br from-orange-50 to-amber-50 flex items-center justify-center cursor-pointer hover:ring-2 ring-orange-400 transition-all border border-orange-100"
                            onClick={() => setActiveBanner(banner)}
                            style={{background:`url(${clinicBannerImage(banner.image)}) center/cover no-repeat`}}
                        >
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
export default StoreImageBannerSection;