const services = require('../util/services');

console.log(
    `notification-service: ${process.env.NOTIFICATION_SERVICE_SERVICE_HOST}`
);

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
