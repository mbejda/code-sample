const request = require('supertest');
const domain = `http://localhost:3000`;


describe('integration',  () => {
    it('api project create',  async (done) => {
        try {
            const response = await request(domain)
                .post(`/projects`)
                .expect(200);
            expect(response.body.response).toBeDefined();
        }catch(e){
            expect(e).toBeNull();

        }
        return done();

    },10000);
});
