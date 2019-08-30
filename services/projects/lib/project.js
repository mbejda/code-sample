const { uniqueNamesGenerator } = require('unique-names-generator');
module.exports = {
    generateName : async () => {
        /**
         * Perform async operation.
         * @type {{length: number, separator: string}}
         */
        const config = {
            separator: '-',
            length: 3
        };
        return uniqueNamesGenerator(config);
    }

};
