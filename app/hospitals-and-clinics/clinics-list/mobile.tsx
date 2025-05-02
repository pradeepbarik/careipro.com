import Header from '@/app/components/mobile/header';
import { TClinicTopDoctor } from '@/lib/types/clinic';
import { TfetchClinicsListResponse } from '@/lib/hooks/useClinics';
import NIsToOneClinicsSliders from "@/app/components/mobile/clinics/vertical-slider";
import ClientHandler from '../client-handler';
const ClinicListMobile = ({ params, data, topDoctorsData }: { params: any, data: TfetchClinicsListResponse, topDoctorsData: { [clinic_id: string]: { total_doctor: number, topDoctors: TClinicTopDoctor[] } } }) => {
    return (
        <>
            <Header heading={data.specialist_name} template="SUBPAGE" />
            <NIsToOneClinicsSliders clinics={data.clinics} cliniCTopDoctorsData={topDoctorsData} />
            <ClientHandler/>
        </>
    )
}
export default ClinicListMobile