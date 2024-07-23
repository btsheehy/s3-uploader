import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import FileUpload from "./FileUpload"
import Statistics from "./Statistics"
import { StatsResponse, fetchStats, logout } from "../api/client"

const Dashboard: React.FC = () => {
	const [stats, setStats] = useState<StatsResponse | null>(null)
	const navigate = useNavigate()

	const getStats = async () => {
		try {
			const stats = await fetchStats()
			setStats(stats)
		} catch (error) {
			console.error("Error fetching stats:", error)
		}
	}

	useEffect(() => {
		getStats()
	}, [])

	const handleLogout = async () => {
		await logout()
		navigate("/login")
	}

	return (
		<div>
			<h1>Dashboard</h1>
			<button onClick={handleLogout}>Logout</button>
			<FileUpload onUploadComplete={getStats} />
			{stats && <Statistics stats={stats} />}
		</div>
	)
}

export default Dashboard
