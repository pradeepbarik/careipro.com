'use client'
const get_env_configs = () => {
    let API_BASE_URL = "";
    if (process.env.NEXT_PUBLIC_MODE === "development") {
        API_BASE_URL = "http://localhost/api"
    } else {
        API_BASE_URL = "https://careipro.com/um-api"
    }
    return {
        API_BASE_URL
    }
}
export const {API_BASE_URL}=get_env_configs();