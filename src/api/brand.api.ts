import axios from "../axios/axios";

export const findAllBrand = async (categoryId: string) => {
	const response = await axios.get("/brand", {
		params: {
			categoryId,
		},
	});
	return response.data;
};
