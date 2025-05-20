import { Editor } from "@tinymce/tinymce-react";
import { useRef } from "react";
import type { Editor as TinyMCEEditor } from "tinymce";
import "./editor.css";

const API_KEY_TINY = import.meta.env.VITE_API_KEY_TINY_MCE as string;

const EditorTiny = () => {
	const editorRef = useRef<TinyMCEEditor | null>(null);

	// const log = () => {
	// 	if (editorRef.current) {
	// 		console.log(editorRef.current.getContent());
	// 	}
	// };

	return (
		<div className='w-full h-[400px]'>
			<Editor
				apiKey={API_KEY_TINY}
				onInit={(_evt, editor) => (editorRef.current = editor)}
				initialValue=''
				init={{
					highlight_on_focus: false,
					placeholder: "Type here...",
					height: 400,
					menubar: false,
					plugins: [
						"advlist",
						"autolink",
						"lists",
						"link",
						"charmap",
						"preview",
						"anchor",
						"searchreplace",
						"visualblocks",
						"code",
						"fullscreen",
						"insertdatetime",
						"media",
						"table",
						"code",
						"help",
						"wordcount",
						"image",
					],
					images_file_types: "jpg,svg,webp",
					file_picker_types: "file image media",
					automatic_uploads: true,
					// Sử dụng images_upload_handler chỉ với 2 tham số
					images_upload_handler: (blobInfo, progress) => {
						// Tạo một FormData để gửi ảnh lên server
						const formData = new FormData();
						formData.append(
							"file",
							blobInfo.blob(),
							blobInfo.filename(),
						);

						// Giả sử bạn sẽ gửi lên server của mình (hoặc API dịch vụ upload ảnh)
						return new Promise<string>((resolve, reject) => {
							const xhr = new XMLHttpRequest();
							xhr.open(
								"POST",
								"https://your-api-endpoint/upload",
								true,
							);

							// Cập nhật tiến độ upload ảnh
							xhr.upload.onprogress = (e) => {
								if (e.lengthComputable) {
									progress(e.loaded / e.total); // Cập nhật tiến độ
								}
							};

							xhr.onload = () => {
								if (xhr.status === 200) {
									// Khi upload thành công, trả về URL ảnh từ server
									const response = JSON.parse(
										xhr.responseText,
									);
									resolve(response.imageUrl); // URL ảnh trả về từ server
								} else {
									reject("Image upload failed.");
								}
							};

							xhr.onerror = () => reject("Image upload failed.");

							// Gửi dữ liệu lên server
							xhr.send(formData);
						});
					},
					toolbar:
						"undo redo | blocks |" +
						"image |" +
						"bold italic underline forecolor | alignleft aligncenter " +
						"alignright alignjustify | bullist numlist outdent indent | " +
						"removeformat | help | ",
					content_style:
						"body { font-family:Helvetica,Arial,sans-serif; font-size:14px; }",
					toolbar_sticky: true,
				}}
			/>
		</div>
	);
};

export default EditorTiny;
