import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	useSidebar,
} from "@/components/ui/sidebar";
import {
	BadgeCheck,
	Bell,
	ChevronsUpDown,
	CreditCard,
	LogOut,
	Sparkles,
} from "lucide-react";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { authLogout } from "@/redux/slice/auth.slice";
import { IData } from "@/types/backend";
import { Link } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";

export function NavUser() {
	const { isMobile } = useSidebar();
	const data = localStorage.getItem("auth");
	const res: IData = JSON.parse(data as string);
	console.log(" res~", res);

	const dispatch = useAppDispatch();
	const isAuthentication = useAppSelector(
		(state) => state?.auth.isAuthenticated,
	);

	const handleLogout = async () => {
		const res = await dispatch(authLogout());
		console.log("res~", res);
	};

	return (
		<SidebarMenu>
			{isAuthentication === true ? (
				<SidebarMenuItem>
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<SidebarMenuButton
								size='lg'
								className='data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground'
							>
								<Avatar className='w-8 h-8 rounded-lg'>
									<AvatarImage
										src={"q"}
										alt={res?.username}
									/>
									<AvatarFallback className='rounded-lg'>
										CN
									</AvatarFallback>
								</Avatar>
								<div className='grid flex-1 text-sm leading-tight text-left'>
									<span className='font-semibold truncate'>
										{res?.username}
									</span>
									<span className='text-xs truncate'>
										{res?.email}
									</span>
								</div>
								<ChevronsUpDown className='ml-auto size-4' />
							</SidebarMenuButton>
						</DropdownMenuTrigger>
						<DropdownMenuContent
							className='w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg'
							side={isMobile ? "bottom" : "right"}
							align='end'
							sideOffset={4}
						>
							<DropdownMenuLabel className='p-0 font-normal'>
								<div className='flex items-center gap-2 px-1 py-1.5 text-left text-sm'>
									<Avatar className='w-8 h-8 rounded-lg'>
										<AvatarImage src={""} alt={""} />
										<AvatarFallback className='rounded-lg'>
											CN
										</AvatarFallback>
									</Avatar>
									<div className='grid flex-1 text-sm leading-tight text-left'>
										<span className='font-semibold truncate'>
											{res?.username}
										</span>
										<span className='text-xs truncate'>
											{res?.email}
										</span>
									</div>
								</div>
							</DropdownMenuLabel>
							<DropdownMenuSeparator />
							<DropdownMenuGroup>
								<DropdownMenuItem>
									<Sparkles />
									Upgrade to Pro
								</DropdownMenuItem>
							</DropdownMenuGroup>
							<DropdownMenuSeparator />
							<DropdownMenuGroup>
								<DropdownMenuItem>
									<BadgeCheck />
									Account
								</DropdownMenuItem>
								<DropdownMenuItem>
									<CreditCard />
									Billing
								</DropdownMenuItem>
								<DropdownMenuItem>
									<Bell />
									Notifications
								</DropdownMenuItem>
							</DropdownMenuGroup>
							<DropdownMenuSeparator />
							<DropdownMenuItem onClick={handleLogout}>
								<LogOut />
								Log out
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</SidebarMenuItem>
			) : (
				<SidebarMenuItem>
					<Link to={"/sign-in"}>
						<Button className='w-full'>Đăng nhập/Đăng ký</Button>
					</Link>
				</SidebarMenuItem>
			)}
		</SidebarMenu>
	);
}
