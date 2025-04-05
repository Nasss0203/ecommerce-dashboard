import Quill from "quill";
import "quill/dist/quill.snow.css";
import { forwardRef, useEffect, useImperativeHandle, useRef } from "react";
import "./editor.css";

interface QuillEditorProps {
	value?: string;
	onChange?: (value: string) => void;
}

export interface QuillEditorHandle {
	getEditorContent: () => string;
}

const toolbarOptions = [
	["bold", "italic", "underline", "strike"],
	["blockquote", "code-block"],
	["link", "image", "video", "formula"],

	[{ header: 1 }, { header: 2 }],
	[{ list: "ordered" }, { list: "bullet" }, { list: "check" }],
	[{ script: "sub" }, { script: "super" }],
	[{ indent: "-1" }, { indent: "+1" }],
	[{ direction: "rtl" }],

	[{ size: ["small", false, "large", "huge"] }],
	[{ header: [1, 2, 3, 4, 5, 6, false] }],

	[{ color: [] }, { background: [] }],
	[{ font: [] }],
	[{ align: [] }],

	["clean"],
];

const EditorQuill = forwardRef<QuillEditorHandle, QuillEditorProps>(
	({ value, onChange }, ref) => {
		const quillRef = useRef<HTMLDivElement | null>(null);
		const quillInstance = useRef<Quill | null>(null);

		useEffect(() => {
			if (quillRef.current && !quillInstance.current) {
				quillInstance.current = new Quill(quillRef.current, {
					theme: "snow",
					placeholder: "Write a story...",
					modules: {
						toolbar: toolbarOptions,
					},
				});

				quillInstance.current.on("text-change", () => {
					const html = quillInstance.current?.root.innerHTML || "";
					if (onChange) {
						onChange(html);
					}
				});
			}
		}, [onChange]);

		useImperativeHandle(ref, () => ({
			getEditorContent: () => {
				return quillInstance.current?.root.innerHTML || "";
			},
		}));

		useEffect(() => {
			if (
				quillInstance.current &&
				value !== quillInstance.current.root.innerHTML
			) {
				quillInstance.current.root.innerHTML = value || "";
			}
		}, [value]);

		return <div ref={quillRef} />;
	},
);

export default EditorQuill;
