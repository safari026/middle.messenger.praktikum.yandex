import Block from 'core/Block';
import './chat-message.scss';

export default class ChatMessage extends Block {
	static componentName = 'ChatMessage';

	protected render(): string {
		return `
      <div
        class="chatMessage ${this.props.isMessageMine ? 'chatMessage_mine' : ''}">
        {{#if messageImage}}
          <img
            src="{{ messageImage }}"
            alt="messageImage"
            class="chatMessage__messageImage"
          />
        {{/if}}
        <p class="chatMessage__messageText">{{ messageText }}</p>
        <p class="chatMessage__messageTime">{{ messageTime }}</p>
      </div>`;
	}
}
