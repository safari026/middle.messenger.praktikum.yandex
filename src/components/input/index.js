import tmpl from './input.hbs'
import Handlebars from 'handlebars'

export const fieldInput = (name) => {
    Handlebars.registerPartial(name, tmpl)
}
