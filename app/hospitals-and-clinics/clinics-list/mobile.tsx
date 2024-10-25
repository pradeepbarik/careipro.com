import Header from '@/app/components/mobile/header';
import {TfetchClinicsListResponse} from '@/lib/hooks/useClinics';
import NIsToOneClinicsSliders from "@/app/components/mobile/clinics/vertical-slider";
const ClinicListMobile = ({params,data}:{params: any,data:TfetchClinicsListResponse}) => {
    return (
        <>
        <Header heading={data.specialist_name} template="SUBPAGE" />
        <NIsToOneClinicsSliders clinics={data.clinics} />
        </>
    )
}
export default ClinicListMobile