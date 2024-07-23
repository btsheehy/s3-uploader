import axios from "./axios"

export type StatsResponse = {
	totalSize: number
	totalUploads: number
	uploadsByDate: { date: string; count: number }[]
	fileTypeDistribution: { fileType: string; count: number }[]
	uploadSpaceByUser: { username: string; totalSize: number; userId: number }[]
	uploadsByUser: { username: string; count: number; userId: number }[]
}

export type MessageResponse = {
	message: string
}

export type AuthResponse = MessageResponse & {
	user: {
		username: string
		id: number
	}
}

export const fetchStats = async () => {
	const response = await axios.get<StatsResponse>("/stats")
	return response.data
}

export const register = async (username: string, password: string) => {
	const response = await axios.post<AuthResponse>("/auth/register", {
		username,
		password,
	})
	return response.data
}

export const login = async (username: string, password: string) => {
	const response = await axios.post<AuthResponse>("/auth/login", {
		username,
		password,
	})
	return response.data
}

export const logout = async () => {
	const response = await axios.post<MessageResponse>("/auth/logout")
	return response.data
}

export const checkAuth = async () => {
	const response = await axios.get<{ isAuthenticated: boolean }>("/auth/check")
	return response.data
}

export const uploadFile = async (formData: FormData) => {
	const response = await axios.post<MessageResponse>("/upload", formData, {
		headers: {
			"Content-Type": "multipart/form-data",
		},
	})
	return response.data
}
