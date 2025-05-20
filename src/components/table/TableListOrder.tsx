import {
	ColumnDef,
	flexRender,
	getCoreRowModel,
	getFilteredRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	PaginationState,
	useReactTable,
} from "@tanstack/react-table";
import { useEffect, useMemo, useState } from "react";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { fetchAllOrderAdmin } from "@/redux/slice/order.slice";
import { IOrderCheckout } from "@/types/order";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "../ui/table";

export type Order = {
	_id: string;
	order_checkout: IOrderCheckout;
	order_products: [];
	order_tracking: string;
	order_status:
		| "pending"
		| "confirmed"
		| "shipped"
		| "cancelled"
		| "delivered";
	createdOn: Date;
};

const TableListOrder = () => {
	const dispatch = useAppDispatch();

	const dataOrder = useAppSelector((state) => state.order.listOrderAdmin);

	useEffect(() => {
		dispatch(fetchAllOrderAdmin());
	}, []);

	const columns = useMemo<ColumnDef<Order>[]>(
		() => [
			{
				accessorKey: "_id",
				cell: (info) => {
					const row = info.row.original;
					return <span>#{row._id.slice(-8)}</span>;
				},
				id: "_id",
				header: () => <span>OrderID</span>,
			},
			{
				accessorKey: "order_checkout",
				header: () => <span>Checkout</span>,
				cell: (info) => {
					const row = info.row.original;
					return (
						<span>
							{row.order_checkout.grandTotal?.toLocaleString(
								"vi-VN",
							) + " VND"}
						</span>
					);
				},
			},
			{
				accessorKey: "order_products",
				header: () => "Products",
				cell: (info) => {
					const row = info.row.original;
					return <span>{row.order_products.length}</span>;
				},
			},
			{
				accessorKey: "order_tracking",
				header: () => <span>Tracking</span>,
				cell: (info) => info.getValue(),
			},
			{
				accessorKey: "order_status",
				header: "Status",
				cell: (info) => info.getValue(),
			},
			{
				accessorKey: "createdOn",
				header: "Created",
				cell: (info) => {
					const row = info.row.original;
					return (
						<span>
							{row.createdOn
								? new Date(row.createdOn).toLocaleString(
										"vi-VN",
										{
											year: "numeric",
											month: "2-digit",
											day: "2-digit",
											hour: "2-digit",
											minute: "2-digit",
											second: "2-digit",
											hour12: false, // Định dạng 24h (bỏ nếu muốn AM/PM)
										},
								  )
								: "N/A"}
						</span>
					);
				},
			},
		],
		[],
	);

	const [pagination, setPagination] = useState<PaginationState>({
		pageIndex: 0,
		pageSize: 10,
	});

	const table = useReactTable({
		columns,
		data: dataOrder as any,
		debugTable: true,
		getCoreRowModel: getCoreRowModel(),
		getSortedRowModel: getSortedRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		onPaginationChange: setPagination,
		state: {
			pagination,
		},
	});

	return (
		<div>
			<div className='overflow-hidden border rounded-md'>
				<div className='overflow-y-auto max-h-[calc(100vh-16rem)]  relative divide-sidebar-accent'>
					<Table>
						<TableHeader>
							{table.getHeaderGroups().map((headerGroup) => (
								<TableRow key={headerGroup.id}>
									{headerGroup.headers.map((header) => {
										return (
											<TableHead
												key={header.id}
												colSpan={header.colSpan}
											>
												<div>
													{flexRender(
														header.column.columnDef
															.header,
														header.getContext(),
													)}
												</div>
											</TableHead>
										);
									})}
								</TableRow>
							))}
						</TableHeader>
						<TableBody>
							{table.getRowModel().rows.map((row) => {
								return (
									<TableRow key={row.id}>
										{row.getVisibleCells().map((cell) => {
											return (
												<TableCell key={cell.id}>
													{flexRender(
														cell.column.columnDef
															.cell,
														cell.getContext(),
													)}
												</TableCell>
											);
										})}
									</TableRow>
								);
							})}
						</TableBody>
					</Table>
				</div>
			</div>
			<div className='flex items-center gap-2'>
				<button
					className='p-1 border rounded'
					onClick={() => table.firstPage()}
					disabled={!table.getCanPreviousPage()}
				>
					{"<<"}
				</button>
				<button
					className='p-1 border rounded'
					onClick={() => table.previousPage()}
					disabled={!table.getCanPreviousPage()}
				>
					{"<"}
				</button>
				<button
					className='p-1 border rounded'
					onClick={() => table.nextPage()}
					disabled={!table.getCanNextPage()}
				>
					{">"}
				</button>
				<button
					className='p-1 border rounded'
					onClick={() => table.lastPage()}
					disabled={!table.getCanNextPage()}
				>
					{">>"}
				</button>
				<span className='flex items-center gap-1'>
					<div>Page</div>
					<strong>
						{table.getState().pagination.pageIndex + 1} of{" "}
						{table.getPageCount().toLocaleString()}
					</strong>
				</span>
				<span className='flex items-center gap-1'>
					| Go to page:
					<input
						type='number'
						min='1'
						max={table.getPageCount()}
						defaultValue={table.getState().pagination.pageIndex + 1}
						onChange={(e) => {
							const page = e.target.value
								? Number(e.target.value) - 1
								: 0;
							table.setPageIndex(page);
						}}
						className='w-16 p-1 border rounded'
					/>
				</span>
				<select
					value={table.getState().pagination.pageSize}
					onChange={(e) => {
						table.setPageSize(Number(e.target.value));
					}}
				>
					{[10, 20, 30, 40, 50].map((pageSize) => (
						<option key={pageSize} value={pageSize}>
							Show {pageSize}
						</option>
					))}
				</select>
			</div>
			<div>
				Showing {table.getRowModel().rows.length.toLocaleString()} of{" "}
				{table.getRowCount().toLocaleString()} Rows
			</div>
			<pre>{JSON.stringify(table.getState().pagination, null, 2)}</pre>
		</div>
	);
};

// function Filter({
// 	column,
// 	table,
// }: {
// 	column: Column<any, any>;
// 	table: TableTanstack<any>;
// }) {
// 	const firstValue = table
// 		.getPreFilteredRowModel()
// 		.flatRows[0]?.getValue(column.id);

// 	const columnFilterValue = column.getFilterValue();

// 	return typeof firstValue === "number" ? (
// 		<div className='flex space-x-2' onClick={(e) => e.stopPropagation()}>
// 			<input
// 				type='number'
// 				value={(columnFilterValue as [number, number])?.[0] ?? ""}
// 				onChange={(e) =>
// 					column.setFilterValue((old: [number, number]) => [
// 						e.target.value,
// 						old?.[1],
// 					])
// 				}
// 				placeholder={`Min`}
// 				className='w-24 border rounded shadow'
// 			/>
// 			<input
// 				type='number'
// 				value={(columnFilterValue as [number, number])?.[1] ?? ""}
// 				onChange={(e) =>
// 					column.setFilterValue((old: [number, number]) => [
// 						old?.[0],
// 						e.target.value,
// 					])
// 				}
// 				placeholder={`Max`}
// 				className='w-24 border rounded shadow'
// 			/>
// 		</div>
// 	) : (
// 		<input
// 			className='border rounded shadow w-36'
// 			onChange={(e) => column.setFilterValue(e.target.value)}
// 			onClick={(e) => e.stopPropagation()}
// 			placeholder={`Search...`}
// 			type='text'
// 			value={(columnFilterValue ?? "") as string}
// 		/>
// 	);
// }

export default TableListOrder;
