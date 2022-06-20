import { Block } from 'core';
import './textarea.scss';

export class TextArea extends Block {
	static componentName = 'TextArea';

	protected getStateFromProps(): void {
		this.state = {
			values: {
				message: '',
			},
			_sendMessage: () => {
				console.log('This refs', (this._element!.children[1] as HTMLTextAreaElement).value);
			},
		};
	}

	protected render(): string {
		return `
        <div class="textarea__conteiner">
        {{{Button className="__textarea__button-adds"}}}
        <textarea class="textarea__message" id="message" name="message" ref="message" rows="5" cols="33" placeholder="Message">
        </textarea>
        {{{Button className="__textarea__button-send" onClick=_sendMessage}}}
      </div>
        `;
	}
}
