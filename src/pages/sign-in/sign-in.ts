import Block from 'core/Block';
import { ValidationRule, validationValue } from 'helpers/validation';
import './sign-in.scss';

type SignInPageProps = {};
export default class SignInPage extends Block {
	static componentName = 'SignInPage';

	constructor(props: SignInPageProps) {
		super({
			...props,
			_sendRegistrationData: () => {
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
<h1 class="title">Registration</h1>
<form class='form'>
{{{ControlledInput
    ref="firstName"
    id="firstName"
    type="text"
	name="firstName"
	validationRule="${ValidationRule.FirstName}"
    placeholder="First name"
  }}}
  {{{ControlledInput
	ref="secondName"
	id="secondName" 
	type="text"
	name="secondName"
	validationRule="${ValidationRule.SecondName}"
	placeholder="Second name"
  }}}
  {{{ControlledInput
	ref="login"
	id="login" 
	type="text"
	name="login"
	validationRule="${ValidationRule.Login}"
	placeholder="Login"
  }}}
  {{{ControlledInput
	ref="email"
	id="email" 
	type="text"
	name="email"
	validationRule="${ValidationRule.Email}"
	placeholder="Email"
  }}}
  {{{
	ControlledInput
	ref="password"
	id="password"
	type="password"
	name="password"
	validationRule="${ValidationRule.Password}"
	placeholder="Password"
  }}}
  {{{
	ControlledInput
	ref="phone"
	id="phone"
	type='text'
	name="phone"
	validationRule="${ValidationRule.Phone}"
	placeholder="Phone"
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
