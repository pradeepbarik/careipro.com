import Link from 'next/link';
import { FaUserMd, FaHandHoldingMedical } from 'react-icons/fa';
import { MdVerified } from 'react-icons/md';
import { BiHomeHeart, BiChevronRight } from 'react-icons/bi';

// Hardcoded for the same reason as quick-services - mirrors desktop's
// QuickServices `services` array shape (city-home.desktop.tsx) rather than
// depending on CMS data with an unknown/unmatching shape. No illustration
// assets exist in public/ for these (see top-banner's note), so these use
// react-icons in a colored circle instead of the screenshot's illustrations.
const HealthcareNeeds = ({ state, city }: { state: string, city: string }) => {
    const items = [
        { name: 'Doctors', desc: 'Find & book trusted doctors', icon: FaUserMd, bg: 'bg-blue-50', color: 'text-blue-600', href: `/${state}/${city}/best-doctors` },
        { name: 'Caretakers', desc: 'Find professional caretakers', icon: FaHandHoldingMedical, bg: 'bg-purple-50', color: 'text-purple-600', href: `/${state}/${city}/caretakers` },
        { name: 'Physiotherapy', desc: 'Home & clinic physiotherapy', icon: MdVerified, bg: 'bg-teal-50', color: 'text-teal-600', href: `/${state}/${city}/physiotherapy-centers` },
        // No dedicated "home healthcare" route exists in the app yet - closest
        // fit is hire-assistant. Ask sir if this should point somewhere else.
        { name: 'Home Healthcare', desc: 'Healthcare at your doorstep', icon: BiHomeHeart, bg: 'bg-orange-50', color: 'text-orange-600', href: '/hire-assistant' },
    ];
    return (
        <div className="bg-cyan-50 px-2 py-4">
            <div className="flex items-center justify-between mb-3 px-1">
                <h2 className="font-semibold fs-16">What healthcare do you need?</h2>
                <span className="fs-13 color-primary">View All</span>
            </div>
            <div className="grid grid-cols-4 gap-2">
                {items.map((item) => (
                    <Link key={item.name} href={item.href} className="bg-white rounded-lg p-2 flex flex-col gap-1.5">
                        <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${item.bg}`}>
                            <item.icon className={`text-base ${item.color}`} />
                        </div>
                        <div>
                            <div className="font-semibold" style={{ fontSize: '0.7rem' }}>{item.name}</div>
                            <div className="color-text-light leading-tight mt-0.5" style={{ fontSize: '0.6rem' }}>{item.desc}</div>
                        </div>
                        <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center self-start">
                            <BiChevronRight className="text-white text-sm" />
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    )
}
export default HealthcareNeeds;
