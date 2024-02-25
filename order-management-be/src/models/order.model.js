const orderModel = (sequelize, DataTypes) => (
    sequelize.define('order',{
        id:{
            type: DataTypes.STRING,
            primaryKey: true
        },
        orderDetails:{
            type: DataTypes.JSON,   
            allowNull: false
        },
        totalPrice:{
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false
        },
        status:{
            type: DataTypes.STRING,
            allowNull: true
        },
        rating: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        deletedAt:{
            type: DataTypes.DATE,
            allowNull: true
        },

        customerId:{
            type: DataTypes.STRING,
            allowNull: false,
            references: {
                model: 'customers',
                key: 'id'
            }
        }
    })
)

export default orderModel;