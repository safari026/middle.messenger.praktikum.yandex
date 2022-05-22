import tmpl from './registration.hbs'
import { button } from '../../../../components/button/index'
import { containerWrapped } from '../../../../components/container/index'
import './registration.scss'

const fields = {
    buttonText: 'Зарегистрироваться',
    registration: {
        email: {
            name: 'email',
            placeholder: 'Введите email',
        },
        login: {
            name: 'login',
            placeholder: 'Введите логин',
        },
        firstName: {
            name: 'firstName',
            placeholder: 'Введите имя',
        },
        lastName: {
            name: 'lastName',
            placeholder: 'Введите фамилию',
        },
        phone: {
            name: 'phone',
            placeholder: 'Введите телефон',
        },
        password: {
            name: 'password',
            placeholder: 'Введите пароль',
        },
        repeatPassword: {
            name: 'repeatPassword',
            placeholder: 'Введите пароль еще раз',
        },
        linkSignIn: {
            text: 'Войти',
        },
    },
}

export const buildRegistration = () => {
    containerWrapped()
    button('fieldButton')
    return tmpl(fields)
}
