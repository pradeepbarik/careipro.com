'use client';
import { Metadata } from "next";

export async function generateMetadata({ searchParams }: { searchParams: any }): Promise<Metadata> {
    return {
        title: "Page visitors",
        description: "",
        robots: {
            index: false,
            follow: false,
            googleBot: {
                index: false,
                follow: false,
            }
        }
    }
}
const PageVisitorReport = () => {
    return (
        <>

        </>
    )
}
export default PageVisitorReport;