import Block from 'core/Block';
import './layout.scss';

interface LayoutProps {}

export class Layout extends Block<LayoutProps> {
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
