const menuModel = (sequelize, DataTypes) => (
    sequelize.define('menu',{
        id:{
            type: DataTypes.STRING,
            primaryKey: true
        },
        name:{
            type: DataTypes.STRING,
            allowNull: false
        },
        category:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        price:{
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false
        },
        quantity:{
            type: DataTypes.DECIMAL(10, 2),
            allowNull: true
        },
        description:{
            type: DataTypes.TEXT,
            allowNull: true
        },
        deletedAt:{
            type: DataTypes.DATE,
            allowNull: true
        },
        hotelId:{
            type: DataTypes.STRING,
            allowNull: false,
            references: {
                model: 'hotels',
                key: 'id'
            }
        }
    })
)

export default menuModel;