export interface IBackEnd<T> {
	message: string;
	metadata: T;
	status: number;
}

export interface IResponse<T> {
	currentPage?: number;
	data?: T;
	totalPages?: number;
}

export interface IData {
	_id?: string;
	email?: string;
	username?: string;
	roles?: string[];
	tokens?: {
		access_token: string;
		refresh_token: string;
	};
}
