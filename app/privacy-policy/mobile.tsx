import Header from "@/app/components/mobile/header";
import PrivacyPolicyContent from "./content";
const PrivacyPolicyMobile = async () => {
    return (
        <>
            <Header template="SUBPAGE" heading={`Privacy Policy`} />
            <PrivacyPolicyContent />
        </>
    )
}
export default PrivacyPolicyMobile;