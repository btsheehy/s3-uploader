import React from "react"
import {
	BrowserRouter as Router,
	Route,
	Routes,
	Navigate,
} from "react-router-dom"
import Login from "./components/Login"
import Register from "./components/Register"
import Dashboard from "./components/Dashboard"
import PrivateRoute from "./components/PrivateRoute"

const App: React.FC = () => {
	return (
		<Router>
			<div className="App">
				<Routes>
					<Route path="/login" element={<Login />} />
					<Route path="/register" element={<Register />} />
					<Route
						path="/dashboard"
						element={
							<PrivateRoute>
								<Dashboard />
							</PrivateRoute>
						}
					/>
					<Route path="/" element={<Navigate to="/dashboard" replace />} />
				</Routes>
			</div>
		</Router>
	)
}

export default App
