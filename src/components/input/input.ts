import Block from '../../core/Block';

import './input.scss';

interface InputProps {
	onChange?: (e: any) => void;
	type?: 'text' | 'password' | 'email';
	placeholder?: string;
	name: string;
	value?: string;
	error?: string;
	onBlur?: () => void;
	onFocus?: () => void;
}

export class Input extends Block {
	constructor({
		onChange = () => {},
		type = 'text',
		error,
		placeholder,
		value,
		onFocus,
		onBlur,
	}: InputProps) {
		super({
			type,
			placeholder,
			value,
			error,
			events: { input: onChange, focusout: onBlur, focusin: onFocus },
		});
	}

	protected render(): string {
		// language=hbs
		return `
      <div class="input">
        <input class="input__input" type="{{type}}" placeholder="{{placeholder}}" value="{{value}}">
        <div class="input__error">{{#if error}}{{error}}{{/if}}</div>
      </div>
    `;
	}
}
