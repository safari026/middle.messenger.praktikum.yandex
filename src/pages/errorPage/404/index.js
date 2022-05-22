import { containerWrapped } from '../../../components/container'
import tmpl from './404.hbs'
import './error.scss'

const error = {
    notFound: {
        statusTitle: '404',
        errorMessage: 'Не туда попали',
    },
    linkMessage: 'Назад к чатам',
}
export const buildErrorPage404 = () => {
    containerWrapped()
    return tmpl(error)
}
