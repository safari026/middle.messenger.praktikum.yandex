import { Block } from 'core';
import { BrowserRouter } from 'core/BrowserRouter';
import { Store } from 'core/Store';
import { withRouter } from 'core/withRouter';
import { withStore } from 'core/withStore';
import { ValidationRule, validationValue } from 'helpers/validation';
import { changePassword } from 'services/user';
import '../../profile.scss';

interface UpdateUserPasswordProps {
	router: BrowserRouter;
	store: Store<AppState>;
	changePasswordError: () => string | null;
	_editPassword: () => void;
}
class EditPasswordPage extends Block<UpdateUserPasswordProps> {
	static componentName = 'EditPasswordPage';

	constructor(props: UpdateUserPasswordProps) {
		super({
			...props,
			_editPassword: () => {
				const inputs: NodeListOf<HTMLInputElement> | undefined =
					this.element?.querySelectorAll('input');
				let isValid = true;
				const data: Record<string, string> = {};
				if (inputs) {
					inputs.forEach((input) => {
						const { name, value } = input;
						const errorMessage = validationValue(ValidationRule.Password, value);
						if (errorMessage) {
							isValid = false;
							this.refs[name].getRefs().error.setProps({ text: errorMessage });
						} else {
							data[name] = value;
						}
					});

					if (isValid) {
						// eslint-disable-next-line @typescript-eslint/naming-convention
						const { newPassword, password_confirm, password } = data;
						if (newPassword !== password_confirm) {
							this.setProps({
								changePasswordError: () => 'Пароли должны совпадать',
							});
						} else {
							this.props.store.dispatch(changePassword, {
								oldPassword: password,
								newPassword,
							});
						}
					}
				}
			},
		});
		this.setProps({
			changePasswordError: () => this.props.store.getState().changePasswordError,
		});
	}

	protected render(): string {
		return `
    <div>
    <nav class="side-nav">
    <div class="side-nav__button">
    {{{Link to="/profile" }}}
    </div>
</nav>
    {{#Layout name="EditPasswordPage" fullScreen=true}}
    <h1>Edit Password</h1>
    <div class="profile-screen">
    <div class="profile-screen__header user-profile">
      <form class='form'>
{{{ControlledInput
ref="password"
id="password"
type="password"
name="password"
validationRule="${ValidationRule.Password}"
placeholder="Old Password"
}}}
{{{ControlledInput
ref="newPassword"
id="newPassword" 
type="password"
name="newPassword"
validationRule="${ValidationRule.Password}"
placeholder="New Password"
}}}
{{{ControlledInput
	ref="password_confirm"
	id="password_confirm" 
	type="password"
	name="password_confirm"
	validationRule="${ValidationRule.Password}"
	placeholder="Password confirm"
	}}}
	{{{Error text=changePasswordError}}}
{{{Button
text="Save"
className="__button"
onClick=_editPassword
}}}
{{/Layout}}
</div>
    `;
	}
}
export default withRouter(withStore(EditPasswordPage));
