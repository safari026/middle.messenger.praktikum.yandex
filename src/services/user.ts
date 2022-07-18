import { hasError } from 'core/apiHasError';
import { transformUser } from 'core/apiTransformers';
import { Dispatch } from 'core/Store';
import { authAPI } from '../api/auth';
import { NewPasswordData, NewUserInfo, userAPI } from '../api/user';

type ChangeAvatarPayload = {
	file: File;
};

export const changeAvatar = async (
	dispatch: Dispatch<AppState>,
	state: AppState,
	action: ChangeAvatarPayload,
) => {
	const body = new FormData();
	body.append('avatar', action.file);

	const response = await userAPI.sendAvatar(body);

	if (hasError(response)) {
		dispatch({
			isLoading: false,
		});
		return;
	}

	dispatch({
		isLoading: false,
		user: transformUser(JSON.parse(response.response)),
	});
};

export const changePassword = async (
	dispatch: Dispatch<AppState>,
	state: AppState,
	action: NewPasswordData,
) => {
	const response = await userAPI.sendNewPassword(action);

	if (hasError(response)) {
		dispatch({
			isLoading: false,
			changePasswordError: JSON.parse(response.response).reason,
		});
		return;
	}

	await authAPI.logout();

	dispatch({ isLoading: false, user: null, changePasswordError: null });

	window.router.go('/sign-in');
};

export const changeUserInfo = async (
	dispatch: Dispatch<AppState>,
	state: AppState,
	action: NewUserInfo,
) => {
	const response = await userAPI.sendNewUserInfo(action);

	dispatch({ user: transformUser(JSON.parse(response.response)) });

	window.router.go('/profile');
};
