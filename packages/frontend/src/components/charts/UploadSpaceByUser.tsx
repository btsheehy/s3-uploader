import React from "react"
import { ResponsiveContainer, PieChart, Pie, Tooltip, Cell } from "recharts"

type UploadSpaceByUserProps = {
	uploadSpacePieChartData: { name: string; value: number; color: string }[]
	formatBytes: (bytes: number, decimals?: number) => string
}

const UploadSpaceByUser: React.FC<UploadSpaceByUserProps> = ({
	uploadSpacePieChartData,
	formatBytes,
}) => (
	<div className="mt-8">
		<div className="flex items-center justify-between">
			<h4 className="text-lg font-semibold text-gray-700">
				Upload Space by User
			</h4>
		</div>
		<div className="mt-4 bg-white shadow-sm rounded-md p-4">
			<ResponsiveContainer height={400}>
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
						{uploadSpacePieChartData?.map((entry, index) => (
							<Cell key={`cell-${index}`} fill={entry.color} />
						))}
					</Pie>
					<Tooltip formatter={(value: number) => formatBytes(value)} />
				</PieChart>
			</ResponsiveContainer>
		</div>
	</div>
)

export default UploadSpaceByUser
