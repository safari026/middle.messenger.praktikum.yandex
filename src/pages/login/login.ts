import Block from 'core/Block';
import { ValidationRule, validationValue } from 'helpers/validation';
import './login.scss';

type LoginPageProps = {};
export default class LoginPage extends Block {
	static componentName = 'LoginPage';

	constructor(props: LoginPageProps) {
		super({
			...props,
			_sendLoginData: () => {
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
							console.log('message');
							this.refs[name].refs.error.setProps({ text: errorMessage });
						} else {
							data[ucFirst] = value;
						}
					});
					if (isValid) {
						console.log(data);
					}
				}
			},
		});
	}

	render() {
		return `
{{#Layout name="Login" }}
<h1 class="title">Sign in</h1>
<form class='form'>
{{{ControlledInput
    ref="login"
    id="login"
    type="text"
	name="login"
	validationRule = "${ValidationRule.Login}"
    placeholder="Login"
  }}}
  {{{ControlledInput
    ref="password"
    id="password"
    type="password"
	name="password"
	validationRule = "${ValidationRule.Password}"
    placeholder="Password"
  }}}
  {{{Button
    text="Authorization" className="__button"  onClick=_sendLoginData
  }}}
  {{{Link to="/sign-in" text="No account?"}}}
</form>
{{/Layout}}
`;
	}
}
