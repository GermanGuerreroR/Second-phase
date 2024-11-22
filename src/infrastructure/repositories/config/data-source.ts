import dotenv from "dotenv";
dotenv.config();

import mysql from "mysql2/promise";
import config from "config";

export const configOption = {
    host: config.get<string>("HOST"),
    user: config.get<string>("USER"),
    password: config.get<string>("PASSWORD"),
    database: config.get<string>("DATABASE"),
    port: config.get<number>("DB_PORT"),
    multipleStatements: true
};

export const getPoolConnection = () => {
    const connection = mysql.createPool(configOption);
    return connection;
};
