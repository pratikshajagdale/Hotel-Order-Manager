const paymentModel = (sequelize, DataTypes) => (
    sequelize.define("payment", {
        id: {
            type: DataTypes.STRING,
            primaryKey: true
        },
        amount: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false
        },
        status: {
            type: DataTypes.STRING,
            allowNull: false
        },
        paymentDetails:{
            type: DataTypes.JSON,
            allowNull: false
        },
        deletedAt: {
            type: DataTypes.DATE,
            allowNull: true
        },
        orderId: {
            type: DataTypes.STRING,
            allowNull: false,
            references: {
                model: 'orders',
                key: 'id'
            }
        }
    })
)

export default paymentModel;