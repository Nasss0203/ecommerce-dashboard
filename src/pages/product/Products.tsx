import { DialogProduct } from "@/components/dialog";
import { TableDnD, TableDraftDnD, TablePublishDnD } from "@/components/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAppDispatch } from "@/redux/hooks";
import {
	fetchAllDraftProduct,
	fetchAllProducts,
	findAllPublishProduct,
} from "@/redux/slice/product.slice";

const Products = () => {
	const dispatch = useAppDispatch();

	const handleTabChange = (value: string) => {
		if (value === "all") {
			dispatch(fetchAllProducts());
		} else if (value === "publish") {
			dispatch(findAllPublishProduct());
		} else if (value === "draft") {
			dispatch(fetchAllDraftProduct());
		}
	};

	return (
		<div className='flex flex-col gap-6'>
			<Tabs
				defaultValue='all'
				className='space-y-4'
				onValueChange={handleTabChange}
			>
				<div className='flex items-center justify-between'>
					<TabsList>
						<TabsTrigger value='all'>All</TabsTrigger>
						<TabsTrigger value='publish'>Publish</TabsTrigger>
						<TabsTrigger value='draft'>Draft</TabsTrigger>
					</TabsList>
					<DialogProduct></DialogProduct>
				</div>
				<div className='flex flex-col gap-6 p-5 overflow-hidden overflow-y-auto bg-white rounded-md shadow dark:bg-neutral-700'>
					<TabsContent value='all' className=''>
						<div className='overflow-y-auto '>
							<TableDnD></TableDnD>
						</div>
					</TabsContent>
					<TabsContent value='publish'>
						<div className='overflow-y-auto'>
							<TablePublishDnD></TablePublishDnD>
						</div>
					</TabsContent>
					<TabsContent value='draft'>
						<div className='overflow-y-auto'>
							<TableDraftDnD></TableDraftDnD>
						</div>
					</TabsContent>
				</div>
			</Tabs>
		</div>
	);
};

export default Products;
