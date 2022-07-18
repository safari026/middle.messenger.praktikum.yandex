import { ProfilePage } from 'pages/profile';
import { SignInPage } from 'pages/sign-in';
import { SignUpPage } from 'pages/sign-up';
import Block from './Block';

export enum Screens {
	SignIn = 'sign-in',
	SignUp = 'sign-up',
	Profile = 'profile',
}

const map = {
	[Screens.SignIn]: SignInPage,
	[Screens.SignUp]: SignUpPage,
	[Screens.Profile]: ProfilePage,
};

export const getScreenComponent = (screen: Screens): typeof Block => {
	return map[screen] as typeof Block;
};
