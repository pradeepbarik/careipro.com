import { ReactNode } from "react";

const SectionHeading = ({ heading, className = "",children }: { heading: string, className?: string,children?:ReactNode }) => {
    return <h2 className={`fs-17 font-semibold px-2 py-2 flex items-center section-heading ${className}`}>
        {heading}
        {children}
    </h2>
}
export const SectionSubHeading = ({ heading, className = "",children }: { heading: string, className?: string,children?:ReactNode }) => {
    return <h3 className={`fs-16 font-semibold py-2 flex items-center section-heading ${className}`}>
        {heading}
        {children}
    </h3>
}
export default SectionHeading;