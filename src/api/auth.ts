import HTTPTransport from '../core/ApiServer';

const request = new HTTPTransport();

type LoginRequestData = {
	login: string;
	password: string;
};

export type APIError = {
	reason: string;
};

export interface NewUser {
	first_name: string;
	second_name: string;
	login: string;
	email: string;
	phone: string;
}

export const authAPI = {
	login: (data: LoginRequestData) => request.post(`auth/signin`, { data }),

	register: (data: NewUser) => request.post(`auth/signup`, { data }),

	me: () => request.get(`auth/user`),

	logout: () => request.post(`auth/logout`),
};
