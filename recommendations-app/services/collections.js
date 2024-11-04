const db = require("../models");
const Collections = db.collections;
const collection_recommendations = require("./collection_recommendations");
const Op = db.Sequelize.Op;

exports.findAll = (req, res) => {
    const title = req.query.title;
    var condition = title ? { title: { [Op.iLike]: `%${title}%` } } : null;
  
    Collections.findAll({ where: condition })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving Collections."
        });
      });
};

exports.create = (collection) => {
    return Collections.create(collection)
};

exports.addRecommendation = async (collectionId, recommendationId) => {
  try {
    const collection = await Collections.findByPk(collectionId);
    if (!collection) {
      throw 'Collection not found';
    }
    return collection_recommendations.create(collectionId, recommendationId);
  } catch (error) {
    console.error(error);
    throw error;
  }
}
exports.removeRecommendation = async (collectionId, recommendationId) => {
  try {
    const collection = await Collections.findByPk(collectionId);
    if (!collection) {
      throw 'Collection not found';
    }
    return collection_recommendations.remove(collectionId, recommendationId);
  } catch (error) {
    console.error(error);
    throw error;
  }
}

exports.getRecommendations = async (collectionId, page, limit) => {
  try {
    const collection = await Collections.findByPk(collectionId);
    if (!collection) {
      throw 'Collection not found';
    }
    return collection_recommendations.getRecommendations(collectionId, page, limit);
  } catch (error) {
    console.error(error);
    throw error;
  }
}

exports.delete = (id) => {
    return Collections.destroy({
        where: { id: id }
    });
}
  