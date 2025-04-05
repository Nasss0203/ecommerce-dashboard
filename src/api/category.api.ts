import axios from "../axios/axios";
export const findAllCategory = async () => {
	const response = await axios.get("/category");
	return response.data;
};
