import { Button } from 'components/button';
import { ChatButton } from 'components/chat/chat-button';
import { ChatFeed } from 'components/chat/chat-feed';
import { ChatMessage } from 'components/chat/chat-message';
import { ControlledInput } from 'components/controlled-input';
import { ErrorMessage } from 'components/error';
import Input from 'components/input /input';
import { Layout } from 'components/layout';
import { LayoutChats } from 'components/layout-chats';
import { Link } from 'components/link';
import { registerComponent, renderDOM } from 'core';
import { ChatPage } from 'pages/chats';
import { NotFoundPage, ServerErrorPage } from 'pages/errors';
import { LoginPage } from 'pages/login';
import { OnboardingPage } from 'pages/onboarding';
import { EditPasswordPage, EditProfilePage, ProfilePage } from 'pages/profile';
import { SignInPage } from 'pages/sign-in';

import { ROUTE_PAGES } from 'types/configRouting';

registerComponent(Input);
registerComponent(Button);
registerComponent(Layout);
registerComponent(Link);
registerComponent(ChatButton);
registerComponent(ChatFeed);
registerComponent(ChatMessage);
registerComponent(LayoutChats);
registerComponent(ControlledInput);
registerComponent(ErrorMessage);

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
