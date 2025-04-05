import { getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { Download } from "lucide-react";
import { useRef, useState } from "react";
import { CSVLink } from "react-csv";
import { Button } from "../ui/button";
interface DownloadCSVProps {
	columns: any[]; // TypeScript type for table columns
	data: any[]; // TypeScript type for table data
}
const DownloadCSV = ({ columns, data }: DownloadCSVProps) => {
	const table = useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
	});

	const [csvData, setCsvData] = useState<any[]>([]);
	const csvLinkRef = useRef<CSVLink>(null);

	const downloadCSV = () => {
		const formattedData = table.getRowModel().rows.map((row) => {
			const rowData: Record<string, any> = {};
			row.getAllCells().forEach((cell) => {
				rowData[cell.column.columnDef.header as string] =
					cell.getValue();
			});
			return rowData;
		});

		setCsvData(formattedData);

		setTimeout(() => {
			if (csvLinkRef.current && "link" in csvLinkRef.current) {
				(csvLinkRef.current as any).link.click();
			}
		}, 0);
	};

	return (
		<div>
			<Button variant='outline' onClick={downloadCSV} size={"lg"}>
				<Download></Download> Export
			</Button>

			<CSVLink
				data={csvData}
				filename='transactions.csv'
				className='hidden'
				ref={csvLinkRef as any}
				target='_blank'
			/>
		</div>
	);
};

export default DownloadCSV;
