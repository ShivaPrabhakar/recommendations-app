
module.exports = (sequelize, Sequelize, db) => {
    const Recommendation = sequelize.define("recommendations", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: Sequelize.STRING
        },
        category: {
            type: Sequelize.STRING
        },
        caption: {
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
        underscored: true,
    });
    db.users.hasMany(Recommendation);
    Recommendation.belongsTo(db.users);

    return Recommendation;
  };