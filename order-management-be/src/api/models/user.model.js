export const status = [ 'ACTIVE', 'INACTIVE' ];
export const roles = [ 'OWNER', 'ADMIN', 'CUSTOMER' ];

const userModel = (sequelize, DataTypes) => (
    sequelize.define("user", {
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
            allowNull: true
        },
        status: {
            type: DataTypes.ENUM,
            values: status,
            allowNull: false
        },
        role: {
            type: DataTypes.ENUM,
            values: roles,
            allowNull: false,
        },
        deletedAt: {
            type: DataTypes.DATE,
            allowNull: true
        }
    })
)

export default userModel;
