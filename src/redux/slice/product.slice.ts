import {
	actionPublishProduct,
	actionUnPublishProduct,
	deleteProduct,
	fetchAllProductsAPI,
	findAllDraftsForShop,
	findAllPublishForShop,
} from "@/api/product.api";
import { IResponse } from "@/types/backend";
import { IProduct } from "@/types/product";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "sonner";
// types.ts hoặc trong cùng file
interface FetchProductParams {
	limit?: number;
	page?: number;
	// để lọc theo tab
}

export const fetchAllProducts = createAsyncThunk<
	IProduct[],
	FetchProductParams
>("product/fetchAllProduct", async ({ limit = 10, page = 1 }) => {
	const response = await fetchAllProductsAPI({ limit, page });

	const data = response || [];
	return data;
});

export const fetchAllDraftProduct = createAsyncThunk<IProduct[]>(
	"product/fetchAllDraftProduct",
	async () => {
		const response = await findAllDraftsForShop();
		console.log("response~fetchAllDraftProduct", response);
		const data = response || [];
		return data;
	},
);

export const findAllPublishProduct = createAsyncThunk<IProduct[]>(
	"product/findAllPublishProduct",
	async () => {
		const response = await findAllPublishForShop();
		console.log("response~findAllPublishProduct", response);
		const data = response || [];
		return data;
	},
);

export const actionPublish = createAsyncThunk(
	"product/actionPublish",
	async (id: string, thunkAPI) => {
		const response = await actionPublishProduct(id);
		if (response) {
			thunkAPI.dispatch(fetchAllDraftProduct());
			toast.success("The product has been published successfully");
		}
		return response;
	},
);

export const actionUnPublish = createAsyncThunk(
	"product/actionUnPublish",
	async (payload: string, thunkAPI) => {
		const response = await actionUnPublishProduct(payload);
		console.log(" response~", response);

		if (response) {
			thunkAPI.dispatch(findAllPublishProduct());
			toast.success("The product has been saved as a draft.");
		}
		return response;
	},
);

export const removeProduct = createAsyncThunk(
	"product/removeProduct",
	async (id: string, thunkAPI) => {
		const response = await deleteProduct(id);
		// const data = response?.metadata || [];
		if (response) {
			thunkAPI.dispatch(findAllPublishProduct());
			thunkAPI.dispatch(fetchAllDraftProduct());
		}
		return response;
	},
);

const initialState: {
	listProduct: IProduct[] | any;
	listProductAll: IResponse<IProduct[]>;
	isPublish: boolean;
	isUnPublish: boolean;
} = {
	listProduct: [],
	listProductAll: {},
	isPublish: false,
	isUnPublish: false,
};

export const productSlice = createSlice({
	name: "product",
	initialState,
	reducers: {
		resetFetchDraft(state) {
			state.isPublish = false;
		},
		resetFetchPublish(state) {
			state.isUnPublish = false;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchAllProducts.fulfilled, (state, action) => {
				state.listProduct = action.payload;
			})
			.addCase(fetchAllDraftProduct.fulfilled, (state, action) => {
				state.listProduct = action.payload;
				state.isUnPublish = true;
			})
			.addCase(findAllPublishProduct.fulfilled, (state, action) => {
				state.listProduct = action.payload;
				state.isPublish = true;
			});
	},
});
export const { resetFetchDraft, resetFetchPublish } = productSlice.actions;

export default productSlice.reducer;
