import Block from 'core/Block';
import {
	validFieldFirstAndSecondName,
	ValidationEmail,
	validEmailReg,
	ValidationFirstAndSecondName,
	ValidationLogin,
	ValidationPassword,
	ValidationPhone,
	validPhoneReg,
	validPasswordReg,
	validLoginReg,
} from 'helpers/validation';
import './sign-in.scss';

export default class SignInPage extends Block {
	static componentName = 'SignInPage';

	protected getStateFromProps(_props: any): void {
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
			password: {
				values: '',
				errors: '',
			},
			phone: {
				values: '',
				errors: '',
			},

			validateBlurPassword: (e: Event) => {
				const { target } = e;
				const { value } = target as HTMLInputElement;
				const nextState = {
					password: {
						values: value,
						errors: '',
					},
				};
				if (!value) {
					nextState.password.errors = ValidationPassword.REQUIRED_TEXT;
				} else if (!validPasswordReg.test(value)) {
					nextState.password.errors = ValidationPassword.INFO;
				}
				this.setState(nextState);
			},

			validateBlurLogin: (e: Event) => {
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

			validateBlurFirstName: (e: Event) => {
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

			validateBlurSecondName: (e: Event) => {
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

			validateBlurEmail: (e: Event) => {
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

			validateBlurPhone: (e: Event) => {
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

			_sendRegistrationData: () => {
				const registrationData = {
					firstName: (this.refs.firstName.children[0] as HTMLInputElement).value,
					secondName: (this.refs.secondName.children[0] as HTMLInputElement).value,
					login: (this.refs.login.children[0] as HTMLInputElement).value,
					email: (this.refs.email.children[0] as HTMLInputElement).value,
					password: (this.refs.password.children[0] as HTMLInputElement).value,
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
					password: {
						values: '',
						errors: '',
					},
					phone: {
						values: '',
						errors: '',
					},
					values: { ...registrationData },
				};

				if (!registrationData.firstName) {
					nextState.firstName.errors = ValidationFirstAndSecondName.REQUIRED_TEXT;
				}
				if (!registrationData.secondName) {
					nextState.secondName.errors = ValidationFirstAndSecondName.REQUIRED_TEXT;
				}
				if (!registrationData.login) {
					nextState.login.errors = ValidationLogin.REQUIRED_TEXT;
				}
				if (!registrationData.email) {
					nextState.email.errors = ValidationEmail.REQUIRED_TEXT;
				}
				if (!registrationData.password) {
					nextState.password.errors = ValidationPassword.REQUIRED_TEXT;
				}
				if (!registrationData.phone) {
					nextState.phone.errors = ValidationPhone.REQUIRED_TEXT;
				}
				this.setState(nextState);

				console.log('registration-state', registrationData);
			},
		};
	}

	render() {
		const { firstName, secondName, login, email, password, phone } = this.state;
		return `
		{{#Layout name="Login" }}
<h1 class="title">Registration</h1>
<form class='form'>
{{{Input
    value="${firstName.values}"
    error="${firstName.errors}"
    ref="firstName"
    id="firstName"
    type="firstName"
    placeholder="First name"
	onBlur=validateBlurFirstName
  }}}
  {{{Input
	value="${secondName.values}"
	error="${secondName.errors}"
	ref="secondName"
	id="secondName" 
	type="text"
	placeholder="Second name"
	onBlur=validateBlurSecondName
  }}}
  {{{Input
	value="${login.values}"
	error="${login.errors}"
	ref="login"
	id="login" 
	type="text"
	placeholder="Login"
	onBlur=validateBlurLogin
  }}}
  {{{Input
	value="${email.values}"
	error="${email.errors}"
	ref="email"
	id="email" 
	type="text"
	placeholder="Email"
	onBlur=validateBlurEmail
  }}}

  {{{Input
	value="${password.values}"
	error="${password.errors}"
	ref="password"
	id="password" 
	type="password"
	placeholder="Password"
	onBlur=validateBlurPassword
  }}}
  {{{Input
	value="${phone.values}"
	error="${phone.errors}"
	ref="phone"
	id="phone" 
	type="phone"
	placeholder="Phone"
	onBlur=validateBlurPhone
  }}}
  {{{Button
    text="Sign Up" className="__button" onClick=_sendRegistrationData
  }}}
  {{{Link to="/login" text="No account?"}}}
</form>
{{/Layout}}
		`;
	}
}
