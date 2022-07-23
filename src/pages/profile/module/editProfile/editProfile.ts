import { Block } from 'core';
import { BrowserRouter } from 'core/BrowserRouter';
import { Store } from 'core/Store';
import { withRouter } from 'core/withRouter';
import { withStore } from 'core/withStore';
import { ValidationRule, validationValue } from 'helpers/validation';
import { getUser } from 'services/auth';
import { changeUserInfo } from 'services/user';

import '../../profile.scss';

export interface UpdateUserInfoProps {
	router: BrowserRouter;
	store: Store<AppState>;
	editData: () => void;
}
class EditProfilePage extends Block<UpdateUserInfoProps> {
	static componentName = 'EditProfilePage';

	constructor(props: UpdateUserInfoProps) {
		super({
			...props,
			editData: () => {
				const inputs: NodeListOf<HTMLInputElement> | undefined =
					this.element?.querySelectorAll('input');
				let isValid = true;
				const data: Record<string, string> = {};
				if (inputs) {
					inputs.forEach((input) => {
						const { name, value } = input;
						const ucFirst = name[0].toUpperCase() + name.slice(1);
						const errorMessage = validationValue(
							ValidationRule[ucFirst as keyof typeof ValidationRule],
							value,
						);
						if (errorMessage) {
							isValid = false;
							this.refs[name].getRefs().error.setProps({ text: errorMessage });
						} else {
							data[name] = value;
						}
					});
					if (isValid) {
						this.props.store.dispatch(changeUserInfo, data);
					}
				}
			},
		});
		if (!this.props.store.getState().user) {
			this.props.store.dispatch(getUser);
		}
	}

	protected getStateFromProps(props: any): void {
		this.state = {
			values: {
				login: '',
				email: '',
				first_name: '',
				second_name: '',
				display_name: '',
				phone: '',
			},
		};
	}

	componentDidMount(): void {
		const { user } = this.props.store.getState();
		if (user) {
			const { login, email, displayName, firstName, secondName, phone } = user;
			this.setState({
				values: {
					login,
					email,
					first_name: firstName,
					second_name: secondName,
					display_name: displayName || '',
					phone,
				},
			});
		}
	}

	render() {
		const { values } = this.state;
		return `
        <div>
        <nav class="side-nav">
        <div class="side-nav__button">
        {{{Link to="/profile" }}}
        </div>
    </nav>
        {{#Layout name="EditProfilePage" fullScreen=true}}
        <h1>Edit Profile</h1>
          <div class="profile-screen__content">
          <form class='form'>
  {{{ControlledInput
	label="First name"
	ref="first_name"
	id="first_name" 
	type="text"
	name="first_name"
	validationRule="${ValidationRule.First_name}"
	placeholder="First name"
	value="${values.first_name}"
  }}}
  {{{ControlledInput
	label="Second name"
	ref="second_name"
	id="second_name" 
	type="text"
	name="second_name"
	validationRule="${ValidationRule.Second_name}"
	placeholder="Second name"
	value="${values.second_name}"
  }}}
  {{{ControlledInput
	label="Login"
	ref="login"
	id="login" 
	type="text"
	name="login"
	validationRule="${ValidationRule.Login}"
	placeholder="Login"
	value="${values.login}"
  }}}
  {{{ControlledInput
	label="Email"
	ref="email"
	id="email" 
	type="text"
	name="email"
	validationRule="${ValidationRule.Email}"
	placeholder="Email"
	value="${values.email}"
  }}}
  {{{ControlledInput
	label="Display Name"
	ref="display_name"
	id="display_name" 
	type="text"
	name="display_name"
	validationRule="${ValidationRule.Display_name}"
	placeholder="display_name"
	value="${values.display_name}"
  }}}
  {{{ControlledInput
	label="Phone"
	ref="phone"
	id="phone" 
	type="text"
	name="phone"
	validationRule="${ValidationRule.Phone}"
	placeholder="Phone"
	value="${values.phone}"
  }}}
  {{{Button
    text="Save"
	className="__button"
	onClick=editData
  }}}
</form>
          </div>
          </div>
        {{/Layout}}
        </div>
        `;
	}
}

export default withRouter(withStore(EditProfilePage));
