import 'server-only';
const get_env_configs = () => {
    let API_BASE_URL = "";
    if (process.env.mode === "development") {
        API_BASE_URL = "http://127.0.0.1:9002"
    } else {
        API_BASE_URL = "http://127.0.0.1:9002"
    }
    return {
        API_BASE_URL
    }
}
export const {API_BASE_URL}=get_env_configs();