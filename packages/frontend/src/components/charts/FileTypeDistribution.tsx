import React from "react"
import {
	ResponsiveContainer,
	BarChart,
	CartesianGrid,
	XAxis,
	YAxis,
	Tooltip,
	Legend,
	Bar,
} from "recharts"

type FileTypeDistributionProps = {
	data: { fileType: string; count: number }[]
	color: string
}

const FileTypeDistribution: React.FC<FileTypeDistributionProps> = ({
	data,
	color,
}) => (
	<div className="mt-8">
		<div className="flex items-center justify-between">
			<h4 className="text-lg font-semibold text-gray-700">
				File Type Distribution
			</h4>
		</div>
		<div className="mt-4 bg-white shadow-sm rounded-md p-4">
			<ResponsiveContainer width="100%" height={400}>
				<BarChart width={600} height={300} data={data}>
					<CartesianGrid strokeDasharray="3 3" />
					<XAxis dataKey="extension" />
					<YAxis />
					<Tooltip />
					<Legend />
					<Bar dataKey="count" fill={color} />
				</BarChart>
			</ResponsiveContainer>
		</div>
	</div>
)

export default FileTypeDistribution
