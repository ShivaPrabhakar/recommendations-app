const db = require("../models");
const Users = db.users;
const Op = db.Sequelize.Op;

//for testing
exports.findAll = (req, res) => {
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
