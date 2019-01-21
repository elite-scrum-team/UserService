const services = require('../util/services');

console.log(
    `notification-service: ${process.env.NOTIFICATION_SERVICE_SERVICE_HOST}`
);

if (!process.env.NOTIFICATION_SERVICE_SERVICE_HOST) {
    process.env['NOTIFICATION_SERVICE_SERVICE_HOST'] = '35.228.80.86';
}

module.exports = {
    email: {
        async register(email, name, password) {
            return await services.fetch.post(
                'notification',
                'email/register',
                {},
                {
                    email,
                    name,
                    password,
                }
            );
        },
        async newPassword(email, name, password) {
            return await services.fetch.post(
                'notification',
                'email/newpassword',
                {},
                {
                    email,
                    name,
                    password,
                }
            );
        },
    },
};
