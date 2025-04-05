import { IAuth } from "@/types/auth";
// import { getUserIdAndToken } from "@/utils";
import axios from "../axios/axios";

export const register = async ({ username, email, password }: IAuth) => {
	try {
		const response = await axios.post("/auth/register", {
			username,
			password,
			email,
		});
		return response.data;
	} catch (error) {
		console.error("Error during sign up:", error);
		throw error;
	}
};

export const login = async ({ email, password }: IAuth) => {
	try {
		const response = await axios.post("/auth/login", {
			email,
			password,
		});
		const metadata = response.data;

		if (metadata) {
			const { tokens, ...userData } = metadata.data;
			localStorage.setItem("auth", JSON.stringify(userData));
			localStorage.setItem("tokens", JSON.stringify(tokens));
		}
		return response.data;
	} catch (error) {
		console.error("Error during sign in:", error);
		throw error;
	}
};

export const logout = async () => {
	try {
		const tokenString = localStorage.getItem("tokens");

		if (!tokenString) {
			console.error("No auth or tokens found in localStorage");
			return;
		}

		const tokens = JSON.parse(tokenString);
		const refreshToken = tokens?.refresh_token || "";

		const response = await axios.post(
			"/auth/logout",
			{},
			{
				headers: {
					Authorization: `Bearer ${refreshToken}`,
				},
			},
		);
		console.log(" response~", response);

		return response;
	} catch (error) {
		console.error("Error during log out:", error);
		throw error;
	}
};
