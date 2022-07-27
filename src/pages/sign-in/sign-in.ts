import { sendLoginData } from '@/services/auth';
import { toUpperCaseFirstLetter } from '@/utils/toUpperCaseFirstLetter';
import { BrowserRouter } from '@/core/BrowserRouter';
import { ValidationRule, validationValue } from '@/helpers/validation';
import { Store } from '@/core/Store';
import { withStore } from '@/core/withStore';
import { withRouter } from '@/core/withRouter';
import Block from '@/core/Block';

import './sign-in.scss';

interface SignInPageProps {
	router: BrowserRouter;
	store: Store<AppState>;
	sendLoginData: () => void;
	formError?: () => string | null;
}
class SignInPage extends Block<SignInPageProps> {
	static componentName = 'SignInPageProps';

	constructor(props: SignInPageProps) {
		super({
			...props,
			sendLoginData: () => {
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
						this.props.store.dispatch(sendLoginData, data);
					}
				}
			},
		});
		this.setProps({
			formError: () => this.props.store.getState().loginFormError,
		});
	}

	componentDidMount(): void {
		if (this.props.store.getState().user?.secondName) {
			this.props.router.go('/chats');
		}
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
  {{{Error text=formError}}}
  {{{Button
    text="Authorization" className="__button"  onClick=sendLoginData
  }}}
  {{{Link to="/sign-up" text="No account?"}}}
</form>
{{/Layout}}
`;
	}
}

export default withRouter(withStore(SignInPage));
