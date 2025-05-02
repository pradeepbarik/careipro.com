import Header from "@/app/components/mobile/header";
import LeadsList from "./leads-list";
const MyleadsMobile = () => {
    return (
        <>
            <Header template='SUBPAGE' heading="My Leads" />
            <LeadsList />
        </>
    )
}
export default MyleadsMobile