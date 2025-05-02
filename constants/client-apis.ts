'use client'
const get_env_configs = () => {
    let API_BASE_URL = "";
    if (process.env.mode === "production") {
        API_BASE_URL = "https://careipro.com:9002"
    } else {
        API_BASE_URL = "http://localhost/api"
    }
    return {
        API_BASE_URL
    }
}
export const {API_BASE_URL}=get_env_configs();