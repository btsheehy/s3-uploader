import React from "react"
import {
	BarChart,
	Bar,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	Legend,
} from "recharts"

interface StatsProps {
	stats: {
		totalUploads: number
		totalSize: number
		fileTypeDistribution: { filetype: string; count: number }[]
		uploadsByDate: { date: string; count: number }[]
	}
}

const Statistics: React.FC<StatsProps> = ({ stats }) => {
	return (
		<div>
			<h2>Upload Statistics</h2>
			<p>Total Uploads: {stats.totalUploads}</p>
			<p>Total Size: {(stats.totalSize / 1024 / 1024).toFixed(2)} MB</p>

			<h3>File Type Distribution</h3>
			<BarChart width={600} height={300} data={stats.fileTypeDistribution}>
				<CartesianGrid strokeDasharray="3 3" />
				<XAxis dataKey="filetype" />
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
		</div>
	)
}

export default Statistics
