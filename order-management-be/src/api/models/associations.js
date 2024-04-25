function defineAssociations( db ) {
    const { users, invites } = db;

    // user and invite associations
    users.hasMany(invites, { foreignKey: 'ownerId' });
    invites.belongsTo(users, { foreignKey: 'ownerId' });
}

export default defineAssociations;
