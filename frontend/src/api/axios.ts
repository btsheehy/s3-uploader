import axios from "axios"

const instance = axios.create({
	baseURL: "http://localhost:3000", // Your API base URL
	withCredentials: true, // This is important for sending cookies with requests
})

export default instance
