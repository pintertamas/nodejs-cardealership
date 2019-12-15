const expect = require('chai').expect;
const checkAdminMW = require('../../../middleware/auth/checkAdminMW');

describe('auth middleware', function () {
    it('should call next if the admin session exists and is equal to true', function (done) {
        const reqMock = {
            session: {
                admin: 'false'
            }
        };

        checkAdminMW({})(reqMock, {}, function() {
            expect(reqMock.session.admin).to.be.eql('false');
            done();
        });
    });
    it('should call res.redirect', function (done) {
        const reqMock = {
            session: {
                admin: false
            }
        };
        const resMock = {
            redirect: function(newurl) {
                expect(newurl).to.be.eql('/logout');
                done();
            }
        };

        checkAdminMW({})(reqMock, resMock, function() {
            expect('next should not be called').to.be.eql(false);
        });
    });

});