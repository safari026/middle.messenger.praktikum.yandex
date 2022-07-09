import Block from 'core/Block';
import './chat-button.scss';

type ChatButtonProps = {
	username: string;
	userAvatar: string;
	isLastMessageMine: boolean;
	message: string;
	time: string;
	countBadge: number;
};
const chatNoAvatar = '../../../../static/icons/chatNoAvatar.svg';
export default class ChatButton extends Block {
	static componentName = 'ChatButton';

	protected render(): string {
		return `
        <li class="chatButton" >
          <img
            src="
              {{#if userAvatar}}
                {{userAvatar}}
              {{else}}
              ${chatNoAvatar}
              {{/if}}"
            alt="userAvatar"
            class="chatButton__avatar"
          />
          <div class="chatButton__messageInfo">
            <div class="chatButton__userAndMessage">
              <p class="chatButton__username">{{ username }}</p>
              <p class="chatButton__messageText">
                {{#if isLastMessageMine}}
                  <span class="chatButton__messageText chatButton__message_you"></span>
                {{/if}}
                {{ message}}
              </p>
            </div>
            <div class="chatButton__timeAndCount">
              <p class="chatButton__time">{{ time }}</p>
              {{#if countBadge}}
                <div class="chatButton__countBadge">{{ countBadge }}</div>
              {{/if}}
            </div>
          </div>
        </li>
  `;
	}
}
