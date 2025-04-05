export type Product = {
	_id?: string;
	product_name: string;
	product_price: number;
	product_quantity: number;
	product_thumb: string;
	product_category: {
		_id: string;
		category_name: string;
	};
};
