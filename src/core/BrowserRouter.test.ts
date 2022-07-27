import Block from './Block';
import { BrowserRouter } from './BrowserRouter';
import { Route } from './Route';

describe('core/router/Router', () => {
	it('should register rout', () => {
		// arrange
		class Page1 extends Block {}
		const router = new BrowserRouter();
		router.use('/test', Page1, { title: 'Test' });
		// act
		const route = router.getRoute('/test');
		// assert
		expect(route!.match('/test')).toEqual(true);
		expect(route).toBeInstanceOf(Route);
	});
});
