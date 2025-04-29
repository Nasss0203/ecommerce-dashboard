import React, { useState } from "react";

const UploadMultipleFile = () => {
	const [files, setFile] = useState([]);
	const sendFile = (e: React.ChangeEvent<HTMLInputElement>) => {
		// creating a new form data
		const file = e.target.files?.[0];
		const formData = new FormData();
		// adding files to the form data
		[...files].forEach((file) => {
			/* Here we give the form name 'image'. this same name in the
               upload.array('image') middleware
            */
			formData.append("image", file);
		});

		fetch("http://localhost:5000/files", {
			method: "POST",
			body: formData,
		}).then((res) => {});
	};
	return <div></div>;
};

export default UploadMultipleFile;
