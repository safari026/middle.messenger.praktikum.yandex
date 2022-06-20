import { Block } from 'core';
import '../../profile.scss';

export default class EditPasswordPage extends Block {
	protected getStateFromProps(props: any): void {
		this.state = {
			values: {
				oldPassword: '',
				newPassword: '',
			},
			errors: {
				oldPassword: '',
				newPassword: '',
			},

			_editPassword: () => {
				const editPassword = {
					oldPassword: (this.refs.oldPassword.children[0] as HTMLInputElement).value,
					newPassword: (this.refs.newPassword.children[0] as HTMLInputElement).value,
				};

				console.log('edit-password-state', editPassword);
			},
		};
	}

	// Todo:добавить сравнение паролей
	protected render(): string {
		const { values } = this.state;
		return `
    <div>
    <nav class="side-nav">
    <div class="side-nav__button">
    {{{Link to="/profile" }}}
    </div>
</nav>
    {{#Layout name="EditPasswordPage" fullScreen=true}}
    <h1>Edit Password</h1>
    <div class="profile-screen">
    <div class="profile-screen__header user-profile">
      <div class="user-profile__avatar"></div>
      <div class="profile-screen__content">
      <form class='form'>
{{{Input
value="${values.oldPassword}"
ref="oldPassword"
id="oldPassword"
type="password"
placeholder="Old Password"
}}}
{{{Input
value="${values.newPassword}"
ref="newPassword"
id="newPassword" 
type="password"
placeholder="New Password"
}}}

{{{Button
text="Save"
className="__button"
onClick=_editPassword
}}}
{{/Layout}}
</div>
    `;
	}
}
