export const status = [ 'ACTIVE', 'INACTIVE' ];

const ownerModel = (sequelize, DataTypes) => (
    sequelize.define("owner", {
        id: {
            type: DataTypes.STRING,
            primaryKey: true
        },
        firstName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        phone: {
            type: DataTypes.STRING,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        addressLine1: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        addressLine2: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        city: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        state: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        zipCode: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        gender: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        status: {
            type: DataTypes.ENUM,
            values: status
        },
        deletedAt: {
            type: DataTypes.DATE,
            allowNull: true
        }
    })
)

export default ownerModel;
