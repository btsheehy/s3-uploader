import React, { useState, createRef } from "react"
import { uploadFile } from "../api/client"

interface FileUploadProps {
	onUploadComplete: () => void
}

const MAX_FILE_SIZE_MB = 10
const MAX_FILE_SIZE = MAX_FILE_SIZE_MB * 1024 * 1024 // 10MB in bytes

const FileUpload: React.FC<FileUploadProps> = ({ onUploadComplete }) => {
	const [file, setFile] = useState<File | null>(null)
	const fileInput = createRef<HTMLInputElement>()
	const formRef = createRef<HTMLFormElement>()

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files && e.target.files[0]) {
			if (e.target.files[0].size > MAX_FILE_SIZE) {
				alert(`File size must not exceed ${MAX_FILE_SIZE_MB}MB`)
				formRef.current?.reset()
				return
			}
			setFile(e.target.files[0])
		}
	}

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		if (!file) return

		const formData = new FormData()
		formData.append("file", file)

		try {
			await uploadFile(formData)
			alert("File uploaded successfully")
			setFile(null)
			onUploadComplete()
		} catch (error) {
			console.error("Upload error:", error)
			alert("Upload failed. Please try again.")
		} finally {
			formRef.current?.reset()
		}
	}

	return (
		<div>
			<h2>Upload File</h2>
			<form ref={formRef} onSubmit={handleSubmit}>
				<input
					type="file"
					onChange={handleFileChange}
					accept=".txt,.pdf,.doc,.docx"
					ref={fileInput}
				/>
				<h5>Files must be in .txt, .pdf, .doc, or .docx format and cannot exceed 10MB.</h5>
				<button type="submit" disabled={!file}>
					Upload
				</button>
			</form>
		</div>
	)
}

export default FileUpload
