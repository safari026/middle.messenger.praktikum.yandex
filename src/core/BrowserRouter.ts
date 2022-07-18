import { Route } from './Route';

export class BrowserRouter {
	private routes: Route[] = [];

	private history: History = window.history;

	private _currentRoute: Route | null | undefined;

	static __instance: BrowserRouter;

	constructor() {
		if (BrowserRouter.__instance) {
			return BrowserRouter.__instance;
		}
		this.routes = [];
		this.history = window.history;
		this._currentRoute = null;

		BrowserRouter.__instance = this;
	}

	use(pathname: string, block: any, props: any) {
		console.log('use', pathname, block, props);
		const route = new Route(pathname, block, props);
		this.routes.push(route);
		return this;
	}

	start() {
		window.onpopstate = (event: PopStateEvent) => {
			this._onRoute((event.currentTarget as Window)?.location.pathname);
		};
		this._onRoute(window.location.pathname);
	}

	_onRoute(pathname: string) {
		const route = this.getRoute(pathname);
		if (!route) {
			return;
		}
		if (this._currentRoute && this._currentRoute !== route) {
			console.log('CurrentRoute');
			this._currentRoute.leave();
		}
		this._currentRoute = route;
		route.render();
	}

	go(pathname: string) {
		this.history?.pushState({}, '', pathname);
		this._onRoute(pathname);
	}

	back() {
		this.history?.back();
	}

	forward() {
		this.history?.forward();
	}

	getRoute(pathname: string) {
		const route = this.routes?.find((route) => route.match(pathname));
		return route || this.routes.find((route) => route.match('*'));
	}
}
