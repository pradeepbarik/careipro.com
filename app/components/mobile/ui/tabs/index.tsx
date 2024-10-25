import classes from './style.module.scss';
type TProps = {
    tabs: Array<{
        label: string
    }>
    activeTab: number,
    onClick: (i: number) => void,
    className?:string
}
const Tabs = ({ tabs, activeTab,onClick,className="" }: TProps) => {
    return (
        <>
            <ul className={`${classes.tabsContainer} ${className}`}>
                {tabs.map((tab, i) => 
                <li key={tab.label}
                    className={`font-semibold fs-16 ` + (i === activeTab ? `${classes.active}` : "")}
                    onClick={()=>{onClick(i)}}
                >
                    {tab.label}
                </li>
                )}
            </ul>
        </>
    )
}
export default Tabs;