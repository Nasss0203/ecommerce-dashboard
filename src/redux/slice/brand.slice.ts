import { findAllBrand } from "@/api/brand.api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getAllBrand = createAsyncThunk(
	"brand/getAllBrand",
	async (payload: any) => {
		const response = await findAllBrand(payload);
		console.log(" response~", response);

		return response.data;
	},
);

const initialState: {
	listBrand: {
		_id: string;
		brand_name: string;
		categories: string;
	}[];
} = {
	listBrand: [],
};

// Slice quản lý xác thực
export const authSlice = createSlice({
	name: "brand",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(getAllBrand.fulfilled, (state, action) => {
			state.listBrand = action.payload;
		});
	},
});

// Export hành động và reducer
export const {} = authSlice.actions;
export default authSlice.reducer;
