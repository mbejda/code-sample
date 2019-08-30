const controller = require('./controller');

module.exports.create = async event => {
    try {
        const response = await controller.create(event);
        return {
            statusCode: 200,
            body: JSON.stringify(
                {
                    response,
                },
                null,
                2
            ),
        };
    } catch(e){
        return {
            statusCode: 200,
            error: e.toString()
        }
    }
};

