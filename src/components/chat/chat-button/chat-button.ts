import { EventsProps } from 'components/user-avatar/user-avatar';
import Block from 'core/Block';
import './chat-button.scss';

export interface ChatProps {
	avatar: string;
	title: string;
	time: string;
	subtitle: string;
	id: number;
	onClick?: () => void;
}
export default class ChatButton extends Block<ChatProps & EventsProps> {
	static componentName = 'ChatButton';

	constructor({ onClick, id, ...rest }: ChatProps) {
		super({ events: { click: onClick }, id, ...rest });
	}

	protected render(): string {
		return `
    <div class="chat" data-chat-id="{{id}}">
    <div class="chat-avatar">
    </div>
    <div class="chat-content">
      <div class="chat-content-top">
        <span class="chat-content-title">{{title}}</span>
        <span class="chat-content-time">{{time}}</span>
      </div>
      <span class="chat-content-subtitle">{{subtitle}}</span>
    </div>
  </div>
  `;
	}
}
