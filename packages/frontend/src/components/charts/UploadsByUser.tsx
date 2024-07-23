import React from "react"
import { ResponsiveContainer, PieChart, Pie, Tooltip, Cell } from "recharts"

type UploadsByUserProps = {
	data: { name: string; value: number; color: string }[]
}

const UploadsByUser: React.FC<UploadsByUserProps> = ({ data }) => (
	<div className="mt-8">
		<div className="flex items-center justify-between">
			<h4 className="text-lg font-semibold text-gray-700">Uploads by User</h4>
		</div>
		<div className="mt-4 bg-white shadow-sm rounded-md p-4">
			<ResponsiveContainer height={400}>
				<PieChart>
					<Pie
						data={data}
						dataKey="value"
						nameKey="name"
						cx="50%"
						cy="50%"
						outerRadius={150}
						fill="#8884d8"
						label={(entry) => entry.name}
					>
						{data?.map((entry, index) => (
							<Cell key={`cell-${index}`} fill={entry.color} />
						))}
					</Pie>
					<Tooltip />
				</PieChart>
			</ResponsiveContainer>
		</div>
	</div>
)

export default UploadsByUser
