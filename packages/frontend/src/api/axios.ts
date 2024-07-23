import axios from "axios"

const instance = axios.create({
    baseURL: "http://localhost:4000/api", // Your API base URL
    withCredentials: true, // This is important for sending cookies with requests
})

export default instance
