import { LoginPage } from 'pages/login/login';
import Button from 'components/button';
import Input from 'components/input';
import { registerComponent, renderDOM } from 'core';
import { Layout } from 'components/layout/layout';
import { SignInPage } from 'pages/sign-in/sign-in';
import { Link } from 'components/link/link';
import { NotFoundPage } from 'pages/errors';
import { ServerErrorPage } from 'pages/errors';
import ProfilePage, { EditPasswordPage, EditProfilePage } from 'pages/profile';
import ChatPage from 'pages/chats';
import Search from 'components/search';
import Contact from 'components/contact';
import TextArea from 'components/textarea';
import { OnboardingPage } from 'pages/onboarding/onboarding';
import { ROUTE_PAGES } from 'types/configRouting';

registerComponent(Input);
registerComponent(Button);
registerComponent(Layout);
registerComponent(Link);
registerComponent(Search);
registerComponent(Contact);
registerComponent(TextArea);

document.addEventListener('DOMContentLoaded', () => {
	switch (document.location.pathname) {
		case ROUTE_PAGES.LOGIN:
			renderDOM(LoginPage);
			break;
		case ROUTE_PAGES.SIGN_IN:
			renderDOM(SignInPage);
			break;
		case ROUTE_PAGES.CHAT:
			renderDOM(ChatPage);
			break;
		case ROUTE_PAGES.PROFILE:
			renderDOM(ProfilePage);
			break;
		case ROUTE_PAGES.EDIT_PROFILE:
			renderDOM(EditProfilePage);
			break;
		case ROUTE_PAGES.EDIT_PASSWORD:
			renderDOM(EditPasswordPage);
			break;
		case ROUTE_PAGES.NOT_FOUND:
			renderDOM(NotFoundPage);
			break;
		case ROUTE_PAGES.SERVER_ERROR:
			renderDOM(ServerErrorPage);
			break;
		default:
			renderDOM(OnboardingPage);
	}
});
