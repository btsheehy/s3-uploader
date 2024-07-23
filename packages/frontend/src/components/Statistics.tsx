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

import { StatsResponse } from "../api/client"

interface StatsProps {
	stats: StatsResponse
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
		"#0088FE",
		"#00C49F",
		"#FFBB28",
		"#FF8042",
		"#8884D8",
		"#82CA9D",
		"#FFC0CB",
		"#A52A2A",
		"#008080",
		"#FFD700",
		"#FF69B4",
	]
	const uploadSpacePieChartData = stats.uploadSpaceByUser.map((user, i) => ({
		name: user.username,
		value: user.totalSize,
		color: COLORS[i % COLORS.length],
	}))

	return (
		<div>
			<h2>Upload Statistics</h2>
			<p>Total Uploads: {stats.totalUploads}</p>
			<p>Total Size: {(stats.totalSize / 1024 / 1024).toFixed(2)} MB</p>

			<h3>File Type Distribution</h3>
			<BarChart width={600} height={300} data={stats.fileTypeDistribution}>
				<CartesianGrid strokeDasharray="3 3" />
				<XAxis dataKey="extension" />
				<YAxis />
				<Tooltip />
				<Legend />
				<Bar dataKey="count" fill="#8884d8" />
			</BarChart>

			<h3>Uploads by Date</h3>
			<BarChart width={600} height={300} data={stats.uploadsByDate}>
				<CartesianGrid strokeDasharray="3 3" />
				<XAxis dataKey="date" />
				<YAxis />
				<Tooltip />
				<Legend />
				<Bar dataKey="count" fill="#82ca9d" />
			</BarChart>

			<h3>Upload Space by User</h3>
			<ResponsiveContainer width="100%" height={400}>
				<PieChart>
					<Pie
						data={uploadSpacePieChartData}
						dataKey="value"
						nameKey="name"
						cx="50%"
						cy="50%"
						outerRadius={150}
						fill="#8884d8"
						label={(entry) => entry.name}
					>
						{uploadSpacePieChartData.map((entry, index) => (
							<Cell key={`cell-${index}`} fill={entry.color} />
						))}
					</Pie>
					<Tooltip formatter={(value: number) => formatBytes(value)} />
				</PieChart>
			</ResponsiveContainer>
		</div>
	)
}

export default Statistics
