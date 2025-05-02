"use client"

import { ReactElement, useRef } from "react"
import classes from './style.module.scss';
const SuggestionBox = ({ show, children,maxHeight,targetRef }: {targetRef:any, show: boolean,maxHeight:number, children: ReactElement[] }) => {
    const dropDownContainerRef=useRef<HTMLDivElement>(null);
    // useEffect(() => {
    //     if(show){
    //         // let screenHeight = window.innerHeight;
    //         // if(dropDownContainerRef.current){
    //         //    const dropDownContainer =  dropDownContainerRef.current?.getBoundingClientRect();
    //         //    let contHeigt=dropDownContainer.height>maxHeight?maxHeight:dropDownContainer.height;
    //         //    let buttomSpace=""
    //         // }
    //     }
    // }, [show,children.length])
    return (
        <>
            <div className={`absolute bg-white w-full border shadow-md overflow-auto ${classes.container}`} data-show={show} style={{maxHeight:`${maxHeight}px`}} ref={dropDownContainerRef}>
                {children}
            </div>
        </>
    )
}
export default SuggestionBox