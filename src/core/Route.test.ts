import Block from './Block';
import renderDOM from './renderDOM';
import { Route } from './Route';

jest.mock('./renderDOM', () => jest.fn());

describe('core/Route', () => {
	it('route should not invoke renderDOM if navigate path name match routes pathname', () => {
		const view = class SignInPage extends Block {};

		const route = new Route('/abc', view, {});

		route.navigate('/chats');

		expect(renderDOM).toHaveBeenCalledTimes(0);
	});
});
