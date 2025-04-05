import { findAllCategory } from "@/api/category.api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getAllCategory = createAsyncThunk(
	"category/findAllCategory",
	async () => {
		const response = await findAllCategory();
		console.log(" response~", response);

		return response.data;
	},
);

const initialState: {
	listCategory: {
		_id: string;
		category_name: string;
	}[];
} = {
	listCategory: [],
};

// Slice quản lý xác thực
export const authSlice = createSlice({
	name: "category",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(getAllCategory.fulfilled, (state, action) => {
			state.listCategory = action.payload;
		});
	},
});

// Export hành động và reducer
export const {} = authSlice.actions;
export default authSlice.reducer;
