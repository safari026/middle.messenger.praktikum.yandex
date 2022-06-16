import Block from 'core/Block';
import './login.scss'
export class LoginPage extends Block {
	protected getStateFromProps(props: any): void {
		this.state = {
			values: {
				login: '',
				password: '',
			},
			errors: {
				login: '',
				password: '',
			},
		};
	}
	render() {
		const { values, errors } = this.state;

		return `
{{#Layout name="Login" }}
<h1 class="title">Sign in</h1>
<form class='form'>
{{{Input
    value="${values.login}"
    error="${errors.login}"
    ref="login"
    id="login"
    type="text"
    placeholder="Login"
  }}}
  {{{Input
	value="${values.password}"
	error="${errors.password}"
	ref="password"
	id="password" 
	type="password"
	placeholder="Password"
  }}}
  {{{Button
    text="Authorization" className="__button"
  }}}
  {{{Link to="/login" text="Нет аккаунта?"}}}
</form>
{{/Layout}}
`;
	}
}
