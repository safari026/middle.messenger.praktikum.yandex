import { Block } from 'core';
import {
	ValidationRule,
	validationValue,
} from 'helpers/validation';
import '../../profile.scss';

type EditPasswordPageProps = {};
export default class EditPasswordPage extends Block {
	static componentName = 'EditPasswordPage';

	constructor(props: EditPasswordPageProps) {
		super({
			...props,
			_editPassword: () => {
				const inputs: NodeListOf<HTMLInputElement> | undefined =
					this.element?.querySelectorAll('input');
				console.log(inputs);
				let isValid = true;
				const data: Record<string, string> = {};
				if (inputs) {
					inputs.forEach((input) => {
						const { name, value } = input;
						const ucFirst = name[0].toUpperCase() + name.slice(1);
						const errorMessage = validationValue(ValidationRule.Password, value);
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

	// Todo:добавить сравнение паролей
	protected render(): string {
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
{{{ControlledInput
ref="oldPassword"
id="oldPassword"
type="password"
name="oldPassword"
validationRule="${ValidationRule.Password}"
placeholder="Old Password"
}}}
{{{ControlledInput
ref="newPassword"
id="newPassword" 
type="password"
name="newPassword"
validationRule="${ValidationRule.Password}"
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
