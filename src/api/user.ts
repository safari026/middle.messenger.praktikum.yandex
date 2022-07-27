import HTTPTransport from '@/core/ApiServer';

const request = new HTTPTransport();

export type APIError = {
	reason: string;
};

export interface NewPasswordData {
	oldPassword: string;
	newPassword: string;
}

export interface NewUserInfo {
	first_name: string;
	second_name: string;
	display_name: string;
	login: string;
	email: string;
	phone: string;
}

export const userAPI = {
	sendAvatar: (data: FormData) =>
		request.put(`user/profile/avatar`, {
			data,
			headers: {},
		}),

	sendNewPassword: (data: NewPasswordData) => request.put(`user/password`, { data }),

	sendNewUserInfo: (data: NewUserInfo) => request.put(`user/profile`, { data }),

	getUserInfo: (id: number) => request.get(`user/${id}`),
};
