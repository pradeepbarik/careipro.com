import 'server-only';
const get_env_configs = () => {
    let API_BASE_URL = "";
    if (process.env.NEXT_PUBLIC_MODE === "development") {
        API_BASE_URL = "http://127.0.0.1:9002"
        //API_BASE_URL = "http://139.59.87.157/um-api"
    } else {
        API_BASE_URL = "http://127.0.0.1:9002"
    }
    return {
        API_BASE_URL
    }
}
export const {API_BASE_URL}=get_env_configs();

/* the clinic dashboard api, which owns the lab module. only called from the server, for the public
   lab report page a patient opens from the QR code on their receipt */
export const LAB_API_BASE_URL = process.env.LAB_API_BASE_URL ||
    (process.env.NEXT_PUBLIC_MODE === "development" ? "http://127.0.0.1:3003" : "http://127.0.0.1:9003");
