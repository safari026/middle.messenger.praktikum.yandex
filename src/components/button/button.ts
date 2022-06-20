import Block from '../../core/Block';

import './button.scss';

interface ButtonProps {
	text: string;
	className: string;
	onClick: () => void;
}

export class Button extends Block {
	static componentName = 'Button';

	constructor({ text, className, onClick }: ButtonProps) {
		super({ text, className, events: { click: onClick } });
	}

	protected render(): string {
		// language=hbs
		return `
      <div class="button">
        <button class="button{{className}}" type="button">{{text}}</button>
      </div>
    `;
	}
}
