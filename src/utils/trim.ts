export const trim = (string: string, chars?: string): string => {
	if (string && !chars) {
		return string.trim();
	}

	const reg = new RegExp(`[${chars}]`, 'gi');
	return string.replace(reg, '');
};
