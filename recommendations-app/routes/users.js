module.exports = app => {
    const tutorials = require("../services/users.js");
  
    var router = require("express").Router();
  
    
    // Retrieve all Tutorials
    router.get("/", tutorials.findAll);
  
    app.use("/api/users", router);
  
  }