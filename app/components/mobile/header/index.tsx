import classes from "./header.module.scss";
const Header=()=>{
    return <>
    <div className={`flex px-2 py-2 ${classes.container}`}>
        <img src="careipro-primary-logo.png" />
    </div>
    </>
}
export default Header;