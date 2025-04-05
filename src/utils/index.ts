import { IData } from "@/types/backend";

export const isAuthenticate = (): IData | null => {
	const auth = localStorage.getItem("auth");
	if (!auth) {
		return null;
	}
	try {
		const parsedAuth: IData = JSON.parse(auth);
		return parsedAuth;
	} catch (error) {
		console.error("Failed to parse auth data:", error);
		return null;
	}
};

export const getUserIdAndToken = (): IData | null => {
	const tokenString = localStorage.getItem("tokens");
	const authString = localStorage.getItem("auth");

	if (!tokenString || !authString) {
		console.error("No auth or tokens found in localStorage");
		return null;
	}

	const tokens = JSON.parse(tokenString);
	const auth = JSON.parse(authString);

	return {
		...auth,
		tokens: {
			access_token: tokens?.access_token || "",
			refresh_token: tokens?.refresh_token || "",
		},
	};
};
