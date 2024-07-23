import React, { useState, createRef } from "react"
import { uploadFile } from "../api/client"

interface FileUploadProps {
	onUploadComplete: () => void
}

const MAX_FILE_SIZE_MB = 10
const MAX_FILE_SIZE = MAX_FILE_SIZE_MB * 1024 * 1024 // 10MB in bytes

const FileUpload: React.FC<FileUploadProps> = ({ onUploadComplete }) => {
	const [file, setFile] = useState<File | null>(null)
	const [dragActive, setDragActive] = useState<boolean>(false)
	const [isUploading, setIsUploading] = useState<boolean>(false)
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

	const handleDrag = (e: React.DragEvent) => {
		e.preventDefault()
		e.stopPropagation()
		if (e.type === "dragenter" || e.type === "dragover") {
			setDragActive(true)
		} else if (e.type === "dragleave") {
			setDragActive(false)
		}
	}

	const handleDrop = (e: React.DragEvent) => {
		e.preventDefault()
		e.stopPropagation()
		setDragActive(false)
		if (e.dataTransfer.files && e.dataTransfer.files[0]) {
			if (e.dataTransfer.files[0].size > MAX_FILE_SIZE) {
				alert(`File size must not exceed ${MAX_FILE_SIZE_MB}MB`)
				formRef.current?.reset()
				return
			}
			setFile(e.dataTransfer.files[0])
		}
	}

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		if (!file) return

		const formData = new FormData()
		formData.append("file", file)
		setIsUploading(true)
		try {
			await uploadFile(formData)
			alert("File uploaded successfully")
			setFile(null)
			onUploadComplete()
		} catch (error) {
			console.error("Upload error:", error)
			alert("Upload failed. Please try again.")
		} finally {
			setIsUploading(false)
			formRef.current?.reset()
		}
	}

	return (
		<div className="mt-8 bg-white shadow-sm rounded-md p-6">
			<h2 className="text-xl font-semibold text-gray-800 mb-6">Upload File</h2>
			<form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
				<div
					className={`flex items-center justify-center w-full ${
						dragActive ? "bg-blue-50" : "bg-gray-50"
					}`}
					onDragEnter={handleDrag}
					onDragLeave={handleDrag}
					onDragOver={handleDrag}
					onDrop={handleDrop}
				>
					<label
						htmlFor="file-upload"
						className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
					>
						<div className="flex flex-col items-center justify-center pt-5 pb-6">
							<svg
								className="w-10 h-10 mb-3 text-gray-400"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="2"
									d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
								></path>
							</svg>
							<p className="mb-2 text-sm text-gray-500">
								<span className="font-semibold">Click to upload</span> or drag
								and drop
							</p>
							<p className="text-xs text-gray-500">
								.txt, .pdf, .doc, .docx (MAX. 10MB)
							</p>
						</div>
						<input
							id="file-upload"
							type="file"
							className="hidden"
							onChange={handleFileChange}
							accept=".txt,.pdf,.doc,.docx"
							ref={fileInput}
						/>
					</label>
				</div>
				<div className="flex items-center justify-between">
					<span className="text-sm text-gray-500">
						{file ? file.name : "No file selected"}
					</span>
					<button
						type="submit"
						disabled={!file || isUploading}
						className="flex px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
					>
						{isUploading ? (
							<>
								<svg
									className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
								>
									<circle
										className="opacity-25"
										cx="12"
										cy="12"
										r="10"
										stroke="currentColor"
										strokeWidth="4"
									></circle>
									<path
										className="opacity-75"
										fill="currentColor"
										d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
									></path>
								</svg>
								Uploading
							</>
						) : (
							"Upload"
						)}
					</button>
				</div>
			</form>
		</div>
	)
}

export default FileUpload
