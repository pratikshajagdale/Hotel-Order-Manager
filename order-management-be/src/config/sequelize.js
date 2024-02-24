import {Sequelize, DataTypes} from "sequelize";
import env from "./vars.js";

const sequelize = new Sequelize(
    env.db, 
    env.user, 
    env.password, {
        host: env.host,
        dialect: env.dialect,        
    }
);

const dbConfig = {
    Sequelize,
    sequelize,
    DataTypes
};

export default dbConfig;
