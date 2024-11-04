
module.exports = app => {
  const collections = require("../services/collections.js");

  var router = require("express").Router();

  router.post('/create', async (req, res) => {
    const { user_id, name, description } = req.body;
    try {
      if (!name) {
        res.status(400).send({
          message: "Name can not be empty!"
        });
        return;
      }
      if (!user_id) {
        res.status(400).send({
          message: "User_id can not be empty!"
        });
        return;
      }
      const result = await collections.create(req.body);
      res.status(201).json(result);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to create collection' });
    }
  });

  router.post('/:collectionId/add', async (req, res) => {
    const { collectionId } = req.params;
    const { recommendationId } = req.body;
  
    try {
      if (!recommendationId) {
        res.status(400).send({
          message: "Recommendation ID can not be empty!"
        });
        return;
      }
      if (!collectionId) {
        res.status(400).send({
          message: "Collection ID can not be empty!"
        });
        return;
      }

      const result = await collections.addRecommendation(parseInt(collectionId), parseInt(recommendationId));
  
      res.status(201).json(result);
    } catch (error) {
      res.status(500).json({ error: 'Failed to add recommendation to collection' });
    }
  });

  router.delete('/:collectionId/remove/:recommendationId', async (req, res) => {
    const { collectionId, recommendationId } = req.params;
    try {
      const result = await collections.removeRecommendation(parseInt(collectionId), parseInt(recommendationId));
      console.log(result);
      res.status(200).json({ message: 'Recommendation removed from collection' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to remove recommendation from collection' });
    }
  });

  router.get('/:collectionId/recommendations', async (req, res) => {
    const { collectionId } = req.params;
    const { page = 1, limit = 10 } = req.query;
    const offset = (page - 1) * limit;
  
    try {
      const recommendations = await collections.getRecommendations(parseInt(collectionId), offset, limit);
      console.log(recommendations);
      res.status(200).json(recommendations);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to retrieve recommendations' });
    }
  });

  router.delete('/:collectionId', async (req, res) => {
    const { collectionId } = req.params;
    try {
      const result = await collections.delete(parseInt(collectionId));
      console.log(result);
      res.status(200).json({ message: 'Collection deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete collection' });
    }
  });
 
  app.use("/api/collections", router);

}
