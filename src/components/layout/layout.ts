import Block from 'core/Block';
import './layout.scss';

export default class Layout extends Block {
	static componentName = 'Layout';

	protected render() {
		return `
        <div class="container">
        <div class="screen screen_theme_full">
        <div class="screen__header">
          <div class="screen__title">
            {{title}}
          </div>
        </div>
        <div class="screen__content" data-layout=1></div>
      </div>  
      </div>
      `;
	}
}
