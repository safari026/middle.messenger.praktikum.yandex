import { buildChats } from './pages/chats'
import { buildErrorPage404 } from './pages/errorPage/404'
import { buildErrorPage500 } from './pages/errorPage/500'
import { buildAuthorization } from './pages/home/modules/authorization'
import { buildRegistration } from './pages/home/modules/registration'
import { buildProfile } from './pages/profile'
import { buildEditPassword } from './pages/profile/module/editPassword'
import { buildEditProfile } from './pages/profile/module/editProfile'

const routes = {
    '/authorization': buildAuthorization,
    '/registration': buildRegistration,
    '/profile': buildProfile,
    '/edit-password': buildEditPassword,
    '/edit-profile': buildEditProfile,
    '/404': buildErrorPage404,
    '/500': buildErrorPage500,
    '/': buildChats,
}
const renderDOM = (page) => {
    const root = document.getElementById('root')
    root.innerHTML = page()
}

const router = (event) => {
    const pathName = window.location.pathname
    const page = routes[pathName]
    if (page) {
        renderDOM(page)
    } else {
        console.log('page')
        renderDOM(routes['/404'])
    }
}

window.addEventListener('load', router)
window.addEventListener('hashchange', router)
