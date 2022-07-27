import { UserAvatar } from '@/components/user-avatar';
import { NotFoundPage, ServerErrorPage } from '@/pages/errors';
import { InputFile } from '@/components/input-file';
import { SignUpPage } from '@/pages/sign-up';
import { EditPasswordPage, EditProfilePage, ProfilePage } from '@/pages/profile';
import { SignInPage } from '@/pages/sign-in';
import { getScreenComponent } from '@/core/screenList';
import { Store } from '@/core/Store';
import { BlockConstructable } from '@/core/registerComponent';
import { BrowserRouter } from '@/core/BrowserRouter';
import { registerComponent, renderDOM } from '@/core';
import { Link } from '@/components/link';
import { LayoutChats } from '@/components/layout-chats';
import Input from '@/components/input /input';
import { Layout } from '@/components/layout';
import { ErrorMessage } from '@/components/error';
import { ControlledInput } from '@/components/controlled-input';
import { ChatMessage } from '@/components/chat/chat-message';
import { ChatButton } from '@/components/chat/chat-button';
import { ChatPage } from '@/pages/chats';
import { Button } from '@/components/button';
import { defaultState } from '@/store/index';
import './index.scss';

const components: BlockConstructable[] = [
	Input,
	Button,
	Layout,
	Link,
	ChatButton,
	ChatMessage,
	LayoutChats,
	ControlledInput,
	ErrorMessage,
	InputFile,
	UserAvatar,
];
components.forEach((component) => {
	registerComponent(component);
});
declare global {
	interface Window {
		router: BrowserRouter;
		store: Store<AppState>;
	}
}
const router = new BrowserRouter();
const store = new Store<AppState>(defaultState);

window.router = router;
window.store = store;

store.on('changed', (prevState, nextState) => {
	if (prevState.screen !== nextState.screen) {
		const Page = getScreenComponent(nextState.screen);
		renderDOM(new Page());
	}
});

router
	.use('/', SignInPage, {})
	.use('/sign-in', SignInPage, {})
	.use('/sign-up', SignUpPage, {})
	.use('/chats', ChatPage, {})
	.use('/profile', ProfilePage, {})
	.use('/update-user-info', EditProfilePage, {})
	.use('/update-user-password', EditPasswordPage, {})
	.use('/server-error', ServerErrorPage, {})
	.use('*', NotFoundPage, {})
	.start();
