const db = require("../models");
const CollectionRecommendations = db.collection_recommendations;
const Op = db.Sequelize.Op;

exports.create = (collection_id, recommendation_id) => {
    const collectionRecommendations = { collection_id: collection_id, recommendation_id: recommendation_id };
    return CollectionRecommendations.create(collectionRecommendations)
};

exports.remove = (collection_id, recommendation_id) => {
    return CollectionRecommendations.destroy({
        where: {
            collection_id: collection_id,
            recommendation_id: recommendation_id
        }
    });
};

exports.getRecommendations = (collection_id, page, limit) => {
    return CollectionRecommendations.findAll({
        where: {
            collection_id: collection_id
        },
        include: { model: db.sequelize.model("recommendations"), as: 'recommendations' },
        limit: limit,
        offset: page
    });
}