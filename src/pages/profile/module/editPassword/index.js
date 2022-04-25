import tmpl from './editPassword.hbs'
import '../../profile.scss'
import { containerWrapped } from '../../../../components/container'
import { fieldInput } from '../../../../components/input/index'
import { button } from '../../../../components/button'
const editPasswordData = {
    buttonText: 'Сохранить',
    passwordEditData: [
        {
            labelName: 'Старый пароль',
            typeName: 'password',
            value: 'FF23456',
            fieldName: 'oldPassword',
        },
        {
            labelName: 'Новый пароль',
            typeName: 'password',
            value: 'FF23456',
            fieldName: 'newPassword',
        },
        {
            labelName: 'Повторите новый пароль',
            typeName: 'password',
            value: 'FF23456',
            fieldName: 'repeatPassword',
        },
    ],
}
export const buildEditPassword = () => {
    containerWrapped()
    fieldInput('editPassword')
    button('buttonSave')
    return tmpl(editPasswordData)
}
