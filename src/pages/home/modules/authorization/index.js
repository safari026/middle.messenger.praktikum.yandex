import './authorization.scss'
import tmpl from './authorization.hbs'
import { button } from '../../../../components/button/index'
import { containerWrapped } from '../../../../components/container/index'

console.log(button('fieldButton'))
const fields = {
    buttonText: 'Авторизоваться',
    authorization: {
        login: {
            name: 'login',
            id: 'login',
            placeholder: 'Введите логин',
        },
        password: {
            name: 'password',
            placeholder: 'Введите пароль',
            pattern:
                '^(?=.*[a-z])(?=.*[A-Z])(?=.*d)(?=.*[@$!%*?&])[A-Za-zd@$!%*?&]{8,10}$',
        },
        linkRegistry: {
            text: 'Нет аккаунта?',
        },
    },
}

export const buildAuthorization = () => {
    containerWrapped()
    button('fieldButton')
    return tmpl(fields)
}
