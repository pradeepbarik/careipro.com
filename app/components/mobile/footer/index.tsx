import { ReactNode } from "react";

const Footer = ({ children }: { children: ReactNode }) => {
    return (
        <footer>
            {children}
        </footer>
    )
}
export default Footer;