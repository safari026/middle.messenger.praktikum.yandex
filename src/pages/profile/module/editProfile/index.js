import { button } from '../../../../components/button'
import { containerWrapped } from '../../../../components/container'
import { fieldInput } from '../../../../components/input'
import tmpl from './editProfile.hbs'
const fields = {
    buttonText: 'Сохранить',
    profileEditDataList: [
        {
            labelName: 'Почта',
            typeName: 'text',
            value: 'pochta@yandex.ru',
            fieldName: 'email',
        },
        {
            labelName: 'Логин',
            typeName: 'text',
            value: 'ivanIvanov',
            fieldName: 'login',
        },
        {
            labelName: 'Имя',
            typeName: 'text',
            value: 'Иван',
            fieldName: 'firstName',
        },
        {
            labelName: 'Фамилия',
            typeName: 'text',
            value: 'Иванов',
            fieldName: 'lastName',
        },
        {
            labelName: 'Имя в чате',
            typeName: 'text',
            value: 'CСеер',
            fieldName: 'nameInChat',
        },
        {
            labelName: 'Телефон',
            typeName: 'text',
            value: '+7(909)863-36-97',
            fieldName: 'phone',
        },
    ],
}

export const buildEditProfile = () => {
    containerWrapped()
    fieldInput('editProfileData')
    button('buttonSave')
    return tmpl(fields)
}
