import { Product } from "@/components/table/types/table.type";
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
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { useAppDispatch } from "@/redux/hooks";
import { actionUnPublish, removeProduct } from "@/redux/slice/product.slice";
import { ColumnDef } from "@tanstack/react-table";
import { useMemo } from "react";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { IoSettingsSharp } from "react-icons/io5";
import { MdModeEdit } from "react-icons/md";

export const useProductColumns = () => {
	const dispatch = useAppDispatch();
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
				header: () => <span className=''>Product name</span>,
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
					console.log("row~", row);
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
										Draft
									</AlertDialogTrigger>
									<AlertDialogContent>
										<AlertDialogHeader>
											<AlertDialogTitle>
												Are you sure you want to
												unpublish this post?
											</AlertDialogTitle>
											<AlertDialogDescription>
												This action will convert your
												post to draft status and remove
												it from public view. This action
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
														actionUnPublish(
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
								<AlertDialog>
									<AlertDialogTrigger className='flex items-center gap-5'>
										<IoSettingsSharp />
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
};
