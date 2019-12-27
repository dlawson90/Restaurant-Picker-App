let config = {
    'development': {
        database: {
            url: "mongodb://dan:qwerty123@ds129625.mlab.com:29625/restaurant-picker"
        },
        server: {
            port: 3000
        }
    },
    'production': {
        database: {
            url: "mongodb://dan:qwerty123@ds129625.mlab.com:29625/restaurant-picker"
        },
        server: {
            port: process.env.PORT
        }
    }
};

module.exports = config;