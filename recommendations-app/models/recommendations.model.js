
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
        associate: function(models) {
            // associations can be defined here
            console.log(models);
          db.collection_recommendations.hasOne(db.sequelize.model(db.recommendations));
        }
    });
    db.users.hasMany(Recommendation);
    Recommendation.belongsTo(db.users);

    return Recommendation;
  };

// module.exports = (sequelize, db) => {
//     // @Table({ tableName: 'recommendations', createdAt: true })
//     class Recommendation extends Model {
        

//         @Attribute(DataTypes.INTEGER)
//         @NotNull
//         @HasOne(() => db.users)
//         user_id;
//     }
//     sequelize.models.push(Recommendation);
//     return Recommendation;
//   };