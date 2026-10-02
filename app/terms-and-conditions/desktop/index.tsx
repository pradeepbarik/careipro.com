import TermsAndConditionsContent from "../content";
const TermAndConditionsDesktop = async ({ state, city }: { state: string, city: string }) => {
    return (
        <>
            <div className="min-h-screen bg-gray-100">
                <main className="max-w-7xl mx-auto px-4 py-6">
                    <h1 className="text-3xl font-bold mb-4">Terms and Conditions</h1>
                    <TermsAndConditionsContent />
                </main>
            </div>
        </>
    )
}
export default TermAndConditionsDesktop;