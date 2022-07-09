import Block from 'core/Block';
import { falseReply, mockMessage, theQuestion } from '../../../../data/chats';
import { mockAvatar } from '../../../../data/user';

import './chat-feed.scss';

type ChatFeedProps = {
	chatId: string;
};
const noAvatar = '../../../../static/icons/chatNoAvatar.svg';
export default class ChatFeed extends Block {
	static componentName = 'ChatFeed';

	constructor(props: ChatFeedProps) {
		super({
			...props,
			events: {
				submit: (evt: SubmitEvent) => {
					evt.preventDefault();

					const form: Nullable<HTMLFormElement> = document.querySelector('.chatFeed__messageForm');
					form?.reset();
					console.log('message sent');
				},
			},
		});
	}

	protected render(): string {
		return `
        <section class="chatFeed">
        {{#if chatId}}
          <header class="chatFeed__header">
            <div class="chatFeed__userInfo">
              <img
                src="
                  {{#if userAvatar}}
                    {{ userAvatar }}
                  {{else}}
                    ${noAvatar}
                  {{/if}}"
                class="chatFeed__avatar"
              />
              <p class="chatFeed__username">
                {{#if username}}
                  {{ username }}
                {{else}}
                  no username
                {{/if}}
              </p>
            </div>
            <button class="chatFeed__buttonConfig" />
          </header>

          <div class="chatFeed__feed">
            <p class="chatFeed__date">June 19</p>
            {{{ ChatMessage
              messageText="${mockMessage}"
              messageTime="11:59"
            }}}
            {{{ ChatMessage
              messageText="what?"
              messageTime="11:59"
            }}}
            {{{ ChatMessage
              messageText="${mockMessage}"
              messageTime="11:59"
              messageImage="${mockAvatar}"
            }}}
            {{{ ChatMessage
              messageText="${theQuestion}"
              messageTime="11:59"
              isMessageMine=true
            }}}
            {{{ ChatMessage
              messageText="${falseReply}"
              messageTime="11:59"
              isMessageMine=true
            }}}
          </div>

          <footer class="chatFeed__footer">
            <button class="chatFeed__buttonAttachment"></button>
            <form class="chatFeed__messageForm">
              <input
                name="message"
                class="chatFeed__messageInput"
                placeholder="Message"
              />
              <button class="chatFeed__buttonSend" type="submit" />
            </form>
          </footer>
        {{else}}
          <p class="messages__placeholder">
            Choose a chat to send a message
          </p>
        {{/if}}
    </section>`;
	}
}
