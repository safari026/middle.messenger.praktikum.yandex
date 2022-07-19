import Block from 'core/Block';
import './chats.scss';
import { withRouter } from 'core/withRouter';
import { withStore } from 'core/withStore';
import { BrowserRouter } from 'core/BrowserRouter';
import { Store } from 'core/Store';
import { ValidationRule, validationValue } from 'helpers/validation';
import { getUser } from 'services/auth';
import {
	addUserToChat,
	createChat,
	getChats,
	getChatToken,
	getChatUsers,
	removeChat,
	removeUserFromChat,
} from 'services/chats';
import { transformUser } from 'utils/apiTransformers';

export interface ChatsProps {
	router: BrowserRouter;
	store: Store<AppState>;
}
class ChatPage extends Block<ChatsProps> {
	static componentName = 'ChatPage';

	componentDidMount() {
		this.props.store.dispatch(getChats);
		this.props.store.dispatch(getUser);
	}

	protected getStateFromProps(): void {
		this.state = {
			showAddChatModal: false,
			showAddUserModal: false,
			isVisibleMenu: false,
			showChatUsers: false,
			selectedChat: {
				title: '',
				id: '',
			},
			sendMessage: () => {
				const inputs: NodeListOf<HTMLInputElement> | undefined =
					this.element?.querySelectorAll('input');
				let isValid = true;
				const data: Record<string, string> = {};
				if (inputs) {
					inputs.forEach((input) => {
						const { name, value } = input;
						const ucFirst = name[0].toUpperCase() + name.slice(1);
						const errorMessage = validationValue(
							ValidationRule[ucFirst as keyof typeof ValidationRule],
							value,
						);
						if (errorMessage) {
							isValid = false;
							this.refs[name].getRefs().error.setProps({ text: errorMessage });
						} else {
							data[name] = value;
						}
					});
					if (isValid) {
						this.props.store.getState().socket?.send(
							JSON.stringify({
								content: data.message,
								type: 'message',
							}),
						);
						this.setState({ ...this.state, message: '' });
					}
				}
			},
			onAddChat: () => {
				this.setState({
					showAddChatModal: true,
				});
			},
			onConfirmAddChat: () => {
				const { input } = this.refs.chatName.getRefs();
				const { value } = input.element;
				if (value) {
					this.props.store.dispatch(createChat, {
						title: value,
					});

					this.setState({
						showAddChatModal: false,
					});
				}
			},
			onAddUserToChat: () => {
				const {
					showAddUserModal,
					selectedChat: { id },
				} = this.state;
				const { input } = this.refs.loginName.getRefs();
				const { value } = input.element;
				if (showAddUserModal && value) {
					this.props.store.dispatch(addUserToChat, {
						login: value,
						chatId: id,
					});
					this.setState({
						isVisibleMenu: false,
					});
				}
				this.setState({
					showAddUserModal: !this.state.showAddUserModal,
				});
			},
			onSelectChat: (e: Event) => {
				const { chatId } = (e.currentTarget as HTMLElement).dataset;
				const { chats } = this.props.store.getState();
				if (chatId) {
					const selectedChat = chats.find(({ id }: { id: number }) => id === +chatId);
					this.props.store.dispatch(getChatUsers, { chatId: +chatId });
					if (selectedChat) {
						const { title, id } = selectedChat;

						this.setState({
							selectedChat: {
								title,
								id,
							},
						});
						this.props.store.dispatch(getChatToken, { chatId: id });
					}
				}
			},
			onRemoveChat: () => {
				const { id } = this.state.selectedChat;
				if (id) {
					this.props.store.dispatch(removeChat, {
						chatId: id,
					});

					setTimeout(() => {
						const { chats } = this.props.store.getState();
						this.props.store.dispatch(getChatUsers, { chatId: chats[0].id });
						this.setState({
							selectedChat: {
								title: chats[0].title,
								id: chats[0].id,
							},
							isVisibleMenu: false,
						});
					}, 200);
				}
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
			onRemoveUserFromChat: () => {
				const deleteDivButton: HTMLElement | null = document.querySelector('[data-user-id]');
				if (deleteDivButton) {
					this.props.store.dispatch(removeUserFromChat, {
						userId: deleteDivButton.dataset.userId as string,
						chatId: this.state.selectedChat.id,
					});
				}
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
		} = this.state;
		const { chats, chatUsers, user, chatMessages } = this.props.store.getState();
		return `
    {{#LayoutChats}}
    <div class="modal"  style="display: ${showAddChatModal ? 'flex' : 'none'}">
      <div class="modal__content">
        <span class="modal__title">Choose a chat name</span>
          <div class="modal__input">
            {{{
              ControlledInput
              ref="chatName"
              id="chatName"
              type="text"
			  placeholder="Enter the name of chat room"
              name="chatName"
            }}}
          </div>
      <div class="modal__controls">
        {{{Button
          text="Add chat" className="__button" onClick=onConfirmAddChat
        }}}
        {{{Button
          text="Cancel" className="__button warning" onClick=onCancelAddChat
        }}}
      </div>
      </div>
    </div>
    <div class="modal"
    style="display: ${showAddUserModal ? 'flex' : 'none'}"
    >
        <div class="modal__content">
        <span class="modal__title">Enter user login</span>
          <div class="modal__input">
          {{{ControlledInput
            name="loginName"
            type="text"
            placeholder="Enter of user"
            ref="loginName"
          }}}
          </div>
          <div class="modal__controls">
          {{{Button
            text="Add user in chat"
            className="__button"
            onClick=onAddUserToChat
          }}}
          {{{Button
            text="Cancel"
            onClick=onCancelAddUser
            className="__button warning"
          }}}
          </div>
        </div>
    </div>
    <div class="modal" style="display: ${showChatUsers ? 'flex' : 'none'}">
    <div class="modal__user-list">
    <div class="modal__user-list_title">
   <span>Сhat room members</span>
   <ul class="chat-users-list">
   ${chatUsers
			.map((user) => transformUser(user))
			.map(
				({ firstName, secondName, id }) => `
   
   <li class="chat-users-list-item">
   <div class="chat-users-list-fullname">
     <span>${secondName}</span>
     <span>${firstName}</span>
   </div>
   
     ${
				id !== user?.id
					? `
          <div class="chat-users-list-remove-button"  data-user-id="${id}">
          {{{Button
      text="X"
       className="__transparent"
       onClick=onRemoveUserFromChat
     }}}
     </div>
     `
					: ''
			}
   
 </li>
`,
			)
			.join('')}
   </ul>
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
            text="Create chat"
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
          ${chats
						.map(({ title, id }: { title: string; id: number }) => {
							return `
              {{{ChatButton
                avatar=""
                title="${title}"
                subtitle="Здесь чат"
                time="10:59"
                id="${id}"
                onClick=onSelectChat
              }}}`;
						})
						.join('')}
          </div>
          </div>
        </section>  
          <section class="chatFeed">
            <div class="chatFeed__header">
              <div class="chatFeed__userInfo">
              <div class="chatFeed__avatar"></div>
                <div class="chatFeed__title_subtitle">
                  <span class="chatFeed__title">${title || 'Choose a chat room to chat with'}</span>
                  <div class="chatFeed__subtitle_wrapper">
                 ${
										chatUsers.length > 0
											? ` {{{Button
                  text="${chatUsers.length} members of the chat room"
                  className="__transparent"
                  onClick=onShowChatUsers
                }}}`
											: ''
									}
                 
                  </div>
                </div>
              </div>
              {{{Button
                className="__buttonConfig"
                onClick=onToggleMenu
              }}}
              <div class="chatFeed__header-options-menu" style="display: ${
								isVisibleMenu ? 'flex' : 'none'
							}">
              {{{Button
                className="__link-view"
                text="Add user"
                onClick=onAddUserToChat
              }}}
              {{{Button
                className="__link-view danger"
                text="Delete chat"
                onClick=onRemoveChat
              }}}
              </div>
            </div>
            <div class="chatFeed__feed">
            ${chatMessages
							.map(
								({ message, userId }) =>
									`
                 {{{ChatMessage messageText="${message}" isMessageMine=${user?.id === userId}}}}
                `,
							)
							.join('')}
            </div>
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
