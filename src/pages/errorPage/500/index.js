import { containerWrapped } from '../../../components/container'
import tmpl from './500.hbs'
import './500.scss'
const error = {
    internalServerError: {
        statusTitle: '500',
        errorMessage: 'Мы уже фиксим',
    },
    linkMessage: 'Назад к чатам',
}
export const buildErrorPage500 = () => {
    containerWrapped()
    return tmpl(error)
}
