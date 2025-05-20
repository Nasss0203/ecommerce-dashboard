import { IProduct } from "@/types/product";
import { getUserIdAndToken } from "@/utils";
import axios from "../axios/axios";

export const fetchAllProductsAPI = async ({
	limit,
	page,
}: {
	limit: number;
	page: number;
}) => {
	try {
		const response = await axios.get("/products", {
			params: {
				limit,
				page,
			},
		});
		const data = response?.data;
		return data;
	} catch (error) {
		console.error("Error find all product", error);
		throw error;
	}
};

export const createNewProduct = async (ProductController: IProduct) => {
	console.log(" ProductController~", ProductController);
	const { tokens } = getUserIdAndToken() || {};
	const { refresh_token } = tokens || {};
	try {
		const response = await axios.post(
			"/products/create",
			{
				...ProductController,
			},
			{
				headers: {
					Authorization: `Bearer ${refresh_token}`,
				},
			},
		);
		console.log("response~", response);
		return response.data;
	} catch (error) {
		console.error("Error create new product", error);
		throw error;
	}
};

export const findAllDraftsForShop = async () => {
	try {
		const { tokens } = getUserIdAndToken() || {};
		const { refresh_token } = tokens || {};
		const response = await axios.get("/products/draft", {
			headers: {
				Authorization: `Bearer ${refresh_token}`,
			},
		});
		const data = response?.data;
		return data;
	} catch (error) {
		console.error("Error find all draft product", error);
		throw error;
	}
};

export const findAllPublishForShop = async () => {
	try {
		const { tokens } = getUserIdAndToken() || {};
		const { refresh_token } = tokens || {};
		const response = await axios.get("/products/publish", {
			headers: {
				Authorization: `Bearer ${refresh_token}`,
			},
		});
		const data = response?.data;
		return data;
	} catch (error) {
		console.error("Error find all publish product", error);
		throw error;
	}
};

export const actionPublishProduct = async (id: string) => {
	try {
		const { tokens } = getUserIdAndToken() || {};
		const { refresh_token } = tokens || {};
		const response = await axios.post(
			`/products/publish/${id}`,
			{},
			{
				headers: {
					Authorization: `Bearer ${refresh_token}`,
				},
			},
		);
		console.log(" response~", response);
		const data = response?.data;
		return data;
	} catch (error) {
		console.error("Error action publish product", error);
		throw error;
	}
};

export const actionUnPublishProduct = async (id: string) => {
	try {
		const { tokens } = getUserIdAndToken() || {};
		const { refresh_token } = tokens || {};
		const response = await axios.post(
			`/products/unpublish/${id}`,
			{},
			{
				headers: {
					Authorization: `Bearer ${refresh_token}`,
				},
			},
		);
		const data = response?.data;
		return data;
	} catch (error) {
		console.error("Error action unpublish product", error);
		throw error;
	}
};

export const updatedProduct = async (
	productId: string,
	productController: IProduct,
) => {
	try {
		const { tokens, _id } = getUserIdAndToken() || {};
		const { refresh_token } = tokens || {};
		const response = await axios.patch(
			`/products/${productId}`,
			{
				...productController,
				product_auth: _id,
			},
			{
				headers: {
					Authorization: `Bearer ${refresh_token}`,
				},
			},
		);
		return response.data;
	} catch (error) {
		console.error("Error updated product", error);
		throw error;
	}
};

export const deleteProduct = async (productId: string) => {
	try {
		const { tokens } = getUserIdAndToken() || {};
		const { refresh_token } = tokens || {};
		const response = await axios.delete(`/products/delete/${productId}`, {
			headers: {
				Authorization: `Bearer ${refresh_token}`,
			},
		});
		return response.data;
	} catch (error) {
		console.error("Error delete product", error);
		throw error;
	}
};
