const hotelModel = (sequelize, DataTypes) => (
    sequelize.define("hotel", {
        id: {
            type: DataTypes.STRING,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        address: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        avgRating: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: true
        },
        customeCareNumber: {
            type: DataTypes.STRING,
            allowNull: false
        },
        active: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true
        },  
        logo: {
            type: DataTypes.STRING,
            allowNull: true
        },
        deletedAt: {
            type: DataTypes.DATE,
            allowNull: true
        },
        ownerId: {
            type: DataTypes.STRING,
            allowNull: false,
            references: {
                model: 'owners',
                key: 'id'
            }
        }
    })
)

export default hotelModel;