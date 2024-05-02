const AuthProvider = require('./AuthProvider');
const { assertDefined } = require('./util/SecretsUtil');

/**
 * Provides credentials according to RFC 6749, 6. Refreshing an Access Token.
 * See also https://docs.cloudfoundry.org/api/uaa/index.html#refresh-token
 */

module.exports = class RefreshTokenAuthProvider extends AuthProvider {

    static #GRANT_TYPE = 'refresh_token';

    constructor(credentials, query) {
        super(credentials, query);
        assertDefined('query.refresh_token', query.refresh_token);
    }

    /**
     * Returns data suitable as POST request body.
     */
    get postData() {
        return AuthProvider.urlencoded({
            grant_type: RefreshTokenAuthProvider.#GRANT_TYPE,
            client_id: this.credentials.clientid,
            refresh_token: this.query.refresh_token,
            scope: this.scope
        });
    }
}
