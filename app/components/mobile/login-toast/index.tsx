
'use client';
import { useState } from "react";
import Link from "next/link";
import { BiX } from "react-icons/bi";
const LoginToast = () => {
    const [showToast, setShowToast] = useState(sessionStorage.getItem("dontshowLoginToast") == "1" ? false : true)
    const hiseToast = () => {
        setShowToast(false)
        sessionStorage.setItem("dontshowLoginToast", "1");
    }
    return (
        <>
            {showToast === true ?
                <div className="fixed bottom-4 rounded-md" style={{ width: "calc(100% - 1rem)", left: ".5rem" }}>
                    <div className="flex border rounded border-orange-300 bg-orange-200 py-1 px-4 items-center relative">
                        <span>One Step Away from <b>Full Features!</b></span>
                        <Link href={"/login"} className="ml-auto bg-orange-300 border-orange-300 px-2 py-1 shadow-md rounded color-white" style={{ background: "#ad6822" }}>Login</Link>
                        <BiX className="absolute -right-1 -top-2 bg-red-400 rounded-full color-white text-lg" onClick={hiseToast} />
                    </div>
                </div> : <></>
            }
        </>
    )
}
export default LoginToast;