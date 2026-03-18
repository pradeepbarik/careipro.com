import { BiEnvelope, BiPhone, BiSolidMap } from "react-icons/bi";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import Link from "next/link";
import { getColorsClasses } from "../header/index";
import PrimaryLogo from "../../common/primary-logo";
// Footer
const DesktopFooter = ({ state, city, children, vertical='city-home' }: { 
    state: string, 
    city: string, 
    children?: React.ReactNode,
    vertical?: 'city-home' | 'doctors'| 'clinics' | 'physiotherapy' | 'caretaker' | 'petcare'
}) => {
    const colorsClasses = getColorsClasses(vertical || 'city-home');
    return (
        <footer className="bg-[#2d2d2d] text-white mt-8">
            {children && (
                <div className="bg-gray-100 text-gray-800 py-8">
                    <div className="max-w-7xl mx-auto px-4">{children}</div>
                </div>
            )}
            <div className="max-w-7xl mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    <div>
                        <PrimaryLogo />
                        <p className="text-gray-400 text-sm leading-relaxed mb-4">
                            Your trusted healthcare partner. Find verified doctors, clinics, and healthcare services in your city. Book appointments online and take control of your health with Careipro.
                        </p>
                        <div className="flex gap-3">
                            <a href="#" className={`w-9 h-9 bg-gray-700 ${colorsClasses.hoverBgColor} rounded-full flex items-center justify-center transition-colors`}><FaFacebookF className="text-sm" /></a>
                            <a href="#" className={`w-9 h-9 bg-gray-700 ${colorsClasses.hoverBgColor} rounded-full flex items-center justify-center transition-colors`}><FaTwitter className="text-sm" /></a>
                            <a href="#" className={`w-9 h-9 bg-gray-700 ${colorsClasses.hoverBgColor} rounded-full flex items-center justify-center transition-colors`}><FaInstagram className="text-sm" /></a>
                            <a href="#" className={`w-9 h-9 bg-gray-700 ${colorsClasses.hoverBgColor} rounded-full flex items-center justify-center transition-colors`}><FaLinkedinIn className="text-sm" /></a>
                        </div>
                    </div>
                    <div>
                        <h4 className="font-bold text-lg mb-4">Quick Links</h4>
                        <ul className="space-y-2 text-gray-400 text-sm">
                            <li><Link href="/about-us" className="hover:text-white transition-colors">About Us</Link></li>
                            <li><Link href="/contact-us" className="hover:text-white transition-colors">Contact Us</Link></li>
                            <li><Link href="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
                            <li><Link href="/terms-and-conditions" className="hover:text-white transition-colors">Terms & Conditions</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-bold text-lg mb-4">Our Services</h4>
                        <ul className="space-y-2 text-gray-400 text-sm">
                            <li><Link href={`/${state}/${city}/best-doctors`} className="hover:text-white transition-colors">Find Doctors</Link></li>
                            <li><Link href={`/${state}/${city}/hospitals-and-clinics`} className="hover:text-white transition-colors">Hospitals & Clinics</Link></li>
                            <li><Link href={`/${state}/${city}/caretakers`} className="hover:text-white transition-colors">Caretakers</Link></li>
                            <li><Link href={`/${state}/${city}/physiotherapy-centers`} className="hover:text-white transition-colors">Physiotherapy</Link></li>
                            <li><Link href={`/${state}/${city}/petcare`} className="hover:text-white transition-colors">Pet Care</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-bold text-lg mb-4">Contact Us</h4>
                        <ul className="space-y-3 text-gray-400 text-sm">
                            <li className="flex items-center gap-3"><BiPhone className={`text-lg ${colorsClasses.textColor}`} /><span>+91 98765 43210</span></li>
                            <li className="flex items-center gap-3"><BiEnvelope className={`text-lg ${colorsClasses.textColor}`} /><span>support@careipro.com</span></li>
                            <li className="flex items-start gap-3"><BiSolidMap className={`text-lg mt-0.5 ${colorsClasses.textColor}`} /><span>123 Healthcare Street, India</span></li>
                        </ul>
                    </div>
                </div>
                <hr className="border-gray-700 my-8" />
                <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-gray-500 text-sm">
                    <p>© {new Date().getFullYear()} Careipro. All rights reserved.</p>
                    <div className="flex gap-6">
                        <Link href="/privacy-policy" className="hover:text-white transition-colors">Privacy</Link>
                        <Link href="/terms-and-conditions" className="hover:text-white transition-colors">Terms</Link>
                        <Link href="/sitemap" className="hover:text-white transition-colors">Sitemap</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};
export default DesktopFooter;