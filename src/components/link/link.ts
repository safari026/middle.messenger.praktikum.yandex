import Block from 'core/Block';

import './link.scss';

interface LinkProps {
	text: string;
	to: string;
	onClick?: string;
}

export class Link extends Block {
	static componentName = 'Link';

	constructor(props: LinkProps) {
		super({ ...props, events: { click: props.onClick } });
	}

	render() {
		// language=hbs
		return `<a href="{{to}}" class="link">{{text}}</a>`;
	}
}
