import { Block } from 'core';
import {
	validFieldFirstAndSecondName,
	ValidationEmail,
	validEmailReg,
	ValidationFirstAndSecondName,
	ValidationLogin,
	ValidationPhone,
	validPhoneReg,
	validLoginReg,
	ValidationRule,
	validationValue,
} from 'helpers/validation';
import '../../profile.scss';

type EditProfilePageProps = {};
export default class EditProfilePage extends Block {
	static componentName = 'EditProfilePage';

	constructor(props: EditProfilePageProps) {
		super({
			...props,
			_editData: () => {
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
  {{{ControlledInput
	ref="phone"
	id="phone" 
	type="text"
	name="phone"
	validationRule="${ValidationRule.Phone}"
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
