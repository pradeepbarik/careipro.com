import { BiSolidMap, BiClinic } from "react-icons/bi";
import { TPopularClinic } from '@/lib/types/clinic';
import { popularClinicBanner } from '@/lib/image';
const PopularClinics = ({ clinics }: { clinics: TPopularClinic[] }) => {
    return (
        <>
            <div className='flex overflow-auto cp-section hide-scroll-bar' style={{ gap: '1%' }}>
                {clinics.map((clinic, i) => {
                    let isEven = i % 2 === 0 ? true : false;
                    return (
                        <div key={clinic.id} className={`shrink-0 py-1 px-2 shadow-md ${isEven ? 'bg-primary color-white' : 'bg-white'} border rounded-md`} style={{ width: '70%' }}>
                            <div className='font-semibold fs-17 one-line'>
                                {clinic.name}
                            </div>
                            <div className="flex items-baseline">
                                <span>
                                    <BiSolidMap className={`${isEven === true ? 'color-white' : 'color-primary'} top-1 relative`} />
                                </span>
                                <span>{clinic.locality} {clinic.market_name}, {clinic.city}</span>
                            </div>
                            <div className="flex flex-wrap gap-2 mt-2">
                                {clinic.doctor_specializations.map((spl) =>
                                    <span key={spl} className="border px-1 rounded-md">
                                        {spl}
                                    </span>
                                )}
                                {clinic.total_specialist > clinic.doctor_specializations.length &&
                                    <span className="border px-1 rounded-md">
                                        +{clinic.total_specialist - clinic.doctor_specializations.length} More
                                    </span>
                                }
                            </div>
                            <div>
                                {/* <img src={popularClinicBanner(clinic.banner)} /> */}
                            </div>
                        </div>
                    )
                }
                )}
            </div>
        </>
    )
}
export default PopularClinics;