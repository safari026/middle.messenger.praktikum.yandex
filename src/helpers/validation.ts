export const REQUIRED_TEXT = 'Поле обязательно для заполнения';

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
export const validLoginReg = /^(?=.*[a-zA-Z])[0-9a-zA-Z_-]{3,20}$/;

// Минимум восемь символов максимум 40, минимум одна буква и одна цифра:
export const validPasswordReg = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,40}$/i;

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
