import Block from 'core/Block';
import {
	FindOneSymbol,
	ValidationLogin,
	ValidationPassword,
	validPasswordReg,
} from 'helpers/validation';
import './login.scss';

export class LoginPage extends Block {
	protected getStateFromProps(props: any): void {
		this.state = {
			login: {
				values: '',
				errors: '',
			},
			password: {
				values: '',
				errors: '',
			},
			_sendLoginData: () => {
				console.log('This.login', this.refs);
				const loginData = {
					login: (this.refs.login.children[0] as HTMLInputElement).value,
					password: (this.refs.password.children[0] as HTMLInputElement).value,
				};

				const nextState = {
					login: {
						values: '',
						errors: '',
					},
					password: {
						values: '',
						errors: '',
					},
					values: { ...loginData },
				};

				if (!loginData.login) {
					nextState.login.errors = ValidationLogin.REQUIRED_TEXT;
				}
				if (!loginData.password) {
					nextState.password.errors = ValidationLogin.REQUIRED_TEXT;
				}

				this.setState(nextState);

				console.log('login-state', loginData);
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
		};
	}

	render() {
		const { login, password } = this.state;
		return `
{{#Layout name="Login" }}
<h1 class="title">Sign in</h1>
<form class='form'>
{{{Input
    value="${login.values}"
    error="${login.errors}"
    ref="login"
    id="login"
    type="text"
	name="login"
    placeholder="Login"
	onBlur=validateBlurLogin
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
  {{{Button
    text="Authorization" className="__button"  onClick=_sendLoginData
  }}}
  {{{Link to="/login" text="No account?"}}}
</form>
{{/Layout}}
`;
	}
}
