import Handlebars from 'handlebars'
import tmpl from './input.hbs'

export const fieldInput = (name) => {
    Handlebars.registerPartial(name, tmpl)
}
