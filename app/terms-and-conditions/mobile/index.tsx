import Header from "@/app/components/mobile/header";
import TermsAndConditionsContent from "../content";
const TermAndConditionsMobile = async () => {
    return (
        <>
            <Header template="SUBPAGE" heading={`Terms and Conditions`} />
            <TermsAndConditionsContent />
        </>
    )
}
export default TermAndConditionsMobile;