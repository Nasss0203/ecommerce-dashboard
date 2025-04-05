import { ChartArea, ChartBar, ChartCircle } from "@/components/chart";
import { BsBoxFill } from "react-icons/bs";
import {
	FaArrowTrendUp,
	FaChartLine,
	FaMoneyCheckDollar,
} from "react-icons/fa6";
const Overview = () => {
	return (
		<div className='flex flex-col gap-6'>
			<div className='flex items-center justify-between'>
				<h3 className='font-medium leading-[38px] text-2xl'>
					Overview
				</h3>
			</div>
			<div className='grid grid-cols-12 gap-6'>
				<div className='flex flex-col col-span-9 gap-6'>
					<div className='grid grid-cols-12 gap-6'>
						<div className='col-span-3 p-5 bg-white rounded-md shadow dark:bg-neutral-700'>
							<div className='flex justify-between'>
								<div className='flex flex-col gap-1'>
									<span className='text-base font-medium'>
										Total reveune
									</span>
									<span className='text-[28px] font-bold'>
										40,689
									</span>
								</div>
								<div className='flex flex-col gap-3'>
									<div className='w-12 h-12 bg-[#8280FF] rounded-full flex items-center justify-center'>
										<span className='text-2xl text-white'>
											<FaMoneyCheckDollar />
										</span>
									</div>
									<div className='flex items-center gap-1 text-green-500'>
										<span className='text-green-500'>
											<FaArrowTrendUp />
										</span>
										<span>5.2%</span>
									</div>
								</div>
							</div>
						</div>
						<div className='col-span-3 p-5 bg-white rounded-md shadow dark:bg-neutral-700'>
							<div className='flex justify-between'>
								<div className='flex flex-col gap-1'>
									<span className='text-base font-medium'>
										Total order
									</span>
									<span className='text-[28px] font-bold'>
										40,689
									</span>
								</div>
								<div className='flex flex-col gap-3'>
									<div className='w-12 h-12 bg-[#FEC53D] rounded-full flex items-center justify-center'>
										<span className='text-2xl text-white'>
											<BsBoxFill />
										</span>
									</div>
									<div className='flex items-center gap-1 text-green-500'>
										<span className='text-green-500'>
											<FaArrowTrendUp />
										</span>
										<span>5.2%</span>
									</div>
								</div>
							</div>
						</div>
						<div className='col-span-3 p-5 bg-white rounded-md shadow dark:bg-neutral-700'>
							<div className='flex justify-between'>
								<div className='flex flex-col gap-1'>
									<span className='text-base font-medium'>
										Total sales
									</span>
									<span className='text-[28px] font-bold'>
										40,689
									</span>
								</div>
								<div className='flex flex-col gap-3'>
									<div className='flex items-center justify-center w-12 h-12 bg-green-500 rounded-full'>
										<span className='text-2xl text-white'>
											<FaChartLine />
										</span>
									</div>
									<div className='flex items-center gap-1 text-green-500'>
										<span className='text-green-500'>
											<FaArrowTrendUp />
										</span>
										<span>5.2%</span>
									</div>
								</div>
							</div>
						</div>
						<div className='col-span-3 p-5 bg-white rounded-md shadow dark:bg-neutral-700'>
							<div className='flex justify-between'>
								<div className='flex flex-col gap-1'>
									<span className='text-base font-medium'>
										Total delivery
									</span>
									<span className='text-[28px] font-bold'>
										40,689
									</span>
								</div>
								<div className='flex flex-col gap-3'>
									<div className='flex items-center justify-center w-12 h-12 bg-blue-500 rounded-full'>
										<span className='text-2xl text-white'>
											<FaMoneyCheckDollar />
										</span>
									</div>
									<div className='flex items-center gap-1 text-green-500'>
										<span className='text-green-500'>
											<FaArrowTrendUp />
										</span>
										<span>5.2%</span>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className='grid grid-cols-12 gap-6'>
						{/* <div className='col-span-6 p-5 bg-white rounded-md shadow dark:bg-neutral-700'>
						
						</div> */}
						<div className='col-span-6'>
							<ChartArea></ChartArea>
						</div>
						<div className='col-span-6'>
							<ChartBar></ChartBar>
						</div>
					</div>
				</div>
				<div className='col-span-3'>
					<div className='p-5 bg-white rounded-md shadow dark:bg-[#0a0a0a]'>
						<ChartCircle></ChartCircle>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Overview;
