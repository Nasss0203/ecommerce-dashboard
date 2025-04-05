import { IOrder } from "@/types/order";
// import { getUserIdAndToken } from "@/utils";
import axios from "../axios/axios";

interface ICreateOrder {
	userId: string;
	cartId: string;
	checkoutId: string;
	use_address: {
		street: string;
		city: string;
		country: string;
	};
}

export const createOrder = async ({
	checkoutId,
	userId,
	cartId,
	use_address: { city, country, street },
}: ICreateOrder) => {
	try {
		const response = await axios.post("/order", {
			checkoutId,
			cartId,
			userId,
			use_address: { city, country, street },
		});
		const data = response.data;
		return data;
	} catch (error) {
		throw error;
	}
};

export const getAllOrderAdmin = async () => {
	try {
		const response = await axios.get("/order/viewAll");
		const data = response.data;
		return data;
	} catch (error) {
		throw error;
	}
};

export const getAllOrderByUser = async () => {
	try {
		// const { refreshToken, userId } = getUserIdAndToken();
		// const response = await axios.get("/order", {
		// 	headers: {
		// 		"x-client-id": userId,
		// 		"x-rtoken-id": refreshToken,
		// 	},
		// });
		// const data = response.data;
		// return data;
	} catch (error) {
		throw error;
	}
};

export const updateOrderByAdmin = async ({
	id,
	payload,
}: {
	id: string;
	payload: IOrder;
}) => {
	try {
		const response = await axios.patch(`/order/update/${id}`, {
			...payload,
		});
		const data = response.data;
		return data;
	} catch (error) {
		throw error;
	}
};

export const getOrder = async ({
	userId,
	orderId,
}: {
	userId: string;
	orderId: string;
}) => {
	try {
		const response = await axios.get(`/order/${orderId}`, {
			params: {
				userId: userId,
			},
		});

		const data = response.data;
		return data;
	} catch (error) {
		throw error;
	}
};
