const mysql = require('mysql2/promise');

const getDbConfig = () => {
    const dbType = process.env.DB_TYPE || 'backend';
    
    return {
        host: process.env[`DB_HOST_${dbType.toUpperCase()}`],
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env[`DB_NAME_${dbType.toUpperCase()}`]
    };
};

const createPool = () => {
    const config = getDbConfig();
    return mysql.createPool(config);
};

module.exports = {
    getDbConfig,
    createPool
}; 