import Link from "next/link";
import { AiFillStar } from "react-icons/ai";
import { MdVerified } from "react-icons/md";
import { BiClinic, BiTime } from "react-icons/bi";
import { TPopularDoctor } from "@/lib/types/home-page";

/* the heading the desktop city home draws above each of its blocks. kept here rather than imported
   because that one lives inside the city home page module, which has no business being pulled into
   another page just for a heading */
const SectionHeading = ({ heading }: { heading: string }) => (
    <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-3">
            <div className="w-1 h-6 bg-primary rounded-full"></div>
            <h2 className="text-xl font-bold text-gray-800">{heading}</h2>
        </div>
    </div>
);

/* The city's pinned doctors on a wide screen.
 *
 * Lived inside the city home page until the doctors vertical wanted the same block. The list is per
 * city rather than per page, so both show it the same way rather than each growing its own version.
 */
const DesktopPopularDoctors = ({ data, heading }: { data: TPopularDoctor[], heading?: string }) => {
    return (
        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8">
            {heading && <SectionHeading heading={heading || "Top Doctors Near You"} />}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {data.slice(0, 6).map((doctor) => (
                    <Link key={doctor.id} href={doctor.seo_url} className="group flex gap-4 p-4 rounded-xl border border-gray-200 hover:border-primary hover:shadow-lg transition-all bg-white">
                        <div className="relative flex-shrink-0">
                            <img src={doctor.image} alt={doctor.name} className="w-20 h-20 rounded-lg object-cover" />
                            {doctor.rating && parseFloat(doctor.rating) > 0 && (
                                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 flex items-center gap-0.5 bg-green-600 text-white text-xs px-2 py-0.5 rounded">
                                    <span>{doctor.rating}</span>
                                    <AiFillStar className="text-[10px]" />
                                </div>
                            )}
                        </div>
                        <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-1 mb-1">
                                <h3 className="font-semibold text-gray-800 truncate group-hover:text-primary transition-colors">{doctor.name}</h3>
                                <MdVerified className="text-blue-500 flex-shrink-0" />
                            </div>
                            <p className="text-sm text-gray-500 truncate">{doctor.position}</p>
                            <p className="text-sm text-primary font-medium">{doctor.specialization}</p>
                            <div className="flex items-center gap-2 mt-2 text-xs text-gray-600">
                                <span className="flex items-center gap-1"><BiClinic className="text-gray-400" />{doctor.clinic}</span>
                            </div>
                            <div className="flex items-center gap-1 mt-1 text-xs text-green-600">
                                <BiTime /><span>Available: {doctor.availability}</span>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};
export default DesktopPopularDoctors;
