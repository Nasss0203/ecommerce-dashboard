import { TableHead } from "@/components/ui/table";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { flexRender, Header } from "@tanstack/react-table";
import { CSSProperties } from "react";
import { RiDragMoveLine } from "react-icons/ri";
import { Product } from "../types/table.type";

const DraggableTableHeader = ({
	header,
}: {
	header: Header<Product, unknown>;
}) => {
	const { attributes, isDragging, listeners, setNodeRef, transform } =
		useSortable({
			id: header.column.id,
		});

	const style: CSSProperties = {
		opacity: isDragging ? 0.8 : 1,
		position: "sticky",
		transform: CSS.Translate.toString(transform), // translate instead of transform to avoid squishing
		transition: "width transform 0.2s ease-in-out",
		whiteSpace: "nowrap",
		width: header.column.getSize(),
		zIndex: isDragging ? 10 : 0,
		top: 0,
	};

	return (
		<TableHead
			colSpan={header.colSpan}
			ref={setNodeRef}
			style={style}
			className='sticky top-0 z-10'
		>
			{header.isPlaceholder
				? null
				: flexRender(
						header.column.columnDef.header,
						header.getContext(),
				  )}
			<button
				className='size-5 text-black pt-1.5 px-3'
				{...attributes}
				{...listeners}
			>
				<RiDragMoveLine className='size-5 dark:text-blue-500' />
			</button>
		</TableHead>
	);
};

export default DraggableTableHeader;
