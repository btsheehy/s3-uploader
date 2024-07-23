import React, { useEffect, useState } from "react"
import { Navigate } from "react-router-dom"
import { checkAuth } from "../api/client"

interface PrivateRouteProps {
	children: React.ReactNode
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
	const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null)

	useEffect(() => {
		const verifyAuth = async () => {
			try {
				await checkAuth()
				setIsAuthenticated(true)
			} catch (error) {
				setIsAuthenticated(false)
			}
		}

		verifyAuth()
	}, [])

	if (isAuthenticated === null) {
		return <div>Loading...</div> // or some loading spinner
	}

	return isAuthenticated ? <>{children}</> : <Navigate to="/login" replace />
}

export default PrivateRoute
