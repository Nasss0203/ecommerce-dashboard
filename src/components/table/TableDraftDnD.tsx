import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
	actionPublish,
	fetchAllDraftProduct,
	removeProduct,
	resetFetchDraft,
} from "@/redux/slice/product.slice";
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
	useReactTable,
} from "@tanstack/react-table";
import React, { useEffect, useMemo } from "react";
import { FaRegTrashAlt } from "react-icons/fa";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { IoSettingsSharp } from "react-icons/io5";
import { MdModeEdit } from "react-icons/md";
import DownloadCSV from "../csv/DownloadCSV";
import { Button } from "../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Table, TableBody, TableHeader, TableRow } from "../ui/table";
import DragAlongCell from "./drag/DragAlongCell";
import DraggableTableHeader from "./drag/DraggableTableHeader";
import { Product } from "./types/table.type";

const TableDraftDnD = () => {
	const dispatch = useAppDispatch();
	const data = useAppSelector((state) => state.product.listProduct);
	const isPublish = useAppSelector((state) => state.product.isPublish);
	const productData = data.data.data;

	useEffect(() => {
		if (isPublish === true) {
			dispatch(resetFetchDraft());
		}
	}, [isPublish]);

	useEffect(() => {
		dispatch(fetchAllDraftProduct());
	}, []);

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
				cell: ({ row }) => {
					return (
						<Popover>
							<PopoverTrigger>
								<HiOutlineDotsHorizontal className='size-6' />
							</PopoverTrigger>
							<PopoverContent
								align='start'
								className='w-40 space-y-2'
							>
								<div className='flex items-center gap-5 cursor-pointer'>
									<MdModeEdit />
									Edit
								</div>
								<AlertDialog>
									<AlertDialogTrigger className='flex items-center gap-5'>
										<IoSettingsSharp />
										Publish
									</AlertDialogTrigger>
									<AlertDialogContent>
										<AlertDialogHeader>
											<AlertDialogTitle>
												Are you absolutely sure?
											</AlertDialogTitle>
											<AlertDialogDescription>
												This action cannot be undone.
												This will permanently delete
												your account and remove your
												data from our servers.
											</AlertDialogDescription>
										</AlertDialogHeader>
										<AlertDialogFooter>
											<AlertDialogCancel>
												Cancel
											</AlertDialogCancel>
											<AlertDialogAction
												onClick={() =>
													dispatch(
														actionPublish(
															row.original._id!,
														),
													)
												}
											>
												Continue
											</AlertDialogAction>
										</AlertDialogFooter>
									</AlertDialogContent>
								</AlertDialog>
								<AlertDialog>
									<AlertDialogTrigger className='flex items-center gap-5'>
										<FaRegTrashAlt />
										Delete
									</AlertDialogTrigger>
									<AlertDialogContent>
										<AlertDialogHeader>
											<AlertDialogTitle>
												Are you sure you want to delete
												this product?
											</AlertDialogTitle>
											<AlertDialogDescription>
												This action will permanently
												delete the product and remove it
												from our records. This action
												cannot be undone.
											</AlertDialogDescription>
										</AlertDialogHeader>
										<AlertDialogFooter>
											<AlertDialogCancel>
												Cancel
											</AlertDialogCancel>
											<AlertDialogAction
												onClick={() =>
													dispatch(
														removeProduct(
															row.original._id!,
														),
													)
												}
											>
												Confirm
											</AlertDialogAction>
										</AlertDialogFooter>
									</AlertDialogContent>
								</AlertDialog>
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
		data: productData,
		columns,
		getCoreRowModel: getCoreRowModel(),
		state: {
			columnOrder,
		},
		onColumnOrderChange: setColumnOrder,
		debugTable: true,
		debugHeaders: true,
		debugColumns: true,
	});

	// reorder columns after drag & drop
	function handleDragEnd(event: DragEndEvent) {
		const { active, over } = event;
		if (active && over && active.id !== over.id) {
			setColumnOrder((columnOrder) => {
				const oldIndex = columnOrder.indexOf(active.id as string);
				const newIndex = columnOrder.indexOf(over.id as string);
				return arrayMove(columnOrder, oldIndex, newIndex); //this is just a splice util
			});
		}
	}

	const sensors = useSensors(
		useSensor(MouseSensor, {}),
		useSensor(TouchSensor, {}),
		useSensor(KeyboardSensor, {}),
	);

	const resetTable = () => {
		setColumnOrder(columns.map((c) => c.id!)); // Đặt lại thứ tự cột
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
							data={productData}
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
			</div>
		</DndContext>
	);
};

export default TableDraftDnD;
