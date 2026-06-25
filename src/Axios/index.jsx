import axios from "axios"

const api = import.meta.env.VITE_API;
const Axios = axios.create({
    baseURL: api,
    timeout: 7000,
    headers: {
        "Content-Type": "application/json",
    }
})

export default Axios