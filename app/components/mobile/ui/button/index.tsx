import React,{ FC, ReactNode } from "react";

const Button:FC<{children:ReactNode}>=({children})=>{
    return <button>{children}</button>
}
export default Button;