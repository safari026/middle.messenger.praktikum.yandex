import Block from '../../core/Block';

import './error.scss';

interface ErrorMessageProps {
	text: string;
}

export default class ErrorMessage extends Block {
	static componentName = 'Error';

	protected render(): string {
		// language=hbs
		return `
		<div class="error">{{text}}</div>
    `;
	}
}
