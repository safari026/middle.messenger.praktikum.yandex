import Block from 'core/Block';
import './chats.scss';
import data from '../../../static/data/contacts.json';

export class ChatPage extends Block {
	protected getStateFromProps(props: any): void {
		this.state = {
			contacts: data,
		};
    console.log(this.state.contacts)
	}
	protected render(): string {
		return `
    <div class="chat_container">
    <div class="chat_container__tape">
      {{{Link text="Profile" to="/profile"}}}
      {{{Search}}}
      <div class="chat_container__chats_list">
        {{#each contacts}}
          {{{Contact name=this.name message=this.message notification=this.notification}}}
        {{/each}}
      </div>
    </div>
    <div class="chat_container__dialog">
      <div class="chat_container__dialog__contact">
        <div class="chat_container__dialog__contact__avatar"></div>
        <div class="chat_container__dialog__contact__name">{{contacts.[0].name}}</div>
        <div class="chat_container__dialog__contact__menu"></div>
      </div>
      <div class="chat_container__dialog__dialog">
        <div class="message">
          <p></p>
        </div>
        <div class="message">
          <p></p>
        </div>
      </div>
      <div class="chat_container__dialog__textarea">
        {{{TextArea}}}
      </div>
    </div>
  </div>
        `;
	}
}

