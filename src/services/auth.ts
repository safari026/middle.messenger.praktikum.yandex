import { hasError } from '@/utils/apiHasError';
import { transformUser } from '@/utils/apiTransformers';
import { Dispatch } from '@/core/Store';
import { authAPI, NewUser } from '@/api/auth';

type LoginPayload = {
	login: string;
	password: string;
};

export const logout = async (dispatch: Dispatch<AppState>) => {
	dispatch({ isLoading: true });

	await authAPI.logout();

	dispatch({ isLoading: false, user: null });

	window.router.go('/sign-in');
};

export const sendLoginData = async (
	dispatch: Dispatch<AppState>,
	state: AppState,
	action: LoginPayload,
) => {
	dispatch({ isLoading: true });

	const response = await authAPI.login(action);
	if (hasError(response)) {
		dispatch({
			isLoading: false,
			loginFormError: JSON.parse(response.response).reason,
		});
		return;
	}

	const responseUser = await authAPI.me();

	dispatch({ isLoading: false, loginFormError: null });

	if (hasError(response)) {
		dispatch(logout);
		return;
	}

	dispatch({ user: transformUser(JSON.parse(responseUser.response)) });

	window.router.go('/chats');
};

export const sendRegisterData = async (
	dispatch: Dispatch<AppState>,
	state: AppState,
	action: NewUser,
) => {
	dispatch({ isLoading: true });
	const response = await authAPI.register(action);

	if (hasError(response)) {
		dispatch({
			isLoading: false,
			registerFormError: JSON.parse(response.response).reason,
		});
		return;
	}

	const responseUser = await authAPI.me();

	dispatch({
		isLoading: false,
		registerFormError: null,
		user: transformUser(JSON.parse(responseUser.response)),
	});

	window.router.go('/profile');
};

export const getUser = async (dispatch: Dispatch<AppState>) => {
	dispatch({ isLoading: true });

	const responseUser = await authAPI.me();

	dispatch({ isLoading: false, loginFormError: null });

	dispatch({ user: transformUser(JSON.parse(responseUser.response)) });
};
