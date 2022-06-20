export const REQUIRED_TEXT = 'Поле обязательно для заполнения';

export const ValidationLogin = {
	REQUIRED_TEXT,
	MIN_LENGTH: 'Минимальная длина 4 символа',
	CHECK_ONE_SYMBOL: 'Первая буква должна быть заглавной, без пробелов и без цифр',
};
export const ValidationPassword = {
	REQUIRED_TEXT,
	MAX_LENGTH: 'Минимум 8 символов',
	INFO: 'Минимум одна буква и одна цифра',
};
export const ValidationEmail = {
	CHECK_VALUE: 'Не корректный email',
};
export const ValidationPhone = {
	CHECK_VALUE: 'Не корректный номер телефона',
};
// Минимум восемь символов, минимум одна буква и одна цифра:
export const validPasswordReg = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/i;
// login
export const FindOneSymbol = /^[a-z]+([-_]?[a-z0-9]+){0,2}$/i;
// phone number
export const validationPhoneReg = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
// email
export const validationEmailReg =
	/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
