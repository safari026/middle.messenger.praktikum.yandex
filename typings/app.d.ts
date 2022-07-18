import { UserDTO } from '../src/api/types';

declare global {
	export type Nullable<T> = T | null;
	export type TStringObject = {
		[key: string]: any;
	};

	export type Keys<T extends Record<string, unknown>> = keyof T;
	export type Values<T extends Record<string, unknown>> = T[Keys<T>];
	export type Indexed = { [key: string]: any };

	export type Chat = {
		avatar: string | null;
		created_by: number;
		id: number;
		last_message: string | null;
		title: string;
		unread_count: number;
	};

	export type AppState = {
		screen: Screens | null;
		isLoading: boolean;
		loginFormError: string | null;
		registerFormError: string | null;
		user: User | null;
		changePasswordError: string | null;
		chats: Chat[];
		chatUsers: UserDTO[];
		chatToken: string | null;
		chatMessages: { message: string; userId: number }[];
		socket: WebSocket | null;
	};

	export type User = {
		id: number;
		login: string;
		firstName: string;
		secondName: string;
		displayName: string;
		avatar: string;
		phone: string;
		email: string;
	};
}

export {};
