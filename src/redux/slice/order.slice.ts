import { getAllOrderAdmin } from "@/api/order.api";
import { IOrder } from "@/types/order";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchAllOrderAdmin = createAsyncThunk<IOrder[]>(
	"order/fetchAllOrderAdmin",
	async () => {
		const response = await getAllOrderAdmin();
		console.log("response~", response);
		const data = response?.metadata || [];
		return data;
	},
);

const initialState: {
	listOrderAdmin: IOrder[];
} = {
	listOrderAdmin: [],
};

export const productSlice = createSlice({
	name: "order",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(fetchAllOrderAdmin.fulfilled, (state, action) => {
			state.listOrderAdmin = action.payload;
		});
	},
});
export const {} = productSlice.actions;

export default productSlice.reducer;
