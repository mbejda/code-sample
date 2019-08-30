const fs = require('fs');
const path = require('path');
const {
    AWS,
    Project
} = require(`${__dirname}/lib/index.js`);



module.exports.create = async event => {
    try {
        const cloudformation = new AWS.CloudFormation({apiVersion: '2010-05-15'});
        const cfRole = process.env.CLOUDFORMATION_ROLE;
        const templateBody = fs.readFileSync(path.join(`${__dirname}/cf`, 'stack.yml'), 'utf8');
        const shortName = await Project.generateName();

        const params = {
            StackName: shortName,
            Capabilities: ['CAPABILITY_IAM'],
            EnableTerminationProtection: false,
            OnFailure: 'DELETE',
            Parameters: [
                {
                    ParameterKey: 'SubDomain',
                    ParameterValue: `${shortName}.${process.env.DOMAIN}`
                },{
                    ParameterKey: 'ApexDomain',
                    ParameterValue: `${process.env.ROUTE53_HOST_NAME}}`
                },
            ],
            RoleARN: cfRole,
            Tags: [
                {
                    Key: 'project',
                    Value: shortName
                }
            ],
            TemplateBody: templateBody,
            TimeoutInMinutes: 5
        };
        return await cloudformation.createStack(params).promise();
    } catch(e){
        throw new Error(e.toString())
    }
};
