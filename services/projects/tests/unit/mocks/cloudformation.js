module.exports = {
    createStack: jest.fn((param)=>{
        return {
            promise: function(){
                return true;
            }
        }
    })
};
