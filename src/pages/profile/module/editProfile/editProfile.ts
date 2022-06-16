import { Block } from 'core';
import '../../profile.scss';

export default class EditProfilePage extends Block {
	protected getStateFromProps(props: any): void {
		this.state = {
			values: {
				email: '',
				login: '',
				firstName: '',
				surname: '',
				chatName: '',
				phone: '',
			},
			errors: {
				email: '',
				login: '',
				firstName: '',
				surname: '',
				chatName: '',
				phone: '',
			},
		};
	}

	render() {
		const { values, errors } = this.state;
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
	placeholder="First Name"
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
	value="${values.chatName}"
	error="${errors.chatName}"
	ref="chatName"
	id="chatName" 
	type="text"
	placeholder="Name in chat"
  }}}
  {{{Input
	value="${values.phone}"
	error="${errors.phone}"
	ref="phone"
	id="phone" 
	type="text"
	placeholder="Phone"
  }}}
  {{{Button
    text="Save"
	className="__button"
  }}}
</form>
          </div>
          </div>
        {{/Layout}}
        </div>
        `;
	}
}
