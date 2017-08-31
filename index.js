const crypto = require('crypto');

module.exports = obj => {
	if (
		typeof obj === 'object' &&
		typeof obj.subject === 'string'
	) {
		return parse(obj);
	}

	return errorHandler(obj);
};

function parse(obj) {
	const pad = crypto.randomBytes(10).toString('hex');
	obj.subject += ` - ${pad}`;

	if (!obj.headers) {
		return errorHandler(obj);
	}

	if (typeof obj.headers === 'object') {
		obj.headers['In-Reply-To'] = '<' + pad + '>';
	}

	if (typeof obj.headers === 'string') {
		obj.headers += '\nIn-Reply-To: <' + pad + '>';
	}

	return obj;
}

function errorHandler(obj) {
	const msg = JSON.stringify(obj);
	throw new TypeError(`Invalid mail object: ${msg}`);
}
