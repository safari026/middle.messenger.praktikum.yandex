const Methods = {
	GET: 'GET',
	POST: 'POST',
	PUT: 'PUT',
	DELETE: 'DELETE',
};

function queryStringify(data: any) {
	if (typeof data !== 'object') {
		throw new Error('Data must be object');
	}

	const keys = Object.keys(data);
	return keys.reduce(
		(result, key, index) => `${result}${key}=${data[key]}${index < keys.length - 1 ? '&' : ''}`,
		'?',
	);
}
class ApiClient {
	get = (url: string, options: any) =>
		this.request(url, { ...options, method: Methods.GET }, options.timeout);

	post = (url: string, options: any) =>
		this.request(url, { ...options, method: Methods.POST }, options.timeout);

	put = (url: string, options: any) =>
		this.request(url, { ...options, method: Methods.PUT }, options.timeout);

	delete = (url: string, options: any) =>
		this.request(url, { ...options, method: Methods.DELETE }, options.timeout);

	request = (url: string, options: any, timeout = 5000) => {
		const { headers = {}, method, data } = options;

		return new Promise((resolve, reject) => {
			if (!method) {
				reject('No method');
				return;
			}

			const xhr = new XMLHttpRequest();
			const isGet = method === Methods.GET;

			xhr.open(method, isGet && !!data ? `${url}${queryStringify(data)}` : url);

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

			if (!data) {
				xhr.send();
			} else {
				xhr.send(data);
			}
		});
	};
}
