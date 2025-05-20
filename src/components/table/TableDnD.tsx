import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { fetchAllProducts } from "@/redux/slice/product.slice";
import {
	DndContext,
	KeyboardSensor,
	MouseSensor,
	TouchSensor,
	closestCenter,
	useSensor,
	useSensors,
	type DragEndEvent,
} from "@dnd-kit/core";
import { restrictToHorizontalAxis } from "@dnd-kit/modifiers";
import {
	SortableContext,
	arrayMove,
	horizontalListSortingStrategy,
} from "@dnd-kit/sortable";
import {
	ColumnDef,
	getCoreRowModel,
	getPaginationRowModel,
	useReactTable,
} from "@tanstack/react-table";
import React, { useEffect, useMemo, useState } from "react";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import DownloadCSV from "../csv/DownloadCSV";
import { Button } from "../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Table, TableBody, TableHeader, TableRow } from "../ui/table";
import DragAlongCell from "./drag/DragAlongCell";

import DraggableTableHeader from "./drag/DraggableTableHeader";
import { Product } from "./types/table.type";

function TableDnD() {
	const [pagination, setPagination] = useState({
		pageIndex: 0, //initial page index
		pageSize: 10, //default page size
	});

	const dispatch = useAppDispatch();
	const listProduct = useAppSelector((state) => state.product.listProduct);

	const data = listProduct?.data?.data || [];
	useEffect(() => {
		dispatch(
			fetchAllProducts({
				limit: pagination.pageSize,
				page: pagination.pageIndex + 1, // nếu backend page bắt đầu từ 1
			}),
		);
	}, [dispatch, pagination.pageIndex, pagination.pageSize]);

	const columns = useMemo<ColumnDef<Product>[]>(
		() => [
			{
				accessorKey: "product_name",
				cell: (info) => {
					const row = info.row.original;
					return (
						<div
							style={{
								display: "flex",
								alignItems: "center",
								gap: "10px",
							}}
						>
							<img
								src={row.product_thumb}
								alt='Product'
								className='object-contain size-10'
							/>
							<span className='line-clamp-2'>
								{row.product_name}
							</span>
						</div>
					);
				},
				header: () => <span>Product name</span>,
				id: "product_name",
				size: 250,
			},
			{
				accessorKey: "product_category",
				cell: (info) => {
					const row = info.row.original;
					return <>{row.product_category.category_name}</>;
				},
				header: () => <span>Category</span>,
				id: "product_category",
				size: 120,
			},
			{
				accessorKey: "product_quantity",
				cell: (info) => info.getValue(),
				header: () => <span>Stock</span>,
				id: "product_quantity",
				size: 120,
			},
			{
				accessorKey: "product_price",
				cell: (info) => info.getValue(),
				header: () => <span>Price</span>,
				id: "product_price",
				size: 120,
			},
			{
				accessorKey: "action",
				cell: () => {
					return (
						<Popover>
							<PopoverTrigger>
								<HiOutlineDotsHorizontal className='size-6 ' />
							</PopoverTrigger>
							<PopoverContent align='start' className='w-40 '>
								Place here.z
							</PopoverContent>
						</Popover>
					);
				},
				header: () => <span>Action</span>,
				id: "action",
				size: 40,
			},
		],
		[],
	);

	const [columnOrder, setColumnOrder] = React.useState<string[]>(() =>
		columns.map((c) => c.id!),
	);

	const table = useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		state: {
			columnOrder,
			pagination,
		},
		onColumnOrderChange: setColumnOrder,
		onPaginationChange: setPagination,
		manualPagination: true,
		pageCount:
			Math.ceil((listProduct?.data?.total || 0) / pagination.pageSize) ||
			1,
		// hoặc nếu có totalPage: pageCount: listProduct?.data?.totalPage || 1,
		debugTable: true,
		debugHeaders: true,
		debugColumns: true,
	});

	function handleDragEnd(event: DragEndEvent) {
		const { active, over } = event;
		if (active && over && active.id !== over.id) {
			setColumnOrder((columnOrder) => {
				const oldIndex = columnOrder.indexOf(active.id as string);
				const newIndex = columnOrder.indexOf(over.id as string);
				return arrayMove(columnOrder, oldIndex, newIndex);
			});
		}
	}

	const sensors = useSensors(
		useSensor(MouseSensor, {}),
		useSensor(TouchSensor, {}),
		useSensor(KeyboardSensor, {}),
	);

	const resetTable = () => {
		setColumnOrder(columns.map((c) => c.id!));
	};

	return (
		<DndContext
			collisionDetection={closestCenter}
			modifiers={[restrictToHorizontalAxis]}
			onDragEnd={handleDragEnd}
			sensors={sensors}
		>
			<div className='space-y-4'>
				<div className='flex flex-wrap justify-end gap-2'>
					<div className='flex items-center gap-3'>
						<DownloadCSV
							data={data}
							columns={columns}
						></DownloadCSV>
						<Button
							onClick={() => resetTable()}
							variant={"destructive"}
						>
							Reset Table
						</Button>
					</div>
				</div>
				<div className='overflow-hidden border rounded-md'>
					<div className='overflow-y-auto max-h-[calc(100vh-16rem)]  relative divide-sidebar-accent'>
						<div className='sticky top-0 z-10 bg-neutral-700'>
							<Table>
								<TableHeader>
									{table
										.getHeaderGroups()
										.map((headerGroup) => (
											<TableRow key={headerGroup.id}>
												<SortableContext
													items={columnOrder}
													strategy={
														horizontalListSortingStrategy
													}
												>
													{headerGroup.headers.map(
														(header) => (
															<DraggableTableHeader
																key={header.id}
																header={header}
															/>
														),
													)}
												</SortableContext>
											</TableRow>
										))}
								</TableHeader>
							</Table>
						</div>
						<div>
							<Table>
								<TableBody>
									{table.getRowModel().rows.map((row) => (
										<TableRow key={row.id}>
											{row
												.getVisibleCells()
												.map((cell) => (
													<SortableContext
														key={cell.id}
														items={columnOrder}
														strategy={
															horizontalListSortingStrategy
														}
													>
														<DragAlongCell
															key={cell.id}
															cell={cell}
														/>
													</SortableContext>
												))}
										</TableRow>
									))}
								</TableBody>
							</Table>
						</div>
					</div>
				</div>
				<div className='flex items-center gap-2 py-2'>
					<Button
						onClick={() => table.setPageIndex(0)}
						disabled={!table.getCanPreviousPage()}
					>
						{"<<"}
					</Button>
					<Button
						onClick={() => table.previousPage()}
						disabled={!table.getCanPreviousPage()}
					>
						{"<"}
					</Button>
					<span>
						Page{" "}
						<strong>
							{table.getState().pagination.pageIndex + 1} /{" "}
							{table.getPageCount()}
						</strong>
					</span>
					<Button
						onClick={() => table.nextPage()}
						disabled={!table.getCanNextPage()}
					>
						{">"}
					</Button>
					<Button
						onClick={() =>
							table.setPageIndex(table.getPageCount() - 1)
						}
						disabled={!table.getCanNextPage()}
					>
						{">>"}
					</Button>
					<select
						value={table.getState().pagination.pageSize}
						onChange={(e) => {
							table.setPageSize(Number(e.target.value));
						}}
					>
						{[10, 20, 30, 40, 50].map((pageSize) => (
							<option key={pageSize} value={pageSize}>
								{pageSize}
							</option>
						))}
					</select>
				</div>
			</div>
		</DndContext>
	);
}

export default TableDnD;
