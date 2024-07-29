import Link from 'next/link';
import { AiFillCaretDown } from "react-icons/ai";
import classes from "./header.module.scss";
const Header=()=>{
    return <>
    <div className={`flex items-center px-2 py-2 ${classes.container}`}>
        <img src="careipro-primary-logo.png" className={`${classes.logo}`} />
        <div className='ml-auto flex items-center'>
            <div >
            <Link href={"/login"} className='ml-auto button' data-color='secondary' data-size="small" >Login</Link>
            </div>
            <span className={`px-1 py-1 ml-2 flex items-center fs-13 ${classes.citySelection}`}>Your Location
                <AiFillCaretDown/>
            </span>
        </div>
    </div>
    </>
}
export default Header;