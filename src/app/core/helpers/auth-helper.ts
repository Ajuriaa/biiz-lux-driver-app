export function findToken(): boolean {
	const cookies = document.cookie.split('; ');
	for (const c of cookies) {
		if (c.indexOf('BZ-TOKEN=') === 0) {
			return true;
		}
	}
	return false;
}
