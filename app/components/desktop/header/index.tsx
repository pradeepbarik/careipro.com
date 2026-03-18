import Link from "next/link";
import { AiFillCaretDown } from "react-icons/ai";
import { BiEnvelope, BiPhone, BiSearch, BiSolidMap, BiUser } from "react-icons/bi";
import {support_no} from "@/constants/site-config";
export const getColorsClasses = (vertical:'default'| 'city-home' | 'doctors'| 'clinics' | 'physiotherapy' | 'caretaker' | 'petcare') => {
    const classes={
        textColor: "",
        bgColor:"",
        borderColor: "",
        hoverBorderColor: "",
        hoverBgColor: "",
        textHoverColor: "",
    }
    switch (vertical) {
        case "city-home":
            classes.textColor = "text-teal-400";
            classes.bgColor = "bg-teal-500";
            classes.borderColor = "border-teal-500";
            classes.hoverBorderColor = "hover:border-teal-500";
            classes.hoverBgColor = "hover:bg-teal-600";
            classes.textHoverColor = "hover:text-teal-500";
            break;
        case 'doctors':
            classes.textColor = "text-blue-400";
            classes.bgColor = "bg-blue-500";
            classes.borderColor = "border-blue-500";
            classes.hoverBorderColor = "hover:border-blue-500";
            classes.hoverBgColor = "hover:bg-blue-600";
            classes.textHoverColor = "hover:text-blue-500";
            break;
        case "clinics":
            classes.textColor = "text-green-400";
            classes.bgColor = "bg-green-500";
            classes.borderColor = "border-green-500";
            classes.hoverBorderColor = "hover:border-green-500";
            classes.hoverBgColor = "hover:bg-green-600";
            classes.textHoverColor = "hover:text-green-500";
            break;
        case "physiotherapy":
            classes.textColor = "text-teal-400";
            classes.bgColor = "bg-teal-500";
            classes.borderColor = "border-teal-500";
            classes.hoverBorderColor = "hover:border-teal-500";
            classes.hoverBgColor = "hover:bg-teal-600";
            classes.textHoverColor = "hover:text-teal-500";
            break;
        case "caretaker":
            classes.textColor = "text-purple-400";
            classes.bgColor = "bg-purple-500";
            classes.borderColor = "border-purple-500";
            classes.hoverBorderColor = "hover:border-purple-500";
            classes.hoverBgColor = "hover:bg-purple-600";
            classes.textHoverColor = "hover:text-purple-500";
            break;
        case "petcare":
            classes.textColor = "text-orange-400";
            classes.bgColor = "bg-orange-500";
            classes.borderColor = "border-orange-500";
            classes.hoverBorderColor = "hover:border-orange-500";
            classes.hoverBgColor = "hover:bg-orange-600";
            classes.textHoverColor = "hover:text-orange-500";
            break;
        default:
            classes.textColor = "text-teal-400";
            classes.bgColor = "bg-teal-500";
            classes.borderColor = "border-teal-500";
            classes.hoverBorderColor = "hover:border-teal-500";
            classes.hoverBgColor = "hover:bg-teal-600";
            classes.textHoverColor = "hover:text-teal-500";
             break;
    }
    return classes;
};
const PageHeader = ({ state, city, vertical="default" }: { state: string, city: string, vertical?:'default'| 'city-home' | 'doctors'| 'clinics' | 'physiotherapy' | 'caretaker' | 'petcare' }) => {
    const colorsClasses = getColorsClasses(vertical);
    return (
        <>
         <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
            <div className="bg-[#2d2d2d] text-white py-2">
                <div className="max-w-7xl mx-auto px-4 flex justify-between items-center text-sm">
                    <div className="flex items-center gap-6">
                        <span className="flex items-center gap-2">
                            <BiPhone className={colorsClasses.textColor} />
                            <a href={`tel:+91${support_no}`}>+91 {support_no}</a>
                        </span>
                        <span className="flex items-center gap-2">
                            <BiEnvelope className={colorsClasses.textColor} />
                            <span>support@careipro.com</span>
                        </span>
                    </div>
                    <div className="flex items-center gap-4">
                        <Link href="/business-listing/hospital-clinic" className={`hover:${colorsClasses.textColor} transition-colors`}>List your Hospital / Clinic</Link>
                        <span>|</span>
                        <Link href="/business-listing/physiotherapy" className={`hover:${colorsClasses.textColor} transition-colors`}>Physiotherapy Center</Link>
                        <span>|</span>
                        <Link href="/business-listing/caretaker" className={`hover:${colorsClasses.textColor} transition-colors`}>Caretaker</Link>
                        <span>|</span>
                        <Link href="/business-opertunity" className={`hover:${colorsClasses.textColor} transition-colors`}>Business Opportunity</Link>
                    </div>
                </div>
            </div>
            <div className="max-w-7xl mx-auto px-4 py-3">
                <div className="flex items-center gap-6">
                    <Link href="/" className="flex-shrink-0">
                        <img src="/careipro-primary-logo.png" alt="Careipro" className="h-10" />
                    </Link>
                    <Link href="/service-available-cities" className={`flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:${colorsClasses.hoverBorderColor} transition-colors bg-gray-50`}>
                        <BiSolidMap className="text-red-500 text-lg" />
                        <span className="font-medium text-gray-700">{city || 'Select City'}</span>
                        <AiFillCaretDown className="text-gray-400 text-sm" />
                    </Link>
                    <div className="flex-1 max-w-2xl">
                        <div className={`flex border-2 ${colorsClasses.borderColor} rounded-lg overflow-hidden`}>
                            <div className="flex-1 flex items-center px-4 bg-white">
                                <BiSearch className="text-gray-400 text-xl mr-2" />
                                <input type="text" placeholder="Search clinics, hospitals..." className="w-full py-2.5 outline-none text-gray-700" />
                            </div>
                            <button className={`px-8 ${colorsClasses.bgColor} text-white font-semibold ${colorsClasses.hoverBgColor} transition-colors`}>Search</button>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <Link href="/free-listing" className={`px-4 py-2 border-2 ${colorsClasses.borderColor} ${colorsClasses.textColor} font-semibold rounded-lg ${colorsClasses.hoverBgColor} ${colorsClasses.textHoverColor} transition-all`}>Free Listing</Link>
                        <Link href="/my-profile" className={`flex items-center gap-2 px-4 py-2 ${colorsClasses.bgColor} text-white font-semibold rounded-lg ${colorsClasses.hoverBgColor} transition-colors`}>
                            <BiUser className="text-lg" />
                            <span>Login</span>
                        </Link>
                    </div>
                </div>
            </div>
        </header>
        </>
    );
}
export default PageHeader;