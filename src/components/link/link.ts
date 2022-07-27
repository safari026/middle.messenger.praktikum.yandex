import { EventsProps } from '@/components/user-avatar/user-avatar';
import Block from '@/core/Block';
import { BrowserRouter } from '@/core/BrowserRouter';
import { withRouter } from '@/core/withRouter';

import './link.scss';

interface CustomLinkProps {
	text: string;
	to: string;
	onClick?: () => void;
	className?: string;
	router: BrowserRouter;
}

class Link extends Block<CustomLinkProps & EventsProps> {
	static componentName = 'Link';

	constructor({ onClick, to, router, ...rest }: CustomLinkProps) {
		super({ events: { click: onClick }, to, router, ...rest });
		this.setProps({
			to,
			events: {
				...this.props.events,
				click: (e) => {
					e.preventDefault();
					router.go(to);
				},
			},
			router,
		});
	}

	render() {
		// language=hbs
		return `<a href="{{to}}" class="link {{className}}">{{text}}</a>`;
	}
}
export default withRouter(Link);
