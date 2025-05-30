import Header from '@/app/components/mobile/header';
import { TfetchDoctorsResponse } from '@/lib/hooks/useDoctors';
import NIsToOneDoctorsSliders from "../../components/mobile/doctors/vertical-slider";
import LookingFor from './mobile/looking-for';
const DoctorListMobile = async ({ params,data }: { params: any,data:TfetchDoctorsResponse }) => {
    return (
        <>
            <Header template="SUBPAGE" heading={data.specialist_name} />
            <NIsToOneDoctorsSliders data={data.doctors} showAvaileTime={true} />
            <LookingFor specialist_id={params.cat_id} />
        </>
    )
}
export default DoctorListMobile;