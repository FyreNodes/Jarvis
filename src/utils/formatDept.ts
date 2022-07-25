export default (str: string): string => {
	const strs: object = {
		tech: 'Technical',
		billing: 'Billing',
		general: 'General'
	};
	return str.replace(/\b(?:tech|billing|general)\b/gi, (res) => strs[res]);
};
