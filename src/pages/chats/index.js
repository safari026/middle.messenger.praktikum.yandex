import { containerWrapped } from '../../components/container'
import tmpl from './chats.hbs'
import './chats.scss'
const chats = {
    text: 'Страница находиться в разработке :)',
}

export const buildChats = () => {
    containerWrapped()
    return tmpl(chats)
}
