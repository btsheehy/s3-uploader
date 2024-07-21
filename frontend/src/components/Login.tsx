import React, { useState } from "react"
import { useNavigate } from "react-router-dom"

import api from "../api/axios"

const Login: React.FC = () => {
	const [username, setUsername] = useState("")
	const [password, setPassword] = useState("")
	const navigate = useNavigate()

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		try {
			await api.post("http://localhost:3000/api/auth/login", {
				username,
				password,
			})
			navigate("/dashboard")
		} catch (error) {
			console.error("Login error:", error)
			alert("Login failed. Please try again.")
		}
	}

	return (
		<div>
			<h2>Login</h2>
			<form onSubmit={handleSubmit}>
				<input
					type="text"
					placeholder="Username"
					value={username}
					onChange={(e) => setUsername(e.target.value)}
				/>
				<input
					type="password"
					placeholder="Password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/>
				<button type="submit">Login</button>
			</form>
			<h4>Don't have an account? <a href="/register">Register</a></h4>
		</div>
	)
}

export default Login
