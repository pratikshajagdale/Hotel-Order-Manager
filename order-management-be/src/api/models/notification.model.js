const notificationModel = (sequelize, DataTypes) => (
    sequelize.define("notification", {
        id: {
            type: DataTypes.STRING,
            primaryKey: true
        },
        fcmToken: {
            type: DataTypes.STRING,
            allowNull: false
        },
        
        message: {
            type: DataTypes.STRING,
            allowNull: false
        },
        status: {
            type: DataTypes.STRING,
            allowNull: true
        },
        deletedAt: {
            type: DataTypes.DATE,
            allowNull: true
        },
        customerId: {
            type: DataTypes.STRING,
            allowNull: false,
            references: {
                model: 'customers',
                key: 'id'
            }
        }
    })
)

export default notificationModel;