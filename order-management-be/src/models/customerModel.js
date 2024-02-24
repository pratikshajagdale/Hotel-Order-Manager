const customerModel = (sequelize, DataTypes) => {
    const customer = sequelize.define("customer", {
        id: {
            type: DataTypes.STRING,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        phone: {
            type: DataTypes.STRING,
            allowNull: false
        },
        hotelId: {
            type: DataTypes.STRING,
            allowNull: false,
            references: {
                model: 'hotels',
                key: 'id'
            }
        }
    });

    return customer;
}

export default customerModel;