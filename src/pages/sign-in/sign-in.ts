import Block from 'core/Block';
import {
	FindOneSymbol,
	REQUIRED_TEXT,
	ValidationEmail,
	validationEmailReg,
	ValidationLogin,
	ValidationPassword,
	ValidationPhone,
	validationPhoneReg,
	validPasswordReg,
} from 'helpers/validation';
import './sign-in.scss';

export class SignInPage extends Block {
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
				} else if (value.length < 8) {
					nextState.password.errors = ValidationPassword.MAX_LENGTH;
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
				} else if (value.length < 4) {
					nextState.login.errors = ValidationLogin.MIN_LENGTH;
				} else if (!FindOneSymbol.test(value)) {
					nextState.login.errors = ValidationLogin.CHECK_ONE_SYMBOL;
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
					nextState.firstName.errors = REQUIRED_TEXT;
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
					nextState.secondName.errors = REQUIRED_TEXT;
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
					nextState.email.errors = REQUIRED_TEXT;
				} else if (!validationEmailReg.test(value)) {
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
					nextState.phone.errors = REQUIRED_TEXT;
				} else if (!validationPhoneReg.test(value)) {
					nextState.phone.errors = ValidationPhone.CHECK_VALUE;
				}
				this.setState(nextState);
			},

			_sendRegistrationData: () => {
				console.log('This', this.refs.firstName.children[0].value);
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
					nextState.firstName.errors = ValidationLogin.REQUIRED_TEXT;
				}
				if (!registrationData.secondName) {
					nextState.secondName.errors = ValidationLogin.REQUIRED_TEXT;
				}
				if (!registrationData.login) {
					nextState.login.errors = ValidationLogin.REQUIRED_TEXT;
				}
				if (!registrationData.email) {
					nextState.email.errors = ValidationLogin.REQUIRED_TEXT;
				}
				if (!registrationData.password) {
					nextState.password.errors = ValidationLogin.REQUIRED_TEXT;
				}
				if (!registrationData.phone) {
					nextState.phone.errors = ValidationLogin.REQUIRED_TEXT;
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
