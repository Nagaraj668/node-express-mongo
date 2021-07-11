var assert = require('assert');
var loginObj = require('../routes/login');

describe('Login', () => {
    it('should return login success', function () {
        assert.strictEqual(loginObj.login(), "login success");
    });
});
