import tmpl from './profile.hbs'
import './profile.scss'
import { containerWrapped } from '../../components/container'

const fields = {
    profileInfo: [
        {
            fieldName: 'Почта',
            profileInfo: 'ivanivano@yandex.ru',
        },
        {
            fieldName: 'Логин',
            profileInfo: 'IvanIvanov',
        },
        {
            fieldName: 'Имя',
            profileInfo: 'Иван',
        },
        {
            fieldName: 'Фамилия',
            profileInfo: 'Иванов',
        },
        {
            fieldName: 'Имя в чате',
            profileInfo: 'Иван',
        },
        {
            fieldName: 'Телефон',
            profileInfo: '+7(909)-967-30-30',
        },
    ],
}

export const buildProfile = () => {
    containerWrapped()
    return tmpl(fields)
}
