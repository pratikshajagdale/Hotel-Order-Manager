import dbConfig from "./config/sequelize.js";

const { Sequelize, sequelize, DataTypes } = dbConfig;

sequelize.authenticate().then(() => {
    console.log("Connected to the database");
}).catch((err) => {
    console.log("Cannot connect to the database", err);
});    

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// import all models

import ownerModel from "./models/ownerModel.js";
import customerModel from "./models/customerModel.js";
import hotelModel from "./models/hotelModel.js";
import menuModel from "./models/menuModel.js";
import tableModel from "./models/tableModel.js";
import orderModel from "./models/orderModel.js";
import paymentModel from "./models/paymentModel.js";
import notificationModel from "./models/notificationModel.js";

// create all models
db.owners = ownerModel(sequelize, DataTypes);
db.hotels = hotelModel(sequelize, DataTypes);
db.customers = customerModel(sequelize, DataTypes);
db.menus = menuModel(sequelize, DataTypes);
db.tables = tableModel(sequelize, DataTypes);
db.orders = orderModel(sequelize, DataTypes);
db.payments = paymentModel(sequelize, DataTypes);
db.notifications = notificationModel(sequelize, DataTypes);

db.sequelize.sync({ force: false }).then(() => {
    console.log("re-sync db.");
});

export default db;
