import Block from 'core/Block';
import './chats.scss';
import { mockMessage } from '../../../static/data/chats';
import { mockAvatar } from '../../../static/data/user';

const profileLinkArrow = '../../../static/icons/profileLinkArrow.svg';
export default class ChatPage extends Block {
	static componentName = 'ChatPage';

	protected render(): string {
		return `
    {{#LayoutChats}}
    <section class="chats">
    <div>
          <div class="chats__profileLinkContainer">
            <a href="../ProfilePage/profile-page.html" class="chats__profileLink">
              Profile
              <img src="${profileLinkArrow}" alt="" class="chats__profileLinkArrow" />
            </a>
          </div>
          <div class="chats__search">
            <input type="text" class="chats__searchInput" placeholder="Search" />
          </div>
          </div>
          <div class="chats__list">
          <ul class="chats__chatList">
            {{{ ChatButton
              username="jim"
              isLastMessageMine=false
              message="lorem"
              time="10:59"
              countBadge=1
            }}}
            {{{ ChatButton
              username="michael"
              isLastMessageMine=false
              message="${mockMessage}"
              time="10:59"
              countBadge=12
            }}}
            {{{ ChatButton
              username="dwight"
              userAvatar="${mockAvatar}"
              isLastMessageMine=true
              message="${mockMessage}"
              time="friday"
              countBadge=0
            }}}
          </ul>
          </div>
        </section>
        {{{ ChatFeed chatId="1" userAvatar="${mockAvatar}" }}}
    {{/LayoutChats}}
        `;
	}
}
