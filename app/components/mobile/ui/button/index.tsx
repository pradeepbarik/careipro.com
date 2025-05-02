import React,{ FC, ReactNode } from "react";

const Button:FC<{children:ReactNode,className?:string,onClick:()=>void,disabled?:boolean }>=({onClick,children,className="",disabled=false})=>{
    return <button type="button" className={"button h-10 "+className} onClick={onClick} disabled={disabled}>{children}</button>
}
export default Button;