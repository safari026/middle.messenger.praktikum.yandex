import Block from 'core/Block';
import '../error.scss';

export default class ServerErrorPage extends Block {
	static componentName = 'ServerErrorPage';

	protected render(): string {
		return `
    <div class="error-page">
    <div class="error-page__content">
        <h3 class="error-page__title">500</h3>
        <div class="error-page__text">Упс, устраняем неполадки</div>
        <div class="error-page__link">
        {{{Link to='/chats' text="Назад к чатам"}}}
        </div>
      </div>
      </div>
      `;
	}
}
