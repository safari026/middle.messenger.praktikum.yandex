import HTTPTransport from 'core/ApiServer';

const request = new HTTPTransport();
export interface CreateSoketProps {
	userId: number;
	chatId: number;
	token: string;
}

export const chatsAPI = {
	addChat: (data: { title: string }) => request.post(`chats`, { data }),

	getChats: (data?: { offset?: number; limit?: number; title?: string }) =>
		request.get(`chats`, { data }),

	deleteChat: (data: { chatId: number }) => request.delete(`chats`, { data }),

	searchUser: (data: { login: string }) => request.post(`user/search`, { data }),

	getUserById: (id: number) => request.get(`user/${id}`),

	getChatUsers: (chatId: number) => request.get(`chats/${chatId}/users`),

	addUserToChat: (data: { users: number[]; chatId: number }) =>
		request.put(`chats/users`, { data }),

	deleteUserFromChat: (data: { users: number[]; chatId: number }) =>
		request.delete(`chats/users`, { data }),

	getChatToken: (chatId: number) => request.post(`chats/token/${chatId}`),
};
