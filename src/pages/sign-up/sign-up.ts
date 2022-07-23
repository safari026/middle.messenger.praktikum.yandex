import Block from 'core/Block';
import { BrowserRouter } from 'core/BrowserRouter';
import { Store } from 'core/Store';
import { withRouter } from 'core/withRouter';
import { withStore } from 'core/withStore';
import { ValidationRule, validationValue } from 'helpers/validation';
import { sendRegisterData } from 'services/auth';
import { toUpperCaseFirstLetter } from 'utils/toUpperCaseFirstLetter';

import './sign-up.scss';

export interface SignUpPageProps {
	router: BrowserRouter;
	store: Store<AppState>;
	formError?: () => string | null;
	sendRegistrationData: () => void;
}
class SignUpPage extends Block<SignUpPageProps> {
	static componentName = 'SignUpPage';

	constructor(props: SignUpPageProps) {
		super({
			...props,
			sendRegistrationData: () => {
				const inputs: NodeListOf<HTMLInputElement> | undefined =
					this.element?.querySelectorAll('input');
				let isValid = true;
				const data: Record<string, string> = {};
				if (inputs) {
					inputs.forEach((input) => {
						const { name, value } = input;
						const ucFirst = toUpperCaseFirstLetter(name);
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
						this.props.store.dispatch(sendRegisterData, data);
					}
				}
			},
		});
		this.setProps({
			formError: () => this.props.store.getState().registerFormError,
		});
	}

	render() {
		return `
		{{#Layout name="Login" }}
<h1 class="title">Registration</h1>
<form class='form'>
{{{ControlledInput
    ref="first_name"
    id="first_name"
    type="text"
	name="first_name"
	validationRule="${ValidationRule.First_name}"
    placeholder="First name"
  }}}
  {{{ControlledInput
	ref="second_name"
	id="second_name" 
	type="text"
	name="second_name"
	validationRule="${ValidationRule.Second_name}"
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
	ref="phone"
	id="phone"
	type='text'
	name="phone"
	validationRule="${ValidationRule.Phone}"
	placeholder="Phone"
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
  {{{Error text=formError}}}
  {{{Button
    text="Sign Up" className="__button" onClick=sendRegistrationData
  }}}
  {{{Link to="/sign-in" text="Sign In"}}}
</form>
{{/Layout}}
		`;
	}
}
export default withRouter(withStore(SignUpPage));
