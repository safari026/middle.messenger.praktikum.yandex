import Handlebars from 'handlebars'
import tmpl from './button.hbs'
import './button.scss'

export const button = (name) => {
    console.log(name)
    console.log(Handlebars.registerPartial(name, tmpl))
}
