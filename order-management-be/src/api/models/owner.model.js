export const status = [ 'ACTIVE', 'INACTIVE' ];

const ownerModel = (sequelize, DataTypes) => (
    sequelize.define("owner", {
        id: {
            type: DataTypes.STRING,
            primaryKey: true,
            unique: true
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
            allowNull: false,
            unique: true
        },
        phoneNumber: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        addressLine1: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        addressLine2: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        city: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        state: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        zipCode: {
            type: DataTypes.TEXT,
            allowNull: false
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
