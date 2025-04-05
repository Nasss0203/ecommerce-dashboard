import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarRail,
} from "@/components/ui/sidebar";
import { data } from "@/constants/sidebar";
import * as React from "react";
import { Link } from "react-router-dom";
import { NavMain } from "../nav/nav-main";
import { NavProjects } from "../nav/nav-projects";
import { NavUser } from "../nav/nav-user";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
	return (
		<Sidebar collapsible='icon' {...props}>
			<SidebarHeader>
				{/* <TeamSwitcher teams={data.teams} /> */}
				<SidebarMenu>
					<SidebarMenuItem>
						<SidebarMenuButton
							size='lg'
							className='data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground hover:bg-transparent'
						>
							<Link to={"/"} className='flex items-center '>
								<div className='flex items-center justify-center rounded-lg aspect-square size-8 '>
									<img srcSet='sneat-logo.png 2x' alt='' />
								</div>
								<div className='grid flex-1 text-sm leading-tight text-left'>
									<span className='font-bold text-[28px]'>
										Dashboard
									</span>
								</div>
							</Link>
						</SidebarMenuButton>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarHeader>
			<SidebarContent>
				<NavMain items={data.navMain} />
				<NavProjects projects={data.projects} />
			</SidebarContent>
			<SidebarFooter>
				<NavUser />
			</SidebarFooter>
			<SidebarRail />
		</Sidebar>
	);
}
