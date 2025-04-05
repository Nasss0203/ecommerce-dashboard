import { ChevronRight, type LucideIcon } from "lucide-react";

import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
	SidebarGroup,
	SidebarGroupLabel,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarMenuSub,
	SidebarMenuSubButton,
	SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { NavLink } from "react-router-dom";
function RenderSidebar({
	items,
}: {
	items: {
		title: string;
		url: string;
		icon?: LucideIcon;
		isActive?: boolean;
		items?: {
			title: string;
			url: string;
			items?: {
				title: string;
				url: string;
			}[];
		}[];
	}[];
}) {
	return (
		<>
			{items.map((item) => (
				<Collapsible
					key={item.title}
					asChild
					defaultOpen={item.isActive}
					className='group/collapsible'
				>
					<SidebarMenuItem>
						<CollapsibleTrigger asChild>
							<SidebarMenuButton tooltip={item.title}>
								{item.icon && <item.icon />}
								<span>{item.title}</span>
								<ChevronRight className='ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90' />
							</SidebarMenuButton>
						</CollapsibleTrigger>
						{item.items && item.items.length > 0 && (
							<CollapsibleContent>
								<SidebarMenuSub>
									{item.items.map((subItem) =>
										subItem.items ? (
											<RenderSidebar
												key={subItem.title}
												items={[subItem]}
											/>
										) : (
											<SidebarMenuSubItem
												key={subItem.title}
											>
												<SidebarMenuSubButton asChild>
													<NavLink to={subItem.url}>
														<span>
															{subItem.title}
														</span>
													</NavLink>
												</SidebarMenuSubButton>
											</SidebarMenuSubItem>
										),
									)}
								</SidebarMenuSub>
							</CollapsibleContent>
						)}
					</SidebarMenuItem>
				</Collapsible>
			))}
		</>
	);
}

export function NavMain({
	items,
}: {
	items: {
		title: string;
		url: string;
		icon?: LucideIcon;
		isActive?: boolean;
		items?: {
			title: string;
			url: string;
		}[];
	}[];
}) {
	return (
		<SidebarGroup>
			<SidebarGroupLabel>App & Pages</SidebarGroupLabel>
			<SidebarMenu>
				<RenderSidebar items={items}></RenderSidebar>
			</SidebarMenu>
		</SidebarGroup>
	);
}
