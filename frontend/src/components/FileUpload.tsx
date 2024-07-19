import React, { useState } from "react"
import api from "../api/axios"

interface FileUploadProps {
	onUploadComplete: () => void
}

const FileUpload: React.FC<FileUploadProps> = ({ onUploadComplete }) => {
	const [file, setFile] = useState<File | null>(null)

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files) {
			setFile(e.target.files[0])
		}
	}

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		if (!file) return

		const formData = new FormData()
		formData.append("file", file)

		try {
			await api.post("http://localhost:3000/api/upload", formData, {
				headers: {
					"Content-Type": "multipart/form-data",
				},
			})
			alert("File uploaded successfully")
			setFile(null)
			onUploadComplete()
		} catch (error) {
			console.error("Upload error:", error)
			alert("Upload failed. Please try again.")
		}
	}

	return (
		<div>
			<h2>Upload File</h2>
			<form onSubmit={handleSubmit}>
				<input
					type="file"
					onChange={handleFileChange}
					accept=".txt,.pdf,.doc,.docx"
				/>
				<button type="submit" disabled={!file}>
					Upload
				</button>
			</form>
		</div>
	)
}

export default FileUpload
