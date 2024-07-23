import React, { useState } from "react"
import { Outlet, NavLink, useNavigate } from "react-router-dom"
import {
	Bars3Icon,
	ChartPieIcon,
	ArrowUpTrayIcon,
	UserIcon,
} from "@heroicons/react/24/outline"
import { Dispatch } from "../App"
import { logout } from "../api/client"

const Dashboard: React.FC<{ dispatch: Dispatch }> = ({
	dispatch: Dispatch,
}) => {
	const [sidebarOpen, setSidebarOpen] = useState(false)
	const navigate = useNavigate()

	const handleLogout = async () => {
		await logout()
		navigate("/login")
		Dispatch({ type: "LOGOUT" })
	}

	return (
		<div className="h-screen flex overflow-hidden bg-gray-100">
			{/* Sidebar */}
			<div
				className={`fixed inset-y-0 left-0 z-30 w-64 bg-gray-800 overflow-y-auto transition duration-300 transform ${
					sidebarOpen ? "translate-x-0" : "-translate-x-full"
				} lg:translate-x-0 lg:static lg:inset-0`}
			>
				<div className="flex items-center justify-center mt-8">
					<div className="flex items-center">
						<ArrowUpTrayIcon className="h-12 w-12 text-white" />
						<span className="text-white text-2xl mx-2 font-semibold">
							File Uploader
						</span>
					</div>
				</div>

				<nav className="mt-10">
					<NavLink
						to="/dashboard"
						end
						className={({ isActive }) =>
							`flex items-center mt-4 py-2 px-6 ${
								isActive
									? "bg-gray-700 bg-opacity-25 text-gray-100"
									: "text-gray-500 hover:bg-gray-700 hover:bg-opacity-25 hover:text-gray-100"
							}`
						}
					>
						<ChartPieIcon className="h-6 w-6" />
						<span className="mx-3">Statistics</span>
					</NavLink>
					<NavLink
						to="/dashboard/upload"
						className={({ isActive }) =>
							`flex items-center mt-4 py-2 px-6 ${
								isActive
									? "bg-gray-700 bg-opacity-25 text-gray-100"
									: "text-gray-500 hover:bg-gray-700 hover:bg-opacity-25 hover:text-gray-100"
							}`
						}
					>
						<ArrowUpTrayIcon className="h-6 w-6" />
						<span className="mx-3">Upload</span>
					</NavLink>
					<button
						onClick={handleLogout}
						className="flex items-center mt-4 py-2 px-6 text-gray-500 hover:bg-gray-700 hover:bg-opacity-25 hover:text-gray-100 w-full"
					>
						<UserIcon className="h-6 w-6" />
						<span className="mx-3">Log out</span>
					</button>
				</nav>
			</div>

			{/* Content area */}
			<div className="flex-1 flex flex-col overflow-hidden">
				<header className="bg-white shadow-sm lg:hidden">
					<div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
						<div className="flex items-center justify-between">
							<h2 className="font-semibold text-xl text-gray-800">Dashboard</h2>
							<button
								onClick={() => setSidebarOpen(!sidebarOpen)}
								className="text-gray-500 focus:outline-none focus:text-gray-700"
							>
								<Bars3Icon className="h-6 w-6" />
							</button>
						</div>
					</div>
				</header>

				<main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200">
					<div className="container mx-auto px-6 py-8">
						<h3 className="text-gray-700 text-3xl font-medium">Dashboard</h3>
						<Outlet />
					</div>
				</main>
			</div>
		</div>
	)
}

export default Dashboard
