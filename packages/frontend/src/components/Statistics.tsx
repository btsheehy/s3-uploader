import React from "react"
import {
	BarChart,
	Bar,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	Legend,
	PieChart,
	Pie,
	Cell,
	ResponsiveContainer,
} from "recharts"
import {
	ChartPieIcon,
	UserIcon,
	ArrowUpTrayIcon,
} from "@heroicons/react/24/outline"

import UploadSpaceByUser from "./charts/UploadSpaceByUser"
import UploadsByUser from "./charts/UploadsByUser"
import { StatsResponse } from "../api/client"
import FileTypeDistribution from "./charts/FileTypeDistribution"
import UploadsByDate from "./charts/UploadsByDate"

interface StatsProps {
	stats: StatsResponse | null
}

const formatBytes = (bytes: number, decimals = 2) => {
	if (bytes === 0) return "0 Bytes"

	const k = 1024
	const dm = decimals < 0 ? 0 : decimals
	const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"]

	const i = Math.floor(Math.log(bytes) / Math.log(k))

	return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i]
}

const Statistics: React.FC<StatsProps> = ({ stats }) => {
	const COLORS = [
		// "#2F6690",
		// "#00C49F",
		// "#D9DCD6",
		// "#16425B",
		// "#81C3D7",
		// "#133C55",
		// "#386FA4",
		// "#59A5D8",
		// "#84D2F6",
		// "#91E5F6",
		// "#82CA9D",
		// "#FFC0CB",
		// "#A52A2A",
		// "#008080",
		// "#FFD700",
		// "#FF69B4",
		"#344575",
		"#9b916b",
		"#4f7b92",
		"#473d74",
		"#762c68",
		"#7b4140",
	]
	const uploadSpacePieChartData = stats?.uploadSpaceByUser.map((user, i) => ({
		name: user.username,
		value: user.totalSize,
		color: COLORS[i % COLORS.length],
	}))
	const uploadCountPieChartData = stats?.uploadsByUser.map((user, i) => ({
		name: user.username,
		value: user.count,
		color: COLORS[i % COLORS.length],
	}))

	return stats ? (
		<div className="mt-8">
			<div className="flex flex-wrap -mx-6">
				<div className="w-full px-6 sm:w-1/2 xl:w-1/3">
					<div className="flex items-center px-5 py-6 shadow-sm rounded-md bg-white">
						<div className="p-3 rounded-full bg-indigo-600 bg-opacity-75">
							<UserIcon className="h-8 w-8 text-white" />
						</div>
						<div className="mx-5">
							<h4 className="text-2xl font-semibold text-gray-700">
								{stats.uploadSpaceByUser.length || 0}
							</h4>
							<div className="text-gray-500">Active Users</div>
						</div>
					</div>
				</div>
				<div className="w-full mt-6 px-6 sm:w-1/2 xl:w-1/3 sm:mt-0">
					<div className="flex items-center px-5 py-6 shadow-sm rounded-md bg-white">
						<div className="p-3 rounded-full bg-green-600 bg-opacity-75">
							<ChartPieIcon className="h-8 w-8 text-white" />
						</div>
						<div className="mx-5">
							<h4 className="text-2xl font-semibold text-gray-700">
								{stats.totalSize ? formatBytes(stats.totalSize) : 0}
							</h4>
							<div className="text-gray-500">Total Upload Size</div>
						</div>
					</div>
				</div>
				<div className="w-full mt-6 px-6 sm:w-1/2 xl:w-1/3 sm:mt-0">
					<div className="flex items-center px-5 py-6 shadow-sm rounded-md bg-white">
						<div className="p-3 rounded-full bg-amber-600 bg-opacity-75">
							<ArrowUpTrayIcon className="h-8 w-8 text-white" />
						</div>
						<div className="mx-5">
							<h4 className="text-2xl font-semibold text-gray-700">
								{stats.totalUploads || 0}
							</h4>
							<div className="text-gray-500">Total Uploads</div>
						</div>
					</div>
				</div>
			</div>
			{uploadSpacePieChartData && (
				<UploadSpaceByUser
					uploadSpacePieChartData={uploadSpacePieChartData}
					formatBytes={formatBytes}
				/>
			)}
			{uploadCountPieChartData && (
				<UploadsByUser data={uploadCountPieChartData} />
			)}
			<FileTypeDistribution
				data={stats.fileTypeDistribution}
				color={COLORS[0]}
			/>
			<UploadsByDate data={stats.uploadsByDate} color={COLORS[1]} />
		</div>
	) : (
		<div>Loading...</div>
	)

	// return stats ? (
	// 	<div>
	// 		<h2>Upload Statistics</h2>
	// 		<p>Total Uploads: {stats.totalUploads}</p>
	// 		<p>Total Size: {(stats.totalSize / 1024 / 1024).toFixed(2)} MB</p>

	// 		<h3>File Type Distribution</h3>
	// 		<BarChart width={600} height={300} data={stats.fileTypeDistribution}>
	// 			<CartesianGrid strokeDasharray="3 3" />
	// 			<XAxis dataKey="extension" />
	// 			<YAxis />
	// 			<Tooltip />
	// 			<Legend />
	// 			<Bar dataKey="count" fill={COLORS[0]} />
	// 		</BarChart>

	// 		<h3>Uploads by Date</h3>
	// 		<BarChart width={600} height={300} data={stats.uploadsByDate}>
	// 			<CartesianGrid strokeDasharray="3 3" />
	// 			<XAxis dataKey="date" />
	// 			<YAxis />
	// 			<Tooltip />
	// 			<Legend />
	// 			<Bar dataKey="count" fill={COLORS[1]} />
	// 		</BarChart>

	// 		<h3>Upload Space by User</h3>
	// 		<ResponsiveContainer width="100%" height={400}>
	// 			<PieChart>
	// 				<Pie
	// 					data={uploadSpacePieChartData}
	// 					dataKey="value"
	// 					nameKey="name"
	// 					cx="50%"
	// 					cy="50%"
	// 					outerRadius={150}
	// 					fill="#8884d8"
	// 					label={(entry) => entry.name}
	// 				>
	// 					{uploadSpacePieChartData?.map((entry, index) => (
	// 						<Cell key={`cell-${index}`} fill={entry.color} />
	// 					))}
	// 				</Pie>
	// 				<Tooltip formatter={(value: number) => formatBytes(value)} />
	// 			</PieChart>
	// 		</ResponsiveContainer>

	// 		<h3>Upload Count by User</h3>
	// 		<ResponsiveContainer width="100%" height={400}>
	// 			<PieChart>
	// 				<Pie
	// 					data={uploadCountPieChartData}
	// 					dataKey="value"
	// 					nameKey="name"
	// 					cx="50%"
	// 					cy="50%"
	// 					outerRadius={150}
	// 					fill="#8884d8"
	// 					label={(entry) => entry.name}
	// 				>
	// 					{uploadCountPieChartData?.map((entry, index) => (
	// 						<Cell key={`cell-${index}`} fill={entry.color} />
	// 					))}
	// 				</Pie>
	// 				<Tooltip />
	// 			</PieChart>
	// 		</ResponsiveContainer>
	// 	</div>
	// ) : (
	// 	<div>Loading...</div>
	// )
}

export default Statistics
