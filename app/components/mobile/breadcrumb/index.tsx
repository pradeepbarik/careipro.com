import classes from "./style.module.scss";
const BreadCrumbs = ({ data }: { data: Array<{ label: string, href?: string }> }) => {
    return (
        <nav aria-label="Breadcrumb" className="w-full px-4 py-2">
            <div className="w-full overflow-auto hide-scroll-bar">
                <ul className={classes.breadcrumb}>
                    {data.map((item, index) => (
                        <li key={index} className="whitespace-nowrap font-semibold hover:text-teal-400">
                            {item.href ? (
                                <a href={item.href} title={item.label}>{item.label}</a>
                            ) : (
                                <span>{item.label}</span>
                            )}
                        </li>
                    ))}
                </ul>
            </div>
        </nav>
    )
}
export default BreadCrumbs;