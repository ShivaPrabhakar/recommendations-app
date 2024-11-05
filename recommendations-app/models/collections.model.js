
module.exports = (sequelize, Sequelize, db) => {
    const Collections = sequelize.define("collections", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: Sequelize.STRING
        },
        description: {
            type: Sequelize.TEXT
        },
        created_at: {
            type: Sequelize.DATE
        },
        user_id: {
            type: Sequelize.INTEGER,
            references: {
                model: 'users',
                key: 'id'
            }
        }
    },{
        timestamps: false,
        underscored: true
    });
    Collections.belongsTo(db.users);
    db.users.hasMany(Collections);
    return Collections;
  };