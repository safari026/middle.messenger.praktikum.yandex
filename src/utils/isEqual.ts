const isArray = (value: any): any => {
	return Array.isArray(value);
};

const isPlainObject = (value: any): any => {
	return (
		typeof value === 'object' &&
		value !== null &&
		value.constructor === Object &&
		Object.prototype.toString.call(value) === '[object Object]'
	);
};

const isArrayOrObject = (value: any): any => {
	return isPlainObject(value) || isArray(value);
};

function isEqual(lhs: any, rhs: any): boolean {
	if (Object.keys(lhs).length !== Object.keys(rhs).length) {
		return false;
	}
	// eslint-disable-next-line no-restricted-syntax
	for (const [key, value] of Object.entries(lhs)) {
		const rightValue = rhs[key];
		if (isArrayOrObject(value) && isArrayOrObject(rightValue)) {
			if (isEqual(value, rightValue)) {
				// eslint-disable-next-line no-continue
				continue;
			}
			return false;
		}
		if (value !== rightValue) {
			return false;
		}
	}

	return true;
}
