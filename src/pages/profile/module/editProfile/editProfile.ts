import { Block } from 'core';
import '../../profile.scss';

export default class EditProfilePage extends Block {
	static componentName = 'EditProfilePage';

	protected getStateFromProps(): void {
		this.state = {
			values: {
				firstName: '',
				secondName: '',
				login: '',
				email: '',
				password: '',
				phone: '',
			},

			_editData: () => {
				const edit = {
					firstName: (this.refs.firstName.firstElementChild as HTMLInputElement).value,
					secondName: (this.refs.secondName.firstElementChild as HTMLInputElement).value,
					login: (this.refs.login.firstElementChild as HTMLInputElement).value,
					email: (this.refs.email.firstElementChild as HTMLInputElement).value,
					phone: (this.refs.phone.firstElementChild as HTMLInputElement).value,
				};
				console.log('edit-data-state', edit);
			},
		};
	}

	render() {
		const { values } = this.state;
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
	value="${values.login}"
	ref="login"
	id="login" 
	type="text"
	placeholder="Login"
  }}}
  {{{Input
	value="${values.firstName}"
	ref="firstName"
	id="firstName" 
	type="text"
	placeholder="First name"
  }}}
  {{{Input
	value="${values.secondName}"
	ref="secondName"
	id="secondName" 
	type="text"
	placeholder="Second name"
  }}}
  {{{Input
	value="${values.login}"
	ref="login"
	id="login" 
	type="text"
	placeholder="Login"
  }}}
  {{{Input
	value="${values.email}"
	ref="email"
	id="email" 
	type="text"
	placeholder="Email"
  }}}
  {{{Input
	value="${values.phone}"
	ref="phone"
	id="phone" 
	type="text"
	placeholder="Phone"
  }}}
  {{{Button
    text="Save"
	className="__button"
	onClick=_editData
  }}}
</form>
          </div>
          </div>
        {{/Layout}}
        </div>
        `;
	}
}
