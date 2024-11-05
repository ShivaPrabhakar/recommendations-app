const db = require("../models");
const Collections = db.collections;
const collection_recommendations = require("./collection_recommendations");
const cache = require("./cache");
const Op = db.Sequelize.Op;


exports.create = (collection) => {
    return Collections.create(collection)
};

exports.get = async (id, userId) => {
  const collection = await Collections.findAll({
    where: {
      id: id,
      user_id: userId
    }
  });
  console.log(collection);
  cache.setCacheData(id, userId, collection);
  if (!collection || collection.length === 0) {
    throw 'Collection not found';
  }
}

exports.addRecommendation = async (collectionId, recommendationId, userId) => {
  try {
    let cacheCollection;
    try {
      cacheCollection =  await cache.getCacheData(collectionId, userId);
    } catch (err) {
      console.error(err);
      try {
        const collection = await this.get(collectionId, userId);
      } catch (e) {
        throw e;
      }
    }
    if(!cacheCollection){
      await this.get(collectionId, userId);
    }
    return collection_recommendations.create(collectionId, recommendationId);
  } catch (error) {
    console.error(error);
    throw error;
  }
}
exports.removeRecommendation = async (collectionId, recommendationId, userId) => {
  try {
    let cacheCollection;
    try {
      cacheCollection =  await cache.getCacheData(collectionId, userId);
    } catch (err) {
      console.error(err);
      try {
        const collection = await this.get(collectionId, userId);
      } catch (e) {
        throw e;
      }
    }
    if(!cacheCollection){
      await this.get(collectionId, userId);
    }
    return collection_recommendations.remove(collectionId, recommendationId);
  } catch (error) {
    console.error(error);
    throw error;
  }
}

exports.getRecommendations = async (collectionId, page, limit, userId) => {
  try {
    let cacheCollection;
    try {
      cacheCollection =  await cache.getCacheData(collectionId, userId);
    } catch (err) {
      console.error(err);
      try {
        const collection = await this.get(collectionId, userId);
      } catch (e) {
        throw e;
      }
    }
    if(!cacheCollection){
      await this.get(collectionId, userId);
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
  