module.exports = axError => {
    const { inspect } = require('util');
    const { url, method } = axError.config ?? {};
    const { code, response = {} } = axError;
    const { status } = response;
    let { data } = response;
    if (Buffer.isBuffer(data)) {
        data = data.toString();
    }
    const reason = data?.error /* RFC 6749 */
        ? typeof data.error === 'string'
            ? data.error
            : inspect(data.error)
        : axError.message;
    const prefix = (url && method
            ? `${method.toUpperCase()} ${url} `
            : '') +
        'failed';
    const message = prefix +
        (status || code ? ':' : '') +
        (status ? ` ${status}` : '') +
        (code ? ` ${code}` : '') +
        `. ${reason}.`;
    const error = new Error(message);
    error.status = status;
    const cds = require('@sap/cds');
    if (cds.debug('req|mtx')) {
        error.cause = axError;
    }
    if (data) {
        cds.log('req').error(`Details on error '${prefix}': ` +
            (data.error_description /* RFC 6749 */ || inspect(data)));
    }
    return Promise.reject(error);
}
