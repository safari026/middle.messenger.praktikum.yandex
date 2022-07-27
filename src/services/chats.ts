import { chatsAPI } from '@/api/chats';
import { Dispatch } from '@/core/Store';
import { hasError } from '@/utils/apiHasError';

export const getChats = async (dispatch: Dispatch<AppState>, state: AppState) => {
	dispatch({ isLoading: true });

	const response = await chatsAPI.getChats();

	dispatch({ chats: JSON.parse(response.response), isLoading: false });
};

export const createChat = async (
	dispatch: Dispatch<AppState>,
	state: AppState,
	action: { title: string },
) => {
	dispatch({ isLoading: true });

	await chatsAPI.addChat(action);

	const response = await chatsAPI.getChats();

	dispatch({ chats: JSON.parse(response.response), isLoading: false });
};

export const removeChat = async (
	dispatch: Dispatch<AppState>,
	state: AppState,
	action: { chatId: number },
) => {
	dispatch({ isLoading: true });

	await chatsAPI.deleteChat(action);

	const chats = await chatsAPI.getChats();

	dispatch({
		chats: JSON.parse(chats.response),
		isLoading: false,
	});
};

export const searchUser = async (
	dispatch: Dispatch<AppState>,
	state: AppState,
	action: { login: string },
) => {
	dispatch({ isLoading: true });

	const response = await chatsAPI.searchUser({
		login: action.login.slice(0, 10),
	});

	if (hasError(response)) {
		dispatch({
			isLoading: false,
		});
		return;
	}

	const user = await chatsAPI.getUserById(JSON.parse(response.response)[0].id);

	dispatch({
		chatUsers: [...state.chatUsers, JSON.parse(user.response)],
		isLoading: false,
	});
};

export const getChatUsers = async (
	dispatch: Dispatch<AppState>,
	state: AppState,
	action: { chatId: number },
) => {
	const response = await chatsAPI.getChatUsers(action.chatId);
	dispatch({
		chatUsers: JSON.parse(response.response),
	});
};

export const addUserToChat = async (
	dispatch: Dispatch<AppState>,
	state: AppState,
	action: { login: string; chatId: number },
) => {
	dispatch({ isLoading: true });

	const user = await chatsAPI.searchUser({
		login: action.login,
	});

	if (hasError(user)) {
		dispatch({
			isLoading: false,
		});
		return;
	}

	await chatsAPI.addUserToChat({
		users: [JSON.parse(user.response)[0].id],
		chatId: action.chatId,
	});

	const response = await chatsAPI.getChatUsers(action.chatId);
	dispatch({
		chatUsers: JSON.parse(response.response),
	});
};

export const removeUserFromChat = async (
	dispatch: Dispatch<AppState>,
	state: AppState,
	action: { userId: number; chatId: number },
) => {
	dispatch({ isLoading: true });

	await chatsAPI.deleteUserFromChat({
		users: [action.userId],
		chatId: action.chatId,
	});

	const response = await chatsAPI.getChatUsers(action.chatId);
	dispatch({
		chatUsers: JSON.parse(response.response),
	});
};

export const getChatToken = async (
	dispatch: Dispatch<AppState>,
	state: AppState,
	action: { chatId: number },
) => {
	const response = await chatsAPI.getChatToken(action.chatId);
	const { user } = state;
	const chatToken = JSON.parse(response.response).token;
	dispatch({
		chatToken,
		chatMessages: [],
	});

	if (user?.id && chatToken) {
		// eslint-disable-next-line @typescript-eslint/no-use-before-define
		dispatch(createSocket, {
			userId: user.id,
			chatId: action.chatId,
			token: chatToken,
		});
	}
};

export interface CreateSocket {
	userId: number;
	chatId: number;
	token: string;
}

export const createSocket = (
	dispatch: Dispatch<AppState>,
	state: AppState,
	{ userId, chatId, token }: CreateSocket,
) => {
	const socket = new WebSocket(`${process.env.WS_CHAT_ENDPOINT}/${userId}/${chatId}/${token}`);
	dispatch({ socket });

	socket.addEventListener('open', () => {
		console.log('Соединение установлено');

		socket.send(
			JSON.stringify({
				content: '',
				type: 'message',
			}),
		);
	});

	socket.addEventListener('message', (event) => {
		if (JSON.parse(event.data).type === 'message' && JSON.parse(event.data).content) {
			dispatch({
				chatMessages: [
					...window.store.getState().chatMessages,
					{
						message: JSON.parse(event.data).content,
						userId: JSON.parse(event.data).user_id,
					},
				],
			});
		}
	});

	setInterval(() => {
		socket.send(
			JSON.stringify({
				content: '',
				type: 'message',
			}),
		);
	}, 30000);
};
