import Block from 'core/Block';
import './chats.scss';
import { withRouter } from 'core/withRouter';
import { withStore } from 'core/withStore';
import { BrowserRouter } from 'core/BrowserRouter';
import { Store } from 'core/Store';
import { ValidationRule, validationValue } from 'helpers/validation';
import { mockMessage } from '../../../static/data/chats';
import { mockAvatar } from '../../../static/data/user';

const profileLinkArrow = '../../../static/icons/profileLinkArrow.svg';
export interface ChatsProps {
	router: BrowserRouter;
	store: Store<AppState>;
}
class ChatPage extends Block<ChatsProps> {
	static componentName = 'ChatPage';

	constructor(props: ChatsProps) {
		super(props);

		// this.props.store.dispatch(getChats);
		// this.props.store.dispatch(getUser);
	}

	protected getStateFromProps(props: any): void {
		this.state = {
			showAddChatModal: false,
			showAddUserModal: false,
			isVisibleMenu: false,
			showChatUsers: false,
			selectedChat: {
				title: '',
				id: '',
			},
			values: {
				message: '',
			},
			errors: {
				message: '',
			},
			sendMessage: (e: SubmitEvent) => {
				const inputs: NodeListOf<HTMLInputElement> | undefined =
					this.element?.querySelectorAll('input');
				let isValid = true;
				if (inputs) {
					inputs.forEach((input) => {
						const { name, value } = input;
						const ucFirst = name[0].toUpperCase() + name.slice(1);
						console.log(ucFirst);
						const errorMessage = validationValue(
							ValidationRule[ucFirst as keyof typeof ValidationRule],
							value,
						);
						if (errorMessage) {
							console.log('Erros');
							isValid = false;
							this.state.errors.message = errorMessage;
						}
					});
				}
				this.setState({ ...this.state });
			},
			onAddChat: () => {
				this.setState({
					showAddChatModal: true,
				});
			},
			onToggleMenu: () => {
				this.setState({
					isVisibleMenu: !this.state.isVisibleMenu,
				});
			},
			onShowChatUsers: () => {
				this.setState({
					showChatUsers: true,
				});
			},
			onCloseChatUser: () => {
				this.setState({
					showChatUsers: false,
				});
			},
			onCancelAddChat: () => {
				this.setState({
					showAddChatModal: false,
				});
			},
			onCancelAddUser: () => {
				this.setState({
					showAddUserModal: false,
					isVisibleMenu: false,
				});
			},
		};
	}

	protected render(): string {
		const {
			showAddChatModal,
			showAddUserModal,
			isVisibleMenu,
			showChatUsers,
			selectedChat: { title },
			errors: { message },
		} = this.state;
		console.log('Message', message);
		return `
    {{#LayoutChats}}
    <div class="modal"  style="display: ${showAddChatModal ? 'flex' : 'none'}">
      <div class="modal__content">
        <span class="modal__title">Выберите название чата</span>
          <div class="modal__input">
            {{{
              ControlledInput
              ref="chatName"
              id="chatName"
              type="text"
              name="chatName"
            }}}
          </div>
      <div class="modal__controls">
        {{{Button
          text="Добавить чат" className="__button" onClick=_sendRegistrationData
        }}}
        {{{Button
          text="Отмена" className="__button" onClick=onCancelAddChat
        }}}
      </div>
      </div>
    </div>
    <div class="modal"
    style="display: ${showAddUserModal ? 'flex' : 'none'}"
    >
        <div class="modal__content">
        <span class="modal__title">Введите логин пользователя</span>
          <div class="modal__input">
          {{{ControlledInput
            name="loginName"
            type="text"
            placeholder="Добавить пользователя"
            ref="loginName"
          }}}
          </div>
          <div class="modal__controls">
          {{{Button
            text="Добавить"
            className="__button"
            onClick=onAddUserToChat
          }}}
          {{{Button
            text="Отмена"
            onClick=onCancelAddUser
            className="__button"
          }}}
          </div>
        </div>
    </div>
    <div class="modal" style="display: ${showChatUsers ? 'flex' : 'none'}">
    <div class="modal__user-list">
    <div class="modal__user-list_title">
   <span>Участники чата</span>
    </div>
    {{{Button
      text="X"
      className="__link-view danger"
      onClick=onCloseChatUser
    }}}
    </div>
    </div>
    <section class="chats">
    <div>
          <div class="chats__profileLinkContainer">
          {{{Button
            text="Создать чат"
            className="__link-view"
            onClick=onAddChat
          }}}
          {{{Link to="/profile" text="Profile" className="gray"}}}
            </a>
          </div>
          <div class="chats__search">
            <input type="text" class="chats__searchInput" placeholder="Search" name="search"/>
          </div>
          </div>
          <div class="chats__list">
          <div class="chats__chatList">
            {{{ChatButton
              avatar=""
              title="Привет"
              subtitle="Здесь чат"
              time="10:59"
              id="3434"
            }}}
          </div>
          </div>
        </section>  
          <section class="chatFeed">
            <div class="chatFeed__header">
              <div class="chatFeed__userInfo">
              <div class="chatFeed__avatar"></div>
                <div class="chatFeed__title_subtitle">
                  <span class="chatFeed__title">${title || 'Выберите чат для общения'}</span>
                  <div class="chatFeed__subtitle_wrapper">
                  {{{Button
                    text="3 участников"
                    className="__transparent"
                    onClick=onShowChatUsers
                  }}}
                  </div>
                </div>
              </div>
              {{{Button
                className="__buttonConfig"
                onClick=onToggleMenu
              }}}
              <div class="corresp-header-options-menu" style="display: ${
								isVisibleMenu ? 'flex' : 'none'
							}">
              {{{Button
                className="__link-view"
                text="Добавить пользователя"
                onClick=onAddUserToChat
              }}}
              {{{Button
                className="__link-view danger"
                text="Удалить чат"
                onClick=onRemoveChat
              }}}
              </div>
            </div>
            <div class="chatFeed__feed"></div>
            <footer class="chatFeed__footer">
            {{{Button
              className="__buttonAttachment"
              onClick=onShowChatUsers
            }}}
            <form class="chatFeed__messageForm">
            {{{
              ControlledInput
              ref="message"
              id="message"
              type='text'
              name="message"
              className="__message-input"
              validationRule="${ValidationRule.Message}"
              placeholder="message"
              styledControl="__message"
              }}}
              {{{Button
                onClick=sendMessage
                className="__buttonSend"
              }}}
            </form>
            
            </footer>
          </section>
    {{/LayoutChats}}
        `;
	}
}
export default withRouter(withStore(ChatPage));
