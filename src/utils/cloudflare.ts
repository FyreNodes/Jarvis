import { AxiosInstance } from "axios";
import axios from "axios";

const cloudflare: AxiosInstance = axios.create({
    baseURL: 'https://api.cloudflare.com/client/v4/',
    timeout: 8000,
    headers: {
        'X-Auth-Email': process.env.CF_EMAIL,
        'Authorization': `Bearer ${process.env.CF_API_TOKEN}`
    }
});

export default cloudflare;