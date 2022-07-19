type Indexed<T = object> = {
	[key in string]: T;
};

export function merge(lhs: Indexed, rhs: Indexed): Indexed {
	// eslint-disable-next-line no-restricted-syntax
	for (const p in rhs) {
		if (!Object.prototype.hasOwnProperty.call(rhs, p)) {
			// eslint-disable-next-line no-continue
			continue;
		}

		try {
			if (rhs[p].constructor === Object) {
				rhs[p] = merge(lhs[p] as Indexed, rhs[p] as Indexed);
			} else {
				lhs[p] = rhs[p];
			}
		} catch (e) {
			lhs[p] = rhs[p];
		}
	}

	return lhs;
}
