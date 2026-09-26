import Header from '@/app/components/mobile/header';
import { TClinicTopDoctor } from '@/lib/types/clinic';
import { TfetchClinicsListResponse } from '@/lib/hooks/useClinics';
//import NIsToOneClinicsSliders from "@/app/components/mobile/clinics/vertical-slider";
import ClinicsListV2 from "@/app/components/mobile/clinics/card-v2";
import NoResults from './no-results';
import ClientHandler from '../client-handler';
import WideAd from '@/app/components/mobile/ads-container/wide-ad';
const ClinicListMobile = ({ params, data, topDoctorsData }: { params: any, data: TfetchClinicsListResponse, topDoctorsData: { [clinic_id: string]: { total_doctor: number, topDoctors: TClinicTopDoctor[] } } }) => {
    return (
        <>
            {/* the admin can write a heading per category. nothing written falls back to the
                specialist name, which is what this page showed before the field existed */}
            <Header heading={data.h1_tag || data.specialist_name} template="SUBPAGE" showSearch={true} state={params.state} city={params.city} />
            {/* show ads here */}
            <div className=''>
                <WideAd page_type="clinic_list" category_ids={params.cat_id} city={params.city} limit={1} showPlaceholder={false} ad_selection="random" />
            </div>
            {/* an empty category is a dead end, so it asks the visitor for the business
                they came looking for instead of showing nothing */}
            {data.clinics.length > 0 ?
                <ClinicsListV2 clinics={data.clinics} cliniCTopDoctorsData={topDoctorsData} />
                :
                <NoResults specialistName={data.specialist_name} state={params.state} city={params.city}
                    catId={params.cat_id} groupCategory={params.group_cat} />
            }
            <ClientHandler />
        </>
    )
}
export default ClinicListMobile