import tmpl from './container.hbs'
import Handlebars from 'handlebars'
import './container.scss'

export const containerWrapped = () => {
    
    Handlebars.registerPartial('wrappedContainer', tmpl)
}
