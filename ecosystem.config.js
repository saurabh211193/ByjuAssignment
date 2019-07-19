
module.exports = {
    apps: [
        {
            name: 'crm',
            script: 'index.js',
            env_qa: {
                NODE_ENV: 'crm_qa',
            },
            env_prod: {
                NODE_ENV: 'crm_prod',
            },
        },
        {
            name: 'partner',
            script: 'index.js',
            env_qa: {
                NODE_ENV: 'partner_qa',
            },
            env_prod: {
                NODE_ENV: 'partner_prod',
            },
        },
    ],
};
