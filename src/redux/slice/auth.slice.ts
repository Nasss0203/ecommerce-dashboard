import { login, logout, register } from "@/api/auth.api";
import { IAuth } from "@/types/auth";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "sonner";

export const authRegister = createAsyncThunk(
	"auth/authRegister",
	async (payload: IAuth, thunkAPI) => {
		const response = await register({ ...payload });
		if (response) {
			toast.success("Register successfully");
		}
		return response;
	},
);

export const authLogin = createAsyncThunk(
	"auth/authLogin",
	async (payload: IAuth, thunkAPI) => {
		const response = await login({ ...payload });
		return response;
	},
);

export const authLogout = createAsyncThunk("auth/logout", async () => {
	const response = await logout();

	if (response) {
		localStorage.removeItem("auth");
		localStorage.removeItem("tokens");
	}
	return response;
});

const initialState: {
	isAuthenticated: boolean;
	isLoading: boolean;
	auth: {
		_id: string;
		username: string;
		email: string;
		roles: [string];
	};
} = {
	isAuthenticated: false,
	isLoading: false,
	auth: {
		_id: "",
		username: "",
		email: "",
		roles: [""],
	},
};

// Slice quản lý xác thực
export const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(authLogin.fulfilled, (state, action) => {
				state.isAuthenticated = true;
				state.isLoading = false;
				state.auth = action.payload;
			})
			.addCase(authLogin.rejected, (state) => {
				state.isLoading = false;
			})
			.addCase(authRegister.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(authRegister.fulfilled, (state, action) => {
				state.auth = action.payload;
				state.isAuthenticated = true;
				state.isLoading = false;
			})
			.addCase(authRegister.rejected, (state) => {
				state.isLoading = false;
			})
			.addCase(authLogout.fulfilled, (state) => {
				state.isAuthenticated = false;
				state.auth = { _id: "", username: "", email: "", roles: [""] };
			});
	},
});

// Export hành động và reducer
export const {} = authSlice.actions;
export default authSlice.reducer;
