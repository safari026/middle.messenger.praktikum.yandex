import { Block } from 'core';
import './search.scss';

export default class Search extends Block {
	static componentName = 'Search';

	protected render(): string {
		return `
        <form class="search-form">
        <div class="search-form__content">
          <input class="search-form__input" id="search" placeholder="Search..."/>
        </div>
      </form>`;
	}
}
