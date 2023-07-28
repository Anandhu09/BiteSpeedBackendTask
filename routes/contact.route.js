module.exports = (app )=> {
    const contactController = require("../controllers/contact.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Tutorial
    router.post("/", contactController.create);
  
    // Retrieve all Tutorials
    router.get("/", contactController.findAll);

  
    app.use('/identify', router);
  };
  