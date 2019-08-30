const { Project } = require('../../lib/index');

describe('unit',  () => {
    it('project generateName()',  async (done) => {
        try {
            const data = await Project.generateName();
            expect(data).toBeDefined();

        } catch (e) {
            expect(e).not.toBeDefined();
        }
        done();
    },10000);
});
