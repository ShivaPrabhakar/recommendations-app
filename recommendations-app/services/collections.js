const db = require("../models");
const Collections = db.collections;
const collection_recommendations = require("./collection_recommendations");
const cache = require("./cache");
const Op = db.Sequelize.Op;


exports.create = (collection) => {
    return Collections.create(collection)
};

exports.addRecommendation = async (collectionId, recommendationId, userId) => {
  try {
    try {
      const cacheCollection =  await cache.getCacheData(collectionId, userId,)
    } catch (err) {
      console.error(err);
        const collection = await Collections.findAll({
          where: {
            id: collectionId,
            user_id: userId
          }
        });
        cache.setCacheData(collectionId, userId, collection);
        if (!collection) {
          throw 'Collection not found';
        }
    }
    return collection_recommendations.create(collectionId, recommendationId);
  } catch (error) {
    console.error(error);
    throw error;
  }
}
exports.removeRecommendation = async (collectionId, recommendationId, userId) => {
  try {
    try {
      const cacheCollection =  await cache.getCacheData(collectionId, userId,)
    } catch (err) {
      console.error(err);
        const collection = await Collections.findAll({
          where: {
            id: collectionId,
            user_id: userId
          }
        });
        cache.setCacheData(collectionId, userId, collection);
        if (!collection) {
          throw 'Collection not found';
        }
    }
    return collection_recommendations.remove(collectionId, recommendationId);
  } catch (error) {
    console.error(error);
    throw error;
  }
}

exports.getRecommendations = async (collectionId, page, limit, userId) => {
  try {
    try {
      const cacheCollection =  await cache.getCacheData(collectionId, userId,)
    } catch (err) {
      console.error(err);
        const collection = await Collections.findAll({
          where: {
            id: collectionId,
            user_id: userId
          }
        });
        cache.setCacheData(collectionId, userId, collection);
        if (!collection) {
          throw 'Collection not found';
        }
    }
    return collection_recommendations.getRecommendations(collectionId, page, limit);
  } catch (error) {
    console.error(error);
    throw error;
  }
}

exports.delete = (id, userId) => {
    return Collections.destroy({
        where: { id: id, user_id: userId }
    });
}
  