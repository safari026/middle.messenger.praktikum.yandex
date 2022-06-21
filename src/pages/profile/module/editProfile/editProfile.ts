import { Block } from 'core';
import {
	validFieldFirstAndSecondName,
	ValidationEmail,
	validEmailReg,
	ValidationFirstAndSecondName,
	ValidationLogin,
	ValidationPhone,
	validPhoneReg,
	validLoginReg,
} from 'helpers/validation';
import '../../profile.scss';

export default class EditProfilePage extends Block {
	static componentName = 'EditProfilePage';

	protected getStateFromProps(): void {
		this.state = {
			firstName: {
				values: '',
				errors: '',
			},
			secondName: {
				values: '',
				errors: '',
			},
			login: {
				values: '',
				errors: '',
			},
			email: {
				values: '',
				errors: '',
			},
			phone: {
				values: '',
				errors: '',
			},
			_editData: () => {
				const edit = {
					firstName: (this.refs.firstName.children[0] as HTMLInputElement).value,
					secondName: (this.refs.secondName.children[0] as HTMLInputElement).value,
					login: (this.refs.login.children[0] as HTMLInputElement).value,
					email: (this.refs.email.children[0] as HTMLInputElement).value,
					phone: (this.refs.phone.children[0] as HTMLInputElement).value,
				};
				const nextState = {
					firstName: {
						values: '',
						errors: '',
					},
					secondName: {
						values: '',
						errors: '',
					},
					login: {
						values: '',
						errors: '',
					},
					email: {
						values: '',
						errors: '',
					},
					phone: {
						values: '',
						errors: '',
					},
					values: { ...edit },
				};
				if (!edit.firstName) {
					nextState.firstName.errors = ValidationFirstAndSecondName.REQUIRED_TEXT;
				}
				if (!edit.secondName) {
					nextState.secondName.errors = ValidationFirstAndSecondName.REQUIRED_TEXT;
				}
				if (!edit.login) {
					nextState.login.errors = ValidationLogin.REQUIRED_TEXT;
				}
				if (!edit.email) {
					nextState.email.errors = ValidationEmail.REQUIRED_TEXT;
				}
				if (!edit.phone) {
					nextState.phone.errors = ValidationPhone.REQUIRED_TEXT;
				}
				this.setState(nextState);
				console.log('edit-data-state', edit);
			},
			validationBlurLogin: (e: Event) => {
				const { target } = e;
				const { value } = target as HTMLInputElement;
				const nextState = {
					login: {
						values: value,
						errors: '',
					},
				};
				if (!value) {
					nextState.login.errors = ValidationLogin.REQUIRED_TEXT;
				} else if (!validLoginReg.test(value)) {
					nextState.login.errors = ValidationLogin.INFO;
				}
				this.setState(nextState);
			},
			validationBlurFirstName: (e: Event) => {
				const { target } = e;
				const { value } = target as HTMLInputElement;
				const nextState = {
					firstName: {
						values: value,
						errors: '',
					},
				};
				if (!value) {
					nextState.firstName.errors = ValidationFirstAndSecondName.REQUIRED_TEXT;
				} else if (!validFieldFirstAndSecondName.test(value)) {
					nextState.firstName.errors = ValidationFirstAndSecondName.CHECK_VALUE;
				}
				this.setState(nextState);
			},
			validationBlurSecondName: (e: Event) => {
				const { target } = e;
				const { value } = target as HTMLInputElement;
				const nextState = {
					secondName: {
						values: value,
						errors: '',
					},
				};
				if (!value) {
					nextState.secondName.errors = ValidationFirstAndSecondName.REQUIRED_TEXT;
				} else if (!validFieldFirstAndSecondName.test(value)) {
					nextState.secondName.errors = ValidationFirstAndSecondName.CHECK_VALUE;
				}
				this.setState(nextState);
			},
			validationBlurPhone: (e: Event) => {
				const { target } = e;
				const { value } = target as HTMLInputElement;
				const nextState = {
					phone: {
						values: value,
						errors: '',
					},
				};
				if (!value) {
					nextState.phone.errors = ValidationPhone.REQUIRED_TEXT;
				} else if (!validPhoneReg.test(value)) {
					nextState.phone.errors = ValidationPhone.CHECK_VALUE;
				}
				this.setState(nextState);
			},
			validationBlurEmail: (e: Event) => {
				const { target } = e;
				const { value } = target as HTMLInputElement;
				const nextState = {
					email: {
						values: value,
						errors: '',
					},
				};
				if (!value) {
					nextState.email.errors = ValidationEmail.REQUIRED_TEXT;
				} else if (!validEmailReg.test(value)) {
					nextState.email.errors = ValidationEmail.CHECK_VALUE;
				}
				this.setState(nextState);
			},
		};
	}

	render() {
		const { login, firstName, secondName, email, phone } = this.state;
		return `
        <div>
        <nav class="side-nav">
        <div class="side-nav__button">
        {{{Link to="/profile" }}}
        </div>
    </nav>
        {{#Layout name="EditProfilePage" fullScreen=true}}
        <h1>Edit Profile</h1>
        <div class="profile-screen">
        <div class="profile-screen__header user-profile">
          <div class="user-profile__avatar"></div>
          <div class="profile-screen__content">
          <form class='form'>
  {{{Input
	value="${firstName.values}"
	error="${firstName.errors}"
	ref="firstName"
	id="firstName" 
	type="text"
	placeholder="First name"
	onBlur=validationBlurFirstName
  }}}
  {{{Input
	value="${secondName.values}"
	error="${secondName.errors}"
	ref="secondName"
	id="secondName" 
	type="text"
	placeholder="Second name"
	onBlur=validationBlurSecondName
  }}}
  {{{Input
	value="${login.values}"
	error="${login.errors}"
	ref="login"
	id="login" 
	type="text"
	placeholder="Login"
	onBlur=validationBlurLogin
  }}}
  {{{Input
	value="${email.values}"
	error="${email.errors}"
	ref="email"
	id="email" 
	type="text"
	placeholder="Email"
	onBlur=validationBlurEmail
  }}}
  {{{Input
	value="${phone.values}"
	error="${phone.errors}"
	ref="phone"
	id="phone" 
	type="text"
	placeholder="Phone"
	onBlur=validationBlurPhone
  }}}
  {{{Button
    text="Save"
	className="__button"
	onClick=_editData
  }}}
</form>
          </div>
          </div>
        {{/Layout}}
        </div>
        `;
	}
}
