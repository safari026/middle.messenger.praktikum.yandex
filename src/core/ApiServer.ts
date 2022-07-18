enum METHODS {
	GET = 'GET',
	POST = 'POST',
	PUT = 'PUT',
	DELETE = 'DELETE',
}

type TRequestData = Record<string, unknown>;

type TRequestOptions = {
	method?: METHODS;
	headers?: Record<string, string>;
	timeout?: number;
	data?: any;
	mode?: string;
};

function queryStringify(data: TRequestData) {
	if (!data) return '';
	const keys = Object.keys(data);
	return keys.reduce(
		(result, key, index) => `${result}${key}=${data[key]}${index < keys.length - 1 ? '&' : ''}`,
		'?',
	);
}
const baseUrl = 'https://ya-praktikum.tech/api/v2/';
export default class HTTPTransport {
	public get = (url: string, options: TRequestOptions = {}) => {
		return this.request(url, { ...options, method: METHODS.GET }, options.timeout);
	};

	public post = (url: string, options: TRequestOptions = {}) => {
		return this.request(url, { ...options, method: METHODS.POST }, options.timeout);
	};

	public put = (url: string, options: TRequestOptions = {}) => {
		return this.request(url, { ...options, method: METHODS.PUT }, options.timeout);
	};

	public delete = (url: string, options: TRequestOptions = {}) => {
		return this.request(url, { ...options, method: METHODS.DELETE }, options.timeout);
	};

	request = (url: string, options: TRequestOptions, timeout = 5000): Promise<XMLHttpRequest> => {
		console.log('Options data.', options.data);
		const {
			method = METHODS.GET,
			headers = { 'Content-Type': 'application/json' },
			data,
		} = options;

		return new Promise((resolve, reject) => {
			if (!method) {
				// eslint-disable-next-line prefer-promise-reject-errors
				reject('No method');
				return;
			}

			const xhr = new XMLHttpRequest();
			const isGet = method === METHODS.GET;
			const withBaseUrl = `${baseUrl}${url}`;

			xhr.open(method, isGet && !!data ? `${withBaseUrl}${queryStringify(data)}` : withBaseUrl);
			xhr.withCredentials = true;

			Object.keys(headers).forEach((key) => {
				xhr.setRequestHeader(key, headers[key]);
			});

			xhr.onload = function () {
				resolve(xhr);
			};

			xhr.onabort = reject;
			xhr.onerror = reject;

			xhr.timeout = timeout;
			xhr.ontimeout = reject;

			if (isGet || !data) {
				xhr.send();
			} else if (headers['Content-Type'] === 'application/json') {
				xhr.send(JSON.stringify(data));
			} else {
				xhr.send(data);
			}
		});
	};
}
