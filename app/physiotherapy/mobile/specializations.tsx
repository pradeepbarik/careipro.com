import Link from 'next/link';
import { TSpecialization } from '@/lib/hooks/physiotherapy/usePhysiotherapy';
import { array_chunk } from '@/lib/helper';
import { doctorSpecialityIcon } from '@/lib/image';
const Specializations = ({ data, city, state }: { data: TSpecialization[], city: string, state: string }) => {
    let chunks = array_chunk<TSpecialization>(data, 2, [])
    return (
        <div className="flex overflow-auto gap-1 hide-scroll-bar px-2">
            {chunks.map((specializations, i) =>
                <div key={`specializations-${i}`} style={{}}>
                    {specializations.map((specialization) =>
                        <div className="my-1 bg-white" key={specialization.id}>
                            <Link title={`${specialization.name} doctors in ${city}`} href={specialization.seo_url} key={specialization.id} className={`flex gap-1 items-center border border-color-grey px-2 py-1 rounded-md h-16 bg-white`}>
                                <img src={doctorSpecialityIcon(specialization.icon)} alt={specialization.name} className="rounded-full border h-10 w-10 p-1" />
                                <span className="text-center">{specialization.name}</span>
                            </Link>
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}
export default Specializations;