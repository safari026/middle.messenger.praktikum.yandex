import Block from './Block';
import renderDOM from './renderDOM';

function isEqual(value1: string, value2: string) {
	return value1 === value2;
}

export class Route {
	protected _pathname;

	protected _blockClass;

	protected _block: Block | null;

	protected _props: TStringObject;

	constructor(pathname: string, view: typeof Block, props: any) {
		this._pathname = pathname;
		this._blockClass = view;
		this._block = null;
		this._props = props;
	}

	navigate(pathname: string) {
		if (this.match(pathname)) {
			this.render();
		}
	}

	leave() {
		if (this._block) {
			this._block.hide();
		}
	}

	match(pathname: string) {
		return isEqual(pathname, this._pathname);
	}

	render() {
		this._block = new this._blockClass(this._props);

		renderDOM(this._block);
	}
}
