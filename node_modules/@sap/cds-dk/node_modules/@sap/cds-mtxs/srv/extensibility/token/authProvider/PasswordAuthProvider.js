const AuthProvider = require('./AuthProvider');
const { assertDefined } = require('./util/SecretsUtil');

/**
 * Provides credentials according to RFC 6749, 4.3. Resource Owner Password Credentials Grant.
 * In particular, this is uses a One-Time Passcode.
 * See also https://docs.cloudfoundry.org/api/uaa/index.html#one-time-passcode
 */

module.exports = class PasswordAuthProvider extends AuthProvider {

    static #GRANT_TYPE = 'password';

    constructor(credentials, query) {
        super(credentials, query);
        assertDefined('query.passcode', query.passcode);
    }

    /**
     * Returns data suitable as POST request body.
     */
    get postData() {
        return AuthProvider.urlencoded({
            grant_type: PasswordAuthProvider.#GRANT_TYPE,
            client_id: this.credentials.clientid,
            passcode: this.query.passcode,
            scope: this.scope
        });
    }
}
