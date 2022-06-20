import { Block } from 'core';
import '../error.scss';

export default class NotFoundPage extends Block {
	static componentName = 'NotFoundPage';

	render() {
		return `
		<div class="error-page">
	<div class="error-page__content">
  <h3 class="error-page__title">404</h3>
  <div class="error-page__text">Ведутся работы</div>
  <div class="error-page__link">
  {{{Link to='/chat' text="Назад к чатам"}}}
  </div>
  
  </div>`;
	}
}
