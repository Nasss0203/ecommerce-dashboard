import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { attributesPhone } from "@/constants/attributes";
import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { ScrollArea } from "../ui/scroll-area";
const AttributePhone = () => {
	const { control } = useFormContext();
	const [_selectedRam, setSelectedRam] = useState<string>("");
	// const [selectedBrand, setSelectedBrand] = useState<string>("");
	// const [selectedScreen, setSelectedScreen] = useState<string>("");
	// const [selectedStorageCapacity, setSelectedStorageCapacity] =
	// 	useState<string>("");

	return (
		<>
			<FormField
				control={control}
				name='product_attributes.brand'
				render={({ field }) => (
					<FormItem>
						<FormLabel>Brand</FormLabel>
						<FormControl>
							<Select
								onValueChange={(value) => {
									field.onChange(value);
									setSelectedRam(value);
								}}
								value={field.value}
							>
								<SelectTrigger className='flex-1'>
									<SelectValue placeholder='Select Ram' />
								</SelectTrigger>
								<SelectContent>
									<ScrollArea className='w-full h-[120px] rounded-md'>
										{attributesPhone.brand.map(
											(item, index) => (
												<SelectItem
													value={item.name}
													key={index}
													className=''
												>
													{item.name}
												</SelectItem>
											),
										)}
									</ScrollArea>
								</SelectContent>
							</Select>
						</FormControl>
					</FormItem>
				)}
			/>
			<FormField
				control={control}
				name='product_attributes.ram'
				render={({ field }) => (
					<FormItem>
						<FormLabel>Ram</FormLabel>
						<FormControl>
							<Select
								onValueChange={(value) => {
									field.onChange(value);
									setSelectedRam(value);
								}}
								value={field.value}
							>
								<SelectTrigger className='flex-1'>
									<SelectValue placeholder='Select Ram' />
								</SelectTrigger>
								<SelectContent>
									<ScrollArea className='w-full h-[120px] rounded-md'>
										{attributesPhone.ram.map(
											(item, index) => (
												<SelectItem
													value={item.name}
													key={index}
													className=''
												>
													{item.name}
												</SelectItem>
											),
										)}
									</ScrollArea>
								</SelectContent>
							</Select>
						</FormControl>
					</FormItem>
				)}
			/>
			<FormField
				control={control}
				name='product_attributes.screen'
				render={({ field }) => (
					<FormItem>
						<FormLabel>Screen</FormLabel>
						<FormControl>
							<Select
								onValueChange={(value) => {
									field.onChange(value);
									setSelectedRam(value);
								}}
								value={field.value}
							>
								<SelectTrigger className='flex-1'>
									<SelectValue placeholder='Select Ram' />
								</SelectTrigger>
								<SelectContent>
									<ScrollArea className='w-full h-[120px] rounded-md'>
										{attributesPhone.screen.map(
											(item, index) => (
												<SelectItem
													value={item.name}
													key={index}
													className=''
												>
													{item.name}
												</SelectItem>
											),
										)}
									</ScrollArea>
								</SelectContent>
							</Select>
						</FormControl>
					</FormItem>
				)}
			/>
			<FormField
				control={control}
				name='product_attributes.storage_capacity'
				render={({ field }) => (
					<FormItem>
						<FormLabel> Storage capacity</FormLabel>
						<FormControl>
							<Select
								onValueChange={(value) => {
									field.onChange(value);
									setSelectedRam(value);
								}}
								value={field.value}
							>
								<SelectTrigger className='flex-1'>
									<SelectValue placeholder='Select Ram' />
								</SelectTrigger>
								<SelectContent>
									<ScrollArea className='w-full h-[120px] rounded-md'>
										{attributesPhone.storage_capacity.map(
											(item, index) => (
												<SelectItem
													value={item.name}
													key={index}
													className=''
												>
													{item.name}
												</SelectItem>
											),
										)}
									</ScrollArea>
								</SelectContent>
							</Select>
						</FormControl>
					</FormItem>
				)}
			/>
		</>
	);
};

export default AttributePhone;
