export interface IPhones {
	brand?: string;
	ram?: string;
	screen?: string;
	data?: string;
	product_auth?: string | undefined;
}

export interface ILaptops {
	brand?: string;
	ram?: string;
	screen?: string;
	ssd?: string;
	cpu?: string;
	product_auth?: string | undefined;
}

export interface ITablet {
	brand?: string;
	ram?: string;
	screen?: string;
	pin?: string;
	product_auth?: string | undefined;
}

export interface IProduct {
	_id: string;
	product_auth?: string | undefined;
	product_name: string;
	product_thumb: string;
	product_description: string;
	product_slug: string;
	product_price: number;
	product_quantity: number;
	product_discount?: number;
	product_stock?: number;
	product_category: string;
	product_attributes: Record<string | any>;
}
