const db = require("../models");
const Users = db.users;
const Op = db.Sequelize.Op;

exports.findAll = (req, res) => {
    // const title = req.query.title;
    // var condition = title ? { title: { [Op.iLike]: `%${title}%` } } : null;
  
    Users.findAll({ })
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