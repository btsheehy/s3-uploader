import React, { useReducer, useEffect } from "react"
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
import Statistics from "./components/Statistics"
import FileUpload from "./components/FileUpload"
import { StatsResponse, fetchStats } from "./api/client"

type AppState = {
	isAuthenticated: boolean
	user: { id: number; username: string } | null
	statistics: StatsResponse | null
}

const initialState: AppState = {
	isAuthenticated: false,
	user: null,
	statistics: null,
}

export type Action =
	| { type: "LOGIN"; payload: { id: number; username: string } }
	| { type: "LOGOUT" }
	| { type: "SET_STATS"; payload: StatsResponse }

export type Dispatch = React.Dispatch<Action>

const reducer = (state: AppState, action: Action) => {
	switch (action.type) {
		case "LOGIN":
			return {
				...state,
				isAuthenticated: true,
				user: action.payload,
			}
		case "LOGOUT":
			return {
				...state,
				isAuthenticated: false,
				user: null,
			}
		case "SET_STATS":
			return {
				...state,
				statistics: action.payload,
			}
		default:
			return state
	}
}

const App: React.FC = () => {
	const [state, dispatch] = useReducer(reducer, initialState)
	const getStats = async () => {
		try {
			const stats = await fetchStats()
			dispatch({ type: "SET_STATS", payload: stats })
		} catch (error) {
			console.error("Error fetching stats:", error)
		}
	}

	useEffect(() => {
		getStats()
	}, [state.isAuthenticated])

	return (
		<Router>
			<Routes>
				<Route path="/login" element={<Login dispatch={dispatch} />} />
				<Route path="/register" element={<Register />} />
				<Route
					path="/dashboard"
					element={
						<PrivateRoute>
							<Dashboard dispatch={dispatch} />
						</PrivateRoute>
					}
				>
					<Route index element={<Statistics stats={state.statistics} />} />
					<Route
						path="upload"
						element={<FileUpload onUploadComplete={getStats} />}
					/>
				</Route>
				<Route path="/" element={<Navigate to="/dashboard" replace />} />
			</Routes>
		</Router>
	)
}

export default App
