import {
	AudioWaveform,
	Command,
	Frame,
	GalleryVerticalEnd,
	Map,
	PieChart,
	SquareTerminal,
} from "lucide-react";

export const data = {
	user: {
		name: "shadcn",
		email: "m@example.com",
		avatar: "/avatars/shadcn.jpg",
	},
	teams: [
		{
			name: "Acme Inc",
			logo: GalleryVerticalEnd,
			plan: "Enterprise",
		},
		{
			name: "Acme Corp.",
			logo: AudioWaveform,
			plan: "Startup",
		},
		{
			name: "Evil Corp.",
			logo: Command,
			plan: "Free",
		},
	],
	navMain: [
		{
			title: "E-Commerce",
			url: "/",
			icon: SquareTerminal,
			// isActive: true,
			items: [
				{
					title: "Overview",
					url: "/",
				},
				{
					title: "Product",
					url: "/products",
				},
				{
					title: "Order",
					url: "/orders",
				},
				{
					title: "Vouchers",
					url: "/voucher",
				},
			],
		},
	],
	projects: [
		{
			name: "Design Engineering",
			url: "#",
			icon: Frame,
		},
		{
			name: "Sales & Marketing",
			url: "#",
			icon: PieChart,
		},
		{
			name: "Travel",
			url: "#",
			icon: Map,
		},
	],
};
