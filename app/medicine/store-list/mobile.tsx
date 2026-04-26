import Header from "@/app/components/mobile/header";
import Link from "next/link";
import { BiSearch, BiTime } from "react-icons/bi";
import { FaMapMarkerAlt } from "react-icons/fa";
import { MdLocalPharmacy, MdDeliveryDining, MdVerified } from "react-icons/md";
import { AiFillStar } from "react-icons/ai";
import Banner from "./banner";
import { TStoreListResponse } from "@/lib/hooks/useMedicineStore";
import { support_no } from "@/constants/site-config";
// Sample store data
const pharmacyStores = [
    { id: 1, name: 'Apollo Pharmacy', location: 'MG Road, Bangalore', distance: '0.5 km', rating: 4.9, reviews: 324, verified: true, deliveryTime: '20-30 min', isOpen: true, discount: 20 },
    { id: 2, name: 'Medplus Pharmacy', location: 'Indiranagar, Bangalore', distance: '1.2 km', rating: 4.7, reviews: 256, verified: true, deliveryTime: '30-40 min', isOpen: true, discount: 15 },
    { id: 3, name: 'Jiva Pharmacy', location: 'Koramangala, Bangalore', distance: '2.1 km', rating: 4.6, reviews: 189, verified: true, deliveryTime: '25-35 min', isOpen: false, discount: 25 },
    { id: 4, name: 'HealthPlus Pharmacy', location: 'Whitefield, Bangalore', distance: '3.5 km', rating: 4.8, reviews: 412, verified: true, deliveryTime: '35-45 min', isOpen: true, discount: 18 },
    { id: 5, name: 'MedLife Pharmacy', location: 'HSR Layout, Bangalore', distance: '1.8 km', rating: 4.5, reviews: 298, verified: false, deliveryTime: '30-40 min', isOpen: true, discount: 12 },
];

const StoreListMobilePage = ({data}: {data: TStoreListResponse}) => {

    return (
        <div className="min-h-screen bg-gray-50">
            <Header template='SUBPAGE' heading='Pharmacies Near You' />
            <Banner />
            {/* Filter Section */}
            <div className="px-2 py-4 bg-white border-b border-gray-200">
                <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
                    <button className="px-4 py-2 bg-orange-600 text-white rounded-full text-xs font-medium whitespace-nowrap">
                        All Stores
                    </button>
                    <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-xs font-medium whitespace-nowrap hover:bg-gray-200">
                        Open Now
                    </button>
                    <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-xs font-medium whitespace-nowrap hover:bg-gray-200">
                        Fast Delivery
                    </button>
                    <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-xs font-medium whitespace-nowrap hover:bg-gray-200">
                        Top Rated
                    </button>
                </div>
            </div>

            {/* Store List */}
            <div className="px-2 py-4">
                <div className="flex items-center justify-between mb-4">
                    <p className="text-sm text-gray-600">
                        <span className="font-semibold text-gray-800">{data.stores.length}</span> pharmacies found
                    </p>
                    <button className="text-xs text-orange-600 font-medium">
                        Sort by Distance
                    </button>
                </div>

                <div className="space-y-3">
                    {data.stores.map((store) => (
                        <div key={store.id} className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm hover:shadow-md transition-shadow">
                            <div className="flex gap-3 mb-3">
                                <div className="w-16 h-16 rounded-lg overflow-hidden bg-gradient-to-br from-orange-200 to-orange-400 flex-shrink-0">
                                    <div className="w-full h-full flex items-center justify-center">
                                        <MdLocalPharmacy className="text-orange-600 text-2xl" />
                                    </div>
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-start gap-1 mb-1">
                                        <h3 className="font-semibold text-gray-800 text-sm leading-tight flex-1">
                                            {store.name}
                                        </h3>
                                        {store.verified && <MdVerified className="text-orange-600 flex-shrink-0 mt-0.5" />}
                                    </div>
                                    <div className="flex items-center gap-1 text-xs text-gray-500 mb-1">
                                        <FaMapMarkerAlt className="text-orange-400 flex-shrink-0 text-xs" />
                                        <span className="truncate">{store.location},{store.locality},{store.market_name}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="flex items-center gap-0.5 bg-orange-600 text-white text-xs px-1.5 py-0.5 rounded">
                                            {store.rating} <AiFillStar />
                                        </span>
                                        <span className="text-xs text-gray-500">({store.review_cnt||2})</span>
                                        {/* <span className="text-xs text-gray-400">•</span> */}
                                        {/* <span className="text-xs font-medium text-gray-700">{store.distance}</span> */}
                                    </div>
                                </div>
                            </div>

                            {/* Discount Badge */}
                            {store.discount_msg && (
                                <div className="mb-3 px-3 py-2 bg-orange-50 border border-orange-200 rounded-lg">
                                    <p className="text-xs text-orange-700 font-medium">
                                        🎉 {store.discount_msg}
                                    </p>
                                </div>
                            )}

                            <div className="flex items-center gap-2 mb-3 text-xs text-gray-600">
                                {store.medicine_delivery_time_tag? store.medicine_delivery_time_tag.split(",").map((tag, index) => (
                                    <div key={index} className="flex items-center gap-1">
                                        <MdDeliveryDining className="text-orange-600 text-sm" />
                                        <span className="font-medium">{tag}</span>
                                    </div>
                                )): <div className="flex items-center gap-1">
                                    <MdDeliveryDining className="text-orange-600 text-sm" />
                                    <span className="font-medium">30-40 Min</span>
                                </div>}
                                {/* <span className={store.isOpen ? 'text-green-600 font-medium' : 'text-red-600 font-medium'}>
                                    {store.isOpen ? '● Open' : '● Closed'}
                                </span> */}
                            </div>

                            <div className="flex gap-2">
                                <a href="https://wa.me" className="flex-1 py-2 bg-orange-600 text-white rounded-lg text-xs font-medium hover:bg-orange-700 transition-colors text-center">
                                    Order Now
                                </a>
                                <Link href={store.dtlpg_url} className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-xs font-medium hover:bg-gray-200 transition-colors">
                                    View Details
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
export default StoreListMobilePage;