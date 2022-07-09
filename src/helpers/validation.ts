export const REQUIRED_TEXT = 'Поле обязательно для заполнения';
export enum ValidationRule {
	Login = 'login',
	Email = 'email',
	Password = 'password',
	FirstName = 'firstName',
	SecondName = 'secondName',
	display_name = 'display_name',
	Phone = 'phone',
	Message = 'message',
}
export const ValidationLogin = {
	REQUIRED_TEXT,
	INFO: 'Не корректный логин  кол-во символов от 3 до 20',
};
export const ValidationPassword = {
	REQUIRED_TEXT,
	INFO: 'Не корректный пароль',
};
export const ValidationEmail = {
	REQUIRED_TEXT,
	CHECK_VALUE: 'Не корректный email',
};
export const ValidationPhone = {
	REQUIRED_TEXT,
	CHECK_VALUE: 'Не корректный номер телефона',
};
export const ValidationFirstAndSecondName = {
	REQUIRED_TEXT,
	CHECK_VALUE: 'Не корректное значение латинница кириллица без пробелов',
};
/*
 *от 3 до 20 символов, латиница, может содержать цифры, но не состоять из них,
 *без пробелов, без спецсимволов (допустимы дефис и нижнее подчёркивание)
 */
export const validLoginReg = /^(?=.*[a-zA-Z])[0-9a-zA-Z_-]+$/;

// Минимум восемь символов максимум 40, минимум одна буква и одна цифра:
export const validPasswordReg = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]+$/i;

/*
 * латиница или кириллица, первая буква должна быть заглавной, без пробелов и без цифр,
 * нет спецсимволов (допустим только дефис)
 */
export const validFieldFirstAndSecondName = /^[A-ZА-Я][a-zа-я-]+$/;

// phone number от 10 до 15 символов, состоит из цифр, может начинается с плюса
export const validPhoneReg = /(\+)?[\d]{10,15}$/;
/* email
 * латиница, может включать цифры и спецсимволы вроде дефиса,
 * обязательно должна быть «собака» (@) и точка после неё, но перед точкой обязательно должны быть буквы
 */
export const validEmailReg = /^[A-Za-z-_.\d]+@[A-Za-z]+\.[A-Za-z]+$/;

export function validationValue(rule: ValidationRule, value: string): string {
	if (rule === ValidationRule.Login) {
		if (value.length === 0) {
			return `Login can not be empty`;
		}
		if (value.length < 4) {
			return 'Login must contain at least 3 chars';
		}
		if (value.length > 20) {
			return 'Login must not contain more than 20 chars';
		}
		if (!validLoginReg.test(value)) {
			return 'Login can contain latin letters, digits (but not only), hyphen and underscore';
		}
	}
	if (rule === ValidationRule.Password) {
		if (value.length === 0) {
			return 'Password can not be empty';
		}
		if (value.length < 4) {
			return 'Password must contain at least 4 chars';
		}
		if (value.length > 40) {
			return 'Password must not contain more than 20 chars';
		}
		if (!validPasswordReg.test(value)) {
			return 'Password must contain one letter and a number';
		}
	}
	if (rule === ValidationRule.FirstName || rule === ValidationRule.SecondName) {
		console.log('FirstName');
		if (value.length === 0) {
			return `${
				rule === ValidationRule.FirstName ? ValidationRule.FirstName : ValidationRule.SecondName
			} can not be empty`;
		}
		if (!validFieldFirstAndSecondName.test(value)) {
			return 'Must start with a capital letter, can contain only latin or cyrillic letters';
		}
	}
	if (rule === ValidationRule.Email) {
		if (value.length === 0) {
			return `Email can not be empty`;
		}
		if (!validEmailReg.test(value)) {
			return 'Email must be in latin and have the pattern: "email@example.com"';
		}
	}
	if (rule === ValidationRule.Phone) {
		if (value.length === 0) {
			return 'Phone can not be empty';
		}
		if (!validPhoneReg.test.value) {
			return 'Phone can only contain 10-15 digits, can start with +';
		}
	}
	return '';
}
