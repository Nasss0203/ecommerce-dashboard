import TableListOrder from "@/components/table/TableListOrder";

const ListOrder = () => {
	return (
		<div className='flex flex-col gap-6 p-5 overflow-hidden overflow-y-auto bg-white rounded-md shadow dark:bg-neutral-700'>
			<div className='overflow-y-auto '>
				<TableListOrder></TableListOrder>
			</div>
		</div>
	);
};

export default ListOrder;
