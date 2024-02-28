import { Sequelize, DataTypes } from "sequelize";
import ownerModel from "../api/models/owner.model.js";
import customerModel from "../api/models/customer.model.js";
import hotelModel from "../api/models/hotel.model.js";
import menuModel from "../api/models/menu.model.js";
import tableModel from "../api/models/table.model.js";
import orderModel from "../api/models/order.model.js";
import paymentModel from "../api/models/payment.model.js";
import notificationModel from "../api/models/notification.model.js";
import env from "./env.js";

const config = {
    host: env.db.host,
    dialect: env.db.dialect,
    port: env.db.port,
    username: env.db.user,
    password: env.db.password,
}
export const db = {};

const createDatabase = async () => {
    try {
        const sequelize = new Sequelize({ ...config })

        // authenticate the connection
        await sequelize.authenticate();

        // create table if not exists
        await sequelize.query(`CREATE DATABASE IF NOT EXISTS \`${env.db.name}\`;`);
        console.log(`🟢 Database initialized successfully.`);
        return new Sequelize({ ...config, database: env.db.name });
    } catch (error) {
        console.error(`🔴 Failed to initialize database: ${error.message}`);
        throw error;
    }
};

// Define all database models
const defineModels = (sequelize) => {
    db.Sequelize = Sequelize;
    db.owners = ownerModel(sequelize, DataTypes);
    db.customers = customerModel(sequelize, DataTypes);
    db.hotels = hotelModel(sequelize, DataTypes);
    db.menus = menuModel(sequelize, DataTypes);
    db.tables = tableModel(sequelize, DataTypes);
    db.orders = orderModel(sequelize, DataTypes);
    db.payments = paymentModel(sequelize, DataTypes);
    db.notifications = notificationModel(sequelize, DataTypes);
    return;
};

const initDb = async () => {
    try {
        // Initialize database connection and create database if necessary
        const sequelize = await createDatabase();

        // Define and associate models
        defineModels(sequelize);

        // Sync models with database
        await sequelize.sync({ force: false });
        console.log("🔄 Database synchronized successfully");
    } catch (error) {
        throw error;
    }
}

export default initDb;
