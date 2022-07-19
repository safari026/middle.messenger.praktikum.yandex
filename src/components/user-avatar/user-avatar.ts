import { Block } from 'core';
import { BrowserRouter } from 'core/BrowserRouter';
import { Store } from 'core/Store';
import { withRouter } from 'core/withRouter';
import { withStore } from 'core/withStore';
import { changeAvatar } from 'services/user';

export interface UserAvatarProps {
	image: string;
	alt: string;
	userName: string;
	router: BrowserRouter;
	store: Store<AppState>;
}
const defaultImage = '../../../static/icons/camera-solid.svg';
export type EventsProps = {
	events: Record<string, ((e?: any) => void) | undefined>;
};

class UserAvatar extends Block<UserAvatarProps & Partial<EventsProps>> {
	static componentName = 'UserAvatar';

	constructor(props: UserAvatarProps) {
		super(props);

		this.setProps({
			events: {
				...this.props.events,
				change: this.state.onChangeAvatar,
			},
		});
	}

	protected getStateFromProps() {
		this.state = {
			file: null,
			onChangeAvatar: (e: Event) => {
				const filelist = (e.target as HTMLInputElement)?.files;
				if (filelist?.length) {
					// eslint-disable-next-line prefer-destructuring
					this.state.file = filelist[0];
				}

				this.props.store.dispatch(changeAvatar, { file: this.state.file });
			},
		};
	}

	protected render(): string {
		return `
        <div class="profile-screen__header user-profile">
          <div class="user-profile__avatar" {{#if avatar}}style="background-image:url({{avatar}})" {{/if}}></div>
          {{{InputFile onChange=onChangeAvatar}}}
          <div class="user-profile__name">
           {{userName}}
          </div>
        </div>
      `;
	}
}
export default withRouter(withStore(UserAvatar));
