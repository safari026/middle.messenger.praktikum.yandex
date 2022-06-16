import { Block } from "core";
import './textarea.scss'
export class TextArea extends Block{
    protected render(): string {
        return`
        <div class="textarea__conteiner">
        {{{Button className="__textarea__button-adds"}}}
        <textarea class="textarea__message" id="message" name="message" rows="5" cols="33" placeholder="Message">
        </textarea>
        {{{Button className="__textarea__button-send"}}}
      </div>
        `
    }
}