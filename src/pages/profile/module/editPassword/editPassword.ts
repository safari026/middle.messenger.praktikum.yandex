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
		};
	}
	protected render(): string {
		const { values, errors } = this.state;
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
error="${errors.oldPassword}"
ref="oldPassword"
id="oldPassword"
type="password"
placeholder="Old Password"
}}}
{{{Input
value="${values.newPassword}"
error="${errors.newPassword}"
ref="newPassword"
id="newPassword" 
type="password"
placeholder="New Password"
}}}

{{{Button
text="Save"
className="__button"
}}}
{{/Layout}}
</div>
    `;
	}
}
