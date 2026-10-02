import PrivacyPolicyContent from "./content";
const PrivacyPolicyDesktop = async ({ state, city }: { state: string, city: string }) => {
    return (
        <>
            <div className="min-h-screen bg-gray-100">
                <main className="max-w-7xl mx-auto px-4 py-6">
                    <h1 className="text-3xl font-bold mb-4">Privacy Policy</h1>
                    <PrivacyPolicyContent />
                </main>
            </div>
        </>
    )
}
export default PrivacyPolicyDesktop;