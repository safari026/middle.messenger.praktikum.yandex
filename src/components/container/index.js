import Handlebars from 'handlebars'
import tmpl from './container.hbs'
import './container.scss'

export const containerWrapped = () => {
    Handlebars.registerPartial('wrappedContainer', tmpl)
}
