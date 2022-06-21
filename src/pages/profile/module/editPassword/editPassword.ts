import { Block } from 'core';
import { ValidationPassword, validPasswordReg } from 'helpers/validation';
import '../../profile.scss';

export default class EditPasswordPage extends Block {
	static componentName = 'EditPasswordPage';

	protected getStateFromProps(): void {
		this.state = {
			oldPassword: {
				values: '',
				errors: '',
			},
			newPassword: {
				values: '',
				errors: '',
			},

			_editPassword: () => {
				const editPassword = {
					oldPassword: (this.refs.oldPassword.children[0] as HTMLInputElement).value,
					newPassword: (this.refs.newPassword.children[0] as HTMLInputElement).value,
				};
				const nextState = {
					oldPassword: {
						values: '',
						errors: '',
					},
					newPassword: {
						values: '',
						errors: '',
					},
					values: { ...editPassword },
				};
				if (!editPassword.oldPassword) {
					nextState.oldPassword.errors = ValidationPassword.REQUIRED_TEXT;
				}
				if (!editPassword.newPassword) {
					nextState.newPassword.errors = ValidationPassword.REQUIRED_TEXT;
				}
				this.setState(nextState);
				console.log('edit-password-state', editPassword);
			},
			validateBlurOldPassword: (e: Event) => {
				const { target } = e;
				const { value } = target as HTMLInputElement;
				const nextState = {
					oldPassword: {
						values: value,
						errors: '',
					},
				};
				if (!value) {
					nextState.oldPassword.errors = ValidationPassword.REQUIRED_TEXT;
				} else if (!validPasswordReg.test(value)) {
					nextState.oldPassword.errors = ValidationPassword.INFO;
				}
				this.setState(nextState);
			},
			validateBlurNewPassword: (e: Event) => {
				const { target } = e;
				const { value } = target as HTMLInputElement;
				const nextState = {
					newPassword: {
						values: value,
						errors: '',
					},
				};
				if (!value) {
					nextState.newPassword.errors = ValidationPassword.REQUIRED_TEXT;
				} else if (!validPasswordReg.test(value)) {
					nextState.newPassword.errors = ValidationPassword.INFO;
				} else if (this.state.oldPassword.values !== nextState.newPassword.values) {
					nextState.newPassword.errors = 'Пароли не совпадают';
				}
				this.setState(nextState);
			},
		};
	}

	// Todo:добавить сравнение паролей
	protected render(): string {
		const { oldPassword, newPassword } = this.state;
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
      <div class="user-profile__avatar"></div>
      <div class="profile-screen__content">
      <form class='form'>
{{{Input
value="${oldPassword.values}"
error="${oldPassword.errors}"
ref="oldPassword"
id="oldPassword"
type="password"
placeholder="Old Password"
onBlur=validateBlurOldPassword
}}}
{{{Input
value="${newPassword.values}"
error="${newPassword.errors}"
ref="newPassword"
id="newPassword" 
type="password"
placeholder="New Password"
onBlur=validateBlurNewPassword
}}}

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
