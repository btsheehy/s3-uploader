import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import FileUpload from "./FileUpload"
import Statistics from "./Statistics"
import api from "../api/axios"

const Dashboard: React.FC = () => {
	const [stats, setStats] = useState(null)
	const navigate = useNavigate()

	const fetchStats = async () => {
		try {
			const response = await api.get("http://localhost:3000/api/stats")
			setStats(response.data)
		} catch (error) {
			console.error("Error fetching stats:", error)
		}
	}

	useEffect(() => {
		fetchStats()
	}, [])

	const handleLogout = () => {
		localStorage.removeItem("token")
		navigate("/login")
	}

	return (
		<div>
			<img src="%PUBLIC%/ColeridgeLogo.png" alt="ColeridgeLogo" />
			<h1>Dashboard</h1>
			<button onClick={handleLogout}>Logout</button>
			<FileUpload onUploadComplete={fetchStats} />
			{stats && <Statistics stats={stats} />}
		</div>
	)
}

export default Dashboard
