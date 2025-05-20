import { createNewProduct } from "@/api/product.api";
import { uploadFile, uploadMultipleFile } from "@/api/upload.api";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { getAllBrand } from "@/redux/slice/brand.slice";
import { getAllCategory } from "@/redux/slice/category.slice";
import { getUserIdAndToken } from "@/utils";
import {
	CreateNewProductBody,
	CreateNewProductType,
} from "@/validations/product.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import EditorQuill from "../editor/EditorQuill";
import UploadImage from "../input/UploadImage";
import { Button } from "../ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "../ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { Input } from "../ui/input";
import { ScrollArea } from "../ui/scroll-area";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "../ui/select";

const DialogProduct = () => {
	const { _id } = getUserIdAndToken() || {};

	const [preview, setPreview] = useState<string | null>(null);
	const [selectedCategory, setSelectedCategory] = useState<string | null>(
		null,
	);

	const [uploadProgress, setUploadProgress] = useState(0);
	const [fileUpload, setFileUpload] = useState<File | null>(null);
	// const srcFile = fileUpload ? URL.createObjectURL(fileUpload) : undefined;
	const [multipleFiles, setMultipleFiles] = useState<File[]>([]);
	const [previews, setPreviews] = useState<string[]>([]);

	const dispatch = useAppDispatch();
	const categorySelector = useAppSelector(
		(state) => state.category.listCategory,
	);

	const brandSelector = useAppSelector((state) => state.brand.listBrand);

	useEffect(() => {
		dispatch(getAllCategory());
	}, []);

	useEffect(() => {
		if (selectedCategory) {
			dispatch(getAllBrand(selectedCategory));
		}
	}, [selectedCategory, dispatch]);

	const form = useForm<CreateNewProductType>({
		resolver: zodResolver(CreateNewProductBody),
		defaultValues: {
			product_name: "",
			product_description: "",
			product_thumb: "",
			product_price: 0,
			product_quantity: 0,
			product_images: [""],
			product_category: "",
			product_brand: "",
			product_auth: _id,
			product_attributes: {},
		},
	});

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (file) {
			const reader = new FileReader();
			reader.onloadend = () => {
				setPreview(reader.result as string);
			};
			reader.readAsDataURL(file);
		}

		if (e.target.files && e.target.files[0]) {
			setFileUpload(e.target.files[0]);
		}
	};

	const handleMultipleFileChange = (
		e: React.ChangeEvent<HTMLInputElement>,
	) => {
		const files = Array.from(e.target.files || []);
		if (files.length > 0) {
			setMultipleFiles(files);

			const fileReaders = files.map(
				(file) =>
					new Promise<string>((resolve) => {
						const reader = new FileReader();
						reader.onloadend = () =>
							resolve(reader.result as string);
						reader.readAsDataURL(file);
					}),
			);

			Promise.all(fileReaders).then((results) => {
				setPreviews(results);
			});
		}
	};

	const onSubmit = async (values: any) => {
		try {
			const formData = new FormData();
			if (fileUpload) {
				formData.append("file", fileUpload);
			}

			if (fileUpload) {
				const uploadResponse = await uploadFile(
					formData,
					setUploadProgress,
				);
				console.log(
					"uploadResponse: ",
					uploadResponse?.metadata?.thumb_url,
				);
				console.log("uploadResponse~", uploadResponse);

				values.product_thumb = uploadResponse?.data?.thumb_url;
			}

			if (multipleFiles.length > 0) {
				const uploadResponse = await uploadMultipleFile(
					multipleFiles,
					setUploadProgress,
				);

				if (Array.isArray(uploadResponse?.data)) {
					values.product_images = uploadResponse.data.map(
						(file: any) => file.thumb_url,
					);
				} else {
					console.warn(
						"Invalid response format from uploadMultipleFile",
					);
				}
			}

			const response = await createNewProduct(values);

			if (response) {
				form.reset();
				setFileUpload(null);
				setPreview(null);
				setMultipleFiles([]);
				setPreviews([]);
			}
			toast.success("Product created successfully");
		} catch (error) {
			console.error("Error during product creation:", error);
			toast.error("Create new product unsuccessful. Please try again.");
		}
	};

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant='default'>Add product</Button>
			</DialogTrigger>
			<Form {...form}>
				<DialogContent className='h-screen mt-5 mb-7 lg:max-w-7xl 2xl:max-w-[1636px]'>
					<DialogHeader>
						<DialogTitle>add product</DialogTitle>
						<DialogDescription>
							Make changes to your profile here. Click save when
							you're done.
						</DialogDescription>
					</DialogHeader>
					<ScrollArea className='w-full h-full'>
						<form
							action=''
							autoComplete='off'
							onSubmit={form.handleSubmit(onSubmit)}
						>
							<div className='grid grid-cols-12 gap-6'>
								<div className='flex flex-col col-span-8 gap-6'>
									<div className='p-5 bg-white rounded-md shadow dark:bg-neutral-700'>
										<h4 className='mb-2 text-base font-medium'>
											Product information
										</h4>
										<div className='space-y-3'>
											<FormField
												control={form.control}
												name='product_name'
												render={({ field }) => (
													<FormItem>
														<FormLabel>
															Name
														</FormLabel>
														<FormControl>
															<Input
																placeholder='shadcn'
																{...field}
															/>
														</FormControl>
													</FormItem>
												)}
											/>
											<div className='flex items-center w-full gap-3'>
												<FormField
													control={form.control}
													name='product_category'
													render={({ field }) => (
														<FormItem className='flex-1'>
															<FormLabel>
																Category
															</FormLabel>
															<FormControl>
																<Select
																	onValueChange={(
																		value,
																	) => {
																		field.onChange(
																			value,
																		);
																		setSelectedCategory(
																			value,
																		);
																	}}
																>
																	<SelectTrigger className='w-full'>
																		<SelectValue placeholder='Select category' />
																	</SelectTrigger>
																	<SelectContent>
																		{categorySelector.map(
																			(
																				item,
																			) => (
																				<SelectItem
																					value={
																						item._id
																					}
																					key={
																						item._id
																					}
																				>
																					{
																						item.category_name
																					}
																				</SelectItem>
																			),
																		)}
																	</SelectContent>
																</Select>
															</FormControl>
														</FormItem>
													)}
												/>
												<FormField
													control={form.control}
													name='product_brand'
													render={({ field }) => (
														<FormItem className='flex-1'>
															<FormLabel>
																Brand
															</FormLabel>
															<FormControl>
																<Select
																	onValueChange={(
																		value,
																	) => {
																		field.onChange(
																			value,
																		);
																	}}
																	// value={field.value}
																>
																	<SelectTrigger className='w-full'>
																		<SelectValue placeholder='Select brand' />
																	</SelectTrigger>
																	<SelectContent>
																		{brandSelector.map(
																			(
																				item,
																			) => (
																				<SelectItem
																					value={
																						item._id
																					}
																					key={
																						item._id
																					}
																				>
																					{
																						item.brand_name
																					}
																				</SelectItem>
																			),
																		)}
																	</SelectContent>
																</Select>
															</FormControl>
														</FormItem>
													)}
												/>
											</div>
											<FormField
												control={form.control}
												name='product_description'
												render={({ field }) => (
													<FormItem>
														<FormLabel>
															Description
														</FormLabel>
														<FormControl>
															<EditorQuill
																value={
																	field.value
																}
																onChange={
																	field.onChange
																}
															></EditorQuill>
														</FormControl>
													</FormItem>
												)}
											/>
										</div>
									</div>

									<div className='p-5 bg-white rounded-md shadow dark:bg-neutral-700'>
										<FormField
											control={form.control}
											name='product_thumb'
											render={() => (
												<FormItem>
													<FormLabel>
														Image product
													</FormLabel>
													<FormControl>
														<UploadImage
															preview={preview}
															handleFileChange={
																handleFileChange
															}
														></UploadImage>
													</FormControl>
												</FormItem>
											)}
										/>
									</div>
								</div>
								<div className='flex flex-col col-span-4 gap-6'>
									<div className='p-5 bg-white rounded-md shadow dark:bg-neutral-700'>
										<h4 className='mb-2 text-base font-medium'>
											Price & Quantity
										</h4>
										<FormField
											control={form.control}
											name='product_price'
											render={({ field }) => (
												<FormItem>
													<FormLabel>Price</FormLabel>
													<FormControl>
														<Input
															type='number'
															placeholder='Enter product price'
															{...field}
															onChange={(e) =>
																field.onChange(
																	parseFloat(
																		e.target
																			.value,
																	),
																)
															}
														/>
													</FormControl>
												</FormItem>
											)}
										/>
										<FormField
											control={form.control}
											name='product_quantity'
											render={({ field }) => (
												<FormItem>
													<FormLabel>
														Quantity
													</FormLabel>
													<FormControl>
														<Input
															type='number'
															{...field}
															onChange={(e) =>
																field.onChange(
																	parseFloat(
																		e.target
																			.value,
																	),
																)
															}
														/>
													</FormControl>
												</FormItem>
											)}
										/>
									</div>
									<div className='p-5 bg-white rounded-md shadow dark:bg-neutral-700 h-[350px]'>
										<h4 className='mb-2 text-base font-medium'>
											Attributes
										</h4>
										<div className='h-full overflow-hidden overflow-y-auto'>
											{/* <AttributesForm
										category={selectedCategory}
									></AttributesForm> */}
										</div>
									</div>
									<div className='p-5 bg-white rounded-md shadow dark:bg-neutral-700 h-[350px]'>
										<h4 className='mb-2 text-base font-medium'>
											Images
										</h4>
										<div>
											<label
												htmlFor='multiple-upload'
												className='block mb-2 font-semibold'
											>
												Upload multiple images:
											</label>

											<input
												id='multiple-upload'
												type='file'
												multiple
												accept='image/*'
												onChange={
													handleMultipleFileChange
												}
												className='mb-4'
											/>

											{uploadProgress > 0 &&
												uploadProgress < 100 && (
													<div className='mb-4'>
														Uploading:{" "}
														{uploadProgress}%
													</div>
												)}

											{/* Previews */}
											{previews.length > 0 && (
												<div className='flex flex-wrap gap-2'>
													{previews.map(
														(src, index) => (
															<img
																key={index}
																src={src}
																alt={`preview-${index}`}
																className='object-cover w-20 h-20 border rounded'
															/>
														),
													)}
												</div>
											)}
										</div>
									</div>
								</div>
							</div>
							<DialogFooter className='px-5'>
								<Button type='submit'>Save changes</Button>
							</DialogFooter>
						</form>
					</ScrollArea>
				</DialogContent>
			</Form>
		</Dialog>
	);
};

export default DialogProduct;
