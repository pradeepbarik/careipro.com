import Link from 'next/link';
import { TbStethoscope, TbPills, TbFlask2, TbVideo, TbBuildingHospital, TbHomeHeart } from 'react-icons/tb';
import { alllCategoriesPageLink } from '@/lib/helper/link';

// Hardcoded, same reasoning as the hero's quickActions tiles: the real API's
// `verticals` field is CMS-driven and there's no guarantee it returns these
// exact 6 categories/icons/order, so this mirrors desktop's QuickServices
// pattern (city-home.desktop.tsx) instead of reshaping unpredictable data.
const QuickServices = ({ state, city }: { state: string, city: string }) => {
    const services = [
        { label: 'Find Doctors', icon: TbStethoscope, href: `/${state}/${city}/best-doctors` },
        { label: 'Order Medicine', icon: TbPills, href: '/medicine' },
        { label: 'Lab Tests', icon: TbFlask2, href: `/${state}/${city}/best-doctors` },
        { label: 'Video Consult', icon: TbVideo, href: `/${state}/${city}/best-doctors` },
        { label: 'Clinics & Hospitals', icon: TbBuildingHospital, href: `/${state}/${city}/hospitals-and-clinics` },
        { label: 'Home Healthcare', icon: TbHomeHeart, href: '/hire-assistant' },
    ];
    return (
        <div className="px-2">
            <div className="flex items-center justify-between mb-3">
                <h2 className="font-semibold fs-16">Quick Services</h2>
                <Link href={alllCategoriesPageLink(state, city)} className="fs-13 color-primary">View All</Link>
            </div>
            <div className="grid grid-cols-6 gap-2">
                {services.map((service) => (
                    <Link key={service.label} href={service.href} className="border border-color-grey rounded-xl flex flex-col items-center gap-1.5 px-1.5 py-3">
                        <service.icon className="color-primary text-xl" />
                        <span className="text-center leading-tight" style={{ fontSize: '0.65rem' }}>{service.label}</span>
                    </Link>
                ))}
            </div>
        </div>
    )
}
export default QuickServices;
