const expect = require('chai').expect;
const getCarMW = require('../../../middleware/car/getCarMW');

describe('getCar middleware', function () {

    it('should set res.locals.car with a car object from the database', function (done) {

        const mw = getCarMW({
            CarModel:{
                findOne: (p1, cb)=>{
                    expect(p1).to.be.eql({ _id: '13' });
                    cb(null, 'mockcar');
                }
            }
        });

        const resMock = {
            locals: {}
        };

        mw({
            params: {
                carid: '13'
            }
        },resMock,
            (err)=>{
            expect(err).to.be.eql(undefined);
            expect(resMock.locals).to.be.eql({ car: 'mockcar' });
            done();
        })
    });
    it('should call next with error on database problem', function (done) {

        const mw = getCarMW({
            CarModel:{
                findOne: (p1, cb)=>{
                    expect(p1).to.be.eql({ _id: '13' });
                    cb('dberror', null);
                }
            }
        });

        const resMock = {
            locals: {}
        };

        mw({
                params: {
                    carid: '13'
                }
            },resMock,
            (err)=>{
                expect(err).to.be.eql('dberror');
                done();
            })
    });
    it('should call next when no car was found in the database', function (done) {

        const mw = getCarMW({
            CarModel:{
                findOne: (p1, cb)=>{
                    expect(p1).to.be.eql({ _id: '13' });
                    cb(undefined, null);
                }
            }
        });

        const resMock = {
            locals: {}
        };

        mw({
                params: {
                    carid: '13'
                }
            },resMock,
            (err)=>{
                expect(err).to.be.eql(undefined);
                done();
            })
    });

});