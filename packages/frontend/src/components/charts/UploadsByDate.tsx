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

type UploadsByDateProps = {
	data: {
		date: string
		count: number
	}[]
	color: string
}

const UploadsByDate: React.FC<UploadsByDateProps> = ({ data, color }) => (
	<div className="mt-8">
		<div className="flex items-center justify-between">
			<h4 className="text-lg font-semibold text-gray-700">Uploads by Date</h4>
		</div>
		<div className="mt-4 bg-white shadow-sm rounded-md p-4">
			<ResponsiveContainer height={400}>
				<BarChart width={600} height={300} data={data}>
					<CartesianGrid strokeDasharray="3 3" />
					<XAxis dataKey="date" />
					<YAxis />
					<Tooltip />
					<Legend />
					<Bar dataKey="count" fill={color} />
				</BarChart>
			</ResponsiveContainer>
		</div>
	</div>
)

export default UploadsByDate
