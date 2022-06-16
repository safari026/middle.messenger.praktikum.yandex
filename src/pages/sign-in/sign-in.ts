import Block from 'core/Block';
import './sign-in.scss'
export class SignInPage extends Block {
    protected getStateFromProps(props: any): void {
		this.state = {
			values: {
				email:'',
				login: '',
				firstName:'',
				surname:'',
				phone:'',
				password: '',
				repeatPassword:''
			},
			errors: {
				email:'',
				login: '',
				firstName:'',
				surname:'',
				phone:'',
				password: '',
				repeatPassword:''
			},
		};
	}
	render(){
		const{values,errors}=this.state
		return`
		{{#Layout name="Login" }}
<h1 class="title">Registration</h1>
<form class='form'>
{{{Input
    value="${values.email}"
    error="${errors.email}"
    ref="email"
    id="email"
    type="email"
    placeholder="Email"
  }}}
  {{{Input
	value="${values.login}"
	error="${errors.login}"
	ref="login"
	id="login" 
	type="text"
	placeholder="Login"
  }}}
  {{{Input
	value="${values.firstName}"
	error="${errors.firstName}"
	ref="firstName"
	id="firstName" 
	type="text"
	placeholder="FirstName"
  }}}
  {{{Input
	value="${values.surname}"
	error="${errors.surname}"
	ref="surname"
	id="surname" 
	type="text"
	placeholder="Surname"
  }}}

  {{{Input
	value="${values.phone}"
	error="${errors.phone}"
	ref="phone"
	id="phone" 
	type="text"
	placeholder="Phone"
  }}}
  {{{Input
	value="${values.password}"
	error="${errors.password}"
	ref="password"
	id="password" 
	type="password"
	placeholder="Password"
  }}}
  {{{Input
	value="${values.repeatPassword}"
	error="${errors.repeatPassword}"
	ref="repeatPassword"
	id="repeatPassword" 
	type="password"
	placeholder="RepeatPassword"
  }}}
  {{{Button
    text="Sign Up" className="__button"
  }}}
  {{{Link to="/login" text="Нет аккаунта?"}}}
</form>
{{/Layout}}
		`;
	}
}
