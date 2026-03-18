import Link from "next/link";
import { FaHospital, FaHandHoldingMedical, FaPaw } from "react-icons/fa";
import { MdSpa } from "react-icons/md";
// Business Types
const businessTypes = [
    { id: 'clinic',href:"/business-listing/hospital-clinic", name: 'Clinic / Hospital', icon: <FaHospital className="text-3xl" />, color: 'from-green-500 to-emerald-600', desc: 'List your clinic or hospital' },
    { id: 'caretaker', href:"/business-listing/caretaker", name: 'Caretaker', icon: <FaHandHoldingMedical className="text-3xl" />, color: 'from-purple-500 to-violet-600', desc: 'Offer caretaker services' },
    { id: 'physiotherapy', href:"/business-listing/physiotherapy", name: 'Physiotherapy', icon: <MdSpa className="text-3xl" />, color: 'from-teal-500 to-cyan-600', desc: 'Physiotherapy center listing' },
    { id: 'petcare', href:"/business-listing/petcare", name: 'Pet Care', icon: <FaPaw className="text-3xl" />, color: 'from-orange-500 to-amber-600', desc: 'Veterinary & pet services' },
];
// Business Types Section
const BusinessTypesSection = ({referer}:{referer:string}) => {
    return (
        <section className="py-16 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Choose Your Business Type</h2>
                    <p className="text-gray-600 text-lg max-w-2xl mx-auto">Select the category that best describes your healthcare business to get started</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {businessTypes.map((type) => (
                        <Link
                            key={type.id}
                            href={`${type.href}?ref=${referer}`}
                            className="group bg-white rounded-2xl p-6 border border-gray-200 hover:border-green-500 hover:shadow-xl transition-all text-center"
                        >
                            <div className={`w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br ${type.color} flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform`}>
                                {type.icon}
                            </div>
                            <h3 className="font-bold text-gray-800 mb-2">{type.name}</h3>
                            <p className="text-sm text-gray-500">{type.desc}</p>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
};
export default BusinessTypesSection;