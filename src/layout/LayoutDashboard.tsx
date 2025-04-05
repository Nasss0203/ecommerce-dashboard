import { ModeToggle } from "@/components/dark-mode/mode-toggle";
import { AppSidebar } from "@/components/ui/app-sidebar";
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
	SidebarInset,
	SidebarProvider,
	SidebarTrigger,
} from "@/components/ui/sidebar";
import { Separator } from "@radix-ui/react-separator";
import { Outlet } from "react-router-dom";

const LayoutDashboard = () => {
	return (
		<SidebarProvider>
			<AppSidebar />
			<SidebarInset>
				<header className='sticky top-0 z-20 flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12 bg-gray-100 dark:bg-sidebar'>
					<div className='flex items-center justify-between w-full'>
						<div className='flex items-center gap-2 px-4'>
							<SidebarTrigger className='-ml-1' />
							<Separator
								orientation='vertical'
								className='h-4 mr-2'
							/>
							<Breadcrumb>
								<BreadcrumbList>
									<BreadcrumbItem className='hidden md:block'>
										<BreadcrumbLink href='#'>
											Building Your Application
										</BreadcrumbLink>
									</BreadcrumbItem>
									<BreadcrumbSeparator className='hidden md:block' />
									<BreadcrumbItem>
										<BreadcrumbPage>
											Data Fetching
										</BreadcrumbPage>
									</BreadcrumbItem>
								</BreadcrumbList>
							</Breadcrumb>
						</div>
						<div className='px-3'>
							<ModeToggle></ModeToggle>
						</div>
					</div>
				</header>
				<div className='h-full p-5 pt-0 overflow-hidden bg-gray-100 dark:bg-sidebar'>
					<div className='overflow-y-auto'>
						<Outlet></Outlet>
					</div>
				</div>
			</SidebarInset>
		</SidebarProvider>
	);
};

export default LayoutDashboard;
