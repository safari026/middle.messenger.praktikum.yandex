import { Block } from 'core';
import { BrowserRouter } from 'core/BrowserRouter';
import { getUserInfoRows } from 'utils/getUserInfoRows';
import { Store } from 'core/Store';
import { withRouter } from 'core/withRouter';
import { withStore } from 'core/withStore';

import './profile.scss';
import { getUser, logout } from 'services/auth';

interface UserProfileProps {
	router: BrowserRouter;
	store: Store<AppState>;
	formError?: () => string | null;
	userInfoRows: UserInfoRow[];
	onLogout?: () => void;
	user: User | null;
}

export interface UserInfoRow {
	name: string;
	label: string;
	value: string | number;
}

class ProfilePage extends Block<UserProfileProps> {
	static componentName = 'ProfilePage';

	constructor(props: UserProfileProps) {
		super({
			...props,
			onLogout: () => {
				this.props.store.dispatch(logout);
			},
		});
		if (!this.props.store.getState().user) {
			this.props.store.dispatch(getUser);
		}
	}

	componentDidMount(): void {
		this.setState({
			userInfoRows: getUserInfoRows(this.state.userInfoRows, this.props.store.getState().user),
		});
	}

	protected getStateFromProps() {
		this.state = {
			userInfoRows: [
				{ name: 'email', label: 'Email', value: '-' },
				{ name: 'login', label: 'Login', value: '-' },
				{ name: 'firstName', label: 'First name', value: '-' },
				{ name: 'secondName', label: 'Second name', value: '-' },
				{ name: 'displayName', label: 'Display name', value: '-' },
				{ name: 'phone', label: 'Phone', value: '-' },
			],
		};
	}

	render() {
		const userName = this.props.store.getState().user?.firstName;
		const avatar = this.props.store.getState().user?.avatar;
		return `
    <div>
    <nav class="side-nav">
        <div class="side-nav__button">
        {{{Link to="/chats" }}}
        </div>
    </nav>
        {{#Layout name="ProfilePage" fullScreen=true}}
      
        <div class="profile-screen">
        ${
					avatar
						? `{{{UserAvatar userName="${userName}" avatar="https://ya-praktikum.tech/api/v2/resources/${avatar}"}}}`
						: `{{{UserAvatar}}}`
				}
       
        <div class="profile-screen__content">
          <div class="profile-screen__title">
            Account Info
          </div>
          <div class="profile-screen__info-wrapper">
            {{#each userInfoRows}}
              <div class="profile-screen__info">
                <div class="profile-screen__label">
                  {{label}}
                </div>
                <div class="profile-screen__value">
                  {{value}}
                </div>
              </div>
            {{/each}}
          </div>
          <div class="profile-screen__setting">
          {{{Link to="/update-user-info" text="Edit profile"}}}
          {{{Link to="/update-user-password" text="Edit password"}}}
          {{{Button text="Logout" onClick=onLogout className="__button"}}}
          </div>
        </div>
      </div>
        {{/Layout}}
        </div>
        `;
	}
}
export default withRouter(withStore(ProfilePage));
