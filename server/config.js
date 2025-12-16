module.exports = {
    // Database configuration
    database: {
        filename: '../database/wbc_dashboard.db',
        // SQLite doesn't need these, but included for completeness
        host: 'localhost',
        port: null,
        username: null,
        password: null
    },

    // Server configuration
    server: {
        port: 3000,
        host: 'localhost'
    },

    // API configuration
    api: {
        basePath: '/api',
        cors: {
            origin: '*',
            methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
            allowedHeaders: ['Content-Type', 'Authorization']
        }
    },

    // Development mode
    development: true,

    // Logging configuration
    logging: {
        level: 'info',
        console: true,
        file: false
    }
};
