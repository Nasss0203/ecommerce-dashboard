import { getUserIdAndToken } from "@/utils";
import axios from "../axios/axios";

export const uploadFile = async (formData: any, onProgress?: any) => {
	const { tokens } = getUserIdAndToken() || {};
	const { refresh_token } = tokens || {};
	try {
		const uploadResponse = await axios.post("/file/upload", formData, {
			headers: {
				"Content-Type": "multipart/form-data",
				Authorization: `Bearer ${refresh_token}`,
			},
			onUploadProgress: (progressEvent) => {
				if (
					progressEvent &&
					progressEvent.loaded &&
					progressEvent.total
				) {
					const percentCompleted = Math.round(
						(progressEvent.loaded * 100) / progressEvent.total,
					);
					console.log(`Upload progress: ${percentCompleted}%`);
					onProgress(percentCompleted);
				}
			},
		});
		const data = uploadResponse.data;
		return data;
	} catch (error) {
		console.log("Error upload file: ", error);
	}
};

export const uploadMultipleFile = async (files: File[], onProgress?: any) => {
	const { tokens } = getUserIdAndToken() || {};
	const { refresh_token } = tokens || {};

	const formData = new FormData();

	files.forEach((file) => {
		formData.append("files", file);
	});

	try {
		const uploadResponse = await axios.post(
			"/file/upload-multi",
			formData,
			{
				headers: {
					"Content-Type": "multipart/form-data",
					Authorization: `Bearer ${refresh_token}`,
				},
				onUploadProgress: (progressEvent) => {
					if (
						progressEvent &&
						progressEvent.loaded &&
						progressEvent.total
					) {
						const percentCompleted = Math.round(
							(progressEvent.loaded * 100) / progressEvent.total,
						);
						console.log(`Upload progress: ${percentCompleted}%`);
						if (onProgress) {
							onProgress(percentCompleted); // Gọi onProgress nếu có
						}
					}
				},
			},
		);

		const data = uploadResponse.data;
		return data;
	} catch (error) {
		console.error("Error uploading file: ", error);
	}
};
