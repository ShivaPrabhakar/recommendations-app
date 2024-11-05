
module.exports = (sequelize, Sequelize, db) => {
    const CollectionRecommendations = sequelize.define("collection_recommendations", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        collection_id: {
            type: Sequelize.INTEGER,
            references: {
                model: 'collections',
                key: 'id'
            }
        },
        recommendation_id: {
            type: Sequelize.INTEGER,
            references: {
                model: 'recommendations',
                key: 'id'
            }
        }
    },{
        timestamps: false,
        underscored: true
    }, {
        
    });
    db.recommendations.belongsToMany(db.collections, { through: CollectionRecommendations });
    db.collections.belongsToMany(db.recommendations, { through: CollectionRecommendations });

    CollectionRecommendations.belongsTo(db.collections, {foreignKey: 'collection_id', as: 'collections', onDelete: 'CASCADE'});
    CollectionRecommendations.belongsTo(db.recommendations, {foreignKey: 'recommendation_id', as: 'recommendations', onDelete: 'CASCADE'});
    return CollectionRecommendations;
  };