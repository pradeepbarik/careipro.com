import classes from "./style.module.scss";
const Loader = ({fullScreen, message}:{fullScreen?: boolean, message?: string}) => {
    if(fullScreen){
        return (
            <div className={classes.fullScreen}>
                <div className="bg-white rounded-md p-4 shadow-md text-center">
                   <div className={classes.loader}></div>
                   {message && <p className="mt-2 text-center">{message}</p>}
                </div>
            </div>
        )
    }
    return (
        <div className={classes.loader}></div>
    );
}
export default Loader;