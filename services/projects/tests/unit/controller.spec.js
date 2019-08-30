require('env-create').load({
    path: "../../../config.dev.json",
    encode: "utf8"
});


const { AWS } = require('../../lib/index');
const controller = require('../../controller');
const { cloudformation } = require('./mocks/index');




beforeAll(() => {
    AWS.CloudFormation = jest.fn(()=>{
        return cloudformation
    })
});


describe('unit',  () => {
    test('controller create', async () => {
        try {
            const data = await controller.create();
            expect(data).toBeDefined();
        } catch (e) {
            expect(e).not.toBeDefined();
        }
    });
});



