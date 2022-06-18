import { Block } from 'core';
import './contact.scss';

export class Contact extends Block {
	protected render(): string {
		return `
        <div class="contact">
      <div class="contact__avatar">
      </div>
      <div class="contact__info">
        <p class="contact__name">
          {{name}}
        </p>
        <p class="contact__message">
          {{message}}
        </p>
      </div>
      <div class="contact__active">
        <div class="contact__time">
          {{time}}
        </div>
        <div class="contact__notification">
         {{#if notification}}
            <div class="contact__notification-circle">{{notification}}</div>
          {{/if}}
        </div>
      </div>
    </div>
        `;
	}
}
