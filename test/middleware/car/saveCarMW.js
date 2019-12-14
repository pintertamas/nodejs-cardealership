const expect = require('chai').expect;
const saveCarMW = require('../../../middleware/car/saveCarMW');

describe('getUserList middleware ', function () {

    it('should set res.locals.car with a car object from the database', function (done) {

        const mw = saveCarMW({});

        const resMock = {

        };

        mw(
            {
                body: {
                    brand: 'kisauto',
                    year: "2020",
                    mileage: "1000",
                    price: "100000",
                    description: 'wololo'
                },
                params: {
                    carid: '13'
                }
            },
            {
                redirect: (where)=>{
                    done();
                }
            },
            (err)=>{
                expect(err).to.be.eql(undefined);
                expect(resMock.locals).to.be.eql({ car: 'mockcar' });
                done();
            })
    });

});