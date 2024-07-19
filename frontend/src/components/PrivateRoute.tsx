import React, { useEffect, useState } from "react"
import { Navigate } from "react-router-dom"
import api from "../api/axios"

interface PrivateRouteProps {
	children: React.ReactNode
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
	const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null)

	useEffect(() => {
		const checkAuth = async () => {
			try {
				await api.get("/api/auth/check")
				setIsAuthenticated(true)
			} catch (error) {
				setIsAuthenticated(false)
			}
		}

		checkAuth()
	}, [])

	if (isAuthenticated === null) {
		return <div>Loading...</div> // or some loading spinner
	}

	return isAuthenticated ? <>{children}</> : <Navigate to="/login" replace />
}

export default PrivateRoute
