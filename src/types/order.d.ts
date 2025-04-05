export interface IOrderCheckout {
	totalPrice?: number;
	totalApplyDiscount?: number;
	grandTotal?: number;
	feeShip?: number;
}

export interface IOrderProduct {
	productId?: string;
	quantity?: number;
	price?: number;
	discount?: number;
	totalPrice?: number;
}

export interface IOrder {
	_id?: string;
	createdOn?: string;
	modifiedOn?: string;
	order_cancel?: any;
	order_checkout?: OrderCheckout;
	order_products?: OrderProduct[];
	order_payment?: {
		status: "pending" | "paid" | "failed";
	};
	order_status?:
		| "pending"
		| "confirmed"
		| "shipped"
		| "cancelled"
		| "delivered";
	order_tracking?: string;
	order_userId?: string;
}
